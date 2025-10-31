import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Grade3Section5Set2() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    {
      id: 1,
      question: "Levene検定の目的は何ですか。",
      options: [
        "平均の検定",
        "等分散性の検定",
        "正規性の検定",
        "独立性の検定"
      ],
      correct: 2,
      explanation: "Levene検定は、複数の群の分散が等しいか（等分散性）を検定する方法で、分散分析の前提条件の確認に使われます。"
    },
    {
      id: 2,
      question: "共分散分析（ANCOVA）とは何ですか。",
      options: [
        "分散だけを分析",
        "共変量を考慮した分散分析",
        "相関係数の分析",
        "回帰分析と同じ"
      ],
      correct: 2,
      explanation: "共分散分析（ANCOVA）は、目的変数に影響する共変量（連続変数）を考慮しながら群間の平均を比較する分析です。"
    },
    {
      id: 3,
      question: "実験計画法における「ブロック」とは何ですか。",
      options: [
        "実験を中断すること",
        "交絡因子を制御するための単位",
        "外れ値のこと",
        "サンプルサイズ"
      ],
      correct: 2,
      explanation: "ブロックは、実験の精度を高めるために、実験単位を交絡因子（例：時間、場所）で層別化したグループのことです。"
    },
    {
      id: 4,
      question: "乱塊法（ランダム化ブロック法）の目的は何ですか。",
      options: [
        "サンプルサイズを減らす",
        "ブロック内で処理をランダムに割り当て、ブロック間の変動を除去",
        "外れ値を除去",
        "計算を簡単にする"
      ],
      correct: 2,
      explanation: "乱塊法は、ブロック内で処理をランダムに割り当て、ブロック間の系統的な変動を除去することで検定の精度を高めます。"
    },
    {
      id: 5,
      question: "ラテン方格法とは何ですか。",
      options: [
        "1つの交絡因子を制御",
        "2つの交絡因子を同時に制御する実験計画法",
        "3つ以上の因子を扱う方法",
        "サンプル抽出法"
      ],
      correct: 2,
      explanation: "ラテン方格法は、行と列の2つの交絡因子を同時に制御できる効率的な実験計画法です。"
    },
    {
      id: 6,
      question: "要因実験とは何ですか。",
      options: [
        "1つの因子だけを調べる",
        "複数の因子を同時に変化させて調べる実験",
        "観察研究",
        "時系列実験"
      ],
      correct: 2,
      explanation: "要因実験は、複数の因子を同時に変化させて、各因子の主効果と交互作用を効率的に調べる実験です。"
    },
    {
      id: 7,
      question: "2^k要因実験の「k」は何を表しますか。",
      options: [
        "繰り返し回数",
        "因子の数",
        "水準の数",
        "サンプルサイズ"
      ],
      correct: 2,
      explanation: "2^k要因実験のkは因子の数を表します。各因子が2水準（例：あり/なし）のk個の因子を扱います。"
    },
    {
      id: 8,
      question: "一部実施要因実験の目的は何ですか。",
      options: [
        "すべての組み合わせを実験する",
        "実験回数を減らしながら主要な効果を調べる",
        "外れ値を除去する",
        "正規性を改善する"
      ],
      correct: 2,
      explanation: "一部実施要因実験（フラクショナル実験）は、すべての組み合わせの一部だけを実験し、実験回数を減らします。"
    },
    {
      id: 9,
      question: "直交配列表の利点は何ですか。",
      options: [
        "計算が複雑",
        "少ない実験回数で多くの因子を効率的に調べられる",
        "交互作用がすべて分かる",
        "外れ値に強い"
      ],
      correct: 2,
      explanation: "直交配列表を用いると、少ない実験回数で多くの因子の主効果を効率的に調べることができます。"
    },
    {
      id: 10,
      question: "完全無作為化計画とは何ですか。",
      options: [
        "ブロックを使う計画",
        "処理を実験単位に完全にランダムに割り当てる計画",
        "時系列で処理を割り当てる",
        "共変量を使う計画"
      ],
      correct: 2,
      explanation: "完全無作為化計画は、すべての実験単位に対して処理を完全にランダムに割り当てる最も基本的な実験計画です。"
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
              🧪 3級 - 実験計画法・分散分析 セット2
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