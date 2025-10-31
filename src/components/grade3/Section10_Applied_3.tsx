import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade3Section10Set3() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const questions = [
    {
      id: 1,
      question: "混同行列（confusion matrix）とは何ですか。",
      options: [
        "回帰の評価指標",
        "分類の予測結果と実際のクラスをまとめた表",
        "相関行列",
        "共分散行列"
      ],
      correct: 2,
      explanation: "混同行列は、分類モデルの予測結果（陽性/陰性）と実際のクラスを2×2または多次元の表にまとめ、性能を評価する道具です。"
    },
    {
      id: 2,
      question: "適合率（Precision）とは何ですか。",
      options: [
        "真陽性率",
        "陽性と予測したうち実際に陽性の割合",
        "再現率",
        "特異度"
      ],
      correct: 2,
      explanation: "適合率（Precision）は、モデルが陽性と予測したもののうち、実際に陽性であった割合です。"
    },
    {
      id: 3,
      question: "再現率（Recall）とは何ですか。",
      options: [
        "適合率と同じ",
        "実際の陽性のうちモデルが正しく陽性と予測した割合（感度）",
        "特異度",
        "陰性的中率"
      ],
      correct: 2,
      explanation: "再現率（Recall、感度）は、実際に陽性であるもののうち、モデルが正しく陽性と予測できた割合です。"
    },
    {
      id: 4,
      question: "F1スコアとは何ですか。",
      options: [
        "適合率の平均",
        "適合率と再現率の調和平均",
        "単純平均",
        "幾何平均"
      ],
      correct: 2,
      explanation: "F1スコアは、適合率と再現率の調和平均で、両者のバランスを考慮した総合的な評価指標です。"
    },
    {
      id: 5,
      question: "特徴量エンジニアリングとは何ですか。",
      options: [
        "モデルの選択",
        "ドメイン知識を活用して有用な特徴量を作成・選択",
        "データ収集",
        "モデルの評価"
      ],
      correct: 2,
      explanation: "特徴量エンジニアリングは、ドメイン知識を活用して元のデータから有用な特徴量を作成・変換・選択するプロセスです。"
    },
    {
      id: 6,
      question: "次元の呪い（curse of dimensionality）とは何ですか。",
      options: [
        "データが多すぎる",
        "次元が高くなるとデータがスパースになり学習が困難",
        "次元が低すぎる",
        "計算が速くなる"
      ],
      correct: 2,
      explanation: "次元の呪いは、特徴量の次元が増えると空間が指数的に大きくなり、データがスパース（疎）になって学習が困難になる現象です。"
    },
    {
      id: 7,
      question: "主成分分析（PCA）の機械学習における用途は何ですか。",
      options: [
        "分類",
        "次元削減による前処理",
        "クラスタリング",
        "回帰"
      ],
      correct: 2,
      explanation: "機械学習ではPCAは、高次元データを低次元に圧縮する前処理として使われ、次元の呪いを軽減し計算効率を向上させます。"
    },
    {
      id: 8,
      question: "データの標準化（standardization）の目的は何ですか。",
      options: [
        "データを増やす",
        "各特徴量のスケールを揃えて学習を安定化",
        "外れ値を増やす",
        "データを削除"
      ],
      correct: 2,
      explanation: "標準化は、各特徴量を平均0・分散1に変換し、スケールの異なる特徴量を公平に扱えるようにして学習を安定化させます。"
    },
    {
      id: 9,
      question: "欠損値の処理方法として適切でないものはどれですか。",
      options: [
        "平均値で補完",
        "すべて0で埋める（理由なく）",
        "モデルベースの補完",
        "リストワイズ削除（慎重に）"
      ],
      correct: 2,
      explanation: "欠損値を理由なくすべて0で埋めるのは不適切です。データの性質や欠損メカニズムに応じた適切な補完方法を選ぶべきです。"
    },
    {
      id: 10,
      question: "統計学と機械学習の関係として正しいものはどれですか。",
      options: [
        "完全に別物",
        "統計学は機械学習の理論的基盤の一つ",
        "機械学習に統計学は不要",
        "統計学の方が常に優れている"
      ],
      correct: 2,
      explanation: "統計学は機械学習の重要な理論的基盤の一つです。確率論、推測統計、モデル評価など、多くの統計的概念が機械学習で使われています。"
    }
  ];

  useEffect(() => {
    const best = getBestScore('grade3-section10_applied_3');
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
      examId: 'grade3-section10_applied_3',
      examTitle: '3級 Section10_Applied_3',
      grade: '3級',
      score,
      totalQuestions: questions.length,
      percentage,
      passed: percentage >= 60
    });
    
    const best = getBestScore('grade3-section10_applied_3');
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
              🎯 3級 - 応用トピック セット3
            </h1>
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">ベイズ統計・機械学習の基礎を学びましょう</p>
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