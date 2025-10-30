import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Grade4Section5Set2() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 1,
      question: "トランプ52枚から1枚引くとき、ハートが出る確率はいくつですか。",
      options: ["1/13", "1/4", "1/3", "1/2"],
      correct: 2,
      explanation: "トランプは4種類（ハート、ダイヤ、スペード、クラブ）あり、各13枚ずつです。ハートは13枚なので、確率は 13/52 = 1/4 です。"
    },
    {
      id: 2,
      question: "サイコロを1回投げるとき、3の倍数の目が出る確率はいくつですか。",
      options: ["1/6", "1/3", "1/2", "2/3"],
      correct: 2,
      explanation: "3の倍数の目は3と6の2通りで、全体は6通りです。よって確率は 2/6 = 1/3 です。"
    },
    {
      id: 3,
      question: "赤玉4個、青玉6個が入った袋から1個取り出すとき、青玉が出る確率はいくつですか。",
      options: ["2/5", "3/5", "2/3", "4/5"],
      correct: 2,
      explanation: "玉の総数は10個で、青玉は6個です。よって確率は 6/10 = 3/5 です。"
    },
    {
      id: 4,
      question: "1から20までの数字が書かれたカードから1枚引くとき、10より大きい数字が出る確率はいくつですか。",
      options: ["1/4", "2/5", "1/2", "3/5"],
      correct: 3,
      explanation: "10より大きい数字は11〜20の10通りで、全体は20通りです。よって確率は 10/20 = 1/2 です。"
    },
    {
      id: 5,
      question: "コインを2回投げるとき、全体で何通りの結果がありますか。",
      options: ["2通り", "3通り", "4通り", "6通り"],
      correct: 3,
      explanation: "1回目が表か裏の2通り、2回目も表か裏の2通りなので、2 × 2 = 4通りです。（表表、表裏、裏表、裏裏）"
    },
    {
      id: 6,
      question: "コインを2回投げるとき、2回とも表が出る確率はいくつですか。",
      options: ["1/8", "1/4", "1/3", "1/2"],
      correct: 2,
      explanation: "全体は4通り（表表、表裏、裏表、裏裏）で、2回とも表は1通りです。よって確率は 1/4 です。"
    },
    {
      id: 7,
      question: "サイコロを1回投げるとき、5以上の目が出る確率はいくつですか。",
      options: ["1/6", "1/4", "1/3", "1/2"],
      correct: 3,
      explanation: "5以上の目は5と6の2通りで、全体は6通りです。よって確率は 2/6 = 1/3 です。"
    },
    {
      id: 8,
      question: "A、B、C、D、Eの5人からくじ引きで1人選ぶとき、AまたはBが選ばれる確率はいくつですか。",
      options: ["1/5", "2/5", "1/2", "3/5"],
      correct: 2,
      explanation: "全体は5人で、AまたはBは2人です。よって確率は 2/5 です。"
    },
    {
      id: 9,
      question: "1から6までの数字が書かれたカードから1枚引くとき、偶数または3が出る確率はいくつですか。",
      options: ["1/2", "2/3", "3/4", "5/6"],
      correct: 2,
      explanation: "偶数は2、4、6の3通り、3を加えると2、3、4、6の4通りです。よって確率は 4/6 = 2/3 です。"
    },
    {
      id: 10,
      question: "ある事象が起こる確率が 1/4 のとき、100回試行したら約何回起こると期待されますか。",
      options: ["10回", "25回", "40回", "50回"],
      correct: 2,
      explanation: "確率が 1/4 = 0.25 なので、100回試行すると 100 × 0.25 = 25回起こると期待されます。"
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
              🎲 4級 - 確率の基礎 セット2
            </h1>
            <Link
              to="/"
              className="text-green-600 hover:text-green-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">確率の基本的な考え方を学びましょう</p>
          <div className="flex gap-2 text-sm text-gray-500">
            <span className="bg-green-100 px-3 py-1 rounded-full">セット2/3</span>
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

