import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Grade4Exam1() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const pieData = [
    { name: 'サッカー', value: 12, percent: 40 },
    { name: '野球', value: 9, percent: 30 },
    { name: 'バスケ', value: 6, percent: 20 },
    { name: 'テニス', value: 3, percent: 10 }
  ];
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const barData = [
    { month: '1月', sales: 150 },
    { month: '2月', sales: 180 },
    { month: '3月', sales: 220 },
    { month: '4月', sales: 200 },
    { month: '5月', sales: 250 }
  ];

  const lineData = [
    { year: '2019年', temp: 15.2 },
    { year: '2020年', temp: 15.8 },
    { year: '2021年', temp: 16.1 },
    { year: '2022年', temp: 16.5 },
    { year: '2023年', temp: 16.9 }
  ];

  const questions = [
    {
      id: 1,
      question: "あるクラス30人の好きなスポーツを調査し、円グラフに表しました。サッカーを選んだ人は何人ですか。",
      type: "pie" as const,
      data: pieData,
      options: ["9人", "10人", "12人", "15人"],
      correct: 3,
      explanation: "円グラフからサッカーは全体の40%を占めています。30人 × 40% = 30 × 0.4 = 12人です。"
    },
    {
      id: 2,
      question: "次のデータの平均値を求めなさい。\nデータ: 5, 8, 6, 9, 7",
      options: ["6", "7", "8", "9"],
      correct: 2,
      explanation: "平均値 = (5 + 8 + 6 + 9 + 7) ÷ 5 = 35 ÷ 5 = 7です。"
    },
    {
      id: 3,
      question: "あるお店の月別売上を棒グラフに表しました。売上が最も多かった月はいつですか。",
      type: "bar" as const,
      data: barData,
      options: ["2月", "3月", "4月", "5月"],
      correct: 4,
      explanation: "棒グラフを見ると、5月の棒が最も高く、売上は250万円で最も多いことがわかります。"
    },
    {
      id: 4,
      question: "次のデータを小さい順に並べたとき、中央値はいくつですか。\nデータ: 12, 8, 15, 10, 13",
      options: ["10", "12", "13", "15"],
      correct: 2,
      explanation: "データを小さい順に並べると: 8, 10, 12, 13, 15。5個のデータなので、中央値は真ん中の3番目の値である12です。"
    },
    {
      id: 5,
      question: "あるクラスのテストの点数の最高点は92点、最低点は58点でした。このデータの範囲（レンジ）はいくつですか。",
      options: ["30点", "32点", "34点", "36点"],
      correct: 3,
      explanation: "範囲（レンジ）= 最高点 - 最低点 = 92 - 58 = 34点です。"
    },
    {
      id: 6,
      question: "サイコロを1回投げたとき、偶数の目が出る確率はいくつですか。",
      options: ["1/6", "1/3", "1/2", "2/3"],
      correct: 3,
      explanation: "サイコロの目は1, 2, 3, 4, 5, 6の6通り。偶数は2, 4, 6の3通り。確率 = 3/6 = 1/2です。"
    },
    {
      id: 7,
      question: "ある都市の5年間の平均気温の変化を折れ線グラフに表しました。2019年から2023年にかけて、気温はどのように変化していますか。",
      type: "line" as const,
      data: lineData,
      options: [
        "上昇している",
        "下降している",
        "変化していない",
        "上昇と下降を繰り返している"
      ],
      correct: 1,
      explanation: "折れ線グラフを見ると、2019年の15.2℃から2023年の16.9℃まで、一貫して右上がりになっているため、気温は上昇しています。"
    },
    {
      id: 8,
      question: "次のデータで最も多く出現する値（最頻値）はいくつですか。\nデータ: 3, 5, 7, 5, 8, 5, 9, 6",
      options: ["3", "5", "7", "8"],
      correct: 2,
      explanation: "5が3回出現し、最も多く現れています。したがって、最頻値は5です。"
    },
    {
      id: 9,
      question: "母集団からデータを集める方法のうち、一部だけを選んで調査する方法を何といいますか。",
      options: [
        "全数調査",
        "標本調査",
        "国勢調査",
        "実験調査"
      ],
      correct: 2,
      explanation: "母集団の一部を選んで調査する方法を標本調査といいます。全数調査は母集団全体を調査する方法です。"
    },
    {
      id: 10,
      question: "次のクロス集計表について、男子で犬を飼っている人の割合は何%ですか。\n\n　　　　犬　猫\n男子　12　　8\n女子　　8　12",
      options: ["40%", "50%", "60%", "80%"],
      correct: 3,
      explanation: "男子の合計は12 + 8 = 20人。男子で犬を飼っている人は12人。割合 = 12 ÷ 20 × 100 = 60%です。"
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
    if (Object.keys(answers).length < 10) {
      alert('すべての問題に回答してください。');
      return;
    }
    setShowResult(true);
    window.scrollTo(0, 0);
  };

  const resetExam = () => {
    setAnswers({});
    setShowResult(false);
    setCurrentQuestion(1);
    window.scrollTo(0, 0);
  };

  if (showResult) {
    const score = calculateScore();
    const percentage = (score / 10) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              📊 試験結果
            </h1>
            
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-br from-green-500 to-green-700 text-white rounded-lg px-12 py-8 shadow-xl">
                <p className="text-6xl font-bold mb-2">{score}/10</p>
                <p className="text-2xl">正答率: {percentage}%</p>
              </div>
              
              <div className="mt-6">
                {percentage >= 60 ? (
                  <p className="text-2xl text-green-600 font-bold">🎉 合格ライン達成！（60点以上）</p>
                ) : percentage >= 50 ? (
                  <p className="text-2xl text-yellow-600 font-bold">💪 もう少しです！</p>
                ) : (
                  <p className="text-2xl text-red-600 font-bold">📚 復習が必要です</p>
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
                                {q.data.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                      
                      {q.type === 'bar' && q.data && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-3">
                          <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={q.data}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis label={{ value: '売上（万円）', angle: -90, position: 'insideLeft' }} />
                              <Tooltip />
                              <Bar dataKey="sales" fill="#10b981" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                      
                      {q.type === 'line' && q.data && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-3">
                          <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={q.data}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="year" />
                              <YAxis domain={[14, 18]} label={{ value: '平均気温（℃）', angle: -90, position: 'insideLeft' }} />
                              <Tooltip />
                              <Line type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={2} />
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

  const currentQ = questions[currentQuestion - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">
              📊 統計検定4級 模擬試験1
            </h1>
            <Link
              to="/"
              className="text-green-600 hover:text-green-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
            <span>⏱️ 目安時間: 20分（本試験は60分・30問）</span>
            <span>全10問・選択式</span>
          </div>
          <p className="text-center text-sm text-gray-500">中学卒業レベルの統計知識を確認します</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-gray-700">
              進捗: {Object.keys(answers).length}/10問回答済み
            </span>
            <span className="text-sm text-gray-600">
              {Math.round((Object.keys(answers).length / 10) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(Object.keys(answers).length / 10) * 100}%` }}
            ></div>
          </div>
          
          <div className="grid grid-cols-10 gap-2 mt-4">
            {questions.map((q) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestion(q.id)}
                className={`aspect-square rounded-lg font-bold text-base transition-all ${
                  currentQuestion === q.id
                    ? 'bg-green-600 text-white shadow-lg scale-110'
                    : answers[q.id]
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {q.id}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-6">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-base font-bold">
                問題 {currentQuestion}
              </span>
              <span className="text-gray-500 text-sm">/ 10</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 whitespace-pre-line leading-relaxed">
              {currentQ.question}
            </h2>
          </div>

          {currentQ.type === 'pie' && currentQ.data && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={currentQ.data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${percent}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {currentQ.data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {currentQ.type === 'bar' && currentQ.data && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={currentQ.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: '売上（万円）', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {currentQ.type === 'line' && currentQ.data && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={currentQ.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis domain={[14, 18]} label={{ value: '平均気温（℃）', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="space-y-3">
            {currentQ.options.map((option, index) => {
              const optionNum = index + 1;
              const isSelected = answers[currentQ.id] === optionNum;
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(currentQ.id, optionNum)}
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

        <div className="flex gap-4">
          <button
            onClick={() => setCurrentQuestion(Math.max(1, currentQuestion - 1))}
            disabled={currentQuestion === 1}
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
              currentQuestion === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            ← 前の問題
          </button>
          
          {currentQuestion < 10 ? (
            <button
              onClick={() => setCurrentQuestion(Math.min(10, currentQuestion + 1))}
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
      </div>
    </div>
  );
}

