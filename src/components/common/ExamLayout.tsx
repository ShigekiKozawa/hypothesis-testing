import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Question } from '../../hooks/useExam';
import { ScatterPlot, BarChartComponent, LineChartComponent, Histogram, BoxPlot } from './Charts';

interface ExamLayoutProps {
  title: string;
  backLink?: string;
  onBack?: () => void;
  bestScore: number | null;
  children: ReactNode;
}

export function ExamLayout({ title, backLink, onBack, bestScore, children }: ExamLayoutProps) {
  const handleBackClick = () => {
    window.scrollTo(0, 0);
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
            {bestScore !== null && (
              <div className="bg-yellow-100 px-4 py-2 rounded-lg">
                <span className="text-sm font-semibold text-yellow-800">
                  🏆 ベストスコア: {bestScore.toFixed(1)}%
                </span>
              </div>
            )}
          </div>
          {children}
        </div>
        <div className="text-center">
          {onBack ? (
            <button
              onClick={handleBackClick}
              className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200"
            >
              ← 戻る
            </button>
          ) : (
            <Link
              to={backLink || '/'}
              onClick={handleBackClick}
              className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200"
            >
              ← 戻る
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  percentage: number;
  questions: Question[];
  answers: Record<number, number>;
  onReset: () => void;
  backLink: string;
}

export function ResultScreen({
  score,
  totalQuestions,
  percentage,
  questions,
  answers,
  onReset,
  backLink
}: ResultScreenProps) {
  const passed = percentage >= 60;

  const handleBackClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            📊 結果
          </h1>

          <div className={`text-center p-8 rounded-lg mb-8 ${
            passed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <div className="text-6xl mb-4">
              {passed ? '🎉' : '📚'}
            </div>
            <div className="text-4xl font-bold mb-4 text-gray-800">
              {score} / {totalQuestions} 問正解
            </div>
            <div className="text-3xl font-bold mb-4 text-gray-800">
              {percentage.toFixed(1)}%
            </div>
            <div className={`text-2xl font-bold ${
              passed ? 'text-green-700' : 'text-red-700'
            }`}>
              {passed ? '合格！' : '不合格'}
            </div>
            <div className="mt-4 text-gray-600">
              {passed
                ? '素晴らしい成績です！この調子で頑張りましょう。'
                : '60%以上で合格です。復習して再チャレンジしましょう。'}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📝 解答と解説</h2>
            {questions.map((q, index) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.correct;

              return (
                <div
                  key={q.id}
                  className={`p-6 rounded-lg border-2 ${
                    isCorrect
                      ? 'bg-green-50 border-green-500'
                      : 'bg-red-50 border-red-500'
                  }`}
                >
                  <div className="flex items-start mb-4">
                    <span className="text-2xl mr-3">
                      {isCorrect ? '✅' : '❌'}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">
                        問題 {index + 1}
                      </h3>
                      <p className="text-gray-800 mb-4 whitespace-pre-wrap">
                        {q.question}
                      </p>

                      {q.chartType === 'scatter' && q.chartData && (
                        <ScatterPlot 
                          data={q.chartData} 
                          xLabel={q.chartLabels?.x || 'X'}
                          yLabel={q.chartLabels?.y || 'Y'}
                        />
                      )}
                      {q.chartType === 'bar' && q.barData && (
                        <BarChartComponent 
                          data={q.barData}
                          xLabel={q.chartLabels?.x || 'Category'}
                          yLabel={q.chartLabels?.y || 'Value'}
                        />
                      )}
                      {q.chartType === 'line' && q.chartData && (
                        <LineChartComponent 
                          data={q.chartData}
                          xLabel={q.chartLabels?.x || 'X'}
                          yLabel={q.chartLabels?.y || 'Y'}
                        />
                      )}

                      <div className="space-y-2 mb-4">
                        {q.options.map((option, optIndex) => {
                          const optionNumber = optIndex + 1;
                          const isUserAnswer = userAnswer === optionNumber;
                          const isCorrectAnswer = q.correct === optionNumber;

                          return (
                            <div
                              key={optIndex}
                              className={`p-3 rounded ${
                                isCorrectAnswer
                                  ? 'bg-green-200 font-bold'
                                  : isUserAnswer
                                  ? 'bg-red-200'
                                  : 'bg-gray-100'
                              }`}
                            >
                              {optionNumber}. {option}
                              {isCorrectAnswer && ' ← 正解'}
                              {isUserAnswer && !isCorrectAnswer && ' ← あなたの回答'}
                            </div>
                          );
                        })}
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="font-bold text-blue-900 mb-2">💡 解説</p>
                        <p className="text-gray-700">{q.explanation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-4 justify-center mt-8">
            <button
              onClick={onReset}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200"
            >
              もう一度挑戦
            </button>
            <Link
              to={backLink}
              onClick={handleBackClick}
              className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200"
            >
              セクション一覧へ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  userAnswer: number | undefined;
  onAnswer: (questionId: number, answer: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export function QuestionCard({
  question,
  questionIndex,
  totalQuestions,
  userAnswer,
  onAnswer,
  onPrevious,
  onNext,
  onSubmit
}: QuestionCardProps) {
  const isLastQuestion = questionIndex === totalQuestions - 1;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold text-gray-600">
          問題 {questionIndex + 1} / {totalQuestions}
        </span>
        <div className="flex gap-2">
          {Array.from({ length: totalQuestions }, (_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === questionIndex
                  ? 'bg-blue-600'
                  : i < questionIndex
                  ? 'bg-green-500'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4 whitespace-pre-wrap">
          {question.question}
        </h2>

        {question.chartType === 'scatter' && question.chartData && (
          <ScatterPlot 
            data={question.chartData} 
            xLabel={question.chartLabels?.x || 'X'}
            yLabel={question.chartLabels?.y || 'Y'}
          />
        )}
        {question.chartType === 'bar' && question.barData && (
          <BarChartComponent 
            data={question.barData}
            xLabel={question.chartLabels?.x || 'Category'}
            yLabel={question.chartLabels?.y || 'Value'}
          />
        )}
        {question.chartType === 'line' && question.chartData && (
          <LineChartComponent 
            data={question.chartData}
            xLabel={question.chartLabels?.x || 'X'}
            yLabel={question.chartLabels?.y || 'Y'}
          />
        )}

        <div className="space-y-3">
          {question.options.map((option, index) => {
            const optionNumber = index + 1;
            const isSelected = userAnswer === optionNumber;

            return (
              <button
                key={index}
                onClick={() => onAnswer(question.id, optionNumber)}
                className={`w-full text-left p-4 rounded-lg border-2 transition duration-200 ${
                  isSelected
                    ? 'border-blue-600 bg-blue-100'
                    : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50'
                }`}
              >
                <span className="font-semibold">{optionNumber}.</span> {option}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between items-center pt-4">
        <button
          onClick={onPrevious}
          disabled={questionIndex === 0}
          className={`px-6 py-3 rounded-lg font-bold transition duration-200 ${
            questionIndex === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gray-600 hover:bg-gray-700 text-white'
          }`}
        >
          ← 前の問題
        </button>

        {isLastQuestion ? (
          <button
            onClick={onSubmit}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200"
          >
            回答を提出
          </button>
        ) : (
          <button
            onClick={onNext}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200"
          >
            次の問題 →
          </button>
        )}
      </div>
    </div>
  );
}

