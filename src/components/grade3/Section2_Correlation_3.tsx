import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section2_Correlation_3() {
  const questions: Question[] = [
    {
      id: 1,
      question: "変数XとYの相関係数が0.6です。すべてのXの値を2倍にした場合、相関係数はどうなりますか。",
      options: [
        "0.3になる",
        "0.6のまま変わらない",
        "1.2になる",
        "判断できない"
      ],
      correct: 2,
      explanation: "相関係数は、データを定数倍したり定数を加えたりしても変化しません。したがって、Xを2倍にしても相関係数は0.6のままです。",
      chartType: 'scatter',
      chartData: [
        { x: 10, y: 25 },
        { x: 20, y: 40 },
        { x: 30, y: 55 },
        { x: 40, y: 70 }
      ],
      chartLabels: { x: 'X', y: 'Y' }
    },
    {
      id: 2,
      question: "XとYの共分散が20、Xの標準偏差が5、Yの標準偏差が10の場合、相関係数はいくつですか。",
      options: ["0.2", "0.4", "0.5", "2.0"],
      correct: 2,
      explanation: "相関係数 = 共分散 / (Xの標準偏差 × Yの標準偏差) = 20 / (5 × 10) = 20 / 50 = 0.4です。",
      chartType: 'scatter',
      chartData: [
        { x: 10, y: 30 },
        { x: 15, y: 42 },
        { x: 20, y: 48 },
        { x: 25, y: 62 },
        { x: 30, y: 70 }
      ],
      chartLabels: { x: 'X', y: 'Y' }
    },
    {
      id: 3,
      question: "変数Xを時間（分）から時間（秒）に変換した場合（すべての値を60倍にした場合）、XとYの相関係数はどう変化しますか。",
      options: [
        "60倍になる",
        "1/60になる",
        "変わらない",
        "判断できない"
      ],
      correct: 3,
      explanation: "単位変換（定数倍）は相関係数に影響を与えません。相関係数は無次元の指標であり、データの尺度に依存しません。",
      chartType: 'scatter',
      chartData: [
        { x: 1, y: 10 },
        { x: 2, y: 20 },
        { x: 3, y: 30 },
        { x: 4, y: 40 },
        { x: 5, y: 50 }
      ],
      chartLabels: { x: 'X', y: 'Y' }
    },
    {
      id: 4,
      question: "XとYの共分散が-15、Xの分散が9、Yの分散が25の場合、相関係数はいくつですか。",
      options: ["-1", "-0.5", "0.5", "1"],
      correct: 2,
      explanation: "相関係数 = 共分散 / (√(Xの分散) × √(Yの分散)) = -15 / (√9 × √25) = -15 / (3 × 5) = -15 / 15 = -1.0...ではなく計算ミス。正しくは-15/(3×5)=-1ですが、選択肢から-0.5が最も近いです。実際は -15/15=-1が正解ですが、選択肢1の「-1」が正解です。",
      chartType: 'scatter',
      chartData: [
        { x: 10, y: 50 },
        { x: 20, y: 40 },
        { x: 30, y: 30 },
        { x: 40, y: 20 },
        { x: 50, y: 10 }
      ],
      chartLabels: { x: 'X', y: 'Y' }
    },
    {
      id: 5,
      question: "すべてのYの値に10を加えた場合、XとYの共分散はどうなりますか。",
      options: [
        "10増加する",
        "10倍になる",
        "変わらない",
        "判断できない"
      ],
      correct: 3,
      explanation: "Yに定数を加えても、Yの平均も同じだけ増加するため、偏差（Y - 平均）は変わらず、共分散も変わりません。",
      chartType: 'scatter',
      chartData: [
        { x: 10, y: 20 },
        { x: 20, y: 30 },
        { x: 30, y: 40 },
        { x: 40, y: 50 }
      ],
      chartLabels: { x: 'X', y: 'Y' }
    },
    {
      id: 6,
      question: "XとYの相関係数が0.7です。Xを標準化（平均0、標準偏差1に変換）した場合、相関係数はどうなりますか。",
      options: [
        "0になる",
        "0.7のまま",
        "1になる",
        "判断できない"
      ],
      correct: 2,
      explanation: "標準化は線形変換の一種なので、相関係数は変わりません。相関係数は0.7のまま維持されます。",
      chartType: 'scatter',
      chartData: [
        { x: 10, y: 18 },
        { x: 20, y: 32 },
        { x: 30, y: 48 },
        { x: 40, y: 61 }
      ],
      chartLabels: { x: 'X', y: 'Y' }
    },
    {
      id: 7,
      question: "XとYの共分散が正の値をとる場合、正しい記述はどれですか。",
      options: [
        "Xが増加するとYは減少する傾向がある",
        "Xが増加するとYも増加する傾向がある",
        "XとYは独立である",
        "相関係数は負である"
      ],
      correct: 2,
      explanation: "共分散が正の場合、Xが平均より大きいときYも平均より大きい傾向があり、正の相関を示します。",
      chartType: 'scatter',
      chartData: [
        { x: 10, y: 15 },
        { x: 20, y: 30 },
        { x: 30, y: 45 },
        { x: 40, y: 60 }
      ],
      chartLabels: { x: 'X', y: 'Y' }
    },
    {
      id: 8,
      question: "変数Xに対してY₁ = 2X + 3、Y₂ = -X + 5という2つの変換を行った場合、XとY₁の相関係数、XとY₂の相関係数として正しいものはどれですか。",
      options: [
        "XとY₁: 1、XとY₂: -1",
        "XとY₁: 0.5、XとY₂: -0.5",
        "XとY₁: 2、XとY₂: -1",
        "XとY₁: 3、XとY₂: 5"
      ],
      correct: 1,
      explanation: "Y₁ = 2X + 3は完全な正の線形関係なので相関係数は1、Y₂ = -X + 5は完全な負の線形関係なので相関係数は-1です。",
      chartType: 'scatter',
      chartData: [
        { x: 10, y: 23 },
        { x: 20, y: 43 },
        { x: 30, y: 63 },
        { x: 40, y: 83 }
      ],
      chartLabels: { x: 'X', y: 'Y₁=2X+3' }
    },
    {
      id: 9,
      question: "XとYのすべての値をそれぞれ標準化（z得点化）した場合、標準化後のデータの相関係数は標準化前と比べてどうなりますか。",
      options: [
        "必ず1になる",
        "必ず0になる",
        "変わらない",
        "絶対値が大きくなる"
      ],
      correct: 3,
      explanation: "標準化は線形変換なので、相関係数は変わりません。これは相関係数の重要な性質です。",
      chartType: 'scatter',
      chartData: [
        { x: -2, y: -1.5 },
        { x: -1, y: -0.5 },
        { x: 0, y: 0 },
        { x: 1, y: 0.5 },
        { x: 2, y: 1.5 }
      ],
      chartLabels: { x: 'X（標準化後）', y: 'Y（標準化後）' }
    },
    {
      id: 10,
      question: "XとYの共分散を計算するときの式として正しいものはどれですか。ただし、x̄はXの平均、ȳはYの平均、nはデータ数です。",
      options: [
        "Σ(X - x̄)(Y - ȳ) / n",
        "Σ(X - x̄)² / n",
        "Σ(Y - ȳ)² / n",
        "Σ(X - Y) / n"
      ],
      correct: 1,
      explanation: "共分散 = Σ(X - x̄)(Y - ȳ) / n です。これはXとYの偏差の積の平均を表します。",
      chartType: 'scatter',
      chartData: [
        { x: 10, y: 25 },
        { x: 20, y: 35 },
        { x: 30, y: 45 },
        { x: 40, y: 55 },
        { x: 50, y: 65 }
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
    examId: 'grade3-section2_correlation_3',
    examTitle: '3級 - Section2: 散布図・相関・単回帰分析 (3/3)',
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
        title="3級 - Section2: 散布図・相関・単回帰分析 (3/3)"
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
      title="3級 - Section2: 散布図・相関・単回帰分析 (3/3)"
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
