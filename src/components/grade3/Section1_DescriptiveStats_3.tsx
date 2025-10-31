import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Grade3Section1Set3() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 1,
      question: "共分散とは何を示す指標ですか。",
      options: [
        "1つの変数のばらつき",
        "2つの変数の関係の強さと方向",
        "平均値からの距離",
        "データの個数"
      ],
      correct: 2,
      explanation: "共分散は2つの変数がどのように関連して変動するか（正の関係か負の関係か）を示す指標です。"
    },
    {
      id: 2,
      question: "相関係数の値の範囲として正しいものはどれですか。",
      options: [
        "0から1",
        "-1から0",
        "-1から+1",
        "0から∞"
      ],
      correct: 3,
      explanation: "相関係数は-1から+1の範囲の値をとります。+1に近いほど正の相関が強く、-1に近いほど負の相関が強いです。"
    },
    {
      id: 3,
      question: "相関係数が0に近い場合、何を意味しますか。",
      options: [
        "強い正の相関がある",
        "強い負の相関がある",
        "線形の相関関係がほとんどない",
        "必ず因果関係がある"
      ],
      correct: 3,
      explanation: "相関係数が0に近い場合、2つの変数の間に線形の相関関係がほとんどないことを示します。"
    },
    {
      id: 4,
      question: "データの外れ値を検出する方法として、四分位範囲を使う場合、一般的な基準はどれですか。",
      options: [
        "Q1 - IQR または Q3 + IQR の外側",
        "Q1 - 1.5×IQR または Q3 + 1.5×IQR の外側",
        "Q1 - 2×IQR または Q3 + 2×IQR の外側",
        "平均値 ± 標準偏差の外側"
      ],
      correct: 2,
      explanation: "一般的に、Q1 - 1.5×IQR より小さい、またはQ3 + 1.5×IQR より大きい値を外れ値とみなします。"
    },
    {
      id: 5,
      question: "チェビシェフの不等式によると、平均値からk標準偏差以内にデータが含まれる割合の下限はいくつですか（k=2の場合）。",
      options: [
        "少なくとも50%",
        "少なくとも75%",
        "少なくとも89%",
        "少なくとも95%"
      ],
      correct: 2,
      explanation: "チェビシェフの不等式により、どんな分布でも平均値から2標準偏差以内に少なくとも75%（1-1/2²=3/4）のデータが含まれます。"
    },
    {
      id: 6,
      question: "正規分布において、平均値±1標準偏差の範囲に含まれるデータの割合は約いくつですか。",
      options: [
        "約68%",
        "約75%",
        "約95%",
        "約99%"
      ],
      correct: 1,
      explanation: "正規分布では、平均値±1標準偏差の範囲に約68%、±2標準偏差に約95%、±3標準偏差に約99.7%のデータが含まれます。"
    },
    {
      id: 7,
      question: "ローレンツ曲線とは何を表すグラフですか。",
      options: [
        "時間変化を表すグラフ",
        "所得や富の不平等度を表すグラフ",
        "確率分布を表すグラフ",
        "相関関係を表すグラフ"
      ],
      correct: 2,
      explanation: "ローレンツ曲線は所得や富の分配の不平等度を視覚的に示すグラフです。完全に平等な場合は45度線になります。"
    },
    {
      id: 8,
      question: "ジニ係数とは何を示す指標ですか。",
      options: [
        "データのばらつき",
        "所得の不平等度",
        "相関の強さ",
        "平均値"
      ],
      correct: 2,
      explanation: "ジニ係数は所得の不平等度を示す指標で、0（完全に平等）から1（完全に不平等）の値をとります。"
    },
    {
      id: 9,
      question: "調和平均が使われる場面として適切なものはどれですか。",
      options: [
        "テストの平均点を求める",
        "平均速度を求める",
        "身長の平均を求める",
        "体重の平均を求める"
      ],
      correct: 2,
      explanation: "調和平均は、速度や効率など「率」の平均を求める際に適しています。例：行きと帰りで速度が異なる場合の平均速度。"
    },
    {
      id: 10,
      question: "幾何平均が使われる場面として適切なものはどれですか。",
      options: [
        "テストの平均点",
        "身長の平均",
        "成長率や利率の平均",
        "気温の平均"
      ],
      correct: 3,
      explanation: "幾何平均は、成長率や利率など、乗算的に変化する値の平均を求める際に適しています。"
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
              📈 3級 - 記述統計の基礎 セット3
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
            <span className="bg-purple-100 px-3 py-1 rounded-full">セット3/3</span>
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