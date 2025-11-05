import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade3Section1Set3() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const questions = [
    {
      id: 1,
      question: "次のデータのうち、質的変数と量的変数の組み合わせとして正しいものはどれですか。\n\nあるアンケート調査で以下の項目を調査しました。\n\nA. 年齢（歳）\nB. 性別（男・女）\nC. 満足度（5段階評価：1〜5）\nD. 年収（万円）",
      options: [
        "質的: AとD、量的: BとC",
        "質的: BとC、量的: AとD",
        "質的: Bのみ、量的: A、C、D",
        "すべて量的変数"
      ],
      correct: 3,
      explanation: "性別（B）は質的変数（名義尺度）です。満足度（C）は数値ですが順序尺度なので通常は質的変数として扱いますが、統計処理上は量的変数として扱うこともあります。年齢と年収は明確な量的変数です。最も適切な答えはBのみが質的変数です。"
    },
    {
      id: 2,
      question: "グラフの特徴について、正しい記述を選んでください。\n\nI. 棒グラフの棒の順序を入れ替えても、名義尺度のデータでは情報は変わらない\nII. ヒストグラムでは階級の境界に棒が接している\nIII. 円グラフでは各部分の角度が全体の360度に対する割合を表す",
      options: [
        "Iのみ",
        "IとIIのみ",
        "IとIIIのみ",
        "すべて正しい"
      ],
      correct: 4,
      explanation: "すべて正しい記述です。I. 名義尺度（血液型など）は順序に意味がないので入れ替え可能。II. ヒストグラムは連続データなので棒が接する。III. 円グラフは角度で割合を表します。"
    },
    {
      id: 3,
      question: "ある会社の過去10年間の売上高の推移を示したい場合、最も適切なグラフはどれですか。",
      options: [
        "円グラフ",
        "箱ひげ図",
        "折れ線グラフ",
        "ヒストグラム"
      ],
      correct: 3,
      explanation: "時系列データの変化や傾向を示すには折れ線グラフが最も適しています。時間の経過とともにどう変化したかが視覚的に分かりやすくなります。"
    },
    {
      id: 4,
      question: "次のグラフとその用途の組み合わせで、誤っているものはどれですか。",
      options: [
        "箱ひげ図 → データのばらつきや外れ値の確認",
        "散布図 → 2つの変数の相関関係の確認",
        "ヒストグラム → 連続データの度数分布の確認",
        "円グラフ → 2変数の関係性の確認"
      ],
      correct: 4,
      explanation: "円グラフは全体に占める各部分の割合を示すグラフで、2変数の関係性を示すものではありません。2変数の関係には散布図が適しています。"
    },
    {
      id: 5,
      question: "20人の生徒の身長データ（単位: cm）: 155, 158, 160, 162, 165, 165, 168, 170, 172, 175, 175, 175, 178, 180, 182, 182, 185, 188, 190, 195\n\nこのデータを視覚化する方法として適切なものを選んでください。",
      options: [
        "棒グラフ（各身長に1本ずつ）",
        "ヒストグラム（階級幅5cm程度）",
        "円グラフ",
        "折れ線グラフ"
      ],
      correct: 2,
      explanation: "連続的な量的変数の分布を表すには、適切な階級幅でヒストグラムを作成するのが最適です。個々の値を棒グラフにすると見づらくなります。"
    },
    {
      id: 6,
      question: "ある市の産業別就業者数の内訳を示す場合、最も適切なグラフの組み合わせはどれですか。",
      options: [
        "円グラフまたは帯グラフ（100%積み上げ棒グラフ）",
        "折れ線グラフ",
        "散布図",
        "ヒストグラム"
      ],
      correct: 1,
      explanation: "全体に占める各産業の割合を示すには、円グラフまたは帯グラフ（100%積み上げ棒グラフ）が適しています。"
    },
    {
      id: 7,
      question: "次の記述のうち、誤っているものはどれですか。",
      options: [
        "棒グラフは質的データの各カテゴリの度数を比較するのに適している",
        "ヒストグラムは横軸の階級の順序を入れ替えても情報は変わらない",
        "散布図は2つの量的変数の関係を調べるのに適している",
        "箱ひげ図は中央値や四分位数を視覚的に表現できる"
      ],
      correct: 2,
      explanation: "ヒストグラムは連続的な量的変数を階級に分けたもので、階級には順序があります。したがって、階級の順序を入れ替えると情報が変わってしまいます。"
    },
    {
      id: 8,
      question: "ある学校の各学年（1年、2年、3年）の生徒数と平均身長を調査しました。この2種類のデータを表現する際に、それぞれ最も適切なグラフはどれですか。",
      options: [
        "生徒数: ヒストグラム、平均身長: 円グラフ",
        "生徒数: 棒グラフ、平均身長: 棒グラフ",
        "生徒数: 折れ線グラフ、平均身長: 散布図",
        "生徒数: 散布図、平均身長: ヒストグラム"
      ],
      correct: 2,
      explanation: "学年別の生徒数は各学年（カテゴリ）の度数なので棒グラフが適しています。学年別の平均身長の比較も棒グラフが適しています。"
    },
    {
      id: 9,
      question: "次の変数の組み合わせのうち、散布図で表現するのに適しているのはどれですか。",
      options: [
        "年齢と血液型",
        "身長と体重",
        "性別と年収",
        "月と気温"
      ],
      correct: 2,
      explanation: "散布図は2つの量的変数の関係を調べるのに適しています。身長と体重はともに量的変数なので散布図で表現できます。年齢と血液型、性別と年収は一方または両方が質的変数です。"
    },
    {
      id: 10,
      question: "データの視覚化に関する次の記述のうち、正しいものを選んでください。\n\nI. グラフは目的に応じて適切に選択する必要がある\nII. どのようなデータでも円グラフで表現できる\nIII. ヒストグラムの階級幅を変えると、見た目の印象が変わることがある",
      options: [
        "IとIIのみ",
        "IとIIIのみ",
        "IIとIIIのみ",
        "すべて正しい"
      ],
      correct: 2,
      explanation: "Iは正しい。IIは誤り。円グラフは全体に占める割合を示すためのもので、すべてのデータに適しているわけではありません。IIIは正しい。階級幅によって分布の見え方が変わります。"
    }
  ];

  useEffect(() => {
    const best = getBestScore('grade3-section1_descriptivestats_3');
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
      examId: 'grade3-section1_descriptivestats_3',
      examTitle: '3級 Section1_DescriptiveStats_3',
      grade: '3級' as '3級',
      score,
      totalQuestions: questions.length,
      percentage,
      passed: percentage >= 60
    });
    
    const best = getBestScore('grade3-section1_descriptivestats_3');
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
              📊 3級 - データの種類と基本グラフ セット3
            </h1>
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">グラフ選択の総合問題に挑戦しましょう</p>
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