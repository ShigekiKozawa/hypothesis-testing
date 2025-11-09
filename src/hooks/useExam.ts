import { useState, useEffect } from 'react';
import { saveExamRecord, getBestScore } from '../utils/localStorage';

export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  chartData?: any;
  barData?: any;
  boxPlotData?: { min: number; q1: number; median: number; q3: number; max: number };
  chartType?: 'scatter' | 'line' | 'bar' | 'histogram' | 'boxplot';
  chartLabels?: { x: string; y: string };
}

export interface UseExamOptions {
  examId: string;
  examTitle: string;
  grade: '3級' | '4級';
  questions: Question[];
}

export function useExam({ examId, examTitle, grade, questions }: UseExamOptions) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  useEffect(() => {
    const best = getBestScore(examId);
    if (best) {
      setBestScore(best.percentage);
    }
  }, [examId]);

  const handleAnswer = (questionId: number, answer: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct) {
        correct++;
      }
    });
    return correct;
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      alert('すべての問題に回答してください。');
      return;
    }

    const score = calculateScore();
    const percentage = (score / questions.length) * 100;

    saveExamRecord({
      examId,
      examTitle,
      grade,
      score,
      totalQuestions: questions.length,
      percentage,
      passed: percentage >= 60
    });

    const best = getBestScore(examId);
    if (best) {
      setBestScore(best.percentage);
    }

    setShowResult(true);
    window.scrollTo(0, 0);
  };

  const resetExam = () => {
    setAnswers({});
    setShowResult(false);
    setCurrentQuestionIndex(0);
    window.scrollTo(0, 0);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  return {
    answers,
    showResult,
    currentQuestionIndex,
    bestScore,
    handleAnswer,
    calculateScore,
    handleSubmit,
    resetExam,
    handleNext,
    handlePrevious,
  };
}

