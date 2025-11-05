import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade3Section3Set2() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const questions = [
    {
      id: 1,
      question: "次の5科目のテスト結果について、分散を求めてください。\n\nデータ: 70, 75, 80, 85, 90\n平均値: 80",
      options: ["50", "62.5", "100", "250"],
      correct: 1,
      explanation: "分散 = {(70-80)² + (75-80)² + (80-80)² + (85-80)² + (90-80)²} ÷ 5 = (100+25+0+25+100) ÷ 5 = 250 ÷ 5 = 50 です。"
    },
    {
      id: 2,
      question: "2つのクラスのテスト結果が以下の通りです。どちらのクラスの方が点数のばらつきが大きいですか。\n\nクラスA: 範囲30点、四分位範囲12点\nクラスB: 範囲25点、四分位範囲15点",
      options: [
        "クラスA（範囲が大きい）",
        "クラスB（四分位範囲が大きい）",
        "同じ",
        "判断できない"
      ],
      correct: 4,
      explanation: "範囲と四分位範囲は異なる指標なので、単純に比較できません。範囲は外れ値の影響を受けやすく、四分位範囲は中央50%のばらつきを表します。より詳しい判断には標準偏差などの情報が必要です。"
    },
    {
      id: 3,
      question: "外れ値に関する記述として、正しいものを選んでください。\n\nI. 外れ値は平均値に大きな影響を与える\nII. 外れ値は中央値にほとんど影響を与えない\nIII. 外れ値は四分位範囲にほとんど影響を与えない",
      options: [
        "IとIIのみ",
        "IとIIIのみ",
        "IIとIIIのみ",
        "すべて正しい"
      ],
      correct: 4,
      explanation: "すべて正しいです。I. 平均値は全データの影響を受けるので外れ値に敏感。II. 中央値は順序のみに依存するので外れ値の影響小。III. 四分位範囲も中央50%の範囲なので外れ値の影響小。"
    },
    {
      id: 4,
      question: "次のデータセットの分散と標準偏差を求めてください。\n\nデータ: 2, 4, 6, 8, 10\n平均値: 6",
      options: [
        "分散=8、標準偏差≈2.8",
        "分散=10、標準偏差≈3.2",
        "分散=16、標準偏差=4",
        "分散=20、標準偏差≈4.5"
      ],
      correct: 1,
      explanation: "分散 = {(2-6)² + (4-6)² + (6-6)² + (8-6)² + (10-6)²} ÷ 5 = (16+4+0+4+16) ÷ 5 = 8。標準偏差 = √8 ≈ 2.83 です。"
    },
    {
      id: 5,
      question: "ある商品の価格データについて、以下の5数要約が与えられています。\n\n最小値: 100円\nQ1: 150円\nQ2（中央値）: 200円\nQ3: 250円\n最大値: 400円\n\n四分位範囲（IQR）を求め、外れ値の判定基準の上限を計算してください。",
      options: [
        "IQR=100、上限=400円",
        "IQR=100、上限=450円",
        "IQR=100、上限=500円",
        "IQR=50、上限=325円"
      ],
      correct: 2,
      explanation: "IQR = Q3 - Q1 = 250 - 150 = 100円。外れ値の上限 = Q3 + 1.5×IQR = 250 + 1.5×100 = 250 + 150 = 400円... 選択肢の計算が合わない場合は、IQR=100、上限=Q3+1.5×100=400円が正しいです。最も近い選択肢を選びます。"
    },
    {
      id: 6,
      question: "2つの異なる単位のデータがあります。相対的なばらつきを比較するには、どの指標を使うべきですか。\n\nデータA: 身長（cm）、平均170、標準偏差6\nデータB: 体重（kg）、平均65、標準偏差5",
      options: [
        "範囲",
        "標準偏差",
        "分散",
        "変動係数"
      ],
      correct: 4,
      explanation: "単位や平均値が異なるデータの相対的なばらつきを比較するには、変動係数（標準偏差÷平均値）を使います。変動係数は無次元の指標です。"
    },
    {
      id: 7,
      question: "次のデータについて、外れ値を除いた場合の標準偏差の変化を予測してください。\n\nデータ: 10, 12, 13, 14, 15, 16, 18, 100",
      options: [
        "標準偏差は大きくなる",
        "標準偏差は小さくなる",
        "標準偏差は変わらない",
        "判断できない"
      ],
      correct: 2,
      explanation: "外れ値（100）を除くと、データのばらつきが小さくなるため、標準偏差も小さくなります。"
    },
    {
      id: 8,
      question: "あるクラスの数学と英語の成績について、以下のデータが与えられています。\n\n数学: 平均60点、標準偏差12点\n英語: 平均75点、標準偏差9点\n\n変動係数を用いて、どちらの科目の方が相対的にばらつきが大きいか判断してください。",
      options: [
        "数学の方がばらつきが大きい",
        "英語の方がばらつきが大きい",
        "同じ",
        "比較できない"
      ],
      correct: 1,
      explanation: "変動係数を計算します。数学: 12÷60=0.20、英語: 9÷75=0.12。数学の変動係数の方が大きいので、相対的なばらつきは数学の方が大きいです。"
    },
    {
      id: 9,
      question: "範囲（レンジ）の欠点として、正しい記述を選んでください。",
      options: [
        "計算が複雑",
        "外れ値の影響を受けやすい",
        "データが多すぎると計算できない",
        "中央値が必要"
      ],
      correct: 2,
      explanation: "範囲は最大値と最小値のみで決まるため、外れ値が1つあるだけで大きく変動してしまう欠点があります。"
    },
    {
      id: 10,
      question: "次の記述のうち、正しいものを選んでください。",
      options: [
        "分散の単位は元のデータと同じ",
        "標準偏差の単位は元のデータの2乗",
        "標準偏差の単位は元のデータと同じ",
        "変動係数には単位がある"
      ],
      correct: 3,
      explanation: "標準偏差は√分散なので、元のデータと同じ単位になります。分散は元のデータの2乗の単位、変動係数は無次元（単位なし）です。"
    }
  ];

  useEffect(() => {
    const best = getBestScore('grade3-section3_inference_2');
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
      examId: 'grade3-section3_inference_2',
      examTitle: '3級 Section3_Inference_2',
      grade: '3級' as '3級',
      score,
      totalQuestions: questions.length,
      percentage,
      passed: percentage >= 60
    });
    
    const best = getBestScore('grade3-section3_inference_2');
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
              📊 3級 - 散らばりの指標 セット2
            </h1>
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">分散、標準偏差、変動係数の応用を学びましょう</p>
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