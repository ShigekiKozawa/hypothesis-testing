import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade3Section3Set2() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const questions = [
    {
      id: 1,
      question: "片側検定と両側検定の違いは何ですか。",
      options: [
        "片側検定は一方向の差を、両側検定は両方向の差を検定する",
        "片側検定は1つの標本、両側検定は2つの標本を使う",
        "片側検定は平均、両側検定は分散を検定する",
        "違いはない"
      ],
      correct: 1,
      explanation: "片側検定は「大きい」または「小さい」という一方向の差を、両側検定は「異なる」という両方向の差を検定します。"
    },
    {
      id: 2,
      question: "検出力（power）とは何ですか。",
      options: [
        "帰無仮説を正しく採択する確率",
        "対立仮説が正しいときに帰無仮説を正しく棄却する確率",
        "第1種の過誤の確率",
        "標本サイズ"
      ],
      correct: 2,
      explanation: "検出力は1-β（βは第2種の過誤の確率）で、対立仮説が正しいときに帰無仮説を正しく棄却できる確率です。"
    },
    {
      id: 3,
      question: "t検定を使う場面として適切なものはどれですか。",
      options: [
        "母分散が既知で標本サイズが大きい",
        "母分散が未知で標本サイズが小さい",
        "比率の検定",
        "分散の検定"
      ],
      correct: 2,
      explanation: "t検定は、母分散が未知で標本サイズが小さい（一般に30未満）ときに平均の検定で使います。"
    },
    {
      id: 4,
      question: "z検定を使う場面として適切なものはどれですか。",
      options: [
        "母分散が未知で標本サイズが小さい",
        "母分散が既知、または標本サイズが大きい",
        "対応のある2標本",
        "3つ以上の群の比較"
      ],
      correct: 2,
      explanation: "z検定は、母分散が既知の場合、または標本サイズが大きい（一般に30以上）場合に平均の検定で使います。"
    },
    {
      id: 5,
      question: "対応のあるt検定とは何ですか。",
      options: [
        "独立した2つの標本の平均を比較",
        "同一対象の前後の変化を比較",
        "3つ以上の群を比較",
        "分散を比較"
      ],
      correct: 2,
      explanation: "対応のあるt検定（ペアt検定）は、同一対象の前後の測定値など、対応のある2つの標本の平均の差を検定します。"
    },
    {
      id: 6,
      question: "F検定の用途として適切なものはどれですか。",
      options: [
        "平均の検定",
        "2つの母分散の比の検定",
        "比率の検定",
        "相関係数の検定"
      ],
      correct: 2,
      explanation: "F検定は、2つの母集団の分散の比が1であるかどうかを検定するために使われます。"
    },
    {
      id: 7,
      question: "カイ二乗検定の用途として適切なものはどれですか。",
      options: [
        "平均の検定",
        "独立性の検定や適合度検定",
        "回帰係数の検定",
        "中央値の検定"
      ],
      correct: 2,
      explanation: "カイ二乗検定は、カテゴリカルデータの独立性の検定や、データが特定の分布に適合するかの検定に使われます。"
    },
    {
      id: 8,
      question: "信頼区間の幅を狭くする方法として適切なものはどれですか。",
      options: [
        "標本サイズを大きくする",
        "標本サイズを小さくする",
        "信頼水準を高くする",
        "分散を大きくする"
      ],
      correct: 1,
      explanation: "標本サイズを大きくすると標準誤差が小さくなり、信頼区間の幅が狭くなります。"
    },
    {
      id: 9,
      question: "多重比較の問題とは何ですか。",
      options: [
        "複数回検定すると第1種の過誤が累積する",
        "複数回検定すると第2種の過誤が減る",
        "標本サイズが大きくなる",
        "計算が複雑になる"
      ],
      correct: 1,
      explanation: "多重比較では、検定を繰り返すことで第1種の過誤が累積し、有意水準が実質的に大きくなってしまう問題があります。"
    },
    {
      id: 10,
      question: "ボンフェローニ補正とは何ですか。",
      options: [
        "標本サイズを調整する方法",
        "多重比較の第1種の過誤を調整する方法",
        "分散を推定する方法",
        "外れ値を除去する方法"
      ],
      correct: 2,
      explanation: "ボンフェローニ補正は、多重比較における第1種の過誤を抑えるため、有意水準を検定回数で割る方法です。"
    }
  ];

  useEffect(() => {
    const best = getBestScore('grade3-section3_inference_2');
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
      examId: 'grade3-section3_inference_2',
      examTitle: '3級 Section3_Inference_2',
      grade: '3級',
      score,
      totalQuestions: questions.length,
      percentage,
      passed: percentage >= 60
    });
    
    const best = getBestScore('grade3-section3_inference_2');
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
              📊 3級 - 推測統計の基礎 セット2
            </h1>
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">点推定・区間推定・仮説検定の基礎を学びましょう</p>
          <div className="flex gap-2 text-sm text-gray-500">
            <span className="bg-purple-100 px-3 py-1 rounded-full">セット2/3</span>
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