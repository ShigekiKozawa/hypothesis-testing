import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade3Section6Set2() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const questions = [
    {
        id: 1,
        question: "次のクロス集計表について、「商品Aを購入した人」の中で「満足」と回答した人の割合はいくらですか。\n\n　　　　　｜満足｜不満｜合計\n商品A　　｜ 70 ｜ 30 ｜100\n商品B　　｜ 50 ｜ 50 ｜100\n合計　　　｜120 ｜ 80 ｜200",
        options: [
            "35%",
            "58.3%",
            "70%",
            "60%"
        ],
        correct: 3,
        explanation: "商品Aを購入した人は100人、そのうち満足は70人なので、70÷100=70%です。"
    },
    {
        id: 2,
        question: "上記のクロス集計表で、「満足」と回答した人の中で「商品A」を購入した人の割合はいくらですか。",
        options: [
            "約58.3%",
            "70%",
            "50%",
            "60%"
        ],
        correct: 1,
        explanation: "満足と回答した人は120人、そのうち商品Aは70人なので、70÷120≈58.3%です。"
    },
    {
        id: 3,
        question: "クロス集計表から相対度数を計算する際の分母は何ですか。",
        options: [
            "行の合計",
            "列の合計",
            "全体の合計",
            "どれでもよい"
        ],
        correct: 4,
        explanation: "相対度数の分母は、何を基準にするかによって異なります。行を基準なら行の合計、列を基準なら列の合計、全体を基準なら全体の合計を使います。"
    },
    {
        id: 4,
        question: "次のクロス集計表で、「性別」と「賛否」は独立と言えますか。\n\n　　　　｜賛成｜反対｜合計\n男性　　｜ 50 ｜ 50 ｜100\n女性　　｜ 50 ｜ 50 ｜100\n合計　　｜100 ｜100 ｜200",
        options: [
            "独立と言える",
            "独立とは言えない",
            "判断できない",
            "完全に依存している"
        ],
        correct: 1,
        explanation: "男性も女性も賛成50%、反対50%で同じ割合なので、性別と賛否は独立していると言えます。"
    },
    {
        id: 5,
        question: "クロス集計表で、期待度数を計算する公式はどれですか。",
        options: [
            "(行の合計×列の合計)÷全体の合計",
            "行の合計÷列の合計",
            "列の合計÷行の合計",
            "行の合計×列の合計"
        ],
        correct: 1,
        explanation: "期待度数=（行の合計×列の合計）÷全体の合計 で計算します。これは2つの変数が独立の場合に期待される度数です。"
    },
    {
        id: 6,
        question: "次のクロス集計表について、Aグループの「はい」の割合とBグループの「はい」の割合の差を計算してください。\n\n　　　　　｜はい｜いいえ｜合計\nグループA｜ 60 ｜  40  ｜100\nグループB｜ 30 ｜  70  ｜100\n合計　　　｜ 90 ｜ 110  ｜200",
        options: [
            "10%",
            "20%",
            "30%",
            "40%"
        ],
        correct: 3,
        explanation: "Aグループの「はい」の割合は60%、Bグループは30%なので、差は60%-30%=30%です。"
    },
    {
        id: 7,
        question: "クロス集計表で、複数の変数（3つ以上）の関係を見るにはどうすればよいですか。",
        options: [
            "2つずつ組み合わせた複数の表を作る",
            "1つの表にすべて入れる",
            "不可能",
            "平均値を使う"
        ],
        correct: 1,
        explanation: "3つ以上の変数の関係を見るには、2つずつ組み合わせた複数のクロス集計表を作成するか、3元クロス集計表（層別クロス集計表）を作成します。"
    },
    {
        id: 8,
        question: "次のクロス集計表から、カイ二乗検定を行うために必要な「期待度数」を計算してください（左上のセルのみ）。\n\n　　　　｜Yes｜No ｜合計\nグループA｜ 40｜ 60｜100\nグループB｜ 30｜ 70｜100\n合計　　　｜ 70｜130｜200",
        options: [
            "30",
            "35",
            "40",
            "50"
        ],
        correct: 2,
        explanation: "期待度数=（行の合計×列の合計）÷全体の合計=（100×70）÷200=35です。"
    },
    {
        id: 9,
        question: "クロス集計表の「周辺度数」とは何ですか。",
        options: [
            "表の中心のセルの値",
            "行の合計と列の合計",
            "全体の合計のみ",
            "外れ値"
        ],
        correct: 2,
        explanation: "周辺度数とは、クロス集計表の行の合計（行周辺度数）と列の合計（列周辺度数）のことです。"
    },
    {
        id: 10,
        question: "クロス集計表から2つの変数の関連性を評価する統計量として適切なものはどれですか。",
        options: [
            "平均値",
            "標準偏差",
            "カイ二乗統計量",
            "相関係数"
        ],
        correct: 3,
        explanation: "カテゴリカル変数間の関連性を評価するには、カイ二乗統計量やクラメールのVなどを使います。相関係数は量的変数用です。"
    }
];

  useEffect(() => {
    const best = getBestScore('grade3-section6_datacollection_2');
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
      examId: 'grade3-section6_datacollection_2',
      examTitle: '3級 - クロス集計表 セット2',
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
              📊 3級 - クロス集計表 セット2
            </h1>
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">クロス集計表の応用的な読み取りを学びましょう</p>
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
