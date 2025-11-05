import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade3Section2Set3() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const questions = [
    {
      id: 1,
      question: "100人の国語の試験結果の度数分布表があります。\n\n0〜20点: 5人\n20〜40点: 15人\n40〜60点: 30人\n60〜80点: 35人\n80〜100点: 15人\n\n中央値が含まれる階級はどれですか。",
      options: [
        "20〜40点",
        "40〜60点",
        "60〜80点",
        "80〜100点"
      ],
      correct: 3,
      explanation: "100人のデータなので、中央値は50番目と51番目の平均です。累積度数で見ると、0〜60点までで50人（5+15+30）なので、50番目と51番目はともに60〜80点の階級に含まれます。"
    },
    {
      id: 2,
      question: "もみじの葉の「裂けている数」のデータがあります。\n\nデータ: 5, 5, 5, 7, 7, 9, 11\n\nこのデータに14を追加したとき、平均値と中央値はどう変化しますか。",
      options: [
        "平均値も中央値も増加する",
        "平均値は増加するが中央値は変わらない",
        "平均値は変わらないが中央値は増加する",
        "平均値も中央値も変わらない"
      ],
      correct: 2,
      explanation: "元のデータの平均値 = (5+5+5+7+7+9+11) ÷ 7 = 49 ÷ 7 = 7、中央値 = 7。14を追加すると平均値 = 63 ÷ 8 = 7.875に増加しますが、中央値は4番目と5番目の平均で (7+7) ÷ 2 = 7 のままです。"
    },
    {
      id: 3,
      question: "30人の数学のテスト結果から作成した箱ひげ図があります。\n\n最小値: 40点\n第1四分位数（Q1）: 60点\n中央値（Q2）: 70点\n第3四分位数（Q3）: 85点\n最大値: 100点\n\n四分位範囲（IQR）はいくつですか。",
      options: ["15点", "20点", "25点", "30点"],
      correct: 3,
      explanation: "四分位範囲（IQR）= Q3 - Q1 = 85 - 60 = 25点 です。"
    },
    {
      id: 4,
      question: "次のもみじの葉のデータについて、正しい記述を選んでください。\n\nデータ: 5, 5, 5, 7, 7, 9, 11\n\nI. 分布は右に偏っている\nII. 最頻値は5である\nIII. 平均値と中央値は等しい",
      options: [
        "IとIIのみ",
        "IとIIIのみ",
        "IIとIIIのみ",
        "すべて正しい"
      ],
      correct: 4,
      explanation: "I. 右に偏っている（右裾が長い）。II. 最頻値は最も多く出現する5。III. 平均値 = 7、中央値 = 7 で等しい。すべて正しいです。"
    },
    {
      id: 5,
      question: "ある試験の得点分布について、以下の記述があります。\n\n「度数分布の形状は左右対称で、平均値、中央値、最頻値がすべて70点である」\n\nこの分布として最も適切なのはどれですか。",
      options: [
        "左に偏った分布",
        "右に偏った分布",
        "正規分布に近い対称な分布",
        "一様分布"
      ],
      correct: 3,
      explanation: "平均値、中央値、最頻値がすべて等しく、左右対称な分布は正規分布（ベル型カーブ）に近い分布です。"
    },
    {
      id: 6,
      question: "テスト結果の度数分布表を作成する際、階級の数を決める一般的な目安はどれですか。（データ数が100程度の場合）",
      options: [
        "3〜5階級",
        "7〜12階級",
        "20〜30階級",
        "50階級以上"
      ],
      correct: 2,
      explanation: "一般的に、データ数が100程度の場合、階級の数は7〜12程度が適切とされています。スタージェスの公式（1+log₂n）を使うこともあります。"
    },
    {
      id: 7,
      question: "次のテスト結果の記述について、正しいものを選んでください。\n\n「Aさんの国語の偏差値は60、数学の偏差値は65である」\n\nI. Aさんは数学の方が成績が良い\nII. Aさんの国語の点数は必ず数学の点数より低い\nIII. 偏差値は平均50、標準偏差10に標準化した値である",
      options: [
        "IとIIのみ",
        "IとIIIのみ",
        "IIとIIIのみ",
        "すべて正しい"
      ],
      correct: 2,
      explanation: "I. 偏差値が高い方が相対的に成績が良いので正しい。II. 誤り。科目によって平均点や標準偏差が異なるため、偏差値だけでは実際の点数の高低は判断できません。III. 正しい。"
    },
    {
      id: 8,
      question: "データ変換について、正しい記述を選んでください。\n\n「あるクラスのテストの点数を、すべて2倍してから10点を加えた」\n\nこのとき、平均値と標準偏差はどうなりますか。",
      options: [
        "平均値は2倍+10、標準偏差は2倍",
        "平均値は2倍、標準偏差は2倍+10",
        "平均値は2倍+10、標準偏差は変わらない",
        "平均値も標準偏差も2倍+10"
      ],
      correct: 1,
      explanation: "データをax+bに変換すると、平均値はa×(元の平均)+b、標準偏差はa×(元の標準偏差)になります。この場合、平均値は2倍+10、標準偏差は2倍です。"
    },
    {
      id: 9,
      question: "次の記述のうち、誤っているものはどれですか。",
      options: [
        "範囲（レンジ）は外れ値の影響を受けやすい",
        "四分位範囲（IQR）は外れ値の影響を受けにくい",
        "標準偏差は平均値と同じ単位を持つ",
        "分散の単位は元のデータと同じ"
      ],
      correct: 4,
      explanation: "分散の単位は元のデータの単位の2乗です（例：データがcmなら分散はcm²）。標準偏差は分散の平方根なので元のデータと同じ単位になります。"
    },
    {
      id: 10,
      question: "次のデータの代表値について、正しい記述を選んでください。\n\nデータ: 10, 12, 14, 14, 16, 18, 100\n\nI. 平均値は中央値より大きい\nII. 最頻値は14である\nIII. このデータには外れ値（100）が含まれている",
      options: [
        "IとIIのみ",
        "IとIIIのみ",
        "IIとIIIのみ",
        "すべて正しい"
      ],
      correct: 4,
      explanation: "I. 平均値 = (10+12+14+14+16+18+100) ÷ 7 ≈ 26.3、中央値 = 14 なので正しい。II. 最頻値は14で正しい。III. 100は他の値から大きく離れているので外れ値と考えられます。すべて正しいです。"
    }
  ];

  useEffect(() => {
    const best = getBestScore('grade3-section2_probability_3');
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
      examId: 'grade3-section2_probability_3',
      examTitle: '3級 Section2_Probability_3',
      grade: '3級' as '3級',
      score,
      totalQuestions: questions.length,
      percentage,
      passed: percentage >= 60
    });
    
    const best = getBestScore('grade3-section2_probability_3');
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
              📊 3級 - 記述統計量の基礎 セット3
            </h1>
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">外れ値、偏差値、データ変換の影響を学びましょう</p>
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