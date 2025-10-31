import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Grade4Section4Set1() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const barData1 = [
    { subject: '国語', score: 75 },
    { subject: '数学', score: 82 },
    { subject: '英語', score: 68 },
    { subject: '理科', score: 90 }
  ];

  const barData2 = [
    { month: '4月', sales: 120 },
    { month: '5月', sales: 150 },
    { month: '6月', sales: 180 },
    { month: '7月', sales: 165 }
  ];

  const pieData1 = [
    { name: 'サッカー', value: 12, percent: 40 },
    { name: '野球', value: 9, percent: 30 },
    { name: 'バスケ', value: 6, percent: 20 },
    { name: 'その他', value: 3, percent: 10 }
  ];

  const pieData2 = [
    { name: 'A型', value: 35, percent: 35 },
    { name: 'B型', value: 25, percent: 25 },
    { name: 'O型', value: 30, percent: 30 },
    { name: 'AB型', value: 10, percent: 10 }
  ];

  const lineData1 = [
    { year: '2019', temp: 15.2 },
    { year: '2020', temp: 15.8 },
    { year: '2021', temp: 16.1 },
    { year: '2022', temp: 16.5 },
    { year: '2023', temp: 16.9 }
  ];

  const lineData2 = [
    { day: '月', visitors: 450 },
    { day: '火', visitors: 380 },
    { day: '水', visitors: 420 },
    { day: '木', visitors: 480 },
    { day: '金', visitors: 550 }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const questions = [
    {
      id: 1,
      question: "次の棒グラフは、ある生徒のテストの点数を表しています。最も点数が高い教科はどれですか。",
      type: "bar" as const,
      data: barData1,
      dataKey: "score",
      xKey: "subject",
      options: ["国語", "数学", "英語", "理科"],
      correct: 4,
      explanation: "棒グラフを見ると、理科の棒が最も高く90点で、最も点数が高いことがわかります。"
    },
    {
      id: 2,
      question: "上記の棒グラフで、数学と英語の点数の差は何点ですか。",
      type: "bar" as const,
      data: barData1,
      dataKey: "score",
      xKey: "subject",
      options: ["10点", "12点", "14点", "16点"],
      correct: 3,
      explanation: "数学は82点、英語は68点なので、差は82 - 68 = 14点です。"
    },
    {
      id: 3,
      question: "次の円グラフは、クラス30人の好きなスポーツを調査した結果です。サッカーを選んだ人は何人ですか。",
      type: "pie" as const,
      data: pieData1,
      options: ["9人", "10人", "12人", "15人"],
      correct: 3,
      explanation: "円グラフからサッカーは全体の40%を占めています。30人 × 40% = 30 × 0.4 = 12人です。"
    },
    {
      id: 4,
      question: "上記の円グラフで、野球とバスケを合わせると全体の何%になりますか。",
      type: "pie" as const,
      data: pieData1,
      options: ["40%", "45%", "50%", "55%"],
      correct: 3,
      explanation: "野球は30%、バスケは20%なので、合わせると30% + 20% = 50%です。"
    },
    {
      id: 5,
      question: "次の折れ線グラフは、ある都市の年平均気温の変化を表しています。2019年から2023年にかけて、気温はどのように変化していますか。",
      type: "line" as const,
      data: lineData1,
      dataKey: "temp",
      xKey: "year",
      options: ["上昇している", "下降している", "変化していない", "不規則に変化している"],
      correct: 1,
      explanation: "折れ線グラフを見ると、2019年の15.2℃から2023年の16.9℃まで一貫して右上がりになっており、気温は上昇しています。"
    },
    {
      id: 6,
      question: "次の棒グラフは、お店の月別売上を表しています。売上が最も多かった月はいつですか。",
      type: "bar" as const,
      data: barData2,
      dataKey: "sales",
      xKey: "month",
      options: ["4月", "5月", "6月", "7月"],
      correct: 3,
      explanation: "棒グラフを見ると、6月の棒が最も高く180万円で、売上が最も多いことがわかります。"
    },
    {
      id: 7,
      question: "次の円グラフは100人の血液型を調査した結果です。A型の人は何人ですか。",
      type: "pie" as const,
      data: pieData2,
      options: ["30人", "35人", "40人", "45人"],
      correct: 2,
      explanation: "円グラフからA型は全体の35%を占めています。100人 × 35% = 100 × 0.35 = 35人です。"
    },
    {
      id: 8,
      question: "次の折れ線グラフは、図書館の曜日別来館者数を表しています。最も来館者が多い曜日はどれですか。",
      type: "line" as const,
      data: lineData2,
      dataKey: "visitors",
      xKey: "day",
      options: ["月曜日", "水曜日", "木曜日", "金曜日"],
      correct: 4,
      explanation: "折れ線グラフを見ると、金曜日が550人で最も多くなっています。"
    },
    {
      id: 9,
      question: "棒グラフを使うのに最も適しているデータはどれですか。",
      options: [
        "時間の経過に伴う変化",
        "全体に対する各部分の割合",
        "項目ごとの量の比較",
        "2つの変数の関係"
      ],
      correct: 3,
      explanation: "棒グラフは項目ごとの量を比較するのに最も適しています。時間の変化は折れ線グラフ、割合は円グラフが適しています。"
    },
    {
      id: 10,
      question: "円グラフを使うのに最も適しているデータはどれですか。",
      options: [
        "月別の売上の推移",
        "科目ごとの点数の比較",
        "全体に対する各項目の割合",
        "地域ごとの人口の比較"
      ],
      correct: 3,
      explanation: "円グラフは全体に対する各項目の割合を示すのに最も適しています。全体を100%として、各部分の占める割合を視覚的に表現できます。"
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
              📊 4級 - グラフの読み取り セット1
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