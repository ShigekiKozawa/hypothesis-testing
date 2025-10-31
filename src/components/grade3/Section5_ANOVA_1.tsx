import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Grade3Section5Set1() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 1,
      question: "分散分析（ANOVA）の目的は何ですか。",
      options: [
        "2群の平均を比較",
        "3群以上の平均を同時に比較",
        "相関係数の検定",
        "回帰係数の推定"
      ],
      correct: 2,
      explanation: "分散分析（ANOVA）は、3群以上の母平均が等しいかどうかを同時に検定する方法です。"
    },
    {
      id: 2,
      question: "一元配置分散分析とは何ですか。",
      options: [
        "2つの因子を考慮する分析",
        "1つの因子（要因）の効果を調べる分析",
        "交互作用を調べる分析",
        "回帰分析と同じ"
      ],
      correct: 2,
      explanation: "一元配置分散分析は、1つの因子（例：投与量の水準）が従属変数に与える効果を調べる分析です。"
    },
    {
      id: 3,
      question: "二元配置分散分析の利点は何ですか。",
      options: [
        "計算が簡単",
        "2つの因子の主効果と交互作用を同時に調べられる",
        "サンプルサイズが小さくて済む",
        "正規性の仮定が不要"
      ],
      correct: 2,
      explanation: "二元配置分散分析では、2つの因子の主効果とそれらの交互作用を同時に調べることができます。"
    },
    {
      id: 4,
      question: "分散分析における交互作用とは何ですか。",
      options: [
        "2つの因子の単純な和",
        "一方の因子の効果が他方の因子の水準によって変化すること",
        "因子間の相関",
        "誤差のこと"
      ],
      correct: 2,
      explanation: "交互作用は、一方の因子の効果が他方の因子の水準によって異なる場合に存在します。"
    },
    {
      id: 5,
      question: "分散分析で使われるF統計量は何の比ですか。",
      options: [
        "群間分散と群内分散の比",
        "平均と分散の比",
        "相関係数の比",
        "標準偏差の比"
      ],
      correct: 1,
      explanation: "F統計量は、群間分散（処理による変動）と群内分散（誤差変動）の比です。"
    },
    {
      id: 6,
      question: "分散分析の帰無仮説は何ですか。",
      options: [
        "すべての群の平均が異なる",
        "すべての群の平均が等しい",
        "すべての群の分散が等しい",
        "相関がゼロ"
      ],
      correct: 2,
      explanation: "分散分析の帰無仮説は、「すべての群の母平均が等しい」です。"
    },
    {
      id: 7,
      question: "分散分析が有意だった後の多重比較の目的は何ですか。",
      options: [
        "どの群とどの群に差があるかを調べる",
        "分散を計算する",
        "相関係数を求める",
        "標本サイズを決める"
      ],
      correct: 1,
      explanation: "分散分析が有意の場合、多重比較（事後検定）でどの群間に具体的に差があるかを調べます。"
    },
    {
      id: 8,
      question: "Tukeyの方法とは何ですか。",
      options: [
        "回帰分析の方法",
        "多重比較の事後検定の方法",
        "標本抽出の方法",
        "外れ値の検出方法"
      ],
      correct: 2,
      explanation: "Tukeyの方法（HSD検定）は、分散分析後にすべての群間の対比較を行う多重比較法です。"
    },
    {
      id: 9,
      question: "反復測定分散分析とは何ですか。",
      options: [
        "独立した群を比較",
        "同一対象を繰り返し測定したデータを分析",
        "2群の平均を比較",
        "分散を比較"
      ],
      correct: 2,
      explanation: "反復測定分散分析は、同一対象を時間的に繰り返し測定した従属データに対して用いる分析です。"
    },
    {
      id: 10,
      question: "分散分析の前提条件として正しいものはどれですか。",
      options: [
        "各群の分散が等しい（等分散性）",
        "各群の平均が等しい",
        "各群のサンプルサイズが異なる",
        "データが離散型"
      ],
      correct: 1,
      explanation: "分散分析は、各群のデータが正規分布に従い、等分散性（分散の均一性）を満たすことを前提とします。"
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
              🧪 3級 - 実験計画法・分散分析 セット1
            </h1>
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">分散分析（ANOVA）と実験計画法の基礎を学びましょう</p>
          <div className="flex gap-2 text-sm text-gray-500">
            <span className="bg-purple-100 px-3 py-1 rounded-full">セット1/3</span>
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