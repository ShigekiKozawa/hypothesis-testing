import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade3Section7Set1() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const questions = [
    {
        id: 1,
        question: "サイコロを1回振って、偶数の目が出る確率はいくらですか。",
        options: [
            "1/6",
            "1/3",
            "1/2",
            "2/3"
        ],
        correct: 3,
        explanation: "偶数の目は2,4,6の3通り、全体は6通りなので、3/6=1/2です。"
    },
    {
        id: 2,
        question: "52枚のトランプから1枚引いたとき、ハートが出る確率はいくらですか。",
        options: [
            "1/13",
            "1/4",
            "1/2",
            "13/52"
        ],
        correct: 2,
        explanation: "ハートは13枚、全体は52枚なので、13/52=1/4です。"
    },
    {
        id: 3,
        question: "赤玉5個、白玉3個が入った袋から1個取り出すとき、赤玉が出る確率はいくらですか。",
        options: [
            "3/8",
            "5/8",
            "1/2",
            "3/5"
        ],
        correct: 2,
        explanation: "赤玉は5個、全体は8個なので、5/8です。"
    },
    {
        id: 4,
        question: "確率の基本性質として正しいものはどれですか。",
        options: [
            "確率は負の値を取ることがある",
            "すべての事象の確率の和は1",
            "確率は1より大きくなることがある",
            "確率は必ず1/2"
        ],
        correct: 2,
        explanation: "すべての起こりうる事象の確率の和は1になります。確率は0以上1以下の値を取ります。"
    },
    {
        id: 5,
        question: "コインを2回投げたとき、2回とも表が出る確率はいくらですか。",
        options: [
            "1/2",
            "1/3",
            "1/4",
            "1/8"
        ],
        correct: 3,
        explanation: "1回目が表の確率は1/2、2回目も表の確率は1/2。独立なので、(1/2)×(1/2)=1/4です。"
    },
    {
        id: 6,
        question: "余事象の確率について、正しい式を選んでください。事象Aの確率をP(A)とします。",
        options: [
            "P(Aでない)=1-P(A)",
            "P(Aでない)=1+P(A)",
            "P(Aでない)=2-P(A)",
            "P(Aでない)=P(A)"
        ],
        correct: 1,
        explanation: "余事象の確率は、P(Aでない)=1-P(A)です。"
    },
    {
        id: 7,
        question: "サイコロを1回振って、6以外の目が出る確率はいくらですか。",
        options: [
            "1/6",
            "5/6",
            "1/2",
            "2/3"
        ],
        correct: 2,
        explanation: "6が出る確率は1/6なので、余事象を使うと1-1/6=5/6です。"
    },
    {
        id: 8,
        question: "独立な2つの事象A、Bについて、P(A)=0.4、P(B)=0.5のとき、P(AかつB)はいくらですか。",
        options: [
            "0.2",
            "0.45",
            "0.9",
            "0.1"
        ],
        correct: 1,
        explanation: "独立なので、P(AかつB)=P(A)×P(B)=0.4×0.5=0.2です。"
    },
    {
        id: 9,
        question: "赤玉4個、白玉6個の袋から復元抽出で2回玉を取り出します。2回とも赤玉が出る確率はいくらですか。",
        options: [
            "4/25",
            "6/25",
            "16/100",
            "2/5"
        ],
        correct: 3,
        explanation: "復元抽出なので、1回目も2回目も赤玉の確率は4/10=2/5。(2/5)×(2/5)=4/25=16/100です。"
    },
    {
        id: 10,
        question: "確率の加法定理について、排反な事象A、Bの場合の式はどれですか。",
        options: [
            "P(AまたはB)=P(A)+P(B)",
            "P(AまたはB)=P(A)×P(B)",
            "P(AまたはB)=P(A)-P(B)",
            "P(AまたはB)=1"
        ],
        correct: 1,
        explanation: "排反な事象（同時に起こらない事象）の場合、P(AまたはB)=P(A)+P(B)です。"
    }
];

  useEffect(() => {
    const best = getBestScore('grade3-section7_timeseries_1');
    if (best) {
      setBestScore(best.percentage);
    }
  }, []);

  const handleAnswer = (questionId: number, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleSubmit = () => {
    const score = Object.keys(answers).reduce((acc, qId) => {
      const question = questions.find(q => q.id === parseInt(qId));
      if (question && answers[parseInt(qId)] === question.correct) {
        return acc + 1;
      }
      return acc;
    }, 0);

    const percentage = (score / questions.length) * 100;
    const passed = percentage >= 60;

    saveExamRecord({
      examId: 'grade3-section7_timeseries_1',
      examTitle: '3級 - 確率の基礎 セット1',
      grade: '3級' as '3級',
      score,
      totalQuestions: questions.length,
      percentage,
      passed
    });

    setShowResult(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResult(false);
    setCurrentQuestionIndex(0);
    window.scrollTo(0, 0);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const allAnswered = Object.keys(answers).length === questions.length;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (showResult) {
    const score = Object.keys(answers).reduce((acc, qId) => {
      const question = questions.find(q => q.id === parseInt(qId));
      if (question && answers[parseInt(qId)] === question.correct) {
        return acc + 1;
      }
      return acc;
    }, 0);

    const percentage = (score / questions.length) * 100;
    const passed = percentage >= 60;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              結果発表 🎉
            </h1>
            
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6 mb-6">
              <div className="text-center mb-4">
                <p className="text-6xl font-bold text-purple-600 mb-2">
                  {score}/{questions.length}
                </p>
                <p className="text-2xl text-gray-700">
                  正解率: {percentage.toFixed(1)}%
                </p>
                {bestScore !== null && (
                  <p className="text-lg text-gray-600 mt-2">
                    あなたのベストスコア: {bestScore.toFixed(1)}%
                  </p>
                )}
              </div>

              {passed ? (
                <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-4">
                  <p className="text-green-700 font-semibold">
                    ✅ 合格です！よくできました！
                  </p>
                </div>
              ) : (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
                  <p className="text-yellow-700 font-semibold">
                    📚 もう少し復習が必要です。再挑戦してみましょう！
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-4 mb-6">
              <button
                onClick={handleReset}
                className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                もう一度挑戦
              </button>
              <Link
                to="/"
                className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors text-center"
              >
                トップに戻る
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            {questions.map((q) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.correct;

              return (
                <div
                  key={q.id}
                  className={`bg-white rounded-lg shadow-md p-6 border-2 ${
                    isCorrect
                      ? 'border-green-500'
                      : userAnswer
                      ? 'border-red-500'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start mb-4">
                    <span className="text-lg font-bold text-purple-600 mr-3">
                      Q{q.id}.
                    </span>
                    <p className="text-gray-800 font-medium flex-1 whitespace-pre-line">
                      {q.question}
                    </p>
                    {isCorrect ? (
                      <span className="text-green-600 text-xl">✓</span>
                    ) : userAnswer ? (
                      <span className="text-red-600 text-xl">✗</span>
                    ) : null}
                  </div>

                  <div className="space-y-2 mb-4">
                    {q.options.map((option, index) => {
                      const optionNumber = index + 1;
                      const isSelected = userAnswer === optionNumber;
                      const isCorrectOption = q.correct === optionNumber;

                      return (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border-2 ${
                            isCorrectOption
                              ? 'border-green-500 bg-green-50'
                              : isSelected
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200'
                          }`}
                        >
                          <span className="font-semibold mr-2">
                            {optionNumber}.
                          </span>
                          {option}
                          {isCorrectOption && (
                            <span className="ml-2 text-green-600 font-semibold">
                              ← 正解
                            </span>
                          )}
                          {isSelected && !isCorrectOption && (
                            <span className="ml-2 text-red-600 font-semibold">
                              ← あなたの回答
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1 font-semibold">
                      💡 正解
                    </p>
                    <p className="text-gray-700 text-sm mb-2">
                      {q.correct}. {q.options[q.correct - 1]}
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg mt-3">
                    <p className="text-sm text-gray-600 mb-1 font-semibold">📖 解説</p>
                    <p className="text-gray-700 text-sm leading-relaxed">{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              📊 3級 - 確率の基礎 セット1
            </h1>
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">確率の基本的な計算を学びましょう</p>
          <div className="flex gap-2 text-sm text-gray-500">
            <span className="bg-purple-100 px-3 py-1 rounded-full">セット1/3</span>
            <span>全10問</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">
                問題 {currentQuestionIndex + 1} / {questions.length}
              </span>
              <span className="text-sm font-semibold text-gray-700">
                進捗: {Object.keys(answers).length} / {questions.length} 回答済み
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-start mb-4">
              <span className="text-xl font-bold text-purple-600 mr-3">
                Q{currentQuestion.id}.
              </span>
              <p className="text-lg text-gray-800 font-medium flex-1 whitespace-pre-line">
                {currentQuestion.question}
              </p>
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const optionNumber = index + 1;
                const isSelected = answers[currentQuestion.id] === optionNumber;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(currentQuestion.id, optionNumber)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'
                    }`}
                  >
                    <span className="font-semibold mr-3">{optionNumber}.</span>
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ← 前の問題
            </button>
            
            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className="flex-1 px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {allAnswered ? '結果を見る' : `残り ${questions.length - Object.keys(answers).length} 問`}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                次の問題 →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
