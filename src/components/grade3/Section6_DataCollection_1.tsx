import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade3Section6Set1() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const questions = [
    {
        id: 1,
        question: "次のクロス集計表から、「男性」かつ「賛成」の人数を読み取ってください。\n\n【アンケート結果】\n　　　　｜賛成｜反対｜合計\n男性　　｜ 45 ｜ 25 ｜ 70\n女性　　｜ 55 ｜ 35 ｜ 90\n合計　　｜100 ｜ 60 ｜160",
        options: [
            "45人",
            "55人",
            "70人",
            "100人"
        ],
        correct: 1,
        explanation: "クロス集計表の「男性」行と「賛成」列の交点を読み取ると45人です。"
    },
    {
        id: 2,
        question: "上記のクロス集計表で、「賛成」の人の割合は全体の何%ですか。",
        options: [
            "約62.5%",
            "約37.5%",
            "約43.75%",
            "約28.13%"
        ],
        correct: 1,
        explanation: "賛成の人数は100人、全体は160人なので、100÷160=0.625=62.5%です。"
    },
    {
        id: 3,
        question: "クロス集計表について、正しい記述を選んでください。",
        options: [
            "2つの変数の関係を表にまとめたもの",
            "常に2×2の表である",
            "平均値を計算するために使う",
            "分散を求めるために使う"
        ],
        correct: 1,
        explanation: "クロス集計表は、2つのカテゴリカル変数の関係を表にまとめたものです。2×2に限らず、3×3や2×4なども可能です。"
    },
    {
        id: 4,
        question: "次のクロス集計表から、男性の中で「賛成」の人の割合を計算してください。\n\n　　　　｜賛成｜反対｜合計\n男性　　｜ 30 ｜ 20 ｜ 50\n女性　　｜ 40 ｜ 10 ｜ 50\n合計　　｜ 70 ｜ 30 ｜100",
        options: [
            "30%",
            "40%",
            "60%",
            "70%"
        ],
        correct: 3,
        explanation: "男性の中で賛成の人の割合は、30÷50=0.6=60%です。"
    },
    {
        id: 5,
        question: "上記のクロス集計表から、「賛成」の人の中で女性の割合を計算してください。",
        options: [
            "約40%",
            "約57.1%",
            "約80%",
            "約70%"
        ],
        correct: 2,
        explanation: "賛成の人は70人、そのうち女性は40人なので、40÷70≈0.571=57.1%です。"
    },
    {
        id: 6,
        question: "クロス集計表で、行の合計と列の合計の交点には何が入りますか。",
        options: [
            "平均値",
            "中央値",
            "全体の合計",
            "標準偏差"
        ],
        correct: 3,
        explanation: "クロス集計表の右下（行の合計と列の合計の交点）には、全体の合計（総数）が入ります。"
    },
    {
        id: 7,
        question: "次のクロス集計表について、「A商品を購入した人」の中で「B商品も購入した人」の割合を計算してください。\n\n　　　　　　｜B購入｜B未購入｜合計\nA購入　　　｜  80  ｜   20   ｜ 100\nA未購入　　｜  40  ｜  160   ｜ 200\n合計　　　　｜ 120 ｜  180   ｜ 300",
        options: [
            "約26.7%",
            "約66.7%",
            "80%",
            "40%"
        ],
        correct: 3,
        explanation: "A商品を購入した人は100人、そのうちB商品も購入した人は80人なので、80÷100=0.8=80%です。"
    },
    {
        id: 8,
        question: "クロス集計表から読み取れない情報はどれですか。",
        options: [
            "各カテゴリーの度数",
            "2つの変数の関連性",
            "因果関係の向き",
            "割合の計算"
        ],
        correct: 3,
        explanation: "クロス集計表からは2つの変数の関連性や度数、割合は読み取れますが、因果関係の向き（どちらが原因でどちらが結果か）は判断できません。"
    },
    {
        id: 9,
        question: "次のクロス集計表で、「男性」と「女性」で「賛成」の割合を比較してください。\n\n　　　　｜賛成｜反対｜合計\n男性　　｜ 20 ｜ 30 ｜ 50\n女性　　｜ 40 ｜ 10 ｜ 50\n合計　　｜ 60 ｜ 40 ｜100",
        options: [
            "男性の方が賛成の割合が高い",
            "女性の方が賛成の割合が高い",
            "同じ割合",
            "判断できない"
        ],
        correct: 2,
        explanation: "男性の賛成割合は20÷50=40%、女性の賛成割合は40÷50=80%なので、女性の方が高いです。"
    },
    {
        id: 10,
        question: "クロス集計表で、2つの変数が「独立」であるとはどういう意味ですか。",
        options: [
            "片方の変数が他方に影響を与えない",
            "必ず因果関係がある",
            "度数が等しい",
            "合計が100になる"
        ],
        correct: 1,
        explanation: "2つの変数が独立とは、一方の変数の値が他方の変数の分布に影響を与えないことを意味します。"
    }
];

  useEffect(() => {
    const best = getBestScore('grade3-section6_datacollection_1');
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
      examId: 'grade3-section6_datacollection_1',
      examTitle: '3級 - クロス集計表 セット1',
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
              📊 3級 - クロス集計表 セット1
            </h1>
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">クロス集計表の基本的な読み取りを学びましょう</p>
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
