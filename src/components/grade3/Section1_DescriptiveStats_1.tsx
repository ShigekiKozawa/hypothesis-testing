import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade3Section1Set1() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const questions = [
    {
      id: 1,
      question: "あるカフェのレシートには次の情報が記載されています。\n\nI. 日付（例: 2024年11月5日）\nII. 商品名（例: コーヒー、サンドイッチ）\nIII. 金額（例: 500円、800円）\nIV. ポイント残高（例: 1,234ポイント）\n\nこれらのうち、量的変数はどれですか。",
      options: [
        "IとIIのみ",
        "IIIとIVのみ",
        "I、III、IVのみ",
        "すべて"
      ],
      correct: 2,
      explanation: "量的変数は数値として計算可能なデータです。金額とポイント残高は量的変数です。日付は順序はあるが計算できないので質的変数（または順序変数）、商品名は質的変数（名義変数）です。"
    },
    {
      id: 2,
      question: "次のa〜cの目的に対して、最も適切なグラフの組み合わせはどれですか。\n\na. 第1次産業、第2次産業、第3次産業別の就業者割合の比較\nb. ある店舗の5年間の売上高の推移\nc. あるクラスで2回実施したテストの点数のばらつきの比較",
      options: [
        "a. 円グラフ、b. 折れ線グラフ、c. 箱ひげ図",
        "a. 棒グラフ、b. 円グラフ、c. ヒストグラム",
        "a. 折れ線グラフ、b. 棒グラフ、c. 散布図",
        "a. 円グラフ、b. 箱ひげ図、c. 折れ線グラフ"
      ],
      correct: 1,
      explanation: "a. 割合の比較には円グラフが適しています。b. 時系列の変化には折れ線グラフが適しています。c. ばらつきの比較には箱ひげ図が適しています。"
    },
    {
      id: 3,
      question: "質的変数を表現する棒グラフについて、正しい記述を選んでください。\n\nI. 各棒の高さは度数を表す\nII. カテゴリの順序を入れ替えても情報は変わらない（名義尺度の場合）\nIII. 横軸に必ず数値を取る必要がある",
      options: [
        "IとIIのみ",
        "IとIIIのみ",
        "IIとIIIのみ",
        "すべて正しい"
      ],
      correct: 1,
      explanation: "Iは正しい。IIは名義尺度の場合は正しいです（順序尺度の場合は順序を変えると意味が変わります）。IIIは誤り。棒グラフの横軸はカテゴリ名（質的変数）です。"
    },
    {
      id: 4,
      question: "ヒストグラムについて、正しい記述を選んでください。\n\nI. 階級の幅を変えると、ヒストグラムの形が変わることがある\nII. 縦軸は度数または相対度数を表す\nIII. 連続的な量的変数の分布を表すのに適している",
      options: [
        "IとIIのみ",
        "IとIIIのみ",
        "IIとIIIのみ",
        "すべて正しい"
      ],
      correct: 4,
      explanation: "すべて正しい記述です。ヒストグラムは階級の幅の設定によって見た目が変わり、連続的な量的変数の分布を視覚化するのに適しています。"
    },
    {
      id: 5,
      question: "円グラフが最も適している場面はどれですか。",
      options: [
        "気温の経年変化を示す",
        "予算の費目別割合を示す",
        "身長と体重の関係を示す",
        "テスト点数の分布を示す"
      ],
      correct: 2,
      explanation: "円グラフは全体を100%として各部分の割合を示すのに適しています。予算の費目別割合は円グラフで表現するのが最適です。"
    },
    {
      id: 6,
      question: "次の図書館の利用者数データのうち、折れ線グラフで表現するのに最も適しているのはどれですか。",
      options: [
        "年齢層別の利用者数",
        "月別の利用者数の推移（過去3年間）",
        "利用者の男女比",
        "貸出冊数の階級別度数分布"
      ],
      correct: 2,
      explanation: "折れ線グラフは時系列データの変化を表すのに適しています。月別の利用者数の推移は折れ線グラフで表現するのが最適です。"
    },
    {
      id: 7,
      question: "ある会社の4つの支店A、B、C、Dの売上を比較したい場合、最も適しているグラフはどれですか。",
      options: [
        "円グラフ",
        "棒グラフ",
        "折れ線グラフ",
        "散布図"
      ],
      correct: 2,
      explanation: "複数のカテゴリ（支店）の数値を比較する場合は棒グラフが適しています。各支店の売上高を棒の高さで比較できます。"
    },
    {
      id: 8,
      question: "次のグラフに関する記述のうち、正しいものを選んでください。\n\nI. 箱ひげ図は中央値や四分位数を視覚的に表現できる\nII. ヒストグラムと棒グラフは同じものである\nIII. 散布図は2つの変数の関係を調べるのに適している",
      options: [
        "IとIIのみ",
        "IとIIIのみ",
        "IIとIIIのみ",
        "すべて正しい"
      ],
      correct: 2,
      explanation: "Iは正しい。IIは誤り。ヒストグラムは連続的な量的変数の分布を表し、棒グラフは質的変数やカテゴリの度数を表します。IIIは正しい。"
    },
    {
      id: 9,
      question: "次の変数のうち、質的変数はどれですか。",
      options: [
        "気温（℃）",
        "血液型（A、B、O、AB）",
        "体重（kg）",
        "年齢（歳）"
      ],
      correct: 2,
      explanation: "血液型はカテゴリを表す質的変数（名義尺度）です。気温、体重、年齢はすべて数値で計算可能な量的変数です。"
    },
    {
      id: 10,
      question: "ある学校で、学年別（1年、2年、3年）の生徒数と、各学年の平均身長を調査しました。これらのデータを視覚化する場合、適切なグラフの組み合わせはどれですか。",
      options: [
        "学年別生徒数: 円グラフ、平均身長: 棒グラフ",
        "学年別生徒数: 棒グラフ、平均身長: 折れ線グラフ",
        "学年別生徒数: 折れ線グラフ、平均身長: 散布図",
        "学年別生徒数: ヒストグラム、平均身長: 円グラフ"
      ],
      correct: 1,
      explanation: "学年別生徒数は各カテゴリ（学年）の度数なので円グラフまたは棒グラフが適切。平均身長の学年間比較には棒グラフが適しています。"
    }
  ];

  useEffect(() => {
    const best = getBestScore('grade3-section1_descriptivestats_1');
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
      examId: 'grade3-section1_descriptivestats_1',
      examTitle: '3級 Section1_DescriptiveStats_1',
      grade: '3級' as '3級',
      score,
      totalQuestions: questions.length,
      percentage,
      passed: percentage >= 60
    });
    
    const best = getBestScore('grade3-section1_descriptivestats_1');
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
              📊 3級 - データの種類と基本グラフ セット1
            </h1>
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">質的変数・量的変数の識別とグラフの選択を学びましょう</p>
          <div className="flex gap-2 text-sm text-gray-500">
            <span className="bg-purple-100 px-3 py-1 rounded-full">セット1/3</span>
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