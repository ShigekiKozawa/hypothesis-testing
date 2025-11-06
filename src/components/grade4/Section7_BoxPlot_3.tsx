import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade4Section7Set3() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

    const questions = [
    {
        id: 1,
        question: "箱ひげ図を使って、3つ以上のグループを比較する利点は何ですか。",
        options: [
            "平均だけを比較",
            "分布全体を視覚的に比較できる",
            "データ数だけを比較",
            "何もわからない",
        ],
        correct: 2,
        explanation: "箱ひげ図を使うと、複数のグループの分布全体（中心、散らばり、偏り）を視覚的に比較できます。"
    },
    {
        id: 2,
        question: "箱ひげ図から平均値は読み取れますか。",
        options: [
            "読み取れる（箱の中の線）",
            "読み取れない（中央値はわかる）",
            "必ず中央値と同じ",
            "判断できない",
        ],
        correct: 2,
        explanation: "箱ひげ図からは中央値は読み取れますが、平均値は直接読み取れません。"
    },
    {
        id: 3,
        question: "箱ひげ図で、データの最大値と最小値が必ず表示されますか。",
        options: [
            "必ず表示される",
            "外れ値がある場合はひげの先が最大値・最小値でないことがある",
            "表示されない",
            "判断できない",
        ],
        correct: 2,
        explanation: "外れ値がある場合、ひげの先が最大値・最小値ではなく、外れ値の基準値になることがあります。"
    },
    {
        id: 4,
        question: "箱ひげ図で、中央値がQ1に近いとき、どういう分布ですか。",
        options: [
            "右に偏っている（正の歪み）",
            "左に偏っている（負の歪み）",
            "対称",
            "判断できない",
        ],
        correct: 1,
        explanation: "中央値がQ1に近い場合、データは右側（大きい方）に広がっており、右に偏った分布（正の歪み）です。"
    },
    {
        id: 5,
        question: "箱ひげ図で、ひげがない（箱だけ）場合、どういう意味ですか。",
        options: [
            "最大値と最小値がQ1とQ3と同じ",
            "外れ値が多い",
            "データが1つ",
            "エラー",
        ],
        correct: 1,
        explanation: "ひげがない場合、最大値と最小値がそれぞれQ3とQ1と同じ、つまり全データが箱の範囲に収まっています。"
    },
    {
        id: 6,
        question: "箱ひげ図で外れ値の定義は何ですか。",
        options: [
            "平均から離れた値",
            "Q1 - 1.5×IQR より小さい、またはQ3 + 1.5×IQR より大きい値",
            "最大値と最小値",
            "中央値から離れた値",
        ],
        correct: 2,
        explanation: "一般的に、Q1 - 1.5×IQR より小さい値、またはQ3 + 1.5×IQR より大きい値を外れ値とします。"
    },
    {
        id: 7,
        question: "箱ひげ図で、2つのグループの中央値が同じでも、分布が異なることはありますか。",
        options: [
            "ある（散らばりや偏りが異なる）",
            "ない（中央値が同じなら全て同じ）",
            "必ず同じ分布",
            "判断できない",
        ],
        correct: 1,
        explanation: "中央値が同じでも、散らばり（IQR）や偏りが異なれば、分布は異なります。"
    },
    {
        id: 8,
        question: "箱ひげ図は、データの個数が少ない（例：5個）ときも使えますか。",
        options: [
            "使えるが、詳しい情報は得にくい",
            "使えない",
            "必ず使うべき",
            "判断できない",
        ],
        correct: 1,
        explanation: "データが少ないときも作成できますが、分布の特徴を捉えるには十分な数のデータがある方が良いです。"
    },
    {
        id: 9,
        question: "箱ひげ図で、横向きと縦向きはどう使い分けますか。",
        options: [
            "全く同じ（向きは自由）",
            "縦向きは変数が縦軸、横向きは変数が横軸",
            "必ず横向き",
            "必ず縦向き",
        ],
        correct: 1,
        explanation: "向きは自由で、データの表示や比較のしやすさに応じて選びます。意味は同じです。"
    },
    {
        id: 10,
        question: "箱ひげ図とヒストグラムを比較したとき、箱ひげ図の利点は何ですか。",
        options: [
            "データの詳しい形がわかる",
            "複数のグループを同時に比較しやすい",
            "平均がわかる",
            "何もない",
        ],
        correct: 2,
        explanation: "箱ひげ図は、複数のグループを並べて比較しやすい利点があります。"
    }
];

  useEffect(() => {
    const best = getBestScore('grade4-section7_boxplot_3');
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
      examId: 'grade4-section7_boxplot_3',
      examTitle: '4級 Section7_BoxPlot_3',
      grade: '4級' as '4級',
      score,
      totalQuestions: questions.length,
      percentage,
      passed: percentage >= 60
    });
    
    const best = getBestScore('grade4-section7_boxplot_3');
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
              📦 4級 - 箱ひげ図 セット3
            </h1>
            <Link
              to="/"
              className="text-green-600 hover:text-green-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">外れ値の判定方法と複数のグループのデータを比較する方法を学びます</p>
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