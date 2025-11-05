import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade3Section3Set3() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const questions = [
    {
      id: 1,
      question: "次のデータセットについて、偏差値60の人の素点を求めてください。\n\n平均値: 50点\n標準偏差: 10点",
      options: ["55点", "60点", "65点", "70点"],
      correct: 2,
      explanation: "偏差値 = 50 + 10 × (素点 - 平均値) ÷ 標準偏差。60 = 50 + 10 × (x - 50) ÷ 10 より、10 = (x - 50)、したがって x = 60点 です。"
    },
    {
      id: 2,
      question: "ある試験で、平均点が65点、標準偏差が8点でした。72点の人の偏差値はいくらですか。",
      options: ["約58.75", "約60.0", "約58.25", "約61.25"],
      correct: 1,
      explanation: "偏差値 = 50 + 10 × (72 - 65) ÷ 8 = 50 + 10 × 7 ÷ 8 = 50 + 8.75 = 58.75 です。"
    },
    {
      id: 3,
      question: "次のデータの箱ひげ図を描く際に必要な5数要約について、正しい記述を選んでください。\n\nデータ（昇順）: 2, 5, 7, 10, 12, 15, 18, 20, 25",
      options: [
        "最小値=2、Q1=6、Q2=12、Q3=19、最大値=25",
        "最小値=2、Q1=7、Q2=12、Q3=18、最大値=25",
        "最小値=2、Q1=5、Q2=12、Q3=20、最大値=25",
        "最小値=2、Q1=7、Q2=10、Q3=20、最大値=25"
      ],
      correct: 2,
      explanation: "9個のデータなので、Q2（中央値）は5番目の12です。Q1は下半分（2,5,7,10）の中央値なので(5+7)÷2=6、ではなく中央2つの間なので7、Q3は上半分（15,18,20,25）の中央値で(18+20)÷2=19、ではなく18です。正しい計算ではQ1=7、Q3=18です。"
    },
    {
      id: 4,
      question: "あるデータセットについて、すべての値を2倍してから5を足すデータ変換を行いました。\n\n元のデータ: 平均値=20、標準偏差=4\n\n変換後のデータの平均値と標準偏差はいくらですか。",
      options: [
        "平均値=45、標準偏差=8",
        "平均値=40、標準偏差=13",
        "平均値=45、標準偏差=13",
        "平均値=40、標準偏差=8"
      ],
      correct: 1,
      explanation: "y = 2x + 5 の変換では、平均値は 2×20+5=45、標準偏差は定数項の影響を受けないので 2×4=8 です。"
    },
    {
      id: 5,
      question: "2つのグループの箱ひげ図を比較したところ、以下のことがわかりました。\n\nグループA: Q1=30、Q2=50、Q3=70、IQR=40\nグループB: Q1=40、Q2=50、Q3=60、IQR=20\n\n正しい記述を選んでください。",
      options: [
        "グループAの方がばらつきが大きい",
        "グループBの方がばらつきが大きい",
        "両グループのばらつきは同じ",
        "中央値が同じなので比較できない"
      ],
      correct: 1,
      explanation: "四分位範囲（IQR）が大きいほど、データのばらつきが大きいです。グループAのIQR（40）の方が大きいので、Aの方がばらつきが大きいです。"
    },
    {
      id: 6,
      question: "次のうち、外れ値の影響を最も受けにくい統計量はどれですか。",
      options: [
        "平均値",
        "範囲（レンジ）",
        "標準偏差",
        "四分位範囲"
      ],
      correct: 4,
      explanation: "四分位範囲（IQR）は中央50%のデータのみを使うため、外れ値の影響をほとんど受けません。平均値、範囲、標準偏差はいずれも外れ値の影響を受けやすいです。"
    },
    {
      id: 7,
      question: "次のデータについて、標準偏差を2倍した場合、分散は何倍になりますか。",
      options: ["1倍（変わらない）", "2倍", "4倍", "8倍"],
      correct: 3,
      explanation: "標準偏差をk倍すると、分散はk²倍になります。標準偏差を2倍すると、分散は2²=4倍になります。"
    },
    {
      id: 8,
      question: "ある会社の社員の年収について、変動係数が0.25でした。平均年収が400万円の場合、標準偏差はいくらですか。",
      options: ["50万円", "75万円", "100万円", "125万円"],
      correct: 3,
      explanation: "変動係数 = 標準偏差 ÷ 平均値 なので、0.25 = 標準偏差 ÷ 400、したがって標準偏差 = 0.25 × 400 = 100万円 です。"
    },
    {
      id: 9,
      question: "次のデータの範囲（レンジ）と四分位範囲（IQR）の関係について、正しい記述を選んでください。\n\nデータ（昇順）: 5, 10, 15, 20, 25, 30, 35",
      options: [
        "範囲 = IQR",
        "範囲 < IQR",
        "範囲 > IQR",
        "比較できない"
      ],
      correct: 3,
      explanation: "範囲=35-5=30、Q1=10、Q3=30、IQR=30-10=20。範囲（30）>IQR（20）です。一般に、外れ値がない限り範囲≧IQRとなります。"
    },
    {
      id: 10,
      question: "分散と標準偏差について、正しい記述を選んでください。\n\nI. 分散は平均からの偏差の二乗の平均である\nII. 標準偏差は元のデータと同じ単位を持つ\nIII. 標準偏差は常に非負である",
      options: [
        "IとIIのみ",
        "IとIIIのみ",
        "IIとIIIのみ",
        "すべて正しい"
      ],
      correct: 4,
      explanation: "すべて正しいです。I. 分散の定義。II. 標準偏差=√分散なので元のデータと同じ単位。III. 分散は非負なので、その平方根である標準偏差も非負です。"
    }
  ];

  useEffect(() => {
    const best = getBestScore('grade3-section3_inference_3');
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
      examId: 'grade3-section3_inference_3',
      examTitle: '3級 Section3_Inference_3',
      grade: '3級' as '3級',
      score,
      totalQuestions: questions.length,
      percentage,
      passed: percentage >= 60
    });
    
    const best = getBestScore('grade3-section3_inference_3');
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
              📊 3級 - 散らばりの指標 セット3
            </h1>
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">偏差値、データ変換、総合問題を学びましょう</p>
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