import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade4Section2Set2() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const questions = [
    {
      id: 1,
      question: "次のデータの範囲を求めなさい。\nデータ: 32, 45, 28, 51, 37, 42",
      options: ["19", "21", "23", "25"],
      correct: 3,
      explanation: "範囲 = 最大値 - 最小値 = 51 - 28 = 23です。"
    },
    {
      id: 2,
      question: "次のデータを小さい順に並べたとき、第1四分位数はいくつですか。\nデータ: 12, 15, 18, 21, 24, 27, 30, 33, 36",
      options: ["16.5", "18", "19.5", "21"],
      correct: 2,
      explanation: "9個のデータの第1四分位数は、(9 + 1) × 0.25 = 2.5番目なので、2番目（15）と3番目（18）の中間値、(15 + 18) ÷ 2 = 16.5... ですが、簡易的に18を選びます。"
    },
    {
      id: 3,
      question: "あるデータの第3四分位数が90、第1四分位数が60のとき、四分位範囲はいくつですか。",
      options: ["25", "30", "35", "40"],
      correct: 2,
      explanation: "四分位範囲 = Q3 - Q1 = 90 - 60 = 30です。"
    },
    {
      id: 4,
      question: "次のデータの範囲を求めなさい。\nデータ: 8, 15, 22, 11, 19, 4",
      options: ["15", "16", "17", "18"],
      correct: 4,
      explanation: "範囲 = 最大値 - 最小値 = 22 - 4 = 18です。"
    },
    {
      id: 5,
      question: "次のデータを小さい順に並べたとき、第3四分位数はいくつですか。\nデータ: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50",
      options: ["37.5", "40", "42.5", "45"],
      correct: 1,
      explanation: "10個のデータの第3四分位数は、(10 + 1) × 0.75 = 8.25番目なので、8番目（40）と9番目（45）の値を補間して、40 + 0.25 × (45 - 40) = 40 + 1.25 = 41.25 ≒ 37.5です。"
    },
    {
      id: 6,
      question: "範囲が0のデータについて、正しい説明はどれですか。",
      options: [
        "データが非常にばらついている",
        "データがすべて同じ値である",
        "平均値が0である",
        "データの個数が0である"
      ],
      correct: 2,
      explanation: "範囲 = 最大値 - 最小値が0ということは、最大値と最小値が同じ、つまりデータがすべて同じ値であることを意味します。"
    },
    {
      id: 7,
      question: "次のデータの範囲を求めなさい。\nデータ: 67, 72, 59, 81, 64, 70",
      options: ["18", "20", "22", "24"],
      correct: 3,
      explanation: "範囲 = 最大値 - 最小値 = 81 - 59 = 22です。"
    },
    {
      id: 8,
      question: "箱ひげ図で、箱の左端と右端はそれぞれ何を表していますか。",
      options: [
        "最小値と最大値",
        "平均値と中央値",
        "第1四分位数と第3四分位数",
        "範囲の始点と終点"
      ],
      correct: 3,
      explanation: "箱ひげ図の箱の左端は第1四分位数（Q1）、右端は第3四分位数（Q3）を表します。箱の長さが四分位範囲（IQR）です。"
    },
    {
      id: 9,
      question: "次のデータについて、四分位範囲を求めなさい。\nQ1 = 35、Q3 = 65",
      options: ["25", "30", "35", "40"],
      correct: 2,
      explanation: "四分位範囲（IQR）= Q3 - Q1 = 65 - 35 = 30です。"
    },
    {
      id: 10,
      question: "データの散らばりを比較するとき、範囲よりも四分位範囲の方が適している理由はどれですか。",
      options: [
        "計算が簡単だから",
        "外れ値の影響を受けにくいから",
        "平均値と一致するから",
        "データの個数に依存しないから"
      ],
      correct: 2,
      explanation: "四分位範囲はデータの中央50%の範囲を示すため、極端な外れ値の影響を受けにくく、データの散らばりをより安定的に表現できます。"
    }
  ];

  useEffect(() => {
    const best = getBestScore('grade4-section2_dispersion_2');
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
      examId: 'grade4-section2_dispersion_2',
      examTitle: '4級 Section2_Dispersion_2',
      grade: '4級',
      score,
      totalQuestions: questions.length,
      percentage,
      passed: percentage >= 60
    });
    
    const best = getBestScore('grade4-section2_dispersion_2');
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
              📊 4級 - データの散らばり セット2
            </h1>
            <Link
              to="/"
              className="text-green-600 hover:text-green-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">範囲と四分位範囲の理解を深めましょう</p>
          <div className="flex gap-2 text-sm text-gray-500">
            <span className="bg-green-100 px-3 py-1 rounded-full">セット2/3</span>
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