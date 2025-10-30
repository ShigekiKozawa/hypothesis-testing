import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Grade4Section8Set1() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const histogramData = [
    { range: '0-10', frequency: 3 },
    { range: '10-20', frequency: 7 },
    { range: '20-30', frequency: 12 },
    { range: '30-40', frequency: 8 },
    { range: '40-50', frequency: 5 }
  ];

  const questions = [
    {
      id: 1,
      question: "ヒストグラムとは何を表すグラフですか。",
      options: [
        "2つの変数の関係",
        "データの度数分布",
        "時間の変化",
        "全体に対する割合"
      ],
      correct: 2,
      explanation: "ヒストグラムは、データを区間（階級）に分けて、各区間の度数を棒グラフで表したものです。"
    },
    {
      id: 2,
      question: "次のヒストグラムで、最も度数が高い階級はどれですか。",
      type: "histogram" as const,
      data: histogramData,
      options: ["0-10", "10-20", "20-30", "30-40"],
      correct: 3,
      explanation: "ヒストグラムを見ると、20-30の階級が最も高く、度数は12です。"
    },
    {
      id: 3,
      question: "ヒストグラムで、横軸は何を表しますか。",
      options: ["度数", "階級（区間）", "累積度数", "相対度数"],
      correct: 2,
      explanation: "ヒストグラムの横軸は階級（区間）を表し、縦軸は度数を表します。"
    },
    {
      id: 4,
      question: "ヒストグラムと棒グラフの主な違いは何ですか。",
      options: [
        "色が違う",
        "ヒストグラムは棒が連続していて、棒グラフは棒が離れている",
        "大きさが違う",
        "違いはない"
      ],
      correct: 2,
      explanation: "ヒストグラムは連続データの分布を表すため棒が連続しており、棒グラフは離散データを表すため棒が離れています。"
    },
    {
      id: 5,
      question: "上記のヒストグラムで、データの総数はいくつですか。",
      type: "histogram" as const,
      data: histogramData,
      options: ["25", "30", "35", "40"],
      correct: 3,
      explanation: "すべての階級の度数を合計します。3 + 7 + 12 + 8 + 5 = 35 です。"
    },
    {
      id: 6,
      question: "ヒストグラムで、階級の幅を変えるとどうなりますか。",
      options: [
        "グラフの形が変わる",
        "データの値が変わる",
        "何も変わらない",
        "度数が変わる"
      ],
      correct: 1,
      explanation: "階級の幅を変えると、各階級に含まれるデータの数が変わり、グラフの形が変わります。"
    },
    {
      id: 7,
      question: "ヒストグラムが右に裾を引く形（右に長い）の場合、データの分布について何が言えますか。",
      options: [
        "左側に偏っている",
        "右側に偏っている",
        "対称的である",
        "二峰性である"
      ],
      correct: 1,
      explanation: "右に裾を引く場合、大部分のデータは左側（小さい値）にあり、一部の大きい値が右側にあることを示します。"
    },
    {
      id: 8,
      question: "ヒストグラムの面積が表すものは何ですか。",
      options: [
        "平均値",
        "中央値",
        "データの総数",
        "範囲"
      ],
      correct: 3,
      explanation: "ヒストグラムでは、各棒の面積がその階級の度数を表し、全体の面積がデータの総数を表します（階級幅が一定の場合、棒の高さ×階級幅=度数）。"
    },
    {
      id: 9,
      question: "ヒストグラムを使う利点として、最も適切なものはどれですか。",
      options: [
        "正確なデータ値がすべてわかる",
        "データの分布の形が視覚的にわかる",
        "平均値を正確に計算できる",
        "外れ値を必ず検出できる"
      ],
      correct: 2,
      explanation: "ヒストグラムの利点は、データの分布の形（偏り、中心、広がり）を視覚的に把握できることです。"
    },
    {
      id: 10,
      question: "次のうち、ヒストグラムの作成に必要な情報はどれですか。",
      options: [
        "データの平均値と標準偏差",
        "データの値と階級の設定",
        "データの中央値と四分位数",
        "データの相関係数"
      ],
      correct: 2,
      explanation: "ヒストグラムを作成するには、データの値と、それを分ける階級（区間）の設定が必要です。"
    }
  ];

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

                      {q.type === 'histogram' && q.data && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-3">
                          <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={q.data}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="range" />
                              <YAxis />
                              <Tooltip />
                              <Bar dataKey="frequency" fill="#3b82f6" />
                            </BarChart>
                          </ResponsiveContainer>
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
              📊 4級 - ヒストグラム セット1
            </h1>
            <Link
              to="/"
              className="text-green-600 hover:text-green-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">ヒストグラムの読み方とデータ分布の理解を深めましょう</p>
          <div className="flex gap-2 text-sm text-gray-500">
            <span className="bg-green-100 px-3 py-1 rounded-full">セット1/3</span>
            <span>全10問</span>
          </div>
        </div>

        <div className="space-y-6">
          {questions.map((q, index) => (
            <div key={q.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-base font-bold">
                    問題 {index + 1}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 whitespace-pre-line leading-relaxed mb-4">
                  {q.question}
                </h2>

                {q.type === 'histogram' && q.data && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={q.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="range" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="frequency" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              <div className="space-y-3">
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
                        <span className="text-gray-800 leading-relaxed pt-1">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            ✓ 採点する
          </button>
        </div>
      </div>
    </div>
  );
}

