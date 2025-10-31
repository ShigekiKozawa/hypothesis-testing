import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Grade3Section5Set3() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    {
      id: 1,
      question: "混合モデル（混合効果モデル）とは何ですか。",
      options: [
        "固定効果だけのモデル",
        "変量効果だけのモデル",
        "固定効果と変量効果を両方含むモデル",
        "回帰分析のこと"
      ],
      correct: 3,
      explanation: "混合モデルは、固定効果（研究者が関心を持つ効果）と変量効果（ランダムな効果）を両方含むモデルです。"
    },
    {
      id: 2,
      question: "多変量分散分析（MANOVA）とは何ですか。",
      options: [
        "1つの目的変数を分析",
        "複数の目的変数を同時に分析",
        "複数の説明変数を分析",
        "時系列データの分析"
      ],
      correct: 2,
      explanation: "多変量分散分析（MANOVA）は、複数の目的変数を同時に扱い、群間の差を検定する分析です。"
    },
    {
      id: 3,
      question: "Kruskal-Wallis検定とは何ですか。",
      options: [
        "パラメトリックな分散分析",
        "一元配置分散分析のノンパラメトリック版",
        "相関係数の検定",
        "等分散性の検定"
      ],
      correct: 2,
      explanation: "Kruskal-Wallis検定は、正規性の仮定が満たされない場合の一元配置分散分析のノンパラメトリック版です。"
    },
    {
      id: 4,
      question: "Friedman検定とは何ですか。",
      options: [
        "独立した群の比較",
        "反復測定分散分析のノンパラメトリック版",
        "2群の比較",
        "相関の検定"
      ],
      correct: 2,
      explanation: "Friedman検定は、対応のあるデータ（反復測定）に対する分散分析のノンパラメトリック版です。"
    },
    {
      id: 5,
      question: "Bonferroni法とDunnett法の違いは何ですか。",
      options: [
        "違いはない",
        "Bonferroniはすべての対比較、Dunnettは対照群との比較",
        "Bonferroniは2群、Dunnettは3群以上",
        "Bonferroniはパラメトリック、Dunnettはノンパラメトリック"
      ],
      correct: 2,
      explanation: "Bonferroni法はすべての群間の対比較を行い、Dunnett法は特定の対照群と他の群との比較に特化しています。"
    },
    {
      id: 6,
      question: "Scheffeの方法の特徴は何ですか。",
      options: [
        "検出力が高い",
        "すべての対比（線形結合）に対して保守的",
        "2群の比較だけ",
        "ノンパラメトリック検定"
      ],
      correct: 2,
      explanation: "Scheffeの方法は、すべての可能な対比（線形結合）に対して使える保守的（厳しい）な多重比較法です。"
    },
    {
      id: 7,
      question: "入れ子型（階層型）計画とは何ですか。",
      options: [
        "すべての因子が直交",
        "ある因子の水準が別の因子の水準の中に入れ子になっている",
        "時系列的な計画",
        "ランダムな計画"
      ],
      correct: 2,
      explanation: "入れ子型（階層型）計画は、例えば「学校内のクラス」のように、ある因子の水準が別の因子の中に含まれる構造です。"
    },
    {
      id: 8,
      question: "割付け（スプリットプロット）計画とは何ですか。",
      options: [
        "すべての処理が同じ単位",
        "異なるサイズの実験単位に異なる因子を割り付ける計画",
        "完全無作為化計画",
        "観察研究"
      ],
      correct: 2,
      explanation: "割付け計画は、大きな実験単位（主区）と小さな実験単位（副区）に異なる因子を割り付ける2段階の計画です。"
    },
    {
      id: 9,
      question: "クロスオーバー試験とは何ですか。",
      options: [
        "独立した2群の比較",
        "同一対象が複数の処理を順番に受ける試験",
        "対照群がない試験",
        "観察研究"
      ],
      correct: 2,
      explanation: "クロスオーバー試験は、同一対象が異なる処理を異なる時期に順番に受ける実験デザインです。"
    },
    {
      id: 10,
      question: "盲検化（マスキング）の目的は何ですか。",
      options: [
        "サンプルサイズを減らす",
        "バイアスを減らし、結果の客観性を高める",
        "計算を簡単にする",
        "外れ値を除去する"
      ],
      correct: 2,
      explanation: "盲検化は、被験者や評価者が処理内容を知らないようにすることで、バイアスを減らし結果の客観性を高めます。"
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
              🧪 3級 - 実験計画法・分散分析 セット3
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