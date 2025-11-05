import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade3Section4Set3() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const questions = [
    {
      id: 1,
      question: "次の箱ひげ図を見て、データの下位25%と上位25%の範囲を答えてください。\n\n最小値=5、Q1=15、Q2=25、Q3=35、最大値=50",
      options: [
        "下位25%: 5〜15、上位25%: 35〜50",
        "下位25%: 5〜25、上位25%: 25〜50",
        "下位25%: 15〜25、上位25%: 25〜35",
        "判断できない"
      ],
      correct: 1,
      explanation: "箱ひげ図では、最小値からQ1までが下位25%、Q3から最大値までが上位25%のデータ範囲を表します。"
    },
    {
      id: 2,
      question: "次のヒストグラムから、累積相対度数を計算してください。\n\n【データ: 全30人】\n0〜10点: 3人\n10〜20点: 6人\n20〜30点: 12人\n\n20点未満の累積相対度数はいくらですか。",
      options: ["0.1", "0.2", "0.3", "0.4"],
      correct: 3,
      explanation: "20点未満は0〜20点の範囲です。累積度数は3+6=9人。累積相対度数は 9÷30=0.3 です。"
    },
    {
      id: 3,
      question: "次の箱ひげ図について、中央値が平均値とほぼ等しいと判断できる根拠を選んでください。\n\n最小値=10、Q1=20、Q2=30、Q3=40、最大値=50",
      options: [
        "箱とひげがほぼ左右対称だから",
        "Q2がQ1とQ3の中点だから",
        "最大値と最小値の差が40だから",
        "IQRが20だから"
      ],
      correct: 1,
      explanation: "箱ひげ図がほぼ左右対称の場合、データの分布も対称的であり、平均値と中央値がほぼ等しくなります。"
    },
    {
      id: 4,
      question: "次のヒストグラムで、「40点以上」の人は全体の何%ですか。\n\n【データ: 全50人】\n0〜20点: 5人\n20〜40点: 20人\n40〜60点: 15人\n60〜80点: 8人\n80〜100点: 2人",
      options: ["25%", "30%", "40%", "50%"],
      correct: 4,
      explanation: "40点以上は 15+8+2=25人。25÷50=0.5 なので50%です。"
    },
    {
      id: 5,
      question: "次の2つの箱ひげ図を比較したとき、どちらが「データのばらつき」が小さいですか。\n\nグループA: IQR=30、範囲=80\nグループB: IQR=15、範囲=90",
      options: [
        "グループA（IQRが大きい）",
        "グループB（IQRが小さい）",
        "同じ",
        "判断できない"
      ],
      correct: 2,
      explanation: "四分位範囲（IQR）が小さいほど、中央50%のデータのばらつきが小さいです。グループBの方がばらつきが小さいと言えます。"
    },
    {
      id: 6,
      question: "次のヒストグラムで、標準偏差が最も小さいと考えられる分布はどれですか。",
      options: [
        "すべての階級の度数がほぼ等しい（平坦な分布）",
        "中央の階級に度数が集中している（尖った分布）",
        "両端の階級に度数が集中している（二峰性の分布）",
        "判断できない"
      ],
      correct: 2,
      explanation: "標準偏差はデータのばらつきを表します。中央に度数が集中している分布は、データが平均値の近くに集まっているため、標準偏差が小さくなります。"
    },
    {
      id: 7,
      question: "箱ひげ図で、ある生徒の得点が「Q3」と同じでした。この生徒は全体の上位何%に入りますか。",
      options: ["約25%", "約50%", "約75%", "約100%"],
      correct: 1,
      explanation: "Q3（第3四分位数）は上位25%の境界を表します。Q3の位置にいる生徒は、上位25%に入ります。"
    },
    {
      id: 8,
      question: "次のヒストグラムと箱ひげ図の組み合わせで、正しく対応しているものを選んでください。\n\n【ヒストグラム】右側に裾が長い分布\n【箱ひげ図の候補】\nA: 箱の右側のひげが長い\nB: 箱の左側のひげが長い\nC: 箱とひげが対称",
      options: [
        "A",
        "B",
        "C",
        "判断できない"
      ],
      correct: 1,
      explanation: "ヒストグラムで右側に裾が長い場合、箱ひげ図でも右側（大きい値の方向）のひげが長くなります。"
    },
    {
      id: 9,
      question: "次のヒストグラムから、度数分布表を作成しました。階級値を使って平均値を計算する際の注意点は何ですか。",
      options: [
        "階級値は階級の中央値であり、実際のデータの平均値とは誤差がある",
        "階級値を使えば常に正確な平均値が求められる",
        "階級値は最大値と最小値の平均である",
        "階級値は使わずに度数だけで計算できる"
      ],
      correct: 1,
      explanation: "階級値は各階級の中央値を代表値として使うため、階級内のデータの分布によっては実際の平均値と誤差が生じます。"
    },
    {
      id: 10,
      question: "次の2つの箱ひげ図について、正しい記述を選んでください。\n\nグループA: 箱が小さく、ひげが長い\nグループB: 箱が大きく、ひげが短い",
      options: [
        "グループAは中央50%が密集し、外側に外れ値的なデータがある",
        "グループBは中央50%が密集し、外側に外れ値的なデータがある",
        "両グループのばらつきは同じ",
        "判断できない"
      ],
      correct: 1,
      explanation: "箱（IQR）が小さいということは中央50%のデータが密集していることを意味し、ひげが長いということは外側に離れたデータがあることを意味します。"
    }
  ];

  useEffect(() => {
    const best = getBestScore('grade3-section4_regression_3');
    if (best) {
      setBestScore(best.percentage);
    }
  }, []);

  const handleAnswer = (questionId: number, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleSubmit = () => {
    const score = Object.keys(answers).reduce((acc, qId) => {
      const question = questions.find(q => q.id === parseInt(qId));
      if (question && answers[parseInt(qId)] === question.correct) {
        return acc + 1;
      }
      return acc;
    }, 0);

    const percentage = (score / questions.length) * 100;
    const passed = percentage >= 60;

    saveExamRecord({
      examId: 'grade3-section4_regression_3',
      examTitle: '3級 - 箱ひげ図とヒストグラム セット3',
      grade: '3級' as '3級',
      score,
      totalQuestions: questions.length,
      percentage,
      passed
    });

    setShowResult(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResult(false);
    setCurrentQuestionIndex(0);
    window.scrollTo(0, 0);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const allAnswered = Object.keys(answers).length === questions.length;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (showResult) {
    const score = Object.keys(answers).reduce((acc, qId) => {
      const question = questions.find(q => q.id === parseInt(qId));
      if (question && answers[parseInt(qId)] === question.correct) {
        return acc + 1;
      }
      return acc;
    }, 0);

    const percentage = (score / questions.length) * 100;
    const passed = percentage >= 60;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              結果発表 🎉
            </h1>
            
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6 mb-6">
              <div className="text-center mb-4">
                <p className="text-6xl font-bold text-purple-600 mb-2">
                  {score}/{questions.length}
                </p>
                <p className="text-2xl text-gray-700">
                  正解率: {percentage.toFixed(1)}%
                </p>
                {bestScore !== null && (
                  <p className="text-lg text-gray-600 mt-2">
                    あなたのベストスコア: {bestScore.toFixed(1)}%
                  </p>
                )}
              </div>

              {passed ? (
                <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-4">
                  <p className="text-green-700 font-semibold">
                    ✅ 合格です！よくできました！
                  </p>
                </div>
              ) : (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
                  <p className="text-yellow-700 font-semibold">
                    📚 もう少し復習が必要です。再挑戦してみましょう！
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-4 mb-6">
              <button
                onClick={handleReset}
                className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                もう一度挑戦
              </button>
              <Link
                to="/"
                className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors text-center"
              >
                トップに戻る
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            {questions.map((q) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.correct;

              return (
                <div
                  key={q.id}
                  className={`bg-white rounded-lg shadow-md p-6 border-2 ${
                    isCorrect
                      ? 'border-green-500'
                      : userAnswer
                      ? 'border-red-500'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start mb-4">
                    <span className="text-lg font-bold text-purple-600 mr-3">
                      Q{q.id}.
                    </span>
                    <p className="text-gray-800 font-medium flex-1 whitespace-pre-line">
                      {q.question}
                    </p>
                    {isCorrect ? (
                      <span className="text-green-600 text-xl">✓</span>
                    ) : userAnswer ? (
                      <span className="text-red-600 text-xl">✗</span>
                    ) : null}
                  </div>

                  <div className="space-y-2 mb-4">
                    {q.options.map((option, index) => {
                      const optionNumber = index + 1;
                      const isSelected = userAnswer === optionNumber;
                      const isCorrectOption = q.correct === optionNumber;

                      return (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border-2 ${
                            isCorrectOption
                              ? 'border-green-500 bg-green-50'
                              : isSelected
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200'
                          }`}
                        >
                          <span className="font-semibold mr-2">
                            {optionNumber}.
                          </span>
                          {option}
                          {isCorrectOption && (
                            <span className="ml-2 text-green-600 font-semibold">
                              ← 正解
                            </span>
                          )}
                          {isSelected && !isCorrectOption && (
                            <span className="ml-2 text-red-600 font-semibold">
                              ← あなたの回答
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1 font-semibold">
                      💡 正解
                    </p>
                    <p className="text-gray-700 text-sm mb-2">
                      {q.correct}. {q.options[q.correct - 1]}
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg mt-3">
                    <p className="text-sm text-gray-600 mb-1 font-semibold">📖 解説</p>
                    <p className="text-gray-700 text-sm leading-relaxed">{q.explanation}</p>
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
              📊 3級 - 箱ひげ図とヒストグラム セット3
            </h1>
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">箱ひげ図とヒストグラムの総合問題を解きましょう</p>
          <div className="flex gap-2 text-sm text-gray-500">
            <span>全10問</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">
                問題 {currentQuestionIndex + 1} / {questions.length}
              </span>
              <span className="text-sm font-semibold text-gray-700">
                進捗: {Object.keys(answers).length} / {questions.length} 回答済み
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-start mb-4">
              <span className="text-xl font-bold text-purple-600 mr-3">
                Q{currentQuestion.id}.
              </span>
              <p className="text-lg text-gray-800 font-medium flex-1 whitespace-pre-line">
                {currentQuestion.question}
              </p>
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const optionNumber = index + 1;
                const isSelected = answers[currentQuestion.id] === optionNumber;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(currentQuestion.id, optionNumber)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'
                    }`}
                  >
                    <span className="font-semibold mr-3">{optionNumber}.</span>
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ← 前の問題
            </button>
            
            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className="flex-1 px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {allAnswered ? '結果を見る' : `残り ${questions.length - Object.keys(answers).length} 問`}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                次の問題 →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
