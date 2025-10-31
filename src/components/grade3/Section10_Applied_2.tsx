import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Grade3Section10Set2() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    {
      id: 1,
      question: "バイアス-バリアンストレードオフとは何ですか。",
      options: [
        "バイアスとバリアンスは独立",
        "モデルの複雑さを変えるとバイアスとバリアンスがトレードオフの関係",
        "常にバイアスを優先",
        "常にバリアンスを優先"
      ],
      correct: 2,
      explanation: "バイアス-バリアンストレードオフは、モデルが複雑になるとバイアスは減るがバリアンスが増え、逆も然りというトレードオフの関係です。"
    },
    {
      id: 2,
      question: "アンサンブル学習とは何ですか。",
      options: [
        "1つのモデルだけ使用",
        "複数のモデルを組み合わせて予測性能を向上",
        "データを減らす",
        "特徴量を減らす"
      ],
      correct: 2,
      explanation: "アンサンブル学習は、複数の学習モデルを組み合わせることで、単一モデルより高い予測性能を達成する手法です。"
    },
    {
      id: 3,
      question: "バギング（Bagging）の特徴は何ですか。",
      options: [
        "逐次的に学習",
        "ブートストラップサンプルで並列に学習してバリアンスを削減",
        "バイアスを削減",
        "1つのモデルだけ"
      ],
      correct: 2,
      explanation: "バギングは、ブートストラップサンプルから複数のモデルを並列に学習し、平均化することでバリアンスを削減します。"
    },
    {
      id: 4,
      question: "ブースティング（Boosting）の特徴は何ですか。",
      options: [
        "並列に学習",
        "逐次的に弱学習器を組み合わせてバイアスを削減",
        "バリアンスを削減",
        "ランダムに学習"
      ],
      correct: 2,
      explanation: "ブースティングは、誤分類されたデータに重点を置きながら弱学習器を逐次的に組み合わせ、バイアスを削減する手法です。"
    },
    {
      id: 5,
      question: "ランダムフォレストとは何ですか。",
      options: [
        "1つの決定木",
        "決定木のバギングと特徴量のランダム選択を組み合わせた手法",
        "線形回帰",
        "k-means"
      ],
      correct: 2,
      explanation: "ランダムフォレストは、複数の決定木をバギングで学習し、さらに各分岐で特徴量をランダムに選択する強力なアンサンブル手法です。"
    },
    {
      id: 6,
      question: "決定木の利点は何ですか。",
      options: [
        "解釈が難しい",
        "解釈しやすく、非線形な関係も捉えられる",
        "過学習しにくい",
        "大量のデータ必須"
      ],
      correct: 2,
      explanation: "決定木は、if-then形式で解釈しやすく、非線形な関係や交互作用も自然に捉えられますが、過学習しやすい欠点もあります。"
    },
    {
      id: 7,
      question: "サポートベクターマシン（SVM）の特徴は何ですか。",
      options: [
        "線形分離のみ",
        "カーネルトリックで非線形な境界も扱える",
        "確率的モデル",
        "木構造"
      ],
      correct: 2,
      explanation: "SVMは、マージン最大化による分類手法で、カーネルトリックにより非線形な決定境界も扱えます。"
    },
    {
      id: 8,
      question: "ニューラルネットワークの特徴は何ですか。",
      options: [
        "線形モデル",
        "複数層の非線形変換で複雑なパターンを学習",
        "木構造",
        "ルールベース"
      ],
      correct: 2,
      explanation: "ニューラルネットワークは、複数の層で非線形変換を重ねることで、複雑なパターンや表現を学習できる柔軟なモデルです。"
    },
    {
      id: 9,
      question: "活性化関数の役割は何ですか。",
      options: [
        "線形性を保つ",
        "ニューラルネットワークに非線形性を導入",
        "データを正規化",
        "重みを初期化"
      ],
      correct: 2,
      explanation: "活性化関数（ReLU、sigmoidなど）は、ニューラルネットワークに非線形性を導入し、複雑なパターンを学習可能にします。"
    },
    {
      id: 10,
      question: "ドロップアウトとは何ですか。",
      options: [
        "データを削除",
        "学習中にランダムにニューロンを無効化して過学習を防ぐ",
        "層を削除",
        "重みを削除"
      ],
      correct: 2,
      explanation: "ドロップアウトは、学習中にランダムにニューロンを一時的に無効化することで、過学習を防ぐ正則化手法です。"
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
              🎯 3級 - 応用トピック セット2
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