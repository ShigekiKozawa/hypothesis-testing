import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Grade4Section4Set2() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const barData1 = [
    { product: 'りんご', price: 150 },
    { product: 'みかん', price: 100 },
    { product: 'バナナ', price: 120 },
    { product: 'いちご', price: 300 }
  ];

  const barData2 = [
    { grade: '1年', students: 180 },
    { grade: '2年', students: 175 },
    { grade: '3年', students: 170 }
  ];

  const pieData1 = [
    { name: '電車', value: 45, percent: 45 },
    { name: 'バス', value: 30, percent: 30 },
    { name: '自転車', value: 15, percent: 15 },
    { name: '徒歩', value: 10, percent: 10 }
  ];

  const pieData2 = [
    { name: '晴れ', value: 15, percent: 50 },
    { name: '曇り', value: 9, percent: 30 },
    { name: '雨', value: 6, percent: 20 }
  ];

  const lineData1 = [
    { month: '1月', price: 300 },
    { month: '2月', price: 280 },
    { month: '3月', price: 350 },
    { month: '4月', price: 320 },
    { month: '5月', price: 400 }
  ];

  const lineData2 = [
    { time: '8時', temp: 18 },
    { time: '10時', temp: 22 },
    { time: '12時', temp: 26 },
    { time: '14時', temp: 28 },
    { time: '16時', temp: 25 }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const questions = [
    {
      id: 1,
      question: "次の棒グラフは、果物の値段を表しています。最も安い果物はどれですか。",
      type: "bar" as const,
      data: barData1,
      dataKey: "price",
      xKey: "product",
      options: ["りんご", "みかん", "バナナ", "いちご"],
      correct: 2,
      explanation: "棒グラフを見ると、みかんの棒が最も低く100円で、最も安いことがわかります。"
    },
    {
      id: 2,
      question: "上記の棒グラフで、いちごとりんごの値段の差は何円ですか。",
      type: "bar" as const,
      data: barData1,
      dataKey: "price",
      xKey: "product",
      options: ["100円", "120円", "150円", "180円"],
      correct: 3,
      explanation: "いちごは300円、りんごは150円なので、差は300 - 150 = 150円です。"
    },
    {
      id: 3,
      question: "次の円グラフは、通学方法を調査した結果です。電車とバスを合わせると全体の何%になりますか。",
      type: "pie" as const,
      data: pieData1,
      options: ["65%", "70%", "75%", "80%"],
      correct: 3,
      explanation: "電車は45%、バスは30%なので、合わせると45% + 30% = 75%です。"
    },
    {
      id: 4,
      question: "次の折れ線グラフは、野菜の月別価格を表しています。価格が最も高かった月はいつですか。",
      type: "line" as const,
      data: lineData1,
      dataKey: "price",
      xKey: "month",
      options: ["1月", "3月", "4月", "5月"],
      correct: 4,
      explanation: "折れ線グラフを見ると、5月が400円で最も高くなっています。"
    },
    {
      id: 5,
      question: "次の棒グラフは、学年別の生徒数を表しています。1年生と3年生の生徒数の差は何人ですか。",
      type: "bar" as const,
      data: barData2,
      dataKey: "students",
      xKey: "grade",
      options: ["5人", "10人", "15人", "20人"],
      correct: 2,
      explanation: "1年生は180人、3年生は170人なので、差は180 - 170 = 10人です。"
    },
    {
      id: 6,
      question: "次の円グラフは、ある月30日間の天気を表しています。晴れの日は何日ありましたか。",
      type: "pie" as const,
      data: pieData2,
      options: ["12日", "15日", "18日", "20日"],
      correct: 2,
      explanation: "円グラフから晴れは全体の50%を占めています。30日 × 50% = 30 × 0.5 = 15日です。"
    },
    {
      id: 7,
      question: "次の折れ線グラフは、ある日の気温の変化を表しています。気温が最も高かった時刻はいつですか。",
      type: "line" as const,
      data: lineData2,
      dataKey: "temp",
      xKey: "time",
      options: ["10時", "12時", "14時", "16時"],
      correct: 3,
      explanation: "折れ線グラフを見ると、14時が28℃で最も高くなっています。"
    },
    {
      id: 8,
      question: "折れ線グラフを使うのに最も適しているデータはどれですか。",
      options: [
        "項目ごとの量の比較",
        "全体に対する各部分の割合",
        "時間の経過に伴う変化",
        "2つの変数の相関関係"
      ],
      correct: 3,
      explanation: "折れ線グラフは時間の経過に伴う変化を示すのに最も適しています。連続的な変化の様子を視覚的に把握できます。"
    },
    {
      id: 9,
      question: "棒グラフと折れ線グラフの主な違いは何ですか。",
      options: [
        "棒グラフは縦、折れ線グラフは横に表示する",
        "棒グラフは項目の比較、折れ線グラフは変化の推移を表す",
        "棒グラフは割合、折れ線グラフは数量を表す",
        "違いはない"
      ],
      correct: 2,
      explanation: "棒グラフは複数の項目の量を比較するのに適し、折れ線グラフは時間的な変化の推移を表すのに適しています。"
    },
    {
      id: 10,
      question: "円グラフで全体が100%のとき、30%を表す中心角は何度ですか。",
      options: ["90度", "108度", "120度", "135度"],
      correct: 2,
      explanation: "円の中心角は360度です。30%を表す中心角は、360° × 0.3 = 108度です。"
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
              📊 4級 - グラフの読み取り セット2
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
            <span className="bg-green-100 px-3 py-1 rounded-full">セット2/3</span>
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

                {q.type === 'bar' && q.data && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                    <ResponsiveContainer width="100%" height={250}>
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
                  <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={q.data}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${percent}%`}
                          outerRadius={100}
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
                  <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                    <ResponsiveContainer width="100%" height={250}>
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

