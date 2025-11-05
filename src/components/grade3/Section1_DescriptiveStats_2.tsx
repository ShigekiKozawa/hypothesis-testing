import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade3Section1Set2() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const questions = [
    {
      id: 1,
      question: "特急券には以下の情報が記載されています。\n\nI. 発車時刻（例: 14:23）\nII. 特急料金（例: 3,500円）\nIII. 座席番号（例: 5号車12番A席）\n\nこれらのうち、量的変数はどれですか。",
      options: [
        "Iのみ",
        "IIのみ",
        "IとIIのみ",
        "すべて"
      ],
      correct: 2,
      explanation: "特急料金は金額なので量的変数です。発車時刻は時間の順序はあるが計算（平均など）はできないので質的変数（順序尺度）、座席番号は名前として扱われるので質的変数（名義尺度）です。"
    },
    {
      id: 2,
      question: "台風情報として以下のデータが発表されています。\n\nA. 台風番号（例: 台風第15号）\nB. 強さの区分（例: 強い、非常に強い）\nC. 中心気圧（例: 960hPa）\n\n量的変数と質的変数の正しい組み合わせはどれですか。",
      options: [
        "量的: Cのみ、質的: AとB",
        "量的: AとC、質的: B",
        "量的: BとC、質的: A",
        "すべて量的変数"
      ],
      correct: 1,
      explanation: "中心気圧（C）は数値として計算可能な量的変数です。台風番号（A）は番号だが順序に意味がないので質的変数（名義尺度）、強さの区分（B）は順序のある質的変数（順序尺度）です。"
    },
    {
      id: 3,
      question: "選挙結果のデータについて、次の変数のうち量的変数を選んでください。\n\na. 得票数\nb. 投票者数\nc. 最多得票政党名",
      options: [
        "aのみ",
        "aとbのみ",
        "bとcのみ",
        "すべて"
      ],
      correct: 2,
      explanation: "得票数と投票者数は数値として計算可能な量的変数です。政党名はカテゴリを表す質的変数（名義尺度）です。"
    },
    {
      id: 4,
      question: "次のグラフに関する記述のうち、正しいものを選んでください。\n\nI. 棒グラフは横軸にカテゴリ、縦軸に度数を取る\nII. 円グラフは各部分の面積が全体に占める割合を表す\nIII. 折れ線グラフは時系列の変化を表すのに適している",
      options: [
        "IとIIのみ",
        "IとIIIのみ",
        "IIとIIIのみ",
        "すべて正しい"
      ],
      correct: 4,
      explanation: "すべて正しい記述です。棒グラフは質的変数の度数、円グラフは割合、折れ線グラフは時系列変化を表すのに適しています。"
    },
    {
      id: 5,
      question: "ヒストグラムと棒グラフの違いについて、正しい記述はどれですか。",
      options: [
        "ヒストグラムは連続的な量的変数、棒グラフは質的変数を表す",
        "ヒストグラムは質的変数、棒グラフは量的変数を表す",
        "両者に違いはない",
        "ヒストグラムは横軸、棒グラフは縦軸に変数を取る"
      ],
      correct: 1,
      explanation: "ヒストグラムは連続的な量的変数の分布を表し、階級間に隙間がありません。棒グラフは質的変数やカテゴリの度数を表し、棒の間に隙間があります。"
    },
    {
      id: 6,
      question: "ある市の月別降水量を表すのに最も適しているグラフはどれですか。",
      options: [
        "円グラフ",
        "散布図",
        "折れ線グラフ",
        "箱ひげ図"
      ],
      correct: 3,
      explanation: "月別の降水量は時系列データなので、折れ線グラフが最も適しています。季節変動のパターンが視覚的に分かりやすくなります。"
    },
    {
      id: 7,
      question: "ある企業の4つの部門（営業、製造、管理、研究）の人数を比較したい場合、適切なグラフはどれですか。",
      options: [
        "折れ線グラフ",
        "散布図",
        "棒グラフまたは円グラフ",
        "ヒストグラム"
      ],
      correct: 3,
      explanation: "各部門の人数という質的変数のカテゴリ別の度数を比較するには、棒グラフが適しています。全体に占める割合を見る場合は円グラフも有効です。"
    },
    {
      id: 8,
      question: "散布図について、正しい記述を選んでください。",
      options: [
        "1つの変数の分布を表すのに適している",
        "2つの変数の関係を調べるのに適している",
        "時系列の変化を表すのに適している",
        "割合を表すのに適している"
      ],
      correct: 2,
      explanation: "散布図は2つの変数の関係（相関など）を視覚的に調べるのに適しています。各データ点を2次元平面上にプロットします。"
    },
    {
      id: 9,
      question: "グラフの選択について、誤っているものはどれですか。",
      options: [
        "時系列データ → 折れ線グラフ",
        "全体に占める割合 → 円グラフ",
        "身長と体重の関係 → 散布図",
        "連続的な量的変数の分布 → 円グラフ"
      ],
      correct: 4,
      explanation: "連続的な量的変数の分布を表すにはヒストグラムが適しています。円グラフは全体を100%として各部分の割合を表すグラフです。"
    },
    {
      id: 10,
      question: "100人の学生の身長データ（140cm〜190cm）を視覚化する場合、最も適切なグラフはどれですか。",
      options: [
        "棒グラフ（各身長ごとに1本）",
        "ヒストグラム（階級幅10cmなど）",
        "円グラフ",
        "折れ線グラフ"
      ],
      correct: 2,
      explanation: "連続的な量的変数（身長）の分布を表すには、適切な階級幅でヒストグラムを作成するのが最適です。個々の値を棒グラフにすると煩雑になります。"
    }
  ];

  useEffect(() => {
    const best = getBestScore('grade3-section1_descriptivestats_2');
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
      examId: 'grade3-section1_descriptivestats_2',
      examTitle: '3級 Section1_DescriptiveStats_2',
      grade: '3級' as '3級',
      score,
      totalQuestions: questions.length,
      percentage,
      passed: percentage >= 60
    });
    
    const best = getBestScore('grade3-section1_descriptivestats_2');
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
              📊 3級 - データの種類と基本グラフ セット2
            </h1>
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">実社会のデータを使ったグラフ選択の問題を解きましょう</p>
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