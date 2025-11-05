import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade3Section3Set1() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const questions = [
    {
      id: 1,
      question: "次のデータの範囲（レンジ）を求めてください。\n\nデータ: 12, 18, 25, 30, 45",
      options: ["18", "25", "30", "33"],
      correct: 4,
      explanation: "範囲（レンジ）= 最大値 - 最小値 = 45 - 12 = 33 です。"
    },
    {
      id: 2,
      question: "次のデータから、第1四分位数（Q1）、中央値（Q2）、第3四分位数（Q3）を求めてください。\n\nデータ（昇順）: 10, 15, 20, 25, 30, 35, 40\n\nQ1、Q2、Q3の組み合わせはどれですか。",
      options: [
        "Q1=15, Q2=25, Q3=35",
        "Q1=12.5, Q2=25, Q3=37.5",
        "Q1=15, Q2=20, Q3=35",
        "Q1=10, Q2=25, Q3=40"
      ],
      correct: 1,
      explanation: "7個のデータなので、Q2（中央値）は4番目の25です。Q1は下半分（10,15,20）の中央値で15、Q3は上半分（30,35,40）の中央値で35です。"
    },
    {
      id: 3,
      question: "四分位範囲（IQR）について、正しい記述を選んでください。",
      options: [
        "IQR = Q3 - Q1",
        "IQR = Q3 + Q1",
        "IQR = 最大値 - 最小値",
        "IQR = Q2 - Q1"
      ],
      correct: 1,
      explanation: "四分位範囲（IQR）= Q3 - Q1 です。データの中央50%が含まれる範囲を表します。"
    },
    {
      id: 4,
      question: "次のデータについて、標準偏差を求めてください。\n\nデータ: 4, 6, 8, 10, 12\n平均値: 8\n分散: 8",
      options: [
        "約2.0",
        "約2.8",
        "約3.2",
        "約4.0"
      ],
      correct: 2,
      explanation: "標準偏差 = √分散 = √8 ≈ 2.83 です。最も近い選択肢は 約2.8 です。"
    },
    {
      id: 5,
      question: "2つのグループA、Bについて、データのばらつきを比較したい。平均値と標準偏差は以下の通りです。\n\nグループA: 平均60点、標準偏差10点\nグループB: 平均80点、標準偏差12点\n\n変動係数を用いて比較する場合、正しい記述はどれですか。",
      options: [
        "AとBのばらつきは同じ",
        "Aの方が相対的なばらつきが大きい",
        "Bの方が相対的なばらつきが大きい",
        "変動係数では比較できない"
      ],
      correct: 2,
      explanation: "変動係数 = 標準偏差 ÷ 平均値。A: 10÷60≈0.167、B: 12÷80=0.15。変動係数はAの方が大きいので、平均値に対する相対的なばらつきはAの方が大きいです。"
    },
    {
      id: 6,
      question: "外れ値を検出する方法として、四分位範囲を使う場合の一般的な基準はどれですか。",
      options: [
        "Q1 - 1.5×IQR より小さい、またはQ3 + 1.5×IQR より大きい",
        "Q1 - IQR より小さい、またはQ3 + IQR より大きい",
        "平均値 ± 2×標準偏差 の外側",
        "最大値と最小値"
      ],
      correct: 1,
      explanation: "一般的に、Q1 - 1.5×IQR より小さい値、またはQ3 + 1.5×IQR より大きい値を外れ値とみなします。これは箱ひげ図でもよく使われる基準です。"
    },
    {
      id: 7,
      question: "次のデータセットについて、範囲（レンジ）と四分位範囲（IQR）を比較してください。\n\nデータ: 5, 10, 12, 14, 15, 16, 18, 20, 100\n\nI. 範囲は外れ値（100）の影響を受けやすい\nII. 四分位範囲は外れ値の影響を受けにくい\nIII. 範囲の方が四分位範囲より大きい",
      options: [
        "IとIIのみ",
        "IとIIIのみ",
        "IIとIIIのみ",
        "すべて正しい"
      ],
      correct: 4,
      explanation: "すべて正しいです。I. 範囲=100-5=95で外れ値の影響大。II. IQR=Q3-Q1で外れ値の影響小。III. 範囲（95）>IQR（約8）です。"
    },
    {
      id: 8,
      question: "標準偏差の性質について、正しい記述を選んでください。\n\nI. すべてのデータに定数を加えても標準偏差は変わらない\nII. すべてのデータを2倍すると標準偏差も2倍になる\nIII. 標準偏差は分散の平方根である",
      options: [
        "IとIIのみ",
        "IとIIIのみ",
        "IIとIIIのみ",
        "すべて正しい"
      ],
      correct: 4,
      explanation: "すべて正しいです。I. データにbを加えても散らばりは変わらない。II. データをa倍すると標準偏差もa倍。III. 標準偏差=√分散の定義です。"
    },
    {
      id: 9,
      question: "次のテスト結果について、正しい記述を選んでください。\n\nクラスA: 平均70点、標準偏差5点\nクラスB: 平均70点、標準偏差15点",
      options: [
        "クラスAの方が点数のばらつきが大きい",
        "クラスBの方が点数のばらつきが大きい",
        "両クラスのばらつきは同じ",
        "平均が同じなので比較できない"
      ],
      correct: 2,
      explanation: "標準偏差が大きいほどばらつきが大きいです。クラスBの標準偏差（15点）の方が大きいので、Bの方が点数のばらつきが大きいです。"
    },
    {
      id: 10,
      question: "ある工場で製造される製品の重量を測定したところ、平均500g、標準偏差10gでした。別の製品は平均1000g、標準偏差15gでした。\n\nどちらの製品の方が、製造のばらつきが相対的に小さいと言えますか。",
      options: [
        "500gの製品（変動係数が小さい）",
        "1000gの製品（変動係数が小さい）",
        "両方同じ",
        "比較できない"
      ],
      correct: 2,
      explanation: "変動係数で比較します。500g製品: 10÷500=0.02、1000g製品: 15÷1000=0.015。1000g製品の方が変動係数が小さく、相対的なばらつきが小さいです。"
    }
  ];

  useEffect(() => {
    const best = getBestScore('grade3-section3_inference_1');
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
      examId: 'grade3-section3_inference_1',
      examTitle: '3級 Section3_Inference_1',
      grade: '3級' as '3級',
      score,
      totalQuestions: questions.length,
      percentage,
      passed: percentage >= 60
    });
    
    const best = getBestScore('grade3-section3_inference_1');
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
              📊 3級 - 散らばりの指標 セット1
            </h1>
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">範囲、四分位範囲、標準偏差、変動係数を学びましょう</p>
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