import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section6Correlation2() {
  const questions: Question[] = [
    {
        id: 1,
        question: "相関とは何ですか。",
        options: [
            "1つの変数の大きさ",
            "2つの変数の間の関係の強さ",
            "データの平均",
            "最大値",
        ],
        correct: 2,
        explanation: "相関とは、2つの変数の間にある関係の強さや方向を表します。"
    },
    {
        id: 2,
        question: "正の相関とは何ですか。",
        options: [
            "一方が増えるともう一方も増える傾向",
            "一方が増えるともう一方が減る傾向",
            "2つの変数が無関係",
            "必ず同じ値",
        ],
        correct: 1,
        explanation: "正の相関とは、一方の変数が増加すると、もう一方の変数も増加する傾向のことです。"
    },
    {
        id: 3,
        question: "負の相関とは何ですか。",
        options: [
            "一方が増えるともう一方も増える傾向",
            "一方が増えるともう一方が減る傾向",
            "2つの変数が無関係",
            "必ず0",
        ],
        correct: 2,
        explanation: "負の相関とは、一方の変数が増加すると、もう一方の変数が減少する傾向のことです。"
    },
    {
        id: 4,
        question: "相関係数とは何ですか。",
        options: [
            "データの平均",
            "相関の強さと方向を-1から1の数値で表したもの",
            "データの個数",
            "範囲",
        ],
        correct: 2,
        explanation: "相関係数は、相関の強さと方向を-1から1の数値で表します。"
    },
    {
        id: 5,
        question: "相関係数が1に近いとき、どういう意味ですか。",
        options: [
            "強い正の相関がある",
            "強い負の相関がある",
            "相関がない",
            "判断できない",
        ],
        correct: 1,
        explanation: "相関係数が1に近いほど、強い正の相関があります。"
    },
    {
        id: 6,
        question: "相関係数が-1に近いとき、どういう意味ですか。",
        options: [
            "強い正の相関がある",
            "強い負の相関がある",
            "相関がない",
            "判断できない",
        ],
        correct: 2,
        explanation: "相関係数が-1に近いほど、強い負の相関があります。"
    },
    {
        id: 7,
        question: "相関係数が0に近いとき、どういう意味ですか。",
        options: [
            "強い正の相関",
            "強い負の相関",
            "ほとんど相関がない",
            "必ず因果関係がある",
        ],
        correct: 3,
        explanation: "相関係数が0に近いほど、2つの変数にはほとんど相関がありません。"
    },
    {
        id: 8,
        question: "相関があることと因果関係があることは同じですか。",
        options: [
            "同じ",
            "異なる（相関があっても因果関係があるとは限らない）",
            "必ず同じ",
            "判断できない",
        ],
        correct: 2,
        explanation: "相関があっても、必ずしも因果関係があるとは限りません。第三の要因が影響している場合もあります。"
    },
    {
        id: 9,
        question: "気温とアイスクリームの売上に正の相関があるとき、何が言えますか。",
        options: [
            "気温が高いとアイスの売上も多い傾向",
            "気温が高いとアイスの売上が少ない傾向",
            "気温とアイスは無関係",
            "必ず同じ値",
        ],
        correct: 1,
        explanation: "正の相関なので、気温が高いとアイスの売上も多い傾向があると言えます。"
    },
    {
        id: 10,
        question: "相関係数の値が取る範囲はどれですか。",
        options: [
            "-∞から+∞",
            "0から1",
            "0から100",
            "-1から1",
        ],
        correct: 4,
        explanation: "相関係数は-1から1の範囲の値を取ります。"
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
    examId: 'grade4-section6_correlation_2',
    examTitle: '4級 Section6_Correlation_2',
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
