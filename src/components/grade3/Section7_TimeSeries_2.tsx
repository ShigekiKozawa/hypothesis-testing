import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Grade3Section7Set2() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 1,
      question: "ARIMAモデルとは何ですか。",
      options: [
        "ARモデルだけ",
        "AR、差分、MAを組み合わせたモデル",
        "季節変動だけのモデル",
        "回帰分析のモデル"
      ],
      correct: 2,
      explanation: "ARIMAモデルは、自己回帰(AR)、差分(I:Integrated)、移動平均(MA)を組み合わせた時系列予測モデルです。"
    },
    {
      id: 2,
      question: "差分をとる目的は何ですか。",
      options: [
        "データを増やす",
        "非定常データを定常データに変換する",
        "外れ値を増やす",
        "分散を大きくする"
      ],
      correct: 2,
      explanation: "差分をとることで、トレンドを除去し、非定常な時系列データを定常な時系列に変換できます。"
    },
    {
      id: 3,
      question: "SARIMAモデルとは何ですか。",
      options: [
        "ARIMAと同じ",
        "季節性を考慮したARIMAモデル",
        "MAモデルだけ",
        "回帰モデル"
      ],
      correct: 2,
      explanation: "SARIMAモデルは、季節変動（Seasonal）を考慮したARIMAモデルです。"
    },
    {
      id: 4,
      question: "単位根検定（ADF検定）の目的は何ですか。",
      options: [
        "季節性の検定",
        "定常性の検定",
        "正規性の検定",
        "独立性の検定"
      ],
      correct: 2,
      explanation: "単位根検定（ADF検定など）は、時系列データが定常かどうかを検定する方法です。"
    },
    {
      id: 5,
      question: "ACF（自己相関関数）とは何ですか。",
      options: [
        "偏自己相関",
        "異なるラグにおける自己相関の値",
        "回帰係数",
        "決定係数"
      ],
      correct: 2,
      explanation: "ACF（自己相関関数）は、異なるラグ（時間差）における自己相関係数を表す関数です。"
    },
    {
      id: 6,
      question: "PACF（偏自己相関関数）とは何ですか。",
      options: [
        "通常の自己相関",
        "間のラグの影響を除いた自己相関",
        "移動平均",
        "トレンド"
      ],
      correct: 2,
      explanation: "PACF（偏自己相関関数）は、間のラグの影響を取り除いた、特定のラグにおける自己相関を表します。"
    },
    {
      id: 7,
      question: "ホワイトノイズとは何ですか。",
      options: [
        "トレンドのあるデータ",
        "平均0、一定の分散で独立な確率変数の系列",
        "季節変動のあるデータ",
        "自己相関の強いデータ"
      ],
      correct: 2,
      explanation: "ホワイトノイズは、平均0、一定の分散で、時点間に相関のない（独立な）純粋なランダム変動です。"
    },
    {
      id: 8,
      question: "VARモデル（ベクトル自己回帰モデル）とは何ですか。",
      options: [
        "1つの時系列のみ扱う",
        "複数の時系列を同時に扱う多変量モデル",
        "季節変動のみ扱う",
        "トレンドのみ扱う"
      ],
      correct: 2,
      explanation: "VARモデルは、複数の時系列変数を同時に扱い、変数間の動的な関係を分析する多変量時系列モデルです。"
    },
    {
      id: 9,
      question: "Granger因果性検定とは何ですか。",
      options: [
        "相関係数の検定",
        "ある時系列が別の時系列の予測に役立つかを検定",
        "正規性の検定",
        "等分散性の検定"
      ],
      correct: 2,
      explanation: "Granger因果性検定は、ある時系列変数が別の時系列変数を予測するのに統計的に有用かどうかを検定します。"
    },
    {
      id: 10,
      question: "共和分とは何ですか。",
      options: [
        "すべての変数が定常",
        "非定常な変数の線形結合が定常になる関係",
        "すべての変数が非定常",
        "変数間に相関がない"
      ],
      correct: 2,
      explanation: "共和分は、個々の時系列は非定常でも、それらの線形結合が定常になる長期的な均衡関係です。"
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
              📈 3級 - 時系列分析 セット2
            </h1>
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">時系列データの基礎と予測手法を学びましょう</p>
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