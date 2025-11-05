import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade3Section2Set1() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const questions = [
    {
      id: 1,
      question: "次のデータの平均値を求めてください。\n\nデータ: 2, 4, 6, 8, 10",
      options: ["4", "5", "6", "7"],
      correct: 3,
      explanation: "平均値 = (2+4+6+8+10) ÷ 5 = 30 ÷ 5 = 6 です。"
    },
    {
      id: 2,
      question: "次のデータの中央値を求めてください。\n\nデータ: 3, 7, 5, 9, 11",
      options: ["5", "7", "9", "11"],
      correct: 2,
      explanation: "データを小さい順に並べると 3, 5, 7, 9, 11 となり、真ん中の値は 7 です。"
    },
    {
      id: 3,
      question: "次のデータの最頻値（モード）を求めてください。\n\nデータ: 2, 3, 3, 4, 5, 3, 6",
      options: ["2", "3", "4", "5"],
      correct: 2,
      explanation: "最頻値は最も多く出現する値です。3が3回出現しており、最頻値は 3 です。"
    },
    {
      id: 4,
      question: "10人のテストの点数が以下の通りです。中央値はいくつですか。\n\n点数: 55, 60, 65, 70, 75, 80, 85, 90, 95, 100",
      options: ["72.5", "75", "77.5", "80"],
      correct: 3,
      explanation: "データ数が偶数（10個）なので、中央値は5番目（75点）と6番目（80点）の平均値です。(75+80) ÷ 2 = 77.5点 です。"
    },
    {
      id: 5,
      question: "次の度数分布表において、中央値が含まれる階級はどれですか。\n\n【20人のテスト結果】\n0〜20点: 2人\n20〜40点: 5人\n40〜60点: 8人\n60〜80点: 3人\n80〜100点: 2人",
      options: [
        "0〜20点",
        "20〜40点",
        "40〜60点",
        "60〜80点"
      ],
      correct: 3,
      explanation: "20人のデータなので、中央値は10番目と11番目の平均です。累積度数で見ると、2+5=7人が40点未満、2+5+8=15人が60点未満なので、10番目と11番目はともに40〜60点の階級に含まれます。"
    },
    {
      id: 6,
      question: "次の度数分布表から、平均値を計算してください。（階級値を使って計算します）\n\n【小テストの点数（10人）】\n0〜2点: 1人\n2〜4点: 3人\n4〜6点: 4人\n6〜8点: 2人\n\n階級値: 1, 3, 5, 7",
      options: ["3.8点", "4.0点", "4.4点", "4.8点"],
      correct: 3,
      explanation: "平均値 = (1×1 + 3×3 + 5×4 + 7×2) ÷ 10 = (1+9+20+14) ÷ 10 = 44 ÷ 10 = 4.4点 です。"
    },
    {
      id: 7,
      question: "幹葉図（茎葉図）について、正しい記述を選んでください。\n\nI. 幹（茎）は十の位、葉は一の位を表すことが多い\nII. 元のデータの値を失わずに分布を表現できる\nIII. データ数が多い場合でもコンパクトに表現できる",
      options: [
        "IとIIのみ",
        "IとIIIのみ",
        "IIとIIIのみ",
        "すべて正しい"
      ],
      correct: 4,
      explanation: "すべて正しい記述です。幹葉図は元のデータの値を保持しながら、分布の形も視覚的に示せる優れた表現方法です。"
    },
    {
      id: 8,
      question: "次のデータについて、平均値と中央値の関係はどれですか。\n\nデータ: 1, 2, 3, 4, 100",
      options: [
        "平均値 < 中央値",
        "平均値 = 中央値",
        "平均値 > 中央値",
        "比較できない"
      ],
      correct: 3,
      explanation: "平均値 = (1+2+3+4+100) ÷ 5 = 110 ÷ 5 = 22、中央値 = 3 です。外れ値（100）の影響で平均値が中央値より大きくなっています。"
    },
    {
      id: 9,
      question: "度数分布表を作成する際の注意点として、正しいものを選んでください。\n\nI. 階級の幅はすべて等しくするのが一般的\nII. 階級の数は多すぎても少なすぎても分布の特徴がわかりにくい\nIII. 階級の境界値がデータの値と重なる場合は、上の階級に含める",
      options: [
        "IとIIのみ",
        "IとIIIのみ",
        "IIとIIIのみ",
        "すべて正しい"
      ],
      correct: 1,
      explanation: "IとIIは正しい。IIIは慣例によりますが、一般的には「以上〜未満」または「より大きい〜以下」のように境界を明確に定義します。上の階級に含めるとは限りません。"
    },
    {
      id: 10,
      question: "次の代表値について、外れ値の影響を最も受けにくいのはどれですか。",
      options: [
        "平均値",
        "中央値",
        "最頻値",
        "範囲"
      ],
      correct: 2,
      explanation: "中央値は外れ値の影響を受けにくい統計量です。平均値は外れ値の影響を強く受けます。最頻値は外れ値の影響を受けにくいですが、データによっては複数存在したり存在しなかったりします。"
    }
  ];

  useEffect(() => {
    const best = getBestScore('grade3-section2_probability_1');
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
      examId: 'grade3-section2_probability_1',
      examTitle: '3級 Section2_Probability_1',
      grade: '3級' as '3級',
      score,
      totalQuestions: questions.length,
      percentage,
      passed: percentage >= 60
    });
    
    const best = getBestScore('grade3-section2_probability_1');
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
              📊 3級 - 記述統計量の基礎 セット1
            </h1>
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">平均値、中央値、最頻値の計算と度数分布表を学びましょう</p>
          <div className="flex gap-2 text-sm text-gray-500">
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