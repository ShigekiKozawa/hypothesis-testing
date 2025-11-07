import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section10DataCollection2() {
  const questions: Question[] = [
    {
        id: 1,
        question: "観察研究とは何ですか。",
        options: [
            "研究者が介入せず、自然な状態を観察する",
            "実験を行う",
            "必ずアンケート",
            "何もしない",
        ],
        correct: 1,
        explanation: "観察研究は、研究者が対象に介入せず、自然な状態を観察してデータを集める研究です。"
    },
    {
        id: 2,
        question: "実験研究とは何ですか。",
        options: [
            "自然な状態を観察する",
            "研究者が条件を設定・操作して因果関係を調べる",
            "必ずアンケート",
            "何もしない",
        ],
        correct: 2,
        explanation: "実験研究は、研究者が条件（処理）を設定・操作して、因果関係を調べる研究です。"
    },
    {
        id: 3,
        question: "実験研究の利点は何ですか。",
        options: [
            "簡単",
            "因果関係を明確にしやすい",
            "費用がかからない",
            "何もない",
        ],
        correct: 2,
        explanation: "実験研究は、条件を統制できるので、因果関係を明確にしやすい利点があります。"
    },
    {
        id: 4,
        question: "観察研究の利点は何ですか。",
        options: [
            "因果関係がわかる",
            "自然な状態を調べられ、倫理的な問題が少ない",
            "必ず実験より良い",
            "何もない",
        ],
        correct: 2,
        explanation: "観察研究は、自然な状態を調べられ、倫理的な制約が少ない利点があります。"
    },
    {
        id: 5,
        question: "アンケート調査は、観察研究ですか、実験研究ですか。",
        options: [
            "観察研究",
            "実験研究",
            "どちらでもない",
            "判断できない",
        ],
        correct: 1,
        explanation: "アンケート調査は、対象に介入せずデータを集めるので、観察研究です。"
    },
    {
        id: 6,
        question: "ランダム化比較試験（RCT）とは何ですか。",
        options: [
            "観察するだけ",
            "対象を無作為に2つ以上のグループに分けて比較する実験",
            "必ずアンケート",
            "何もしない",
        ],
        correct: 2,
        explanation: "ランダム化比較試験（RCT）は、対象を無作為にグループ分けして、処理の効果を比較する実験研究です。"
    },
    {
        id: 7,
        question: "実験研究で、対照群（コントロール群）とは何ですか。",
        options: [
            "処理を受けるグループ",
            "処理を受けないグループ（比較の基準）",
            "最大のグループ",
            "何もない",
        ],
        correct: 2,
        explanation: "対照群は、処理を受けないグループで、実験群との比較の基準となります。"
    },
    {
        id: 8,
        question: "実験研究で、実験群とは何ですか。",
        options: [
            "処理を受けないグループ",
            "処理を受けるグループ",
            "最小のグループ",
            "何もない",
        ],
        correct: 2,
        explanation: "実験群は、研究者が設定した処理（新しい薬、教育方法など）を受けるグループです。"
    },
    {
        id: 9,
        question: "プラセボ効果とは何ですか。",
        options: [
            "実験の効果",
            "偽の処理でも効果があると思い込むことで起こる効果",
            "必ず悪い",
            "何もない",
        ],
        correct: 2,
        explanation: "プラセボ効果は、偽の薬（プラセボ）でも「効く」と思い込むことで、実際に症状が改善する現象です。"
    },
    {
        id: 10,
        question: "二重盲検法（ダブルブラインド）とは何ですか。",
        options: [
            "全員が知っている",
            "対象者も実施者も、どちらが処理群か知らない方法",
            "必ず片方が知っている",
            "何もない",
        ],
        correct: 2,
        explanation: "二重盲検法は、対象者も実施者も、どちらが実験群・対照群かを知らない状態で行う方法です。"
    }
  ];

  const {
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
  } = useExam({
    examId: 'grade4-section10_datacollection_2',
    examTitle: '4級 Section10_DataCollection_2',
    grade: '4級',
    questions,
  });

  if (showResult) {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;

    return (
      <ResultScreen
        score={score}
        totalQuestions={questions.length}
        percentage={percentage}
        questions={questions}
        answers={answers}
        onReset={resetExam}
        backLink="/"
      />
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <ExamLayout
      title="📊 結果"
      backLink="/"
      bestScore={bestScore}
    >
      <QuestionCard
        question={currentQuestion}
        questionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        userAnswer={answers[currentQuestion.id]}
        onAnswer={handleAnswer}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
      />
    </ExamLayout>
  );
}
