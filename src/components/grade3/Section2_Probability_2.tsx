import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade3Section2Set2() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const questions = [
    {
      id: 1,
      question: "次の度数分布表において、最頻値（モード）が含まれる階級はどれですか。\n\n【250人の小テスト結果】\n0〜2点: 10人\n2〜4点: 40人\n4〜6点: 80人\n6〜8点: 70人\n8〜10点: 50人",
      options: ["0〜2点", "2〜4点", "4〜6点", "6〜8点"],
      correct: 3,
      explanation: "最頻値が含まれる階級は、度数が最も多い階級です。4〜6点の階級が80人で最も多いです。"
    },
    {
      id: 2,
      question: "次のデータについて、平均値、中央値、最頻値の関係はどれですか。\n\nデータ: 2, 3, 3, 4, 4, 4, 5, 6, 20",
      options: [
        "平均値 < 中央値 < 最頻値",
        "最頻値 < 中央値 < 平均値",
        "中央値 < 最頻値 < 平均値",
        "平均値 = 中央値 = 最頻値"
      ],
      correct: 2,
      explanation: "最頻値=4（最も多く出現）、中央値=4（真ん中の値）、平均値=(2+3+3+4+4+4+5+6+20)÷9=51÷9≈5.67 です。外れ値（20）の影響で平均値が最も大きくなっています。"
    },
    {
      id: 3,
      question: "次の幹葉図から、中央値を求めてください。\n\n【20日間の最深積雪（単位: cm）】\n茎 | 葉\n 4 | 2 5 8\n 5 | 1 3 6 7 9\n 6 | 0 2 4 5 8 8\n 7 | 1 3 5 6 9",
      options: ["60cm", "62cm", "63cm", "64cm"],
      correct: 3,
      explanation: "20個のデータがあるので、中央値は10番目と11番目の平均です。小さい順に並べると10番目は62cm、11番目は64cmなので、中央値は(62+64)÷2=63cmです。"
    },
    {
      id: 4,
      question: "あるクラスの数学のテスト結果（20人）について、以下の記述のうち正しいものを選んでください。\n\n平均点: 68点\n中央値: 70点\n最頻値: 75点\n\nI. このデータは左に偏った分布である\nII. 外れ値として低い点数がある可能性が高い\nIII. 平均点が中央値より低いので、右に偏った分布である",
      options: [
        "IとIIのみ",
        "IとIIIのみ",
        "IIのみ",
        "IIIのみ"
      ],
      correct: 1,
      explanation: "平均値 < 中央値 < 最頻値 の関係から、左に偏った分布（左裾が長い）であることがわかります。低い点数の外れ値が平均値を引き下げている可能性があります。IIIは誤りで、左に偏っています。"
    },
    {
      id: 5,
      question: "次の累積相対度数グラフから、中央値が含まれる階級を特定してください。\n\n【20人のシール保有枚数】\n0〜10枚: 累積相対度数 0.15\n10〜20枚: 累積相対度数 0.40\n20〜30枚: 累積相対度数 0.75\n30〜40枚: 累積相対度数 1.00",
      options: [
        "0〜10枚",
        "10〜20枚",
        "20〜30枚",
        "30〜40枚"
      ],
      correct: 3,
      explanation: "中央値は累積相対度数が0.5となる位置です。0.40 < 0.5 < 0.75 なので、20〜30枚の階級に中央値が含まれます。"
    },
    {
      id: 6,
      question: "47都道府県の博物館数について、次の幹葉図から平均値を計算してください。（小数第1位まで）\n\n茎 | 葉\n 0 | 8 9\n 1 | 2 5 8\n 2 | 0 3 7\n 3 | 1 4\n\n（データ: 8, 9, 12, 15, 18, 20, 23, 27, 31, 34）",
      options: ["18.5", "19.7", "20.3", "21.0"],
      correct: 2,
      explanation: "平均値 = (8+9+12+15+18+20+23+27+31+34) ÷ 10 = 197 ÷ 10 = 19.7 です。"
    },
    {
      id: 7,
      question: "度数分布表から中央値を推定する際、正しい手順はどれですか。",
      options: [
        "度数が最も多い階級の階級値が中央値",
        "全体のデータ数の半分の位置が含まれる階級を特定する",
        "すべての階級値の平均を計算する",
        "最小値と最大値の平均を計算する"
      ],
      correct: 2,
      explanation: "中央値は全体のデータを小さい順に並べたときの真ん中の値です。度数分布表では、累積度数を使って全体の半分の位置が含まれる階級を特定します。"
    },
    {
      id: 8,
      question: "次の記述のうち、誤っているものはどれですか。",
      options: [
        "平均値はすべてのデータの値を使って計算される",
        "中央値は外れ値の影響を受けにくい",
        "最頻値は必ず1つしか存在しない",
        "範囲（レンジ）は最大値と最小値の差である"
      ],
      correct: 3,
      explanation: "最頻値は複数存在することがあり（2峰性の分布など）、また存在しないこともあります。他の記述はすべて正しいです。"
    },
    {
      id: 9,
      question: "ある会社の従業員10人の年齢データ: 25, 28, 30, 32, 35, 38, 40, 42, 45, 65\n\nこのデータについて、平均年齢と中央年齢（中央値）はそれぞれいくつですか。",
      options: [
        "平均38歳、中央36.5歳",
        "平均38歳、中央38歳",
        "平均36.5歳、中央36.5歳",
        "平均40歳、中央36.5歳"
      ],
      correct: 1,
      explanation: "平均年齢 = (25+28+30+32+35+38+40+42+45+65) ÷ 10 = 380 ÷ 10 = 38歳。中央年齢 = (35+38) ÷ 2 = 36.5歳（5番目と6番目の平均）。外れ値（65歳）の影響で平均が中央より大きくなっています。"
    },
    {
      id: 10,
      question: "代表値の使い分けについて、正しい記述を選んでください。\n\nI. 所得の代表値には、外れ値（高所得者）の影響を避けるため中央値がよく使われる\nII. テストの点数の代表値には、通常は平均値が使われる\nIII. 最頻値は、質的データ（血液型など）の代表値として有効である",
      options: [
        "IとIIのみ",
        "IとIIIのみ",
        "IIとIIIのみ",
        "すべて正しい"
      ],
      correct: 4,
      explanation: "すべて正しい記述です。目的やデータの性質に応じて、適切な代表値を選択することが重要です。"
    }
  ];

  useEffect(() => {
    const best = getBestScore('grade3-section2_probability_2');
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
      examId: 'grade3-section2_probability_2',
      examTitle: '3級 Section2_Probability_2',
      grade: '3級' as '3級',
      score,
      totalQuestions: questions.length,
      percentage,
      passed: percentage >= 60
    });
    
    const best = getBestScore('grade3-section2_probability_2');
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
              📊 3級 - 記述統計量の基礎 セット2
            </h1>
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">度数分布表と幹葉図を使った代表値の推定を学びましょう</p>
          <div className="flex gap-2 text-sm text-gray-500">
            <span className="bg-purple-100 px-3 py-1 rounded-full">セット2/3</span>
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