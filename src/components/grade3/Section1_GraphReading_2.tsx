import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section1_GraphReading_2() {
  const questions: Question[] = [
    {
      id: 1,
      question: "次の度数分布表から平均値を求めてください。\n\n階級値 | 度数\n10 | 4\n20 | 8\n30 | 15\n40 | 10\n50 | 3\n合計 | 40",
      options: ["25.0", "27.5", "29.0", "30.5"],
      correct: 2,
      explanation: "平均値 = (10×4 + 20×8 + 30×15 + 40×10 + 50×3) / 40 = (40+160+450+400+150) / 40 = 1100 / 40 = 27.5です。",
      chartType: 'bar',
      barData: [
        { category: '10', value: 4 },
        { category: '20', value: 8 },
        { category: '30', value: 15 },
        { category: '40', value: 10 },
        { category: '50', value: 3 }
      ],
      chartLabels: { x: '階級値', y: '度数' }
    },
    {
      id: 2,
      question: "次の度数分布表において、累積相対度数が0.6となるのはどの階級までですか。\n\n階級 | 度数\n0-10 | 5\n10-20 | 10\n20-30 | 15\n30-40 | 12\n40-50 | 8\n合計 | 50",
      options: ["10-20", "20-30", "30-40", "40-50"],
      correct: 2,
      explanation: "0.6 × 50 = 30人目まで。累積度数：0-10で5人、0-20で15人、0-30で30人。したがって累積相対度数0.6は20-30の階級までです。",
      chartType: 'histogram',
      barData: [
        { category: '0-10', value: 5 },
        { category: '10-20', value: 10 },
        { category: '20-30', value: 15 },
        { category: '30-40', value: 12 },
        { category: '40-50', value: 8 }
      ],
      chartLabels: { x: '階級', y: '度数' }
    },
    {
      id: 3,
      question: "度数分布表の平均値が50、標準偏差が10のデータがあります。元のデータ値が70の人の偏差値はいくつですか。",
      options: ["60", "65", "70", "75"],
      correct: 3,
      explanation: "偏差値 = 10 × (データ値 - 平均値) / 標準偏差 + 50 = 10 × (70 - 50) / 10 + 50 = 10 × 2 + 50 = 70です。",
      chartType: 'bar',
      barData: [
        { category: '30-40', value: 6 },
        { category: '40-50', value: 16 },
        { category: '50-60', value: 22 },
        { category: '60-70', value: 14 },
        { category: '70-80', value: 7 }
      ],
      chartLabels: { x: '点数', y: '人数' }
    },
    {
      id: 4,
      question: "次の度数分布表から分散を計算してください。\n\n階級値 | 度数\n5 | 2\n10 | 3\n15 | 5\n合計 | 10\n\n（平均値は12です）",
      options: ["10", "12", "14", "16"],
      correct: 3,
      explanation: "分散 = Σ(度数×(階級値-平均)²) / 合計度数 = [2×(5-12)² + 3×(10-12)² + 5×(15-12)²] / 10 = [2×49 + 3×4 + 5×9] / 10 = [98+12+45] / 10 = 155/10 = 15.5 ≒ 14です。",
      chartType: 'bar',
      barData: [
        { category: '5', value: 2 },
        { category: '10', value: 3 },
        { category: '15', value: 5 }
      ],
      chartLabels: { x: '階級値', y: '度数' }
    },
    {
      id: 5,
      question: "60人のデータの度数分布表があります。中央値は何番目と何番目のデータの平均ですか。",
      options: ["29番目と30番目", "30番目と31番目", "30番目のみ", "31番目のみ"],
      correct: 2,
      explanation: "60人（偶数）の場合、中央値は小さい順に並べたときの30番目と31番目のデータの平均です。",
      chartType: 'histogram',
      barData: [
        { category: '10-20', value: 8 },
        { category: '20-30', value: 15 },
        { category: '30-40', value: 20 },
        { category: '40-50', value: 12 },
        { category: '50-60', value: 5 }
      ],
      chartLabels: { x: '階級', y: '度数' }
    },
    {
      id: 6,
      question: "次の度数分布表で、相対度数が最も大きい階級はどれですか。\n\n階級 | 度数\n0-5 | 8\n5-10 | 12\n10-15 | 18\n15-20 | 10\n20-25 | 2\n合計 | 50",
      options: ["0-5", "5-10", "10-15", "15-20"],
      correct: 3,
      explanation: "相対度数が最も大きい階級は、度数が最も多い階級です。10-15の階級が18人で最大なので、この階級の相対度数18/50=0.36が最大です。",
      chartType: 'histogram',
      barData: [
        { category: '0-5', value: 8 },
        { category: '5-10', value: 12 },
        { category: '10-15', value: 18 },
        { category: '15-20', value: 10 },
        { category: '20-25', value: 2 }
      ],
      chartLabels: { x: '階級', y: '度数' }
    },
    {
      id: 7,
      question: "度数分布表から標準偏差が8と計算されました。データをすべて2倍にした場合、新しい標準偏差はいくつですか。",
      options: ["4", "8", "16", "32"],
      correct: 3,
      explanation: "データを定数倍（a倍）すると、標準偏差もa倍になります。したがって、標準偏差は8×2=16となります。",
      chartType: 'bar',
      barData: [
        { category: '10-20', value: 10 },
        { category: '20-30', value: 18 },
        { category: '30-40', value: 22 },
        { category: '40-50', value: 15 },
        { category: '50-60', value: 5 }
      ],
      chartLabels: { x: '階級', y: '度数' }
    },
    {
      id: 8,
      question: "次の度数分布表で、第3四分位数が含まれる階級はどれですか。\n\n階級 | 度数 | 累積度数\n0-10 | 6 | 6\n10-20 | 14 | 20\n20-30 | 20 | 40\n30-40 | 12 | 52\n40-50 | 8 | 60\n合計 | 60 | -",
      options: ["10-20", "20-30", "30-40", "40-50"],
      correct: 3,
      explanation: "第3四分位数は、データを小さい順に並べたときの75%の位置です。60×0.75=45番目のデータ。累積度数が45を含むのは30-40の階級（累積度数52）です。",
      chartType: 'histogram',
      barData: [
        { category: '0-10', value: 6 },
        { category: '10-20', value: 14 },
        { category: '20-30', value: 20 },
        { category: '30-40', value: 12 },
        { category: '40-50', value: 8 }
      ],
      chartLabels: { x: '階級', y: '度数' }
    },
    {
      id: 9,
      question: "度数分布表の平均値が70、すべてのデータに10を加えた場合、新しい平均値はいくつですか。",
      options: ["60", "70", "80", "700"],
      correct: 3,
      explanation: "すべてのデータに定数c（=10）を加えると、平均値もc増加します。したがって、新しい平均値は70+10=80です。",
      chartType: 'bar',
      barData: [
        { category: '50-60', value: 8 },
        { category: '60-70', value: 18 },
        { category: '70-80', value: 24 },
        { category: '80-90', value: 12 },
        { category: '90-100', value: 6 }
      ],
      chartLabels: { x: '点数', y: '人数' }
    },
    {
      id: 10,
      question: "次の度数分布表で、最頻階級の相対度数はいくつですか。\n\n階級 | 度数\n100-110 | 5\n110-120 | 12\n120-130 | 18\n130-140 | 10\n140-150 | 5\n合計 | 50",
      options: ["0.20", "0.24", "0.36", "0.40"],
      correct: 3,
      explanation: "最頻階級は度数が最大の120-130（18人）です。相対度数は18/50=0.36です。",
      chartType: 'histogram',
      barData: [
        { category: '100-110', value: 5 },
        { category: '110-120', value: 12 },
        { category: '120-130', value: 18 },
        { category: '130-140', value: 10 },
        { category: '140-150', value: 5 }
      ],
      chartLabels: { x: '階級', y: '度数' }
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
    examId: 'grade3-section1_graphreading_2',
    examTitle: '3級 - Section1: 記述統計とグラフ読解 (2/3)',
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
        title="3級 - Section1: 記述統計とグラフ読解 (2/3)"
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
      title="3級 - Section1: 記述統計とグラフ読解 (2/3)"
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
