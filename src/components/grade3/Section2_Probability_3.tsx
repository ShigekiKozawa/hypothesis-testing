import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Grade3Section2Set3() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 1,
      question: "F分布が使われる場面として適切なものはどれですか。",
      options: [
        "1つの母集団の平均の検定",
        "2つの母集団の分散の比の検定",
        "比率の検定",
        "相関の検定"
      ],
      correct: 2,
      explanation: "F分布は、2つの母集団の分散の比を検定する際に使われます（分散分析など）。"
    },
    {
      id: 2,
      question: "大数の法則とは何ですか。",
      options: [
        "サンプルサイズが大きいほど標本平均が母平均に近づく",
        "サンプルサイズが大きいほど分散が大きくなる",
        "標本平均は必ず正規分布になる",
        "平均値と中央値が等しくなる"
      ],
      correct: 1,
      explanation: "大数の法則により、サンプルサイズが大きくなるほど、標本平均は母平均に近づきます。"
    },
    {
      id: 3,
      question: "ガンマ分布の特徴として正しいものはどれですか。",
      options: [
        "離散型の分布",
        "負の値をとる",
        "指数分布を一般化した分布",
        "常に対称"
      ],
      correct: 3,
      explanation: "ガンマ分布は指数分布を一般化した連続型確率分布で、待ち時間の分布を表すことができます。"
    },
    {
      id: 4,
      question: "ベータ分布の特徴として正しいものはどれですか。",
      options: [
        "0から1の範囲の値をとる",
        "負の値をとる",
        "離散型の分布",
        "無限の範囲の値をとる"
      ],
      correct: 1,
      explanation: "ベータ分布は0から1の範囲の値をとる連続型確率分布で、確率や比率のモデル化に使われます。"
    },
    {
      id: 5,
      question: "多項分布とは何ですか。",
      options: [
        "2つの結果の試行",
        "3つ以上の結果がある試行を繰り返す場合の分布",
        "連続型の分布",
        "1つの結果しかない試行"
      ],
      correct: 2,
      explanation: "多項分布は、サイコロのように3つ以上の結果がある試行を繰り返す場合の各結果の出現回数の同時分布です。"
    },
    {
      id: 6,
      question: "対数正規分布の特徴として正しいものはどれですか。",
      options: [
        "対数をとると正規分布になる",
        "負の値をとる",
        "離散型の分布",
        "常に対称"
      ],
      correct: 1,
      explanation: "対数正規分布は、その対数をとると正規分布になる分布です。株価や所得分布などのモデル化に使われます。"
    },
    {
      id: 7,
      question: "ワイブル分布が使われる場面として適切なものはどれですか。",
      options: [
        "試験の得点分布",
        "製品の寿命や故障時間の分布",
        "身長の分布",
        "投票結果の分布"
      ],
      correct: 2,
      explanation: "ワイブル分布は、製品の寿命や故障時間など、信頼性工学の分野で使われる分布です。"
    },
    {
      id: 8,
      question: "コーシー分布の特徴として正しいものはどれですか。",
      options: [
        "平均値が存在する",
        "分散が存在する",
        "平均値も分散も存在しない",
        "離散型の分布"
      ],
      correct: 3,
      explanation: "コーシー分布は裾が非常に厚く、平均値も分散も定義されない特殊な連続型確率分布です。"
    },
    {
      id: 9,
      question: "確率変数の独立性とは何ですか。",
      options: [
        "2つの変数の値が互いに影響しないこと",
        "2つの変数が等しいこと",
        "2つの変数の和が一定",
        "2つの変数の積が一定"
      ],
      correct: 1,
      explanation: "2つの確率変数が独立とは、一方の値が他方の値に影響を与えないことです。独立なら同時確率は周辺確率の積になります。"
    },
    {
      id: 10,
      question: "条件付き確率P(A|B)とは何ですか。",
      options: [
        "AとBが同時に起こる確率",
        "Bが起こったときにAが起こる確率",
        "AまたはBが起こる確率",
        "Aが起こらない確率"
      ],
      correct: 2,
      explanation: "条件付き確率P(A|B)は、事象Bが起こったという条件の下で事象Aが起こる確率です。"
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
              🎲 3級 - 確率分布 セット3
            </h1>
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">離散型・連続型確率分布の基礎を学びましょう</p>
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

