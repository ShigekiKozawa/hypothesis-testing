import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Grade3Section1Set2() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 1,
      question: "データ 5, 10, 15, 20, 25 の範囲（レンジ）はいくつですか。",
      options: ["10", "15", "20", "25"],
      correct: 3,
      explanation: "範囲 = 最大値 - 最小値 = 25 - 5 = 20 です。"
    },
    {
      id: 2,
      question: "標準化（z-score）とは何ですか。",
      options: [
        "データから平均値を引く",
        "データを標準偏差で割る",
        "(データ - 平均値) / 標準偏差",
        "データの平方根を取る"
      ],
      correct: 3,
      explanation: "標準化（z-score）= (データ - 平均値) / 標準偏差 で、平均0、標準偏差1に変換します。"
    },
    {
      id: 3,
      question: "歪度（わいど）とは何を示す指標ですか。",
      options: [
        "データのばらつき",
        "データの分布の偏り",
        "データの中心",
        "データの範囲"
      ],
      correct: 2,
      explanation: "歪度は分布の左右対称性からのずれ（偏り）を示す指標です。"
    },
    {
      id: 4,
      question: "尖度（せんど）とは何を示す指標ですか。",
      options: [
        "データの平均値",
        "データの分布の尖り具合",
        "データの最大値",
        "データの中央値"
      ],
      correct: 2,
      explanation: "尖度は分布の尖り具合（ピークの高さ）を示す指標です。"
    },
    {
      id: 5,
      question: "データに定数を加えると、平均値はどうなりますか。",
      options: [
        "変わらない",
        "その定数だけ増える",
        "2倍になる",
        "0になる"
      ],
      correct: 2,
      explanation: "すべてのデータに定数kを加えると、平均値もk増えます。"
    },
    {
      id: 6,
      question: "データに定数を加えると、分散はどうなりますか。",
      options: [
        "変わらない",
        "その定数だけ増える",
        "2倍になる",
        "0になる"
      ],
      correct: 1,
      explanation: "すべてのデータに定数を加えても、データ間の散らばりは変わらないため、分散は変わりません。"
    },
    {
      id: 7,
      question: "母平均の記号として一般的に使われるのはどれですか。",
      options: ["x̄", "μ", "σ", "s"],
      correct: 2,
      explanation: "母平均はμ（ミュー）、標本平均はx̄（エックスバー）で表します。"
    },
    {
      id: 8,
      question: "母標準偏差の記号として一般的に使われるのはどれですか。",
      options: ["x̄", "μ", "σ", "n"],
      correct: 3,
      explanation: "母標準偏差はσ（シグマ）、標本標準偏差はsで表します。"
    },
    {
      id: 9,
      question: "四分位偏差とは何ですか。",
      options: [
        "四分位範囲の半分",
        "四分位範囲の2倍",
        "第3四分位数と第1四分位数の和",
        "中央値の半分"
      ],
      correct: 1,
      explanation: "四分位偏差 = (Q3 - Q1) / 2 = 四分位範囲 / 2 です。"
    },
    {
      id: 10,
      question: "加重平均とは何ですか。",
      options: [
        "すべてのデータを等しく扱う平均",
        "各データに重みをつけて計算する平均",
        "最大値と最小値の平均",
        "中央値のこと"
      ],
      correct: 2,
      explanation: "加重平均は、各データの重要度に応じて重みをつけて計算する平均です。例：成績の平均で各科目の単位数を重みとする場合など。"
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              📊 結果
            </h1>
            
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-lg px-12 py-8 shadow-xl">
                <p className="text-6xl font-bold mb-2">{score}/{questions.length}</p>
                <p className="text-2xl">正答率: {percentage.toFixed(0)}%</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={resetExam}
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
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
                  isCorrect ? 'border-purple-500' : 'border-red-500'
                }`}>
                  <div className="flex items-start gap-3 mb-4">
                    <span className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                      isCorrect ? 'bg-purple-500' : 'bg-red-500'
                    }`}>
                      {isCorrect ? '○' : '×'}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800 mb-2">
                        問題{index + 1}
                      </h3>
                      <p className="text-gray-700 whitespace-pre-line mb-3">{q.question}</p>
                    </div>
                  </div>
                  
                  <div className="ml-13 space-y-3">
                    <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">あなたの回答</p>
                      <p className="font-semibold text-gray-800">
                        {answers[q.id] ? `${answers[q.id]}. ${q.options[answers[q.id] - 1]}` : '未回答'}
                      </p>
                    </div>
                    
                    <div className="bg-purple-50 border border-purple-200 p-3 rounded-lg">
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              📈 3級 - 記述統計の基礎 セット2
            </h1>
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">平均値、分散、標準偏差の理解を深めましょう</p>
          <div className="flex gap-2 text-sm text-gray-500">
            <span className="bg-purple-100 px-3 py-1 rounded-full">セット2/3</span>
            <span>全10問</span>
          </div>
        </div>

        <div className="space-y-6">
          {questions.map((q, index) => (
            <div key={q.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg text-base font-bold">
                    問題 {index + 1}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 whitespace-pre-line leading-relaxed mb-4">
                  {q.question}
                </h2>
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
                          ? 'border-purple-600 bg-purple-50 shadow-md'
                          : 'border-gray-300 bg-white hover:border-purple-400 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${
                          isSelected
                            ? 'bg-purple-600 text-white'
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

