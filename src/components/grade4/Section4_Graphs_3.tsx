import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Grade4Section4Set3() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const barData1 = [
    { city: '東京', population: 1400 },
    { city: '大阪', population: 880 },
    { city: '名古屋', population: 230 },
    { city: '札幌', population: 195 }
  ];

  const barData2 = [
    { sport: 'サッカー', count: 250 },
    { sport: '野球', count: 180 },
    { sport: 'テニス', count: 120 },
    { sport: '水泳', count: 150 }
  ];

  const pieData1 = [
    { name: '犬', value: 40, percent: 40 },
    { name: '猫', value: 35, percent: 35 },
    { name: 'うさぎ', value: 15, percent: 15 },
    { name: 'その他', value: 10, percent: 10 }
  ];

  const pieData2 = [
    { name: 'リンゴ', value: 28, percent: 35 },
    { name: 'ミカン', value: 24, percent: 30 },
    { name: 'バナナ', value: 20, percent: 25 },
    { name: 'ブドウ', value: 8, percent: 10 }
  ];

  const lineData1 = [
    { week: '第1週', score: 65 },
    { week: '第2週', score: 72 },
    { week: '第3週', score: 68 },
    { week: '第4週', score: 78 },
    { week: '第5週', score: 85 }
  ];

  const lineData2 = [
    { year: '2018', members: 120 },
    { year: '2019', members: 135 },
    { year: '2020', members: 125 },
    { year: '2021', members: 145 },
    { year: '2022', members: 160 }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const questions = [
    {
      id: 1,
      question: "次の棒グラフは、主要都市の人口（万人）を表しています。人口が2番目に多い都市はどこですか。",
      type: "bar" as const,
      data: barData1,
      dataKey: "population",
      xKey: "city",
      options: ["東京", "大阪", "名古屋", "札幌"],
      correct: 2,
      explanation: "棒グラフを見ると、東京が最も高く、次に大阪が880万人で2番目に多いことがわかります。"
    },
    {
      id: 2,
      question: "上記の棒グラフで、東京と大阪の人口の差は何万人ですか。",
      type: "bar" as const,
      data: barData1,
      dataKey: "population",
      xKey: "city",
      options: ["420万人", "480万人", "520万人", "560万人"],
      correct: 3,
      explanation: "東京は1400万人、大阪は880万人なので、差は1400 - 880 = 520万人です。"
    },
    {
      id: 3,
      question: "次の円グラフは、100人が飼っているペットの種類を調査した結果です。犬を飼っている人は何人ですか。",
      type: "pie" as const,
      data: pieData1,
      options: ["30人", "35人", "40人", "45人"],
      correct: 3,
      explanation: "円グラフから犬は全体の40%を占めています。100人 × 40% = 100 × 0.4 = 40人です。"
    },
    {
      id: 4,
      question: "次の折れ線グラフは、毎週のテストの点数を表しています。点数が最も高かった週はいつですか。",
      type: "line" as const,
      data: lineData1,
      dataKey: "score",
      xKey: "week",
      options: ["第2週", "第3週", "第4週", "第5週"],
      correct: 4,
      explanation: "折れ線グラフを見ると、第5週が85点で最も高くなっています。"
    },
    {
      id: 5,
      question: "次の棒グラフは、スポーツクラブの会員数を表しています。サッカーとテニスの会員数の合計は何人ですか。",
      type: "bar" as const,
      data: barData2,
      dataKey: "count",
      xKey: "sport",
      options: ["320人", "350人", "370人", "400人"],
      correct: 3,
      explanation: "サッカーは250人、テニスは120人なので、合計は250 + 120 = 370人です。"
    },
    {
      id: 6,
      question: "次の円グラフは、80個の果物の種類を表しています。リンゴは何個ですか。",
      type: "pie" as const,
      data: pieData2,
      options: ["24個", "26個", "28個", "30個"],
      correct: 3,
      explanation: "円グラフからリンゴは全体の35%を占めています。80個 × 35% = 80 × 0.35 = 28個です。"
    },
    {
      id: 7,
      question: "次の折れ線グラフは、クラブの会員数の推移を表しています。2018年から2022年にかけて、会員数はどのように変化していますか。",
      type: "line" as const,
      data: lineData2,
      dataKey: "members",
      xKey: "year",
      options: ["増加している", "減少している", "変化していない", "増減を繰り返している"],
      correct: 4,
      explanation: "折れ線グラフを見ると、2018年から2019年は増加、2019年から2020年は減少、その後は増加しており、増減を繰り返しています。"
    },
    {
      id: 8,
      question: "グラフを作成する際の注意点として、最も適切なものはどれですか。",
      options: [
        "縦軸の目盛りは必ず0から始める必要がある",
        "軸のラベルや単位を明記する",
        "色は必ず赤と青の2色だけを使う",
        "グラフのタイトルは不要である"
      ],
      correct: 2,
      explanation: "グラフを作成する際は、軸のラベルや単位を明記することが重要です。これにより、グラフが何を表しているかが明確になります。"
    },
    {
      id: 9,
      question: "次のうち、棒グラフで表すのに最も適さないデータはどれですか。",
      options: [
        "科目別の平均点",
        "月別の売上",
        "時間の経過に伴う気温の変化",
        "地域別の人口"
      ],
      correct: 3,
      explanation: "時間の経過に伴う気温の変化は、連続的な変化を示すため折れ線グラフが適しています。棒グラフは離散的な項目の比較に向いています。"
    },
    {
      id: 10,
      question: "円グラフで全体が360度のとき、25%を表す中心角は何度ですか。",
      options: ["45度", "60度", "90度", "120度"],
      correct: 3,
      explanation: "円の中心角は360度です。25%を表す中心角は、360° × 0.25 = 90度です。"
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

                      {q.type === 'bar' && q.data && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-3">
                          <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={q.data}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey={q.xKey} />
                              <YAxis />
                              <Tooltip />
                              <Bar dataKey={q.dataKey} fill="#10b981" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      )}

                      {q.type === 'pie' && q.data && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-3">
                          <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                              <Pie
                                data={q.data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${percent}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {q.data.map((_, idx) => (
                                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      )}

                      {q.type === 'line' && q.data && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-3">
                          <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={q.data}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey={q.xKey} />
                              <YAxis />
                              <Tooltip />
                              <Line type="monotone" dataKey={q.dataKey} stroke="#3b82f6" strokeWidth={2} />
                            </LineChart>
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
              📊 4級 - グラフの読み取り セット3
            </h1>
            <Link
              to="/"
              className="text-green-600 hover:text-green-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">棒グラフ、円グラフ、折れ線グラフの読み取り方を学びましょう</p>
          <div className="flex gap-2 text-sm text-gray-500">
            <span className="bg-green-100 px-3 py-1 rounded-full">セット3/3</span>
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