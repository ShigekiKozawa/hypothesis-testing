import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Grade3Section4Set3() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 1,
      question: "ロジスティック回帰分析とは何ですか。",
      options: [
        "連続値を予測する分析",
        "2値（0/1）の目的変数を予測する分析",
        "時系列データの分析",
        "分散を予測する分析"
      ],
      correct: 2,
      explanation: "ロジスティック回帰分析は、目的変数が2値（例：合格/不合格）のときに確率を予測する分析です。"
    },
    {
      id: 2,
      question: "ポアソン回帰分析が適用される場面はどれですか。",
      options: [
        "連続値の予測",
        "カウントデータ（件数）の予測",
        "比率の予測",
        "分散の予測"
      ],
      correct: 2,
      explanation: "ポアソン回帰は、一定期間の事故件数など、カウントデータ（非負の整数）を予測する際に使われます。"
    },
    {
      id: 3,
      question: "残差プロットで確認することは何ですか。",
      options: [
        "決定係数",
        "残差のパターンや等分散性",
        "相関係数",
        "サンプルサイズ"
      ],
      correct: 2,
      explanation: "残差プロットで、残差にパターンがないか、等分散性が満たされているかなど、モデルの妥当性を確認します。"
    },
    {
      id: 4,
      question: "Q-Qプロットで確認することは何ですか。",
      options: [
        "残差の正規性",
        "決定係数",
        "多重共線性",
        "外れ値の数"
      ],
      correct: 1,
      explanation: "Q-Qプロット（分位数-分位数プロット）は、残差が正規分布に従うかどうかを視覚的に確認するためのグラフです。"
    },
    {
      id: 5,
      question: "リッジ回帰の目的は何ですか。",
      options: [
        "計算時間の短縮",
        "多重共線性の問題を緩和",
        "決定係数の最大化",
        "外れ値の除去"
      ],
      correct: 2,
      explanation: "リッジ回帰は、回帰係数に制約（ペナルティ）を加えることで多重共線性の問題を緩和する方法です。"
    },
    {
      id: 6,
      question: "ラッソ回帰の特徴は何ですか。",
      options: [
        "すべての変数を残す",
        "重要でない変数の係数をゼロにする変数選択機能がある",
        "決定係数が常に1になる",
        "外れ値に強い"
      ],
      correct: 2,
      explanation: "ラッソ回帰は、L1正則化により重要でない変数の係数をゼロにする変数選択機能を持ちます。"
    },
    {
      id: 7,
      question: "エラスティックネット回帰とは何ですか。",
      options: [
        "リッジ回帰だけを使う",
        "ラッソ回帰だけを使う",
        "リッジ回帰とラッソ回帰を組み合わせた方法",
        "最小二乗法と同じ"
      ],
      correct: 3,
      explanation: "エラスティックネット回帰は、L1正則化（ラッソ）とL2正則化（リッジ）を組み合わせた方法です。"
    },
    {
      id: 8,
      question: "時系列回帰分析で注意すべき問題は何ですか。",
      options: [
        "多重共線性",
        "自己相関（系列相関）",
        "外れ値",
        "カテゴリカル変数"
      ],
      correct: 2,
      explanation: "時系列データでは、残差に自己相関（系列相関）が生じやすく、これが標準誤差の推定を歪める問題があります。"
    },
    {
      id: 9,
      question: "分位点回帰とは何ですか。",
      options: [
        "平均を予測する",
        "中央値や他の分位点を予測する方法",
        "最大値を予測する",
        "分散を予測する"
      ],
      correct: 2,
      explanation: "分位点回帰は、平均ではなく中央値（0.5分位点）や他の分位点を予測する頑健な回帰方法です。"
    },
    {
      id: 10,
      question: "回帰分析における交差検証の目的は何ですか。",
      options: [
        "決定係数の計算",
        "モデルの汎化性能の評価",
        "回帰係数の推定",
        "外れ値の検出"
      ],
      correct: 2,
      explanation: "交差検証は、モデルが未知のデータに対してどれだけ予測性能を発揮できるか（汎化性能）を評価する方法です。"
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
              📈 3級 - 回帰分析 セット3
            </h1>
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">単回帰分析と最小二乗法の基礎を学びましょう</p>
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