import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Grade4Section6Set1() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const positiveCorrelationData = [
    { x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 }, { x: 5, y: 6 }
  ];

  const negativeCorrelationData = [
    { x: 1, y: 6 }, { x: 2, y: 5 }, { x: 3, y: 4 }, { x: 4, y: 3 }, { x: 5, y: 2 }
  ];

  const noCorrelationData = [
    { x: 1, y: 3 }, { x: 2, y: 5 }, { x: 3, y: 2 }, { x: 4, y: 6 }, { x: 5, y: 4 }
  ];

  const questions = [
    {
      id: 1,
      question: "次の散布図は、勉強時間とテストの点数の関係を表しています。この関係について最も適切なものはどれですか。",
      type: "scatter" as const,
      data: positiveCorrelationData,
      xLabel: "勉強時間（時間）",
      yLabel: "点数",
      options: [
        "正の相関がある",
        "負の相関がある",
        "相関がない",
        "わからない"
      ],
      correct: 1,
      explanation: "散布図を見ると、勉強時間が増えると点数も増える傾向があります。これは正の相関と呼ばれます。"
    },
    {
      id: 2,
      question: "次の散布図は、気温とコートの売上の関係を表しています。この関係について最も適切なものはどれですか。",
      type: "scatter" as const,
      data: negativeCorrelationData,
      xLabel: "気温（℃）",
      yLabel: "売上",
      options: [
        "正の相関がある",
        "負の相関がある",
        "相関がない",
        "わからない"
      ],
      correct: 2,
      explanation: "散布図を見ると、気温が高くなるとコートの売上が減る傾向があります。これは負の相関と呼ばれます。"
    },
    {
      id: 3,
      question: "次の散布図は、身長と数学の点数の関係を表しています。この関係について最も適切なものはどれですか。",
      type: "scatter" as const,
      data: noCorrelationData,
      xLabel: "身長（cm）",
      yLabel: "点数",
      options: [
        "正の相関がある",
        "負の相関がある",
        "相関がない",
        "わからない"
      ],
      correct: 3,
      explanation: "散布図を見ると、点が散らばっており明確な傾向がありません。これは相関がないと判断されます。"
    },
    {
      id: 4,
      question: "正の相関がある2つの変数の例として、最も適切なものはどれですか。",
      options: [
        "身長と体重",
        "気温とストーブの売上",
        "運動量と体重",
        "価格と売上"
      ],
      correct: 1,
      explanation: "一般的に身長が高い人ほど体重も重い傾向があります。これは正の相関の典型的な例です。"
    },
    {
      id: 5,
      question: "負の相関がある2つの変数の例として、最も適切なものはどれですか。",
      options: [
        "勉強時間とテストの点数",
        "気温とエアコンの電気代",
        "運動時間と体重",
        "読書量と国語の成績"
      ],
      correct: 3,
      explanation: "運動時間が増えると体重が減る傾向があります。これは負の相関の例です。"
    },
    {
      id: 6,
      question: "散布図とは何を表すグラフですか。",
      options: [
        "項目ごとの量の比較",
        "全体に対する各部分の割合",
        "2つの変数の関係",
        "時間の経過に伴う変化"
      ],
      correct: 3,
      explanation: "散布図は2つの変数の関係を点で表したグラフです。相関関係を視覚的に把握するのに適しています。"
    },
    {
      id: 7,
      question: "相関がないとは、どのような関係を意味しますか。",
      options: [
        "一方が増えると他方も増える",
        "一方が増えると他方は減る",
        "2つの変数に明確な関係がない",
        "2つの変数が同じ値になる"
      ],
      correct: 3,
      explanation: "相関がないとは、2つの変数の間に明確な関係性が見られないことを意味します。"
    },
    {
      id: 8,
      question: "強い正の相関がある場合、散布図上の点はどのように分布しますか。",
      options: [
        "右上がりの直線に近く分布する",
        "右下がりの直線に近く分布する",
        "バラバラに散らばる",
        "円形に分布する"
      ],
      correct: 1,
      explanation: "強い正の相関がある場合、点は右上がりの直線に近く分布します。"
    },
    {
      id: 9,
      question: "散布図で、相関関係があることは何を意味しますか。",
      options: [
        "2つの変数に因果関係がある",
        "2つの変数に関連性がある",
        "2つの変数が同じである",
        "2つの変数が無関係である"
      ],
      correct: 2,
      explanation: "相関関係は2つの変数に関連性があることを示しますが、必ずしも因果関係を意味するわけではありません。"
    },
    {
      id: 10,
      question: "次のうち、相関があっても因果関係がない例として最も適切なものはどれですか。",
      options: [
        "勉強時間と成績",
        "アイスクリームの売上と水難事故の件数（夏に両方増える）",
        "喫煙量と肺がんのリスク",
        "運動量とカロリー消費"
      ],
      correct: 2,
      explanation: "夏にアイスの売上と水難事故が共に増えますが、直接の因果関係はありません。これは相関と因果関係の違いを示す典型例です。"
    }
  ];

  useEffect(() => {
    const best = getBestScore('grade4-section6_correlation_1');
    if (best) {
      setBestScore(best.percentage);
    }
  }, []);

  const handleAnswer = (questionId: number, answer: number) => {
    setAnswers(prev => ({...prev, [questionId]: answer}));
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
      examId: 'grade4-section6_correlation_1',
      examTitle: '4級 Section6_Correlation_1',
      grade: '4級',
      score,
      totalQuestions: questions.length,
      percentage,
      passed: percentage >= 60
    });
    
    const best = getBestScore('grade4-section6_correlation_1');
    if (best) {
      setBestScore(best.percentage);
    }
    
    setShowResult(true);
    window.scrollTo(0, 0);
  };

  const resetExam = () => {
    setAnswers({});
    setShowResult(false);
    window.scrollTo(0, 0);
  };

  if (showResult) {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              📊 結果
            </h1>
            
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-br from-green-500 to-green-700 text-white rounded-lg px-12 py-8 shadow-xl">
                <p className="text-6xl font-bold mb-2">{score}/{questions.length}</p>
                <p className="text-2xl">正答率: {percentage.toFixed(0)}%</p>
              
                {bestScore !== null && (
                  <p className="text-sm mt-2">
                    あなたのベストスコア: <span className="font-bold">{bestScore.toFixed(1)}%</span>
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={resetExam}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                もう一度挑戦する
              </button>
              <Link
                to="/"
                className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors text-center"
              >
                トップページに戻る
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📝 解答と解説</h2>
            
            {questions.map((q, index) => {
              const isCorrect = answers[q.id] === q.correct;
              
              return (
                <div key={q.id} className={`bg-white rounded-lg shadow-lg p-6 border-l-4 ${
                  isCorrect ? 'border-green-500' : 'border-red-500'
                }`}>
                  <div className="flex items-start gap-3 mb-4">
                    <span className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                      isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {isCorrect ? '○' : '×'}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800 mb-2">
                        問題{index + 1}
                      </h3>
                      <p className="text-gray-700 whitespace-pre-line mb-3">{q.question}</p>

                      {q.type === 'scatter' && q.data && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-3">
                          <ResponsiveContainer width="100%" height={250}>
                            <ScatterChart>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis type="number" dataKey="x" name={q.xLabel} />
                              <YAxis type="number" dataKey="y" name={q.yLabel} />
                              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                              <Scatter data={q.data} fill="#10b981" />
                            </ScatterChart>
                          </ResponsiveContainer>
                          <div className="text-center text-sm text-gray-600 mt-2">
                            <p>横軸: {q.xLabel} / 縦軸: {q.yLabel}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="ml-13 space-y-3">
                    <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">あなたの回答</p>
                      <p className="font-semibold text-gray-800">
                        {answers[q.id] ? `${answers[q.id]}. ${q.options[answers[q.id] - 1]}` : '未回答'}
                      </p>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">正解</p>
                      <p className="font-semibold text-gray-800">
                        {q.correct}. {q.options[q.correct - 1]}
                      </p>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1 font-semibold">📖 解説</p>
                      <p className="text-gray-700 text-sm leading-relaxed">{q.explanation}</p>
                    </div>
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              📈 4級 - 相関と散布図 セット1
            </h1>
            <Link
              to="/"
              className="text-green-600 hover:text-green-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">2つの変数の関係と散布図の読み方を学びましょう</p>
          <div className="flex gap-2 text-sm text-gray-500">
            <span className="bg-green-100 px-3 py-1 rounded-full">セット1/3</span>
            <span>全10問</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="text-lg font-bold text-gray-700">
              問題 {currentQuestionIndex + 1} / {questions.length}
            </div>
            <div className="text-sm text-gray-500">
              回答済み: {Object.keys(answers).length} / {questions.length}
            </div>
          </div>

          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {(() => {
            const q = questions[currentQuestionIndex];
            return (
              <div>
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-base font-bold">
                      問題 {currentQuestionIndex + 1}
                    </span>
                    {answers[q.id] && (
                      <span className="text-green-600 font-semibold">✓ 回答済み</span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 whitespace-pre-line leading-relaxed mb-6">
                    {q.question}
                  </h2>
                </div>

                <div className="space-y-3 mb-8">
                  {q.options.map((option, optIndex) => {
                    const optionNum = optIndex + 1;
                    const isSelected = answers[q.id] === optionNum;
                    
                    return (
                      <button
                        key={optIndex}
                        onClick={() => handleAnswer(q.id, optionNum)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all font-medium ${
                          isSelected
                            ? 'border-green-600 bg-green-50 shadow-md'
                            : 'border-gray-300 bg-white hover:border-green-400 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${
                            isSelected
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-200 text-gray-700'
                          }`}>
                            {optionNum}
                          </span>
                          <span className="text-gray-800 leading-relaxed pt-1 whitespace-pre-line">{option}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
            disabled={currentQuestionIndex === 0}
            className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← 前の問題
          </button>
          {currentQuestionIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              次の問題 →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              ✓ 採点する
            </button>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-sm font-bold text-gray-700 mb-3">問題ナビゲーション</h3>
          <div className="grid grid-cols-10 gap-2">
            {questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`aspect-square rounded-lg font-bold text-sm transition-all ${
                  currentQuestionIndex === index
                    ? 'bg-green-600 text-white ring-2 ring-green-400'
                    : answers[q.id]
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}