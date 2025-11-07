import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section5ANOVA1() {
  const questions: Question[] = [
    {
        id: 1,
        question: "次の散布図から、2つの変数の関係を判断してください。",
        chartData: [
          { x: 1, y: 45 }, { x: 2, y: 52 }, { x: 3, y: 58 }, { x: 4, y: 65 }, { x: 5, y: 70 },
          { x: 1.5, y: 48 }, { x: 2.5, y: 55 }, { x: 3.5, y: 62 }, { x: 4.5, y: 68 }, { x: 5.5, y: 75 }
        ],
        chartType: 'scatter',
        chartLabels: { x: '勉強時間（時間）', y: 'テストの点数（点）' },
        options: [
            "正の相関がある",
            "負の相関がある",
            "相関がない",
            "判断できない"
        ],
        correct: 1,
        explanation: "点が右上がりに分布している場合、一方が増えるともう一方も増える傾向があるため、正の相関があります。"
    },
    {
        id: 2,
        question: "相関係数が0.8のとき、2つの変数の関係について正しい記述を選んでください。",
        options: [
            "強い正の相関がある",
            "弱い正の相関がある",
            "負の相関がある",
            "相関がない"
        ],
        correct: 1,
        explanation: "相関係数が0.8は1に近いため、強い正の相関があります。一般に|r|>0.7で強い相関とされます。"
    },
    {
        id: 3,
        question: "相関係数rの取りうる値の範囲はどれですか。",
        options: [
            "0≦r≦1",
            "-1≦r≦0",
            "-1≦r≦1",
            "0≦r≦∞"
        ],
        correct: 3,
        explanation: "相関係数rは-1から1の間の値を取ります。r=1で完全な正の相関、r=-1で完全な負の相関、r=0で無相関です。"
    },
    {
        id: 4,
        question: "次の散布図で、相関係数が最も小さい（負の値）ものはどれですか。",
        options: [
            "右上がりの直線状",
            "右下がりの直線状",
            "ランダムに散らばっている",
            "横一直線"
        ],
        correct: 2,
        explanation: "相関係数が最も小さい（負）のは、右下がりの直線状の散布図です。これは強い負の相関を示します。"
    },
    {
        id: 5,
        question: "2つの変数の散布図を描いたところ、点がほぼ横一直線に並びました。この場合の相関係数はおよそいくらですか。",
        options: [
            "1に近い",
            "-1に近い",
            "0に近い",
            "判断できない"
        ],
        correct: 3,
        explanation: "横一直線（y軸方向の変動がない）の場合、xが変化してもyは変化しないため、相関係数は0に近くなります。"
    },
    {
        id: 6,
        question: "散布図で外れ値が1つあります。この外れ値を除くと、相関係数はどう変化する可能性が高いですか。",
        options: [
            "必ず大きくなる",
            "必ず小さくなる",
            "変化する可能性がある",
            "変化しない"
        ],
        correct: 3,
        explanation: "外れ値は相関係数に大きな影響を与えるため、除去すると相関係数が変化する可能性があります（大きくも小さくもなり得ます）。"
    },
    {
        id: 7,
        question: "次のうち、散布図から読み取れない情報はどれですか。",
        options: [
            "2つの変数の相関関係",
            "データの外れ値",
            "それぞれの変数の分布",
            "因果関係の向き"
        ],
        correct: 4,
        explanation: "散布図からは相関関係は読み取れますが、因果関係の向き（どちらが原因でどちらが結果か）は判断できません。相関≠因果です。"
    },
    {
        id: 8,
        question: "相関係数が-0.6のとき、正しい記述を選んでください。",
        options: [
            "強い正の相関",
            "弱い負の相関",
            "やや強い負の相関",
            "相関なし"
        ],
        correct: 3,
        explanation: "相関係数が-0.6は、|r|=0.6なので中程度からやや強い負の相関があります。"
    },
    {
        id: 9,
        question: "身長と体重の散布図を描いたところ、正の相関が見られました。これについて正しい記述を選んでください。",
        options: [
            "身長が高いと体重も重い傾向がある",
            "身長が原因で体重が増える",
            "完全に比例する",
            "因果関係が証明された"
        ],
        correct: 1,
        explanation: "正の相関があることは「身長が高いと体重も重い傾向がある」という関連性を示しますが、因果関係や完全な比例を意味するものではありません。"
    },
    {
        id: 10,
        question: "2つの変数のデータを標準化してから相関係数を計算すると、元のデータから計算した相関係数とどうなりますか。",
        options: [
            "大きくなる",
            "小さくなる",
            "変わらない",
            "必ず0になる"
        ],
        correct: 3,
        explanation: "相関係数は標準化（単位の変換）に対して不変です。元のデータでも標準化後でも、相関係数の値は変わりません。"
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
    examId: 'grade3-section5_anova_1',
    examTitle: '3級 Section5_ANOVA_1',
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

  return (
    <ExamLayout
      title="📊 結果発表 🎉"
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
