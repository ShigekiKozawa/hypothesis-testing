import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section7BoxPlot3() {
  const questions: Question[] = [
    {
        id: 1,
        question: "箱ひげ図を使って、3つ以上のグループを比較する利点は何ですか。",
        options: [
            "平均だけを比較",
            "分布全体を視覚的に比較できる",
            "データ数だけを比較",
            "何もわからない",
        ],
        correct: 2,
        explanation: "箱ひげ図を使うと、複数のグループの分布全体（中心、散らばり、偏り）を視覚的に比較できます。"
    },
    {
        id: 2,
        question: "箱ひげ図から平均値は読み取れますか。",
        options: [
            "読み取れる（箱の中の線）",
            "読み取れない（中央値はわかる）",
            "必ず中央値と同じ",
            "判断できない",
        ],
        correct: 2,
        explanation: "箱ひげ図からは中央値は読み取れますが、平均値は直接読み取れません。"
    },
    {
        id: 3,
        question: "箱ひげ図で、データの最大値と最小値が必ず表示されますか。",
        options: [
            "必ず表示される",
            "外れ値がある場合はひげの先が最大値・最小値でないことがある",
            "表示されない",
            "判断できない",
        ],
        correct: 2,
        explanation: "外れ値がある場合、ひげの先が最大値・最小値ではなく、外れ値の基準値になることがあります。"
    },
    {
        id: 4,
        question: "箱ひげ図で、中央値がQ1に近いとき、どういう分布ですか。",
        options: [
            "右に偏っている（正の歪み）",
            "左に偏っている（負の歪み）",
            "対称",
            "判断できない",
        ],
        correct: 1,
        explanation: "中央値がQ1に近い場合、データは右側（大きい方）に広がっており、右に偏った分布（正の歪み）です。"
    },
    {
        id: 5,
        question: "箱ひげ図で、ひげがない（箱だけ）場合、どういう意味ですか。",
        options: [
            "最大値と最小値がQ1とQ3と同じ",
            "外れ値が多い",
            "データが1つ",
            "エラー",
        ],
        correct: 1,
        explanation: "ひげがない場合、最大値と最小値がそれぞれQ3とQ1と同じ、つまり全データが箱の範囲に収まっています。"
    },
    {
        id: 6,
        question: "箱ひげ図で外れ値の定義は何ですか。",
        options: [
            "平均から離れた値",
            "Q1 - 1.5×IQR より小さい、またはQ3 + 1.5×IQR より大きい値",
            "最大値と最小値",
            "中央値から離れた値",
        ],
        correct: 2,
        explanation: "一般的に、Q1 - 1.5×IQR より小さい値、またはQ3 + 1.5×IQR より大きい値を外れ値とします。"
    },
    {
        id: 7,
        question: "箱ひげ図で、2つのグループの中央値が同じでも、分布が異なることはありますか。",
        options: [
            "ある（散らばりや偏りが異なる）",
            "ない（中央値が同じなら全て同じ）",
            "必ず同じ分布",
            "判断できない",
        ],
        correct: 1,
        explanation: "中央値が同じでも、散らばり（IQR）や偏りが異なれば、分布は異なります。"
    },
    {
        id: 8,
        question: "箱ひげ図は、データの個数が少ない（例：5個）ときも使えますか。",
        options: [
            "使えるが、詳しい情報は得にくい",
            "使えない",
            "必ず使うべき",
            "判断できない",
        ],
        correct: 1,
        explanation: "データが少ないときも作成できますが、分布の特徴を捉えるには十分な数のデータがある方が良いです。"
    },
    {
        id: 9,
        question: "箱ひげ図で、横向きと縦向きはどう使い分けますか。",
        options: [
            "全く同じ（向きは自由）",
            "縦向きは変数が縦軸、横向きは変数が横軸",
            "必ず横向き",
            "必ず縦向き",
        ],
        correct: 1,
        explanation: "向きは自由で、データの表示や比較のしやすさに応じて選びます。意味は同じです。"
    },
    {
        id: 10,
        question: "箱ひげ図とヒストグラムを比較したとき、箱ひげ図の利点は何ですか。",
        options: [
            "データの詳しい形がわかる",
            "複数のグループを同時に比較しやすい",
            "平均がわかる",
            "何もない",
        ],
        correct: 2,
        explanation: "箱ひげ図は、複数のグループを並べて比較しやすい利点があります。"
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
    examId: 'grade4-section7_boxplot_3',
    examTitle: '4級 Section7_BoxPlot_3',
    grade: '4級',
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

  return (
    <ExamLayout
      title="📊 結果"
      backLink="/"
      bestScore={bestScore}
    >
      <QuestionCard
        question={currentQuestion}
        questionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        userAnswer={answers[currentQuestion.id]}
        onAnswer={handleAnswer}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
      />
    </ExamLayout>
  );
}
