import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Exam1() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const histogramData1 = [
    { range: '50-55', frequency: 2 },
    { range: '55-60', frequency: 5 },
    { range: '60-65', frequency: 8 },
    { range: '65-70', frequency: 12 },
    { range: '70-75', frequency: 6 },
    { range: '75-80', frequency: 3 }
  ];

  const scatterData1 = [
    { x: 84, y: 90 }, { x: 86, y: 85 }, { x: 88, y: 88 },
    { x: 90, y: 92 }, { x: 92, y: 89 }, { x: 93, y: 94 },
    { x: 93, y: 90 }, { x: 94, y: 93 }, { x: 86, y: 87 },
    { x: 91, y: 91 }
  ];

  const questions = [
    {
      id: 1,
      question: "次のデータのうち、量的変数はどれですか。",
      options: [
        "血液型（A型、B型、O型、AB型）",
        "身長（cm）",
        "性別（男、女）",
        "満足度（とても満足、やや満足、やや不満、とても不満）"
      ],
      correct: 2,
      explanation: "量的変数は数値として計算可能な変数です。身長は数値で表され、加減乗除などの計算ができるため量的変数です。血液型、性別、満足度は質的変数（カテゴリカル変数）です。"
    },
    {
      id: 2,
      question: "あるクラス36人の数学のテスト結果をヒストグラムに表しました。65点以上の生徒は何人ですか。",
      type: "histogram" as const,
      data: histogramData1,
      options: ["15人", "18人", "21人", "24人"],
      correct: 3,
      explanation: "65点以上の生徒数は、65-70点の階級（12人）+ 70-75点の階級（6人）+ 75-80点の階級（3人）= 21人です。"
    },
    {
      id: 3,
      question: "次のデータを小さい順に並べたとき、中央値はいくつですか。\nデータ: 15, 8, 23, 12, 18, 9, 20",
      options: ["12", "15", "18", "20"],
      correct: 2,
      explanation: "データを小さい順に並べると: 8, 9, 12, 15, 18, 20, 23。7個のデータなので、中央値は4番目の値である15です。"
    },
    {
      id: 4,
      question: "次のデータの平均値はいくつですか。\nデータ: 8, 12, 10, 15, 5",
      options: ["8", "9", "10", "11"],
      correct: 3,
      explanation: "平均値 = (8 + 12 + 10 + 15 + 5) ÷ 5 = 50 ÷ 5 = 10です。"
    },
    {
      id: 5,
      question: "あるデータの平均が50、標準偏差が10です。このデータのすべての値に5を加えたとき、新しいデータの平均と標準偏差はどうなりますか。",
      options: [
        "平均55、標準偏差10",
        "平均55、標準偏差15",
        "平均50、標準偏差10",
        "平均50、標準偏差15"
      ],
      correct: 1,
      explanation: "すべてのデータに定数を加えると、平均も同じ定数だけ増加しますが、標準偏差（散らばり）は変わりません。したがって、平均は55（50+5）、標準偏差は10のままです。"
    },
    {
      id: 6,
      question: "次のデータの範囲（レンジ）はいくつですか。\nデータ: 25, 18, 32, 20, 28, 15, 30",
      options: ["13", "15", "17", "20"],
      correct: 3,
      explanation: "範囲（レンジ）= 最大値 - 最小値 = 32 - 15 = 17です。"
    },
    {
      id: 7,
      question: "10人の審査員A、Bの採点結果の散布図を示しました。審査員Aと審査員Bの採点の相関について正しい記述はどれですか。",
      type: "scatter" as const,
      data: scatterData1,
      xLabel: "審査員A（点）",
      yLabel: "審査員B（点）",
      options: [
        "強い正の相関がある",
        "弱い正の相関がある",
        "負の相関がある",
        "相関はない"
      ],
      correct: 1,
      explanation: "散布図を見ると、審査員Aの点数が高いほど審査員Bの点数も高い傾向があり、点が右上がりの直線状に分布しています。したがって、強い正の相関があります。"
    },
    {
      id: 8,
      question: "箱ひげ図において、箱の中の線が表すのは何ですか。",
      options: [
        "平均値",
        "中央値（第2四分位数）",
        "最頻値",
        "標準偏差"
      ],
      correct: 2,
      explanation: "箱ひげ図の箱の中の線は中央値（第2四分位数）を表します。箱の左端が第1四分位数、右端が第3四分位数、ひげの端が最小値と最大値を表します。"
    },
    {
      id: 9,
      question: "母集団から無作為に標本を抽出する際に用いられるものはどれですか。",
      options: [
        "乱数表",
        "度数分布表",
        "相関係数",
        "偏差値"
      ],
      correct: 1,
      explanation: "無作為抽出（ランダムサンプリング）を行う際には、乱数表や乱数発生器を用いて、すべての個体が等しい確率で選ばれるようにします。"
    },
    {
      id: 10,
      question: "次のデータの分散を求めなさい。\nデータ: 2, 4, 6, 8, 10\n（ヒント：平均は6です）",
      options: ["4", "6", "8", "10"],
      correct: 3,
      explanation: "分散 = {(2-6)² + (4-6)² + (6-6)² + (8-6)² + (10-6)²} ÷ 5 = (16 + 4 + 0 + 4 + 16) ÷ 5 = 40 ÷ 5 = 8です。分散はデータの各値と平均との差の2乗の平均です。"
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
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              📊 試験結果
            </h1>
            
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-lg px-12 py-8 shadow-xl">
                <p className="text-6xl font-bold mb-2">{score}/10</p>
                <p className="text-2xl">正答率: {percentage}%</p>
              </div>
              
              <div className="mt-6">
                {percentage >= 65 ? (
                  <p className="text-2xl text-green-600 font-bold">🎉 合格ライン達成！（65点以上）</p>
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
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
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
                          <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={q.data}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="range" label={{ value: '点数', position: 'insideBottom', offset: -5 }} />
                              <YAxis label={{ value: '度数（人）', angle: -90, position: 'insideLeft' }} />
                              <Tooltip />
                              <Bar dataKey="frequency" fill="#3b82f6" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                      
                      {q.type === 'scatter' && q.data && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-3">
                          <ResponsiveContainer width="100%" height={200}>
                            <ScatterChart>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="x" type="number" domain={[80, 95]} label={{ value: q.xLabel, position: 'insideBottom', offset: -5 }} />
                              <YAxis dataKey="y" domain={[80, 95]} label={{ value: q.yLabel, angle: -90, position: 'insideLeft' }} />
                              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                              <Scatter data={q.data} fill="#3b82f6" />
                            </ScatterChart>
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
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">
              📊 統計検定3級 模擬試験1
            </h1>
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>⏱️ 目安時間: 20分（本試験は60分・30問）</span>
            <span>全10問・選択式</span>
          </div>
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
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
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
                    ? 'bg-blue-600 text-white shadow-lg scale-110'
                    : answers[q.id]
                    ? 'bg-green-500 text-white'
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
              <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-base font-bold">
                問題 {currentQuestion}
              </span>
              <span className="text-gray-500 text-sm">/ 10</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 whitespace-pre-line leading-relaxed">
              {currentQ.question}
            </h2>
          </div>

          {currentQ.type === 'histogram' && currentQ.data && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={currentQ.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" label={{ value: '点数', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: '度数（人）', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="frequency" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {currentQ.type === 'scatter' && currentQ.data && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="x" 
                    type="number"
                    domain={[80, 95]}
                    label={{ value: currentQ.xLabel, position: 'insideBottom', offset: -5 }} 
                  />
                  <YAxis 
                    dataKey="y"
                    domain={[80, 95]}
                    label={{ value: currentQ.yLabel, angle: -90, position: 'insideLeft' }} 
                  />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter data={currentQ.data} fill="#3b82f6" />
                </ScatterChart>
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
                      ? 'border-blue-600 bg-blue-50 shadow-md'
                      : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white'
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
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              次の問題 →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              ✓ 採点する
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

