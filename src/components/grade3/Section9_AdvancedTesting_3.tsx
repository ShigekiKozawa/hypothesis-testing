import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Grade3Section9Set3() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 1,
      question: "生存時間解析とは何ですか。",
      options: [
        "回帰分析",
        "イベント発生までの時間を分析",
        "クラスター分析",
        "主成分分析"
      ],
      correct: 2,
      explanation: "生存時間解析（サバイバル分析）は、死亡や再発などのイベント発生までの時間を分析する手法です。"
    },
    {
      id: 2,
      question: "Kaplan-Meier法とは何ですか。",
      options: [
        "回帰分析",
        "打ち切りを考慮した生存率の推定法",
        "分散分析",
        "クラスター分析"
      ],
      correct: 2,
      explanation: "Kaplan-Meier法は、打ち切り（censoring）データを適切に扱いながら生存率を推定する非パラメトリック手法です。"
    },
    {
      id: 3,
      question: "Log-rank検定とは何ですか。",
      options: [
        "平均の検定",
        "2群以上の生存曲線を比較する検定",
        "分散の検定",
        "相関の検定"
      ],
      correct: 2,
      explanation: "Log-rank検定は、2群以上の生存曲線（生存時間分布）に差があるかを検定する方法です。"
    },
    {
      id: 4,
      question: "Cox比例ハザードモデルとは何ですか。",
      options: [
        "線形回帰モデル",
        "生存時間に影響する複数の要因を分析する回帰モデル",
        "ロジスティック回帰",
        "時系列モデル"
      ],
      correct: 2,
      explanation: "Cox比例ハザードモデルは、生存時間に影響する複数の説明変数を同時に扱える準パラメトリック回帰モデルです。"
    },
    {
      id: 5,
      question: "ハザード比とは何ですか。",
      options: [
        "オッズ比",
        "瞬間的なイベント発生リスクの比",
        "相対リスク",
        "決定係数"
      ],
      correct: 2,
      explanation: "ハザード比は、ある時点での瞬間的なイベント発生率（ハザード）の群間比で、生存時間解析で使われます。"
    },
    {
      id: 6,
      question: "メタアナリシスとは何ですか。",
      options: [
        "1つの研究の分析",
        "複数の研究結果を統合して分析",
        "時系列分析",
        "主成分分析"
      ],
      correct: 2,
      explanation: "メタアナリシスは、同じテーマの複数の独立した研究結果を統計的に統合し、総合的な結論を導く手法です。"
    },
    {
      id: 7,
      question: "傾向スコア分析とは何ですか。",
      options: [
        "時系列の傾向を分析",
        "観察研究で選択バイアスを調整する手法",
        "主成分分析",
        "因子分析"
      ],
      correct: 2,
      explanation: "傾向スコア分析は、観察研究において処理群と対照群の背景因子を調整し、選択バイアスを減らす手法です。"
    },
    {
      id: 8,
      question: "層別解析とは何ですか。",
      options: [
        "全データを一括分析",
        "交絡因子で層別化して分析",
        "時系列分析",
        "クラスター分析"
      ],
      correct: 2,
      explanation: "層別解析は、交絡因子によってデータを層に分け、各層で分析することで交絡の影響を制御する方法です。"
    },
    {
      id: 9,
      question: "交絡とは何ですか。",
      options: [
        "独立変数と従属変数の関係",
        "第3の変数が原因と結果の両方に影響し、見かけの関連を生む",
        "測定誤差",
        "外れ値"
      ],
      correct: 2,
      explanation: "交絡は、第3の変数（交絡因子）が原因と結果の両方に影響を与え、見かけの関連や過小評価を生む現象です。"
    },
    {
      id: 10,
      question: "媒介分析とは何ですか。",
      options: [
        "相関分析",
        "原因と結果の間の媒介変数の効果を分析",
        "分散分析",
        "主成分分析"
      ],
      correct: 2,
      explanation: "媒介分析は、原因から結果への効果が媒介変数を通じてどの程度伝わるか（間接効果）を分析する手法です。"
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
              🧪 3級 - 統計的検定の応用 セット3
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
            <span className="bg-purple-100 px-3 py-1 rounded-full">セット3/3</span>
            <span>全10問</span>
          </div>
        </div>

        <div className="space-y-6">
          {questions.map((q, index) => (
            <div key={q.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg text-base font-bold">
                    問題 {index + 1}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 whitespace-pre-line leading-relaxed mb-4">
                  {q.question}
                </h2>
              </div>

              <div className="space-y-3">
                {q.options.map((option, optIndex) => {
                  const optionNum = optIndex + 1;
                  const isSelected = answers[q.id] === optionNum;
                  
                  return (
                    <button
                      key={optIndex}
                      onClick={() => handleAnswer(q.id, optionNum)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all font-medium ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50 shadow-md'
                          : 'border-gray-300 bg-white hover:border-purple-400 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${
                          isSelected
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}>
                          {optionNum}
                        </span>
                        <span className="text-gray-800 leading-relaxed pt-1">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            ✓ 採点する
          </button>
        </div>
      </div>
    </div>
  );
}

