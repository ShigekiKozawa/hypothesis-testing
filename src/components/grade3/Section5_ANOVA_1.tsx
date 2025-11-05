import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Grade3Section5Set1() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const questions = [
    {
        id: 1,
        question: "次の散布図から、2つの変数の関係を判断してください。",
        chartData: [
          { x: 1, y: 45 }, { x: 2, y: 52 }, { x: 3, y: 58 }, { x: 4, y: 65 }, { x: 5, y: 70 },
          { x: 1.5, y: 48 }, { x: 2.5, y: 55 }, { x: 3.5, y: 62 }, { x: 4.5, y: 68 }, { x: 5.5, y: 75 }
        ],
        chartType: 'scatter',
        chartLabels: { x: '勉強時間（時間）', y: 'テストの点数（点）' },
        options: [
            "正の相関がある",
            "負の相関がある",
            "相関がない",
            "判断できない"
        ],
        correct: 1,
        explanation: "点が右上がりに分布している場合、一方が増えるともう一方も増える傾向があるため、正の相関があります。"
    },
    {
        id: 2,
        question: "相関係数が0.8のとき、2つの変数の関係について正しい記述を選んでください。",
        options: [
            "強い正の相関がある",
            "弱い正の相関がある",
            "負の相関がある",
            "相関がない"
        ],
        correct: 1,
        explanation: "相関係数が0.8は1に近いため、強い正の相関があります。一般に|r|>0.7で強い相関とされます。"
    },
    {
        id: 3,
        question: "相関係数rの取りうる値の範囲はどれですか。",
        options: [
            "0≦r≦1",
            "-1≦r≦0",
            "-1≦r≦1",
            "0≦r≦∞"
        ],
        correct: 3,
        explanation: "相関係数rは-1から1の間の値を取ります。r=1で完全な正の相関、r=-1で完全な負の相関、r=0で無相関です。"
    },
    {
        id: 4,
        question: "次の散布図で、相関係数が最も小さい（負の値）ものはどれですか。",
        options: [
            "右上がりの直線状",
            "右下がりの直線状",
            "ランダムに散らばっている",
            "横一直線"
        ],
        correct: 2,
        explanation: "相関係数が最も小さい（負）のは、右下がりの直線状の散布図です。これは強い負の相関を示します。"
    },
    {
        id: 5,
        question: "2つの変数の散布図を描いたところ、点がほぼ横一直線に並びました。この場合の相関係数はおよそいくらですか。",
        options: [
            "1に近い",
            "-1に近い",
            "0に近い",
            "判断できない"
        ],
        correct: 3,
        explanation: "横一直線（y軸方向の変動がない）の場合、xが変化してもyは変化しないため、相関係数は0に近くなります。"
    },
    {
        id: 6,
        question: "散布図で外れ値が1つあります。この外れ値を除くと、相関係数はどう変化する可能性が高いですか。",
        options: [
            "必ず大きくなる",
            "必ず小さくなる",
            "変化する可能性がある",
            "変化しない"
        ],
        correct: 3,
        explanation: "外れ値は相関係数に大きな影響を与えるため、除去すると相関係数が変化する可能性があります（大きくも小さくもなり得ます）。"
    },
    {
        id: 7,
        question: "次のうち、散布図から読み取れない情報はどれですか。",
        options: [
            "2つの変数の相関関係",
            "データの外れ値",
            "それぞれの変数の分布",
            "因果関係の向き"
        ],
        correct: 4,
        explanation: "散布図からは相関関係は読み取れますが、因果関係の向き（どちらが原因でどちらが結果か）は判断できません。相関≠因果です。"
    },
    {
        id: 8,
        question: "相関係数が-0.6のとき、正しい記述を選んでください。",
        options: [
            "強い正の相関",
            "弱い負の相関",
            "やや強い負の相関",
            "相関なし"
        ],
        correct: 3,
        explanation: "相関係数が-0.6は、|r|=0.6なので中程度からやや強い負の相関があります。"
    },
    {
        id: 9,
        question: "身長と体重の散布図を描いたところ、正の相関が見られました。これについて正しい記述を選んでください。",
        options: [
            "身長が高いと体重も重い傾向がある",
            "身長が原因で体重が増える",
            "完全に比例する",
            "因果関係が証明された"
        ],
        correct: 1,
        explanation: "正の相関があることは「身長が高いと体重も重い傾向がある」という関連性を示しますが、因果関係や完全な比例を意味するものではありません。"
    },
    {
        id: 10,
        question: "2つの変数のデータを標準化してから相関係数を計算すると、元のデータから計算した相関係数とどうなりますか。",
        options: [
            "大きくなる",
            "小さくなる",
            "変わらない",
            "必ず0になる"
        ],
        correct: 3,
        explanation: "相関係数は標準化（単位の変換）に対して不変です。元のデータでも標準化後でも、相関係数の値は変わりません。"
    }
];

  useEffect(() => {
    const best = getBestScore('grade3-section5_anova_1');
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
      examId: 'grade3-section5_anova_1',
      examTitle: '3級 - 散布図と相関 セット1',
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
              📊 3級 - 散布図と相関 セット1
            </h1>
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">散布図の読み取りと相関の基礎を学びましょう</p>
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

            {currentQuestion.chartData && currentQuestion.chartType === 'scatter' && (
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200 mb-4">
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" dataKey="x" name={currentQuestion.chartLabels?.x || 'X'} label={{ value: currentQuestion.chartLabels?.x || 'X', position: 'insideBottom', offset: -10 }} />
                    <YAxis type="number" dataKey="y" name={currentQuestion.chartLabels?.y || 'Y'} label={{ value: currentQuestion.chartLabels?.y || 'Y', angle: -90, position: 'insideLeft' }} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter data={currentQuestion.chartData} fill="#8884d8" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            )}

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
