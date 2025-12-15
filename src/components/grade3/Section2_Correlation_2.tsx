import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section2_Correlation_2() {
  const questions: Question[] = [
    {
      id: 1,
      question: "単回帰分析で得られた回帰式が Y = 2X + 10 の場合、X = 15 のときのYの予測値はいくつですか。",
      options: ["25", "30", "35", "40"],
      correct: 4,
      explanation: "Y = 2×15 + 10 = 30 + 10 = 40です。",
      chartType: 'scatter',
      chartData: [
        { x: 5, y: 20 },
        { x: 10, y: 30 },
        { x: 15, y: 40 },
        { x: 20, y: 50 },
        { x: 25, y: 60 }
      ],
      chartLabels: { x: '説明変数X', y: '目的変数Y' }
    },
    {
      id: 2,
      question: "回帰式 Y = aX + b において、aは何を表しますか。",
      options: [
        "切片",
        "傾き（回帰係数）",
        "相関係数",
        "決定係数"
      ],
      correct: 2,
      explanation: "aは回帰式の傾き（回帰係数）を表します。Xが1単位増加したときのYの変化量です。bは切片を表します。",
      chartType: 'scatter',
      chartData: [
        { x: 10, y: 25 },
        { x: 20, y: 35 },
        { x: 30, y: 45 },
        { x: 40, y: 55 }
      ],
      chartLabels: { x: '説明変数X', y: '目的変数Y' }
    },
    {
      id: 3,
      question: "決定係数R²が0.9の場合、この回帰モデルについて正しい記述はどれですか。",
      options: [
        "Yの変動の10%がXで説明できる",
        "Yの変動の90%がXで説明できる",
        "相関係数は0.9である",
        "回帰式の傾きは0.9である"
      ],
      correct: 2,
      explanation: "決定係数R²=0.9は、Yの変動の90%がXで説明できることを意味します。R²は0から1の値をとり、1に近いほど当てはまりが良いモデルです。",
      chartType: 'scatter',
      chartData: [
        { x: 10, y: 22 },
        { x: 20, y: 41 },
        { x: 30, y: 59 },
        { x: 40, y: 81 },
        { x: 50, y: 98 }
      ],
      chartLabels: { x: '説明変数X', y: '目的変数Y' }
    },
    {
      id: 4,
      question: "残差とは何を意味しますか。",
      options: [
        "実測値と平均値の差",
        "実測値と予測値の差",
        "予測値と平均値の差",
        "XとYの差"
      ],
      correct: 2,
      explanation: "残差は、実測値と回帰式による予測値の差です。残差が小さいほど、回帰式のあてはまりが良いことを示します。",
      chartType: 'scatter',
      chartData: [
        { x: 10, y: 25 },
        { x: 15, y: 32 },
        { x: 20, y: 38 },
        { x: 25, y: 46 },
        { x: 30, y: 51 }
      ],
      chartLabels: { x: '説明変数X', y: '目的変数Y' }
    },
    {
      id: 5,
      question: "回帰式 Y = -3X + 50 において、Xが10から15に増加したとき、Yはどう変化しますか。",
      options: [
        "15増加する",
        "15減少する",
        "3増加する",
        "3減少する"
      ],
      correct: 2,
      explanation: "Xが5増加すると、Y = -3×5 = -15、つまり15減少します。傾きが負なので、Xが増加するとYは減少します。",
      chartType: 'scatter',
      chartData: [
        { x: 5, y: 35 },
        { x: 10, y: 20 },
        { x: 15, y: 5 },
        { x: 20, y: -10 }
      ],
      chartLabels: { x: '説明変数X', y: '目的変数Y' }
    },
    {
      id: 6,
      question: "単回帰分析において、決定係数R²の値の範囲として正しいものはどれですか。",
      options: [
        "-1 ≤ R² ≤ 1",
        "0 ≤ R² ≤ 1",
        "0 ≤ R² < ∞",
        "R²は任意の実数"
      ],
      correct: 2,
      explanation: "決定係数R²は 0 ≤ R² ≤ 1 の範囲の値をとります。R²=1は完全な当てはまり、R²=0は説明力がないことを意味します。",
      chartType: 'scatter',
      chartData: [
        { x: 10, y: 30 },
        { x: 20, y: 50 },
        { x: 30, y: 70 },
        { x: 40, y: 90 }
      ],
      chartLabels: { x: '説明変数X', y: '目的変数Y' }
    },
    {
      id: 7,
      question: "回帰式から計算された予測値が実測値より大きい場合、残差は正負どちらですか。",
      options: [
        "正",
        "負",
        "0",
        "判断できない"
      ],
      correct: 2,
      explanation: "残差 = 実測値 - 予測値なので、予測値 > 実測値のとき、残差は負になります。",
      chartType: 'scatter',
      chartData: [
        { x: 10, y: 22 },
        { x: 20, y: 38 },
        { x: 30, y: 58 },
        { x: 40, y: 79 }
      ],
      chartLabels: { x: '説明変数X', y: '目的変数Y' }
    },
    {
      id: 8,
      question: "XとYの相関係数がr = 0.8の場合、決定係数R²の値はいくつですか。",
      options: ["0.4", "0.64", "0.8", "0.89"],
      correct: 2,
      explanation: "決定係数R²は相関係数rの2乗です。R² = r² = 0.8² = 0.64となります。",
      chartType: 'scatter',
      chartData: [
        { x: 10, y: 18 },
        { x: 20, y: 32 },
        { x: 30, y: 48 },
        { x: 40, y: 61 },
        { x: 50, y: 78 }
      ],
      chartLabels: { x: '説明変数X', y: '目的変数Y' }
    },
    {
      id: 9,
      question: "回帰式 Y = 0.5X + 20 で、X=0のときのYの値（切片）はいくつですか。",
      options: ["0", "0.5", "20", "20.5"],
      correct: 3,
      explanation: "X=0を代入すると、Y = 0.5×0 + 20 = 20です。これが切片（Y切片）の値です。",
      chartType: 'scatter',
      chartData: [
        { x: 0, y: 20 },
        { x: 10, y: 25 },
        { x: 20, y: 30 },
        { x: 30, y: 35 },
        { x: 40, y: 40 }
      ],
      chartLabels: { x: '説明変数X', y: '目的変数Y' }
    },
    {
      id: 10,
      question: "単回帰分析において、残差の合計（Σ残差）の値は理論的にいくつになりますか。",
      options: [
        "正の値",
        "負の値",
        "0",
        "データによって異なる"
      ],
      correct: 3,
      explanation: "最小二乗法で求めた回帰式では、残差の合計は理論的に0になります。これは回帰式の性質です。",
      chartType: 'scatter',
      chartData: [
        { x: 10, y: 25 },
        { x: 20, y: 40 },
        { x: 30, y: 55 },
        { x: 40, y: 70 },
        { x: 50, y: 85 }
      ],
      chartLabels: { x: '説明変数X', y: '目的変数Y' }
    }
  ];

  const {
    answers,
    showResult,
    currentQuestionIndex,
    bestScore,
    handleAnswer,
    calculateScore,
    handleSubmit,
    resetExam,
    handleNext,
    handlePrevious,
  } = useExam({
    examId: 'grade3-section2_correlation_2',
    examTitle: '3級 - Section2: 散布図・相関・単回帰分析 (2/3)',
    grade: '3級',
    questions,
  });

  if (showResult) {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;

    return (
      <ResultScreen
        score={score}
        totalQuestions={questions.length}
        percentage={percentage}
        questions={questions}
        answers={answers}
        onReset={resetExam}
        backLink="/"
      />
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  // 問題が空の場合
  if (questions.length === 0) {
    return (
      <ExamLayout
        title="3級 - Section2: 散布図・相関・単回帰分析 (2/3)"
        backLink="/"
        bestScore={bestScore}
      >
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">📝 問題データがまだ作成されていません</p>
          <p className="text-gray-500 mb-2">このセクションの問題は、AI問題生成機能で作成できます。</p>
          <p className="text-sm text-gray-400">
            ホーム画面の「AI問題生成モード」から、このセクションを選択して問題を生成してください。
          </p>
        </div>
      </ExamLayout>
    );
  }

  return (
    <ExamLayout
      title="3級 - Section2: 散布図・相関・単回帰分析 (2/3)"
      backLink="/"
      bestScore={bestScore}
    >
      <QuestionCard
        question={currentQuestion}
        questionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        userAnswer={answers[currentQuestion?.id]}
        onAnswer={handleAnswer}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
      />
    </ExamLayout>
  );
}
