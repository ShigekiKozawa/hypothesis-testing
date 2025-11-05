import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade3Section5Set2() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const questions = [
    {
        id: 1,
        question: "10人の英語と数学の得点から相関係数を計算したところ、r=0.9でした。これについて正しい記述を選んでください。",
        options: [
            "英語が得意な人は数学も得意な傾向が強い",
            "英語の点数が高い人は必ず数学も高い",
            "因果関係がある",
            "比例関係にある"
        ],
        correct: 1,
        explanation: "相関係数r=0.9は強い正の相関を示し、「英語が得意な人は数学も得意な傾向が強い」と言えますが、必ずそうとは限らず、因果関係や比例関係を意味するものではありません。"
    },
    {
        id: 2,
        question: "気温とアイスクリームの売上の相関係数を計算したところr=0.7でした。これについて正しい解釈を選んでください。",
        options: [
            "気温が高いとアイスクリームの売上も高い傾向がある",
            "気温がアイスクリームの売上の原因である",
            "完全な比例関係",
            "因果関係が証明された"
        ],
        correct: 1,
        explanation: "相関係数r=0.7は正の相関を示しますが、これは傾向を表すだけで、因果関係や比例関係を証明するものではありません。"
    },
    {
        id: 3,
        question: "次の散布図のうち、相関係数が最も0に近いものはどれですか。",
        options: [
            "右上がりの直線状",
            "右下がりの直線状",
            "円形にランダムに散らばっている",
            "放物線状"
        ],
        correct: 3,
        explanation: "円形にランダムに散らばっている場合、xとyの間に線形的な関係がないため、相関係数は0に近くなります。"
    },
    {
        id: 4,
        question: "共分散と相関係数の関係について、正しい記述を選んでください。",
        options: [
            "共分散=相関係数",
            "相関係数=共分散÷(xの標準偏差×yの標準偏差)",
            "共分散=相関係数の2乗",
            "関係ない"
        ],
        correct: 2,
        explanation: "相関係数は、共分散をxとyの標準偏差の積で割った値です。これにより、相関係数は単位に依存しない-1から1の値になります。"
    },
    {
        id: 5,
        question: "散布図で、点が右下がりの直線に近い形で分布しています。相関係数の値として最も適切なものを選んでください。",
        options: [
            "約0.8",
            "約0.2",
            "約-0.8",
            "約0"
        ],
        correct: 3,
        explanation: "右下がりの直線に近い形は強い負の相関を示すため、相関係数は-1に近い値、例えば-0.8程度になります。"
    },
    {
        id: 6,
        question: "2つの変数xとyについて、xを2倍してから相関係数を計算すると、元の相関係数とどうなりますか。",
        options: [
            "2倍になる",
            "半分になる",
            "変わらない",
            "必ず0になる"
        ],
        correct: 3,
        explanation: "相関係数はデータの一次変換（定数倍や定数の加減）に対して不変です。xを2倍しても相関係数は変わりません。"
    },
    {
        id: 7,
        question: "アイスクリームの売上と水難事故の件数に正の相関がありました。これについて正しい解釈を選んでください。",
        options: [
            "アイスクリームを食べると水難事故が増える",
            "水難事故が増えるとアイスクリームが売れる",
            "両方とも気温という第3の変数と関連している可能性がある",
            "偶然の一致"
        ],
        correct: 3,
        explanation: "これは疑似相関の典型例です。両方とも気温が高いと増えるため、見かけ上の相関が生じています。相関≠因果であり、第3の変数（交絡因子）を考慮する必要があります。"
    },
    {
        id: 8,
        question: "相関係数を計算する際の注意点として、正しいものを選んでください。",
        options: [
            "外れ値の影響を受けにくい",
            "非線形関係も正確に捉えられる",
            "線形関係の強さを示すが、非線形関係は捉えられない",
            "因果関係を証明できる"
        ],
        correct: 3,
        explanation: "相関係数は線形（直線的）関係の強さを示す指標です。非線形関係（曲線的な関係）は捉えられず、また因果関係を証明するものでもありません。"
    },
    {
        id: 9,
        question: "都道府県別のコンビニ店舗数と人口の相関係数を計算したところr=0.95でした。これについて正しい記述を選んでください。",
        options: [
            "人口が多い都道府県ほどコンビニ店舗数も多い傾向が非常に強い",
            "人口がコンビニ店舗数の原因である",
            "完全に比例している",
            "必ず人口÷10がコンビニ店舗数になる"
        ],
        correct: 1,
        explanation: "相関係数r=0.95は非常に強い正の相関を示しますが、これは傾向を表すだけで、因果関係、完全な比例、具体的な比率を意味するものではありません。"
    },
    {
        id: 10,
        question: "次のうち、相関係数が負になる可能性が最も高い組み合わせはどれですか。",
        options: [
            "身長と体重",
            "気温とアイスクリームの売上",
            "車の速度と到着時間",
            "勉強時間とテストの点数"
        ],
        correct: 3,
        explanation: "車の速度が速いと到着時間は短くなるため、負の相関になります。他の選択肢はすべて正の相関が予想されます。"
    }
];

  useEffect(() => {
    const best = getBestScore('grade3-section5_anova_2');
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
      examId: 'grade3-section5_anova_2',
      examTitle: '3級 - 散布図と相関 セット2',
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
              📊 3級 - 散布図と相関 セット2
            </h1>
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">相関係数の計算と解釈を学びましょう</p>
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
