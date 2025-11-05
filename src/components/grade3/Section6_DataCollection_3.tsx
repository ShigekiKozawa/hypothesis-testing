import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade3Section6Set3() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const questions = [
    {
        id: 1,
        question: "次のクロス集計表で、全体に対する各セルの割合（相対度数）を計算してください（左上のセルのみ）。\n\n　　　　｜商品A｜商品B｜合計\n購入　　｜  30 ｜  20 ｜ 50\n未購入　｜  20 ｜  30 ｜ 50\n合計　　｜  50 ｜  50 ｜100",
        options: [
            "20%",
            "25%",
            "30%",
            "50%"
        ],
        correct: 3,
        explanation: "左上のセル（購入×商品A）は30人で、全体は100人なので、30÷100=30%です。"
    },
    {
        id: 2,
        question: "上記のクロス集計表で、「購入」した人の中で「商品A」を選んだ人の割合はいくらですか。",
        options: [
            "30%",
            "50%",
            "60%",
            "100%"
        ],
        correct: 3,
        explanation: "購入した人は50人、そのうち商品Aは30人なので、30÷50=60%です。"
    },
    {
        id: 3,
        question: "クロス集計表で、行パーセントと列パーセントの違いは何ですか。",
        options: [
            "計算方法は同じ",
            "行パーセントは行の合計を分母、列パーセントは列の合計を分母とする",
            "行パーセントは列の合計を分母、列パーセントは行の合計を分母とする",
            "違いはない"
        ],
        correct: 2,
        explanation: "行パーセントは各行の合計を分母として計算し、列パーセントは各列の合計を分母として計算します。"
    },
    {
        id: 4,
        question: "次のクロス集計表で、「男性」の「賛成」の期待度数を計算してください（独立を仮定）。\n\n　　　　｜賛成｜反対｜合計\n男性　　｜  ? ｜  ? ｜ 60\n女性　　｜  ? ｜  ? ｜ 40\n合計　　｜ 50 ｜ 50 ｜100",
        options: [
            "25",
            "30",
            "35",
            "40"
        ],
        correct: 2,
        explanation: "期待度数=（行の合計×列の合計）÷全体の合計=（60×50）÷100=30です。"
    },
    {
        id: 5,
        question: "クロス集計表から計算できる指標として誤っているものはどれですか。",
        options: [
            "行パーセント",
            "列パーセント",
            "相関係数",
            "条件付き確率"
        ],
        correct: 3,
        explanation: "相関係数はクロス集計表（カテゴリカル変数）からは計算できません。相関係数は量的変数間の線形関係を測る指標です。"
    },
    {
        id: 6,
        question: "3×3のクロス集計表には、全部でいくつのセルがありますか（周辺度数を除く）。",
        options: [
            "3個",
            "6個",
            "9個",
            "12個"
        ],
        correct: 3,
        explanation: "3×3のクロス集計表は、3行×3列=9個のセルがあります。"
    },
    {
        id: 7,
        question: "次のクロス集計表で、「A商品購入者」と「B商品購入者」の条件付き確率P(B|A)を計算してください。\n\n　　　　　　｜B購入｜B未購入｜合計\nA購入　　　｜  40  ｜   60   ｜ 100\nA未購入　　｜  20  ｜  180   ｜ 200\n合計　　　　｜  60  ｜  240   ｜ 300",
        options: [
            "約13.3%",
            "20%",
            "40%",
            "60%"
        ],
        correct: 3,
        explanation: "P(B|A)は「A購入の条件下でBも購入する確率」です。A購入者100人中、B購入者は40人なので、40÷100=40%です。"
    },
    {
        id: 8,
        question: "クロス集計表で、2つの変数が完全に独立している場合、何が成り立ちますか。",
        options: [
            "すべてのセルの観測度数=期待度数",
            "すべてのセルの値が等しい",
            "行の合計=列の合計",
            "判断できない"
        ],
        correct: 1,
        explanation: "2つの変数が完全に独立している場合、すべてのセルで観測度数=期待度数となります。"
    },
    {
        id: 9,
        question: "クロス集計表を作成する際の注意点として正しいものはどれですか。",
        options: [
            "必ず2×2の表にする",
            "量的変数をそのまま使う",
            "カテゴリーを適切に設定する",
            "平均値を計算する"
        ],
        correct: 3,
        explanation: "クロス集計表を作成する際は、カテゴリーを適切に設定し、意味のある区分にすることが重要です。量的変数は階級分けしてカテゴリカルにする必要があります。"
    },
    {
        id: 10,
        question: "クロス集計表から導かれる知見として誤っているものはどれですか。",
        options: [
            "2つの変数の関連性の強さ",
            "因果関係の証明",
            "条件付き確率",
            "度数の比較"
        ],
        correct: 2,
        explanation: "クロス集計表からは関連性は読み取れますが、因果関係を証明することはできません。相関≠因果であり、実験や理論的根拠が必要です。"
    }
];

  useEffect(() => {
    const best = getBestScore('grade3-section6_datacollection_3');
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
      examId: 'grade3-section6_datacollection_3',
      examTitle: '3級 - クロス集計表 セット3',
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
              📊 3級 - クロス集計表 セット3
            </h1>
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">クロス集計表と割合計算を総合的に学びましょう</p>
          <div className="flex gap-2 text-sm text-gray-500">
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
