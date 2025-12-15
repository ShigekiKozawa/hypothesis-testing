import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section2_Correlation_1() {
  const questions: Question[] = [
    {
      id: 1,
      question: "次の散布図から、2つの変数XとYの相関関係について最も適切な記述はどれですか。\n\n散布図：Xが増加するとYも増加する傾向があり、点はやや直線に近い分布を示している。",
      options: [
        "強い正の相関がある",
        "弱い正の相関がある",
        "相関はない",
        "負の相関がある"
      ],
      correct: 1,
      explanation: "Xが増加するとYも増加し、点がやや直線に近いので、弱い正の相関があります。完全な直線状なら強い正の相関となります。",
      chartType: 'scatter',
      chartData: [
        { x: 10, y: 25 },
        { x: 15, y: 30 },
        { x: 20, y: 35 },
        { x: 25, y: 45 },
        { x: 30, y: 50 },
        { x: 35, y: 55 },
        { x: 40, y: 65 },
        { x: 45, y: 70 }
      ],
      chartLabels: { x: '変数X', y: '変数Y' }
    },
    {
      id: 2,
      question: "相関係数rの値の範囲として正しいものはどれですか。",
      options: [
        "0 ≤ r ≤ 1",
        "-1 ≤ r ≤ 1",
        "r ≥ 0",
        "r < 1"
      ],
      correct: 2,
      explanation: "相関係数rは、-1 ≤ r ≤ 1 の範囲の値をとります。r=1は完全な正の相関、r=-1は完全な負の相関、r=0は無相関を表します。",
      chartType: 'scatter',
      chartData: [
        { x: 10, y: 50 },
        { x: 20, y: 45 },
        { x: 30, y: 52 },
        { x: 40, y: 48 },
        { x: 50, y: 51 }
      ],
      chartLabels: { x: '変数X', y: '変数Y' }
    },
    {
      id: 3,
      question: "次の散布図で、相関係数rの値として最も適切なものはどれですか。\n\n散布図：Xが増加するとYが減少する明確な負の直線関係が見られる。",
      options: [
        "r ≒ -0.9",
        "r ≒ -0.3",
        "r ≒ 0.3",
        "r ≒ 0.9"
      ],
      correct: 1,
      explanation: "明確な負の直線関係があるので、相関係数は-1に近い値、つまりr ≒ -0.9が適切です。",
      chartType: 'scatter',
      chartData: [
        { x: 10, y: 90 },
        { x: 20, y: 75 },
        { x: 30, y: 65 },
        { x: 40, y: 50 },
        { x: 50, y: 35 },
        { x: 60, y: 20 },
        { x: 70, y: 10 }
      ],
      chartLabels: { x: '変数X', y: '変数Y' }
    },
    {
      id: 4,
      question: "散布図から読み取れる情報として誤っているものはどれですか。",
      options: [
        "2つの変数の関係の強さ",
        "2つの変数の関係の方向（正・負）",
        "外れ値の存在",
        "因果関係の有無"
      ],
      correct: 4,
      explanation: "散布図からは相関関係（関係の強さや方向）はわかりますが、因果関係はわかりません。相関があっても因果関係があるとは限りません。",
      chartType: 'scatter',
      chartData: [
        { x: 15, y: 30 },
        { x: 25, y: 40 },
        { x: 35, y: 50 },
        { x: 45, y: 60 },
        { x: 55, y: 70 }
      ],
      chartLabels: { x: '変数X', y: '変数Y' }
    },
    {
      id: 5,
      question: "次の散布図において、(60, 20)のデータポイントを除去すると相関係数はどうなりますか。\n\n散布図：ほとんどの点は正の相関を示しているが、(60, 20)だけが大きく外れている。",
      options: [
        "相関係数は大きく減少する",
        "相関係数は大きく増加する",
        "相関係数はほとんど変わらない",
        "判断できない"
      ],
      correct: 2,
      explanation: "外れ値(60, 20)は正の相関の傾向を弱めているので、これを除去すると相関係数は大きく増加します。",
      chartType: 'scatter',
      chartData: [
        { x: 10, y: 15 },
        { x: 20, y: 25 },
        { x: 30, y: 35 },
        { x: 40, y: 45 },
        { x: 50, y: 55 },
        { x: 60, y: 20 }
      ],
      chartLabels: { x: '変数X', y: '変数Y' }
    },
    {
      id: 6,
      question: "以下の散布図で示される2つの変数の関係について、最も適切な記述はどれですか。\n\n散布図：点がランダムに散らばっており、特定の傾向は見られない。",
      options: [
        "強い正の相関がある",
        "弱い負の相関がある",
        "ほとんど相関がない",
        "非線形の関係がある"
      ],
      correct: 3,
      explanation: "点がランダムに散らばっており特定の傾向が見られない場合、ほとんど相関がない（相関係数≒0）と言えます。",
      chartType: 'scatter',
      chartData: [
        { x: 10, y: 45 },
        { x: 20, y: 30 },
        { x: 30, y: 55 },
        { x: 40, y: 25 },
        { x: 50, y: 60 },
        { x: 60, y: 35 },
        { x: 70, y: 50 }
      ],
      chartLabels: { x: '変数X', y: '変数Y' }
    },
    {
      id: 7,
      question: "相関係数が-0.8の場合、正しい記述はどれですか。",
      options: [
        "XとYには強い正の相関がある",
        "XとYには強い負の相関がある",
        "XとYにはほとんど相関がない",
        "因果関係がある"
      ],
      correct: 2,
      explanation: "相関係数が-0.8は、絶対値が0.8と大きく、符号が負なので、強い負の相関があることを示します。",
      chartType: 'scatter',
      chartData: [
        { x: 10, y: 85 },
        { x: 20, y: 75 },
        { x: 30, y: 60 },
        { x: 40, y: 50 },
        { x: 50, y: 40 },
        { x: 60, y: 25 },
        { x: 70, y: 15 }
      ],
      chartLabels: { x: '変数X', y: '変数Y' }
    },
    {
      id: 8,
      question: "次の散布図から共分散の符号を判断してください。\n\n散布図：Xが増加するとYも増加する傾向がある。",
      options: [
        "共分散は正",
        "共分散は負",
        "共分散は0",
        "判断できない"
      ],
      correct: 1,
      explanation: "Xが増加するとYも増加する（正の相関）場合、共分散は正の値をとります。",
      chartType: 'scatter',
      chartData: [
        { x: 5, y: 10 },
        { x: 10, y: 20 },
        { x: 15, y: 30 },
        { x: 20, y: 40 },
        { x: 25, y: 50 },
        { x: 30, y: 60 }
      ],
      chartLabels: { x: '変数X', y: '変数Y' }
    },
    {
      id: 9,
      question: "散布図において、すべての点が完全に一直線上に並んでいる場合、相関係数の絶対値はいくつですか。",
      options: ["0", "0.5", "0.9", "1"],
      correct: 4,
      explanation: "すべての点が完全に一直線上に並んでいる場合、相関係数の絶対値は1です。正の傾きならr=1、負の傾きならr=-1となります。",
      chartType: 'scatter',
      chartData: [
        { x: 10, y: 20 },
        { x: 20, y: 30 },
        { x: 30, y: 40 },
        { x: 40, y: 50 },
        { x: 50, y: 60 }
      ],
      chartLabels: { x: '変数X', y: '変数Y' }
    },
    {
      id: 10,
      question: "次の散布図で、相関係数rとして最も適切な値はどれですか。\n\n散布図：やや正の相関が見られるが、点のばらつきは大きい。",
      options: ["r ≒ 0.1", "r ≒ 0.4", "r ≒ 0.7", "r ≒ 0.95"],
      correct: 2,
      explanation: "やや正の相関があるが点のばらつきが大きい場合、相関係数は0.3～0.5程度の中程度の値となります。r ≒ 0.4が最も適切です。",
      chartType: 'scatter',
      chartData: [
        { x: 10, y: 25 },
        { x: 15, y: 40 },
        { x: 20, y: 30 },
        { x: 25, y: 50 },
        { x: 30, y: 45 },
        { x: 35, y: 60 },
        { x: 40, y: 55 },
        { x: 45, y: 70 }
      ],
      chartLabels: { x: 'X', y: 'Y' }
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
    examId: 'grade3-section2_correlation_1',
    examTitle: '3級 - Section2: 散布図・相関・単回帰分析 (1/3)',
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
        title="3級 - Section2: 散布図・相関・単回帰分析 (1/3)"
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
      title="3級 - Section2: 散布図・相関・単回帰分析 (1/3)"
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
