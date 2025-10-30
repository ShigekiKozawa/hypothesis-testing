import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Grade4Section6Set3() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 1,
      question: "テレビの視聴時間と学力の関係は、一般的にどのような相関ですか。",
      options: ["正の相関", "負の相関", "相関がない", "判断できない"],
      correct: 2,
      explanation: "一般的にテレビの視聴時間が長いほど学力は低下する傾向があるので、負の相関です。"
    },
    {
      id: 2,
      question: "読書量と語彙力の関係は、どのような相関ですか。",
      options: ["正の相関", "負の相関", "相関がない", "判断できない"],
      correct: 1,
      explanation: "読書量が多いほど語彙力も高まる傾向があるので、正の相関です。"
    },
    {
      id: 3,
      question: "父親の身長と息子の身長の関係は、どのような相関ですか。",
      options: ["正の相関", "負の相関", "相関がない", "判断できない"],
      correct: 1,
      explanation: "遺伝的要因により、父親の身長が高いと息子の身長も高い傾向があるので、正の相関です。"
    },
    {
      id: 4,
      question: "自動車の速度と燃費の関係は、一般的にどのような相関ですか（高速走行の場合）。",
      options: ["正の相関", "負の相関", "相関がない", "判断できない"],
      correct: 2,
      explanation: "速度が上がると燃費は悪くなる（走行距離が短くなる）傾向があるので、負の相関です。"
    },
    {
      id: 5,
      question: "散布図で点が完全に直線状に並んでいる場合、相関係数はいくつですか。",
      options: ["0", "0.5", "+1または-1", "判断できない"],
      correct: 3,
      explanation: "点が完全に直線状に並んでいる場合、完全な相関があり、相関係数は+1（正の相関）または-1（負の相関）です。"
    },
    {
      id: 6,
      question: "相関関係と因果関係の違いとして、最も適切なものはどれですか。",
      options: [
        "相関関係があれば必ず因果関係がある",
        "因果関係があれば必ず相関関係がある",
        "相関関係と因果関係は同じ意味である",
        "相関関係があっても因果関係があるとは限らない"
      ],
      correct: 4,
      explanation: "相関関係は2つの変数に関連性があることを示しますが、必ずしも一方が他方の原因であるとは限りません。"
    },
    {
      id: 7,
      question: "広告費と売上の関係で、相関係数が+0.7だった場合、どう解釈すべきですか。",
      options: [
        "広告費を増やせば必ず売上が70%増える",
        "広告費と売上には強い正の相関がある",
        "広告費と売上には相関がない",
        "広告費を減らすと売上が増える"
      ],
      correct: 2,
      explanation: "相関係数+0.7は強い正の相関を示します。広告費が増えると売上も増える傾向がありますが、必ずしも70%増えるわけではありません。"
    },
    {
      id: 8,
      question: "次のうち、偽の相関（見せかけの相関）の例として最も適切なものはどれですか。",
      options: [
        "運動量と心肺機能",
        "喫煙量と肺がんリスク",
        "アイスクリームの売上と海水浴客の数",
        "降水量と傘の売上"
      ],
      correct: 3,
      explanation: "アイスクリームの売上と海水浴客は両方とも気温という第3の変数の影響を受けていますが、直接の因果関係はありません。これは偽の相関の例です。"
    },
    {
      id: 9,
      question: "散布図で外れ値（他の点から大きく離れた点）がある場合、どうすべきですか。",
      options: [
        "必ず削除する",
        "無視する",
        "原因を調査し、適切に判断する",
        "常にそのまま使用する"
      ],
      correct: 3,
      explanation: "外れ値は誤りの場合もあれば、重要な情報を含む場合もあります。原因を調査して適切に判断することが重要です。"
    },
    {
      id: 10,
      question: "相関係数の値の範囲として、正しいものはどれですか。",
      options: [
        "0から1まで",
        "-1から0まで",
        "-1から+1まで",
        "-∞から+∞まで"
      ],
      correct: 3,
      explanation: "相関係数は-1から+1の範囲の値をとります。-1は完全な負の相関、+1は完全な正の相関、0は相関なしを示します。"
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              📊 結果
            </h1>
            
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-br from-green-500 to-green-700 text-white rounded-lg px-12 py-8 shadow-xl">
                <p className="text-6xl font-bold mb-2">{score}/{questions.length}</p>
                <p className="text-2xl">正答率: {percentage.toFixed(0)}%</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={resetExam}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
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
                  isCorrect ? 'border-green-500' : 'border-red-500'
                }`}>
                  <div className="flex items-start gap-3 mb-4">
                    <span className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                      isCorrect ? 'bg-green-500' : 'bg-red-500'
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
                    
                    <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              📈 4級 - 相関と散布図 セット3
            </h1>
            <Link
              to="/"
              className="text-green-600 hover:text-green-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">2つの変数の関係と散布図の読み方を学びましょう</p>
          <div className="flex gap-2 text-sm text-gray-500">
            <span className="bg-green-100 px-3 py-1 rounded-full">セット3/3</span>
            <span>全10問</span>
          </div>
        </div>

        <div className="space-y-6">
          {questions.map((q, index) => (
            <div key={q.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-base font-bold">
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

