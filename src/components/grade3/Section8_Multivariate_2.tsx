import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section8Multivariate2() {
  const questions: Question[] = [
    {
        id: 1,
        question: "前年の売上が100万円、今年が120万円のとき、対前年増加額はいくらですか。",
        options: [
            "10万円",
            "20万円",
            "30万円",
            "120万円"
        ],
        correct: 2,
        explanation: "増加額 = 今年 - 前年 = 120 - 100 = 20万円です。"
    },
    {
        id: 2,
        question: "前年の売上が100万円、今年が120万円のとき、対前年増加率（%）はいくらですか。",
        options: [
            "10%",
            "20%",
            "30%",
            "120%"
        ],
        correct: 2,
        explanation: "増加率 = (今年 - 前年) / 前年 × 100 = (120-100)/100 × 100 = 20%です。"
    },
    {
        id: 3,
        question: "前年比とは何ですか。",
        options: [
            "今年の値を前年の値で割った比率",
            "今年と前年の差",
            "前年の値を今年の値で割った比率",
            "平均値"
        ],
        correct: 1,
        explanation: "前年比 = 今年の値 / 前年の値 です。例えば前年100、今年120なら前年比1.2（または120%）です。"
    },
    {
        id: 4,
        question: "前年100、今年80のとき、対前年増減率はいくらですか。",
        options: [
            "+20%",
            "-20%",
            "+80%",
            "-80%"
        ],
        correct: 2,
        explanation: "増減率 = (80-100)/100 × 100 = -20%です（20%の減少）。"
    },
    {
        id: 5,
        question: "前年比が1.1のとき、どういう意味ですか。",
        options: [
            "前年より10%増加",
            "前年より10%減少",
            "前年と同じ",
            "前年の1.1倍（10%増）"
        ],
        correct: 4,
        explanation: "前年比1.1は、前年の1.1倍、つまり10%増加したことを意味します。"
    },
    {
        id: 6,
        question: "3年連続で前年比110%（1.1倍）で成長した場合、初年を100とすると3年後の値はいくらですか。",
        options: [
            "110",
            "120",
            "130",
            "133.1"
        ],
        correct: 4,
        explanation: "100 × 1.1 × 1.1 × 1.1 = 133.1です。"
    },
    {
        id: 7,
        question: "対前年増減率が0%のとき、どういう意味ですか。",
        options: [
            "値がゼロになった",
            "前年と同じ値",
            "前年より増加",
            "前年より減少"
        ],
        correct: 2,
        explanation: "増減率が0%のときは、今年と前年の値が同じことを意味します。"
    },
    {
        id: 8,
        question: "前年80、今年100のとき、対前年増加率はいくらですか。",
        options: [
            "10%",
            "20%",
            "25%",
            "80%"
        ],
        correct: 3,
        explanation: "増加率 = (100-80)/80 × 100 = 20/80 × 100 = 25%です。"
    },
    {
        id: 9,
        question: "前年比のグラフで、100%のラインより上にあるとき、どういう意味ですか。",
        options: [
            "前年より減少",
            "前年と同じ",
            "前年より増加",
            "判断できない"
        ],
        correct: 3,
        explanation: "前年比100%は前年と同じ。それより上（例：110%）は前年より増加を意味します。"
    },
    {
        id: 10,
        question: "対前年増減率を計算するとき、基準となるのはどちらの値ですか。",
        options: [
            "今年の値",
            "前年の値",
            "2年間の平均",
            "最大値"
        ],
        correct: 2,
        explanation: "増減率 = (今年-前年)/前年 × 100 なので、基準（分母）は前年の値です。"
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
    examId: 'grade3-section8_multivariate_2',
    examTitle: '3級 Section8_Multivariate_2',
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
