import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade4Section8Set2() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const questions = [
    {
      id: 1,
      question: "ヒストグラムで、階級の幅が広すぎる場合、どのような問題がありますか。",
      options: [
        "詳細な分布の様子がわからなくなる",
        "詳細な分布の様子がわかりやすくなる",
        "データの値が変わる",
        "問題はない"
      ],
      correct: 1,
      explanation: "階級の幅が広すぎると、データが大きくまとめられ、詳細な分布の様子が把握しにくくなります。"
    },
    {
      id: 2,
      question: "ヒストグラムで、階級の幅が狭すぎる場合、どのような問題がありますか。",
      options: [
        "全体の傾向がわかりにくくなる",
        "全体の傾向がわかりやすくなる",
        "グラフが見やすくなる",
        "問題はない"
      ],
      correct: 1,
      explanation: "階級の幅が狭すぎると、棒の数が多くなりすぎて、全体の分布の傾向が把握しにくくなります。"
    },
    {
      id: 3,
      question: "ヒストグラムで、棒と棒の間に隙間がないのはなぜですか。",
      options: [
        "見栄えが良いから",
        "連続的なデータを表しているから",
        "間違いである",
        "特に理由はない"
      ],
      correct: 2,
      explanation: "ヒストグラムは連続的なデータの分布を表すため、棒と棒の間に隙間がありません。"
    },
    {
      id: 4,
      question: "ヒストグラムが左右対称な形をしている場合、データの分布について何が言えますか。",
      options: [
        "偏りがある",
        "外れ値が多い",
        "平均値と中央値がほぼ等しい",
        "データが少ない"
      ],
      correct: 3,
      explanation: "左右対称な分布では、データの中心が明確で、平均値と中央値がほぼ等しくなります。"
    },
    {
      id: 5,
      question: "ヒストグラムに2つの山がある場合、このような分布を何と言いますか。",
      options: ["一峰性", "二峰性", "多峰性", "均一性"],
      correct: 2,
      explanation: "2つの山（ピーク）がある分布を二峰性分布と言います。異なる2つのグループが混在している可能性があります。"
    },
    {
      id: 6,
      question: "度数分布表からヒストグラムを作成するとき、何を縦軸にしますか。",
      options: ["階級値", "度数", "累積度数", "相対度数"],
      correct: 2,
      explanation: "ヒストグラムの縦軸は度数を表します（相対度数や累積度数を使うこともあります）。"
    },
    {
      id: 7,
      question: "データ 5, 10, 15, 20, 25 を階級幅5でヒストグラムにすると、いくつの階級ができますか。",
      options: ["3つ", "4つ", "5つ", "6つ"],
      correct: 3,
      explanation: "データの範囲は5〜25の20なので、階級幅5で分けると 20÷5 = 4つの階級ができます。(5-10, 10-15, 15-20, 20-25)"
    },
    {
      id: 8,
      question: "ヒストグラムで、最も度数が高い階級を何と言いますか。",
      options: ["中央階級", "最頻階級", "第一階級", "基準階級"],
      correct: 2,
      explanation: "最も度数が高い階級を最頻階級と言います。この階級に最も多くのデータが含まれています。"
    },
    {
      id: 9,
      question: "ヒストグラムから読み取れない情報はどれですか。",
      options: [
        "データの分布の形",
        "個々のデータの正確な値",
        "データの集中している範囲",
        "データの広がり"
      ],
      correct: 2,
      explanation: "ヒストグラムは階級ごとにデータをまとめて表示するため、個々のデータの正確な値は読み取れません。"
    },
    {
      id: 10,
      question: "ヒストグラムを作成する際の階級数の目安として、よく使われる式はどれですか。",
      options: [
        "データ数の平方根",
        "データ数の2倍",
        "データ数の半分",
        "データ数の10倍"
      ],
      correct: 1,
      explanation: "階級数の目安として、スタージェスの公式など様々な方法がありますが、簡単な目安としてデータ数の平方根がよく使われます。"
    }
  ];

  useEffect(() => {
    const best = getBestScore('grade4-section8_histogram_2');
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
      examId: 'grade4-section8_histogram_2',
      examTitle: '4級 Section8_Histogram_2',
      grade: '4級',
      score,
      totalQuestions: questions.length,
      percentage,
      passed: percentage >= 60
    });
    
    const best = getBestScore('grade4-section8_histogram_2');
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
              📊 4級 - ヒストグラム セット2
            </h1>
            <Link
              to="/"
              className="text-green-600 hover:text-green-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">ヒストグラムの読み方とデータ分布の理解を深めましょう</p>
          <div className="flex gap-2 text-sm text-gray-500">
            <span className="bg-green-100 px-3 py-1 rounded-full">セット2/3</span>
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