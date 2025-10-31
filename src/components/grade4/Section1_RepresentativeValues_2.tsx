import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade4Section1Set2() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const questions = [
    {
      id: 1,
      question: "次のデータの平均値を求めなさい。\nデータ: 6, 8, 10, 12, 14",
      options: ["8", "9", "10", "11"],
      correct: 3,
      explanation: "平均値 = (6 + 8 + 10 + 12 + 14) ÷ 5 = 50 ÷ 5 = 10です。"
    },
    {
      id: 2,
      question: "次のデータを小さい順に並べたとき、中央値はいくつですか。\nデータ: 20, 15, 25, 10, 18",
      options: ["15", "17", "18", "20"],
      correct: 3,
      explanation: "データを小さい順に並べると: 10, 15, 18, 20, 25。5個のデータなので、中央値は真ん中の3番目の値である18です。"
    },
    {
      id: 3,
      question: "次のデータで最頻値はいくつですか。\nデータ: 7, 8, 7, 9, 7, 10, 8",
      options: ["7", "8", "9", "10"],
      correct: 1,
      explanation: "7が3回出現し、最も多く現れています。したがって、最頻値は7です。"
    },
    {
      id: 4,
      question: "次のデータの平均値を求めなさい。\nデータ: 15, 18, 21, 24, 27",
      options: ["19", "20", "21", "22"],
      correct: 3,
      explanation: "平均値 = (15 + 18 + 21 + 24 + 27) ÷ 5 = 105 ÷ 5 = 21です。"
    },
    {
      id: 5,
      question: "次のデータを小さい順に並べたとき、中央値はいくつですか。\nデータ: 4, 8, 2, 10, 6, 12",
      options: ["6", "7", "8", "9"],
      correct: 2,
      explanation: "データを小さい順に並べると: 2, 4, 6, 8, 10, 12。6個のデータなので、中央値は真ん中の2つの値（6と8）の平均で、(6 + 8) ÷ 2 = 7です。"
    },
    {
      id: 6,
      question: "次のデータで最頻値はいくつですか。\nデータ: 5, 5, 6, 6, 6, 7, 8",
      options: ["5", "6", "7", "8"],
      correct: 2,
      explanation: "6が3回出現し、最も多く現れています。したがって、最頻値は6です。"
    },
    {
      id: 7,
      question: "あるお店の1週間の売上が、12万円、15万円、13万円、18万円、16万円、14万円、17万円でした。平均売上は何万円ですか。",
      options: ["14万円", "15万円", "16万円", "17万円"],
      correct: 2,
      explanation: "平均売上 = (12 + 15 + 13 + 18 + 16 + 14 + 17) ÷ 7 = 105 ÷ 7 = 15万円です。"
    },
    {
      id: 8,
      question: "次のデータで、中央値を求めなさい。\nデータ: 30, 40, 50, 60, 70, 80, 90",
      options: ["50", "55", "60", "65"],
      correct: 3,
      explanation: "7個のデータを小さい順に並べると、中央値は4番目の値である60です。"
    },
    {
      id: 9,
      question: "次のデータで最頻値が2つあるものはどれですか。",
      options: [
        "1, 2, 3, 4, 5",
        "2, 2, 3, 4, 4",
        "1, 1, 1, 2, 3",
        "5, 5, 6, 7, 8"
      ],
      correct: 2,
      explanation: "2, 2, 3, 4, 4では、2と4がそれぞれ2回ずつ出現しており、最頻値が2つあります（2と4）。"
    },
    {
      id: 10,
      question: "次のデータの平均値と中央値の関係として正しいものはどれですか。\nデータ: 1, 2, 3, 4, 100",
      options: [
        "平均値 > 中央値",
        "平均値 < 中央値",
        "平均値 = 中央値",
        "判断できない"
      ],
      correct: 1,
      explanation: "平均値 = (1 + 2 + 3 + 4 + 100) ÷ 5 = 22。中央値 = 3。外れ値（100）により平均値が大きく引き上げられ、平均値 > 中央値となります。"
    }
  ];

  useEffect(() => {
    const best = getBestScore('grade4-section1_representativevalues_2');
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
      examId: 'grade4-section1_representativevalues_2',
      examTitle: '4級 Section1_RepresentativeValues_2',
      grade: '4級',
      score,
      totalQuestions: questions.length,
      percentage,
      passed: percentage >= 60
    });
    
    const best = getBestScore('grade4-section1_representativevalues_2');
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
              📊 4級 - データの代表値 セット2
            </h1>
            <Link
              to="/"
              className="text-green-600 hover:text-green-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">平均値、中央値、最頻値の理解を深めましょう</p>
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