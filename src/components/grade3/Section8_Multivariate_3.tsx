import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section8Multivariate3() {
  const questions: Question[] = [
    {
        id: 1,
        question: "指数とは何ですか。",
        options: [
            "データの個数",
            "ある基準年を100として、他の年の相対的な大きさを示す数値",
            "平均値",
            "合計値"
        ],
        correct: 2,
        explanation: "指数は、基準年を100として、他の年の値が基準年の何倍かを示す数値です。"
    },
    {
        id: 2,
        question: "2015年を基準年（100）とする指数で、2020年の指数が120のとき、2020年の値は2015年の何倍ですか。",
        options: [
            "0.8倍",
            "1.0倍",
            "1.2倍",
            "2.0倍"
        ],
        correct: 3,
        explanation: "指数120は、基準年（100）の1.2倍を意味します。"
    },
    {
        id: 3,
        question: "2015年の値が50、2020年の値が60で、2015年を基準年とする指数を作るとき、2020年の指数はいくらですか。",
        options: [
            "100",
            "110",
            "120",
            "150"
        ],
        correct: 3,
        explanation: "指数 = (2020年の値/2015年の値) × 100 = (60/50) × 100 = 120です。"
    },
    {
        id: 4,
        question: "消費者物価指数（CPI）の2020年が105のとき（2015年=100）、物価はどう変化しましたか。",
        options: [
            "5%下落",
            "変化なし",
            "5%上昇",
            "105%上昇"
        ],
        correct: 3,
        explanation: "指数が100から105に上昇したので、物価は5%上昇しました。"
    },
    {
        id: 5,
        question: "基準年の指数は常にいくらですか。",
        options: [
            "0",
            "1",
            "100",
            "基準年によって異なる"
        ],
        correct: 3,
        explanation: "基準年は常に100と定義されます。"
    },
    {
        id: 6,
        question: "2015年を基準年とする指数で、2020年が110、2021年が115のとき、2020年から2021年の変化率はいくらですか。",
        options: [
            "約4.5%増",
            "5%増",
            "10%増",
            "15%増"
        ],
        correct: 1,
        explanation: "変化率 = (115-110)/110 × 100 ≒ 4.5%です。基準年からの変化ではなく、直近年間の変化率を計算します。"
    },
    {
        id: 7,
        question: "指数が90のとき、基準年と比べてどうですか。",
        options: [
            "10%増加",
            "10%減少",
            "変化なし",
            "90%増加"
        ],
        correct: 2,
        explanation: "指数が100から90に下がったので、基準年と比べて10%減少しています。"
    },
    {
        id: 8,
        question: "指数を使う利点はどれですか。",
        options: [
            "正確な値が分かる",
            "異なる単位のデータを比較しやすくなる",
            "データが増える",
            "計算が不要になる"
        ],
        correct: 2,
        explanation: "指数を使うと、単位や規模が異なるデータでも、基準年からの変化率として比較しやすくなります。"
    },
    {
        id: 9,
        question: "2010年の値が200、2015年の値が300で、2010年を基準年とする指数を作るとき、2015年の指数はいくらですか。",
        options: [
            "100",
            "120",
            "150",
            "300"
        ],
        correct: 3,
        explanation: "指数 = (300/200) × 100 = 150です。"
    },
    {
        id: 10,
        question: "基準年を変更すると、各年の指数はどうなりますか。",
        options: [
            "変わらない",
            "全て変わる（新しい基準年が100になる）",
            "基準年だけ変わる",
            "最新年だけ変わる"
        ],
        correct: 2,
        explanation: "基準年を変更すると、新しい基準年が100となり、全ての年の指数が再計算されます。"
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
    examId: 'grade3-section8_multivariate_3',
    examTitle: '3級 Section8_Multivariate_3',
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
