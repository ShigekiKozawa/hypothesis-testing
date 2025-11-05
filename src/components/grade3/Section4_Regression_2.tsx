import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade3Section4Set2() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const questions = [
    {
      id: 1,
      question: "次の2つのクラスの箱ひげ図を比較してください。\n\nクラスA: 最小値=40、Q1=55、Q2=65、Q3=75、最大値=90\nクラスB: 最小値=50、Q1=60、Q2=65、Q3=70、最大値=80\n\n正しい記述を選んでください。",
      options: [
        "クラスAの方が点数のばらつきが大きい",
        "クラスBの方が点数のばらつきが大きい",
        "両クラスのばらつきは同じ",
        "中央値が同じなので比較できない"
      ],
      correct: 1,
      explanation: "四分位範囲で比較します。A: IQR=75-55=20、B: IQR=70-60=10。クラスAの方がばらつきが大きいです。"
    },
    {
      id: 2,
      question: "次のヒストグラムで、相対度数が最も大きい階級を選んでください。\n\n【ヒストグラム: 全50人】\n0〜10点: 5人\n10〜20点: 10人\n20〜30点: 20人\n30〜40点: 10人\n40〜50点: 5人",
      options: [
        "0〜10点",
        "10〜20点",
        "20〜30点",
        "30〜40点"
      ],
      correct: 3,
      explanation: "相対度数は度数÷全体です。20〜30点の相対度数は 20÷50=0.4 で最も大きいです。"
    },
    {
      id: 3,
      question: "次の箱ひげ図について、箱の長さ（IQR）を求めてください。\n\nQ1=30、Q2=45、Q3=60",
      options: ["15", "30", "45", "60"],
      correct: 2,
      explanation: "箱の長さ = 四分位範囲（IQR）= Q3 - Q1 = 60 - 30 = 30 です。"
    },
    {
      id: 4,
      question: "次のヒストグラムの分布の形状について、正しい記述を選んでください。\n\n【ヒストグラム】\n0〜10: 1人\n10〜20: 2人\n20〜30: 5人\n30〜40: 10人\n40〜50: 8人\n50〜60: 3人\n60〜70: 1人",
      options: [
        "左に偏っている（平均値 < 中央値）",
        "右に偏っている（平均値 > 中央値）",
        "ほぼ対称である",
        "判断できない"
      ],
      correct: 3,
      explanation: "このヒストグラムはほぼ左右対称の釣鐘型（正規分布に近い形）をしています。平均値と中央値はほぼ等しくなります。"
    },
    {
      id: 5,
      question: "箱ひげ図で、外れ値として表示される点がある場合、その点は何を意味しますか。",
      options: [
        "平均値",
        "中央値",
        "他のデータから大きく離れた値",
        "最頻値"
      ],
      correct: 3,
      explanation: "箱ひげ図で点として表示される外れ値は、Q1 - 1.5×IQR より小さい、またはQ3 + 1.5×IQR より大きい値で、他のデータから大きく外れた値を示します。"
    },
    {
      id: 6,
      question: "次のヒストグラムから、平均値が含まれる階級を推定してください。\n\n【ヒストグラム: 全20人】\n10〜20点: 2人（階級値15）\n20〜30点: 5人（階級値25）\n30〜40点: 8人（階級値35）\n40〜50点: 4人（階級値45）\n50〜60点: 1人（階級値55）",
      options: [
        "20〜30点",
        "30〜40点",
        "40〜50点",
        "50〜60点"
      ],
      correct: 2,
      explanation: "階級値を使って平均値を計算すると、(15×2 + 25×5 + 35×8 + 45×4 + 55×1) ÷ 20 = (30+125+280+180+55) ÷ 20 = 670 ÷ 20 = 33.5点 となり、30〜40点の階級に含まれます。"
    },
    {
      id: 7,
      question: "2つのヒストグラムを見比べたとき、分布の形状が異なることがわかりました。\n\nヒストグラムA: 左側に裾が長い\nヒストグラムB: 右側に裾が長い\n\n正しい記述を選んでください。",
      options: [
        "Aは平均値 > 中央値、Bは平均値 < 中央値",
        "Aは平均値 < 中央値、Bは平均値 > 中央値",
        "両方とも平均値 = 中央値",
        "判断できない"
      ],
      correct: 2,
      explanation: "左側に裾が長い（左に偏っている）場合は平均値 < 中央値、右側に裾が長い（右に偏っている）場合は平均値 > 中央値となります。"
    },
    {
      id: 8,
      question: "次の箱ひげ図から、データの範囲（レンジ）を求めてください。\n\n最小値=10、Q1=25、Q2=40、Q3=55、最大値=70",
      options: ["30", "40", "60", "70"],
      correct: 3,
      explanation: "範囲（レンジ）= 最大値 - 最小値 = 70 - 10 = 60 です。"
    },
    {
      id: 9,
      question: "次のヒストグラムについて、第3四分位数（Q3）が含まれる階級を推定してください。\n\n【データ: 全40人】\n0〜10点: 5人（累積5人）\n10〜20点: 8人（累積13人）\n20〜30点: 12人（累積25人）\n30〜40点: 10人（累積35人）\n40〜50点: 5人（累積40人）",
      options: [
        "20〜30点",
        "30〜40点",
        "40〜50点",
        "判断できない"
      ],
      correct: 2,
      explanation: "Q3は上位25%の境界、つまり全体の75%の位置です。40人の75%は30番目。累積度数を見ると、30番目は30〜40点の階級に含まれます（25人までで終わり、35人までで次の階級）。"
    },
    {
      id: 10,
      question: "箱ひげ図とヒストグラムを組み合わせて使う利点は何ですか。",
      options: [
        "箱ひげ図で5数要約を把握し、ヒストグラムで詳細な分布の形状を把握できる",
        "両方とも平均値を表示できる",
        "箱ひげ図だけで十分なので利点はない",
        "ヒストグラムだけで十分なので利点はない"
      ],
      correct: 1,
      explanation: "箱ひげ図は5数要約と外れ値を簡潔に示し、ヒストグラムは度数分布の詳細な形状を示すため、組み合わせることでデータの特徴を多角的に把握できます。"
    }
  ];

  useEffect(() => {
    const best = getBestScore('grade3-section4_regression_2');
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
      examId: 'grade3-section4_regression_2',
      examTitle: '3級 - 箱ひげ図とヒストグラム セット2',
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
              📊 3級 - 箱ひげ図とヒストグラム セット2
            </h1>
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">箱ひげ図とヒストグラムの応用的な読み取りを学びましょう</p>
          <div className="flex gap-2 text-sm text-gray-500">
            <span className="bg-purple-100 px-3 py-1 rounded-full">セット2/3</span>
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
