import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade3Section9Set1() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const questions = [
    {
      id: 1,
      question: "適合度検定とは何ですか。",
      options: [
        "2つの群の平均を比較",
        "観測度数と期待度数の一致度を検定",
        "相関係数の検定",
        "回帰係数の検定"
      ],
      correct: 2,
      explanation: "適合度検定は、観測されたカテゴリカルデータの度数分布が理論的な分布と一致するかを検定します。"
    },
    {
      id: 2,
      question: "独立性の検定の帰無仮説は何ですか。",
      options: [
        "2つの変数が独立である",
        "2つの変数が相関している",
        "平均が等しい",
        "分散が等しい"
      ],
      correct: 1,
      explanation: "独立性の検定（カイ二乗検定）の帰無仮説は「2つのカテゴリカル変数が独立である（関連がない）」です。"
    },
    {
      id: 3,
      question: "McNemar検定が使われる場面はどれですか。",
      options: [
        "独立した2群の比較",
        "対応のある2値データの比較",
        "3群以上の比較",
        "連続変数の比較"
      ],
      correct: 2,
      explanation: "McNemar検定は、同一対象の前後比較など、対応のある2値データ（2×2分割表）の比較に使われます。"
    },
    {
      id: 4,
      question: "Fisher's exact testの特徴は何ですか。",
      options: [
        "大標本でのみ使用",
        "小標本や期待度数が小さい場合でも正確な確率計算",
        "連続変数のみ",
        "3群以上の比較専用"
      ],
      correct: 2,
      explanation: "Fisher's exact testは、2×2分割表で標本サイズが小さい場合や期待度数が小さい場合でも正確な確率を計算できる検定です。"
    },
    {
      id: 5,
      question: "コクラン・マンテル・ヘンツェル検定とは何ですか。",
      options: [
        "1つの2×2表の検定",
        "層別化された複数の2×2表を統合して検定",
        "連続変数の検定",
        "時系列データの検定"
      ],
      correct: 2,
      explanation: "コクラン・マンテル・ヘンツェル検定は、交絡因子で層別化された複数の2×2分割表を統合して関連性を検定する方法です。"
    },
    {
      id: 6,
      question: "Sign test（符号検定）とは何ですか。",
      options: [
        "正規分布を仮定する検定",
        "差の正負の符号だけを用いるノンパラメトリック検定",
        "分散の検定",
        "相関係数の検定"
      ],
      correct: 2,
      explanation: "符号検定は、対応のある2標本で差の正負の符号だけを用いる最も単純なノンパラメトリック検定です。"
    },
    {
      id: 7,
      question: "コルモゴロフ・スミルノフ検定の用途は何ですか。",
      options: [
        "平均の検定",
        "分布の一致度や正規性の検定",
        "分散の検定",
        "相関の検定"
      ],
      correct: 2,
      explanation: "コルモゴロフ・スミルノフ検定は、データが特定の分布に従うか、または2つの標本が同じ分布から来ているかを検定します。"
    },
    {
      id: 8,
      question: "Jonckheere-Terpstra検定の目的は何ですか。",
      options: [
        "2群の比較",
        "3群以上で順序傾向を検定",
        "独立性の検定",
        "正規性の検定"
      ],
      correct: 2,
      explanation: "Jonckheere-Terpstra検定は、3群以上の順序カテゴリで、順序に沿った傾向があるかを検定するノンパラメトリック検定です。"
    },
    {
      id: 9,
      question: "Runs test（連検定）とは何ですか。",
      options: [
        "平均の検定",
        "データのランダム性（無作為性）を検定",
        "分散の検定",
        "相関の検定"
      ],
      correct: 2,
      explanation: "Runs testは、データ系列におけるランダム性（無作為性）を検定し、パターンや傾向の有無を調べます。"
    },
    {
      id: 10,
      question: "順位相関係数（Spearmanのρ）の特徴は何ですか。",
      options: [
        "線形関係しか測定できない",
        "単調関係を測定でき、外れ値に頑健",
        "正規分布を仮定",
        "カテゴリカルデータ専用"
      ],
      correct: 2,
      explanation: "Spearmanの順位相関係数は、単調な関係を測定でき、外れ値の影響を受けにくいノンパラメトリックな相関係数です。"
    }
  ];

  useEffect(() => {
    const best = getBestScore('grade3-section9_advancedtesting_1');
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
      examId: 'grade3-section9_advancedtesting_1',
      examTitle: '3級 Section9_AdvancedTesting_1',
      grade: '3級',
      score,
      totalQuestions: questions.length,
      percentage,
      passed: percentage >= 60
    });
    
    const best = getBestScore('grade3-section9_advancedtesting_1');
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
              🧪 3級 - 統計的検定の応用 セット1
            </h1>
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">カイ二乗検定・ノンパラメトリック検定の応用を学びましょう</p>
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