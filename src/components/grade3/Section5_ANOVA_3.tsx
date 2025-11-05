import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade3Section5Set3() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const questions = [
    {
        id: 1,
        question: "散布図を見ると、データが2つのグループに分かれて分布していました。全体の相関係数と各グループ内の相関係数について、正しい記述を選んでください。",
        options: [
            "全体の相関係数の方が常に大きい",
            "各グループ内の相関係数の方が常に大きい",
            "どちらが大きいかは状況による",
            "必ず等しい"
        ],
        correct: 3,
        explanation: "これはシンプソンのパラドックスに関連する問題です。グループ分けによって、全体の相関と部分の相関が異なる場合があります。"
    },
    {
        id: 2,
        question: "相関係数r=0.3のとき、決定係数R²はいくらですか。",
        options: [
            "0.09",
            "0.3",
            "0.6",
            "0.9"
        ],
        correct: 1,
        explanation: "決定係数R²は相関係数の2乗です。R² = 0.3² = 0.09 です。R²は「一方の変数で他方の変数の変動の何%を説明できるか」を示します。"
    },
    {
        id: 3,
        question: "ある散布図で、点が完全に右上がりの直線上に並んでいます。この場合の相関係数はいくらですか。",
        options: [
            "0",
            "0.5",
            "0.9",
            "1"
        ],
        correct: 4,
        explanation: "点が完全に右上がりの直線上に並んでいる場合、完全な正の相関があるため、相関係数r=1です。"
    },
    {
        id: 4,
        question: "次の記述のうち、正しいものを選んでください。",
        options: [
            "相関係数が大きいほど因果関係が強い",
            "相関係数が0.5以上なら因果関係がある",
            "相関があっても因果関係があるとは限らない",
            "因果関係がなければ相関もない"
        ],
        correct: 3,
        explanation: "相関と因果は別の概念です。相関があっても、①逆の因果、②第3の変数（交絡因子）、③偶然などの可能性があり、因果関係があるとは限りません。"
    },
    {
        id: 5,
        question: "50人のデータから身長と体重の相関係数を計算したところr=0.7でした。このうち外れ値1人（身長は平均的だが体重が極端に重い）を除いて計算し直すと、相関係数はどうなると予想されますか。",
        options: [
            "必ず大きくなる",
            "必ず小さくなる",
            "大きくなる可能性が高い",
            "判断できない"
        ],
        correct: 3,
        explanation: "この外れ値は直線関係から外れているため、除去すると相関係数が大きくなる（より直線的になる）可能性が高いです。ただし、必ずそうなるとは限りません。"
    },
    {
        id: 6,
        question: "学力テストの国語と数学の得点の相関係数がr=0.6でした。これについて誤った解釈を選んでください。",
        options: [
            "国語が得意な人は数学も得意な傾向がある",
            "国語の点数で数学の点数の36%を説明できる",
            "国語の点数が高いと必ず数学も高い",
            "中程度の正の相関がある"
        ],
        correct: 3,
        explanation: "相関係数r=0.6は中程度の正の相関を示しますが、「必ず」高いとは言えません。相関は傾向を示すものであり、例外は存在します。"
    },
    {
        id: 7,
        question: "散布図で、xが小さい範囲では正の相関、xが大きい範囲では負の相関が見られました。このような場合、全体の相関係数はどうなりますか。",
        options: [
            "正になる",
            "負になる",
            "0に近くなる",
            "1になる"
        ],
        correct: 3,
        explanation: "正の部分と負の部分が相殺されるため、全体の相関係数は0に近くなります。これは相関係数が線形関係のみを捉える限界の例です。"
    },
    {
        id: 8,
        question: "次のうち、疑似相関（見かけ上の相関）の例として最も適切なものを選んでください。",
        options: [
            "身長と体重の正の相関",
            "気温とアイスクリームの売上の正の相関",
            "靴のサイズと語彙力の正の相関（子供のデータ）",
            "勉強時間とテストの点数の正の相関"
        ],
        correct: 3,
        explanation: "靴のサイズと語彙力の相関は、年齢という第3の変数によって生じる疑似相関です。年齢が上がると両方とも増えるため、見かけ上の相関が生じます。"
    },
    {
        id: 9,
        question: "相関係数を正しく解釈するために必要なことを選んでください。\\n\\nI. 散布図を確認する\\nII. 外れ値の有無を確認する\\nIII. 因果関係を仮定する",
        options: [
            "IとIIのみ",
            "IとIIIのみ",
            "IIとIIIのみ",
            "すべて"
        ],
        correct: 1,
        explanation: "IとIIは正しいです。散布図で分布の形状を確認し、外れ値の影響を考慮することが重要です。IIIは誤りで、相関から因果関係を仮定してはいけません。"
    },
    {
        id: 10,
        question: "次の記述のうち、正しいものを選んでください。",
        options: [
            "相関係数が大きければ回帰直線の傾きも大きい",
            "相関係数が0なら2つの変数は完全に独立",
            "相関係数の絶対値が大きいほど散布図の点は直線に近い",
            "相関係数が正なら因果関係がある"
        ],
        correct: 3,
        explanation: "相関係数の絶対値が大きいほど、点は直線に近く分布します。相関係数と回帰直線の傾きは別の概念であり、相関係数が0でも非線形関係はあり得ます。また、相関は因果を意味しません。"
    }
];

  useEffect(() => {
    const best = getBestScore('grade3-section5_anova_3');
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
      examId: 'grade3-section5_anova_3',
      examTitle: '3級 - 散布図と相関 セット3',
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
              📊 3級 - 散布図と相関 セット3
            </h1>
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">相関と因果の違いを学びましょう</p>
          <div className="flex gap-2 text-sm text-gray-500">
            <span className="bg-purple-100 px-3 py-1 rounded-full">セット3/3</span>
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
