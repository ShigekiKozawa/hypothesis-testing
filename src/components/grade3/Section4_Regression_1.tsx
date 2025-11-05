import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade3Section4Set1() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const questions = [
    {
      id: 1,
      question: "次の箱ひげ図から、第1四分位数（Q1）を読み取ってください。\n\n【箱ひげ図の説明】\n最小値: 10\nQ1（箱の左端）: 20\nQ2（箱の中の線、中央値）: 30\nQ3（箱の右端）: 40\n最大値: 50",
      options: ["10", "20", "30", "40"],
      correct: 2,
      explanation: "箱ひげ図では、箱の左端がQ1（第1四分位数）を表します。この図ではQ1=20です。"
    },
    {
      id: 2,
      question: "箱ひげ図の「箱」は何を表していますか。",
      options: [
        "データ全体の範囲",
        "平均値±標準偏差の範囲",
        "Q1からQ3までの範囲（中央50%のデータ）",
        "外れ値の範囲"
      ],
      correct: 3,
      explanation: "箱ひげ図の「箱」は、Q1からQ3までの範囲、つまり中央50%のデータが含まれる範囲を表します。"
    },
    {
      id: 3,
      question: "次のヒストグラムから、最も度数が多い階級（最頻値が含まれる階級）を選んでください。\n\n【ヒストグラムの説明】\n10〜20点: 5人\n20〜30点: 12人\n30〜40点: 8人\n40〜50点: 3人",
      options: [
        "10〜20点",
        "20〜30点",
        "30〜40点",
        "40〜50点"
      ],
      correct: 2,
      explanation: "度数が最も多い階級は20〜30点（12人）です。この階級に最頻値（モード）が含まれます。"
    },
    {
      id: 4,
      question: "ヒストグラムの階級の幅を狭くすると、どうなりますか。",
      options: [
        "データの分布がより詳細にわかるが、度数が少なくなる",
        "データの分布が見にくくなる",
        "平均値が変わる",
        "分散が小さくなる"
      ],
      correct: 1,
      explanation: "階級の幅を狭くすると、分布の細かい特徴がわかりやすくなりますが、各階級の度数は少なくなります。"
    },
    {
      id: 5,
      question: "次の2つの箱ひげ図を比較したとき、正しい記述を選んでください。\n\nグループA: Q1=20、Q2=30、Q3=40\nグループB: Q1=25、Q2=30、Q3=35",
      options: [
        "グループAの方がばらつきが大きい",
        "グループBの方がばらつきが大きい",
        "両グループのばらつきは同じ",
        "中央値が同じなので比較できない"
      ],
      correct: 1,
      explanation: "四分位範囲（IQR）で比較します。A: IQR=40-20=20、B: IQR=35-25=10。グループAの方がばらつきが大きいです。"
    },
    {
      id: 6,
      question: "次のヒストグラムについて、平均値が中央値より大きいか小さいか判断してください。\n\n【ヒストグラムの説明】\n0〜10: 度数2\n10〜20: 度数3\n20〜30: 度数5\n30〜40: 度数8\n40〜50: 度数2\n50〜60: 度数1\n\n※右側に少し裾が伸びている分布",
      options: [
        "平均値 < 中央値（左に偏っている）",
        "平均値 > 中央値（右に偏っている）",
        "平均値 = 中央値",
        "判断できない"
      ],
      correct: 2,
      explanation: "分布が右側に裾を引いている（右に偏っている）場合、平均値は中央値より大きくなります。極端な値（50〜60）が平均値を引き上げるためです。"
    },
    {
      id: 7,
      question: "箱ひげ図で、箱の中の線は何を表していますか。",
      options: [
        "平均値",
        "中央値（Q2）",
        "最頻値",
        "標準偏差"
      ],
      correct: 2,
      explanation: "箱ひげ図の箱の中の線は、中央値（Q2、第2四分位数）を表します。"
    },
    {
      id: 8,
      question: "次のヒストグラムから、中央値が含まれる階級を特定してください。\n\n【データ: 全30人】\n0〜10点: 3人（累積3人）\n10〜20点: 5人（累積8人）\n20〜30点: 10人（累積18人）\n30〜40点: 8人（累積26人）\n40〜50点: 4人（累積30人）",
      options: [
        "10〜20点",
        "20〜30点",
        "30〜40点",
        "40〜50点"
      ],
      correct: 2,
      explanation: "30人の中央値は15番目と16番目の平均です。累積度数を見ると、15〜16番目は20〜30点の階級に含まれます（8人までで終わり、18人までで次の階級）。"
    },
    {
      id: 9,
      question: "ヒストグラムと箱ひげ図の違いについて、正しい記述を選んでください。",
      options: [
        "ヒストグラムは分布の形状がわかり、箱ひげ図は5数要約がわかる",
        "ヒストグラムは5数要約がわかり、箱ひげ図は分布の形状がわかる",
        "両方とも同じ情報を表している",
        "どちらも平均値を表示する"
      ],
      correct: 1,
      explanation: "ヒストグラムは度数分布の詳細な形状を示し、箱ひげ図は5数要約（最小値、Q1、Q2、Q3、最大値）と外れ値を簡潔に示します。"
    },
    {
      id: 10,
      question: "次の箱ひげ図について、外れ値と判定される基準を選んでください。\n\nQ1=20、Q3=40、IQR=20",
      options: [
        "20未満、または40より大きい",
        "0未満、または60より大きい",
        "-10未満、または70より大きい",
        "10未満、または50より大きい"
      ],
      correct: 3,
      explanation: "外れ値の基準は Q1 - 1.5×IQR より小さい、またはQ3 + 1.5×IQR より大きい値です。Q1 - 1.5×20 = 20 - 30 = -10、Q3 + 1.5×20 = 40 + 30 = 70 です。"
    }
  ];

  useEffect(() => {
    const best = getBestScore('grade3-section4_regression_1');
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
      examId: 'grade3-section4_regression_1',
      examTitle: '3級 - 箱ひげ図とヒストグラム セット1',
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
              📊 3級 - 箱ひげ図とヒストグラム セット1
            </h1>
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">箱ひげ図とヒストグラムの基本的な読み取りを学びましょう</p>
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
