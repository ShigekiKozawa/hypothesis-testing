import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section10Applied3() {
  const questions: Question[] = [
    {
        id: 1,
        question: "仮説検定とは何ですか。",
        options: [
            "平均値を計算すること",
            "データから仮説が正しいかどうかを統計的に判断すること",
            "グラフを描くこと",
            "データを収集すること"
        ],
        correct: 2,
        explanation: "仮説検定は、データから仮説が正しいかどうかを統計的に判断する方法です。"
    },
    {
        id: 2,
        question: "帰無仮説とは何ですか。",
        options: [
            "証明したい仮説",
            "効果や差がないという仮説（否定したい仮説）",
            "必ず正しい仮説",
            "データの平均"
        ],
        correct: 2,
        explanation: "帰無仮説は、「効果や差がない」という仮説で、通常は否定したい仮説です。"
    },
    {
        id: 3,
        question: "対立仮説とは何ですか。",
        options: [
            "効果や差がないという仮説",
            "効果や差があるという仮説（主張したい仮説）",
            "必ず間違っている仮説",
            "標本の平均"
        ],
        correct: 2,
        explanation: "対立仮説は、「効果や差がある」という仮説で、研究者が主張したい仮説です。"
    },
    {
        id: 4,
        question: "有意水準とは何ですか。",
        options: [
            "データの平均値",
            "帰無仮説を棄却する基準となる確率（通常5%や1%）",
            "標本サイズ",
            "信頼区間の幅"
        ],
        correct: 2,
        explanation: "有意水準は、帰無仮説を棄却するかどうかを判断する基準となる確率で、通常5%（0.05）や1%（0.01）が使われます。"
    },
    {
        id: 5,
        question: "p値とは何ですか。",
        options: [
            "母集団の平均",
            "帰無仮説が正しいと仮定したとき、観測されたデータ（またはそれ以上極端なデータ）が得られる確率",
            "標本サイズ",
            "信頼度"
        ],
        correct: 2,
        explanation: "p値は、帰無仮説が正しいと仮定したとき、観測されたデータが得られる確率です。"
    },
    {
        id: 6,
        question: "p値が有意水準（例：0.05）より小さいとき、どう判断しますか。",
        options: [
            "帰無仮説を棄却できない",
            "帰無仮説を棄却する（対立仮説を支持）",
            "データが間違っている",
            "再度実験する"
        ],
        correct: 2,
        explanation: "p値が有意水準より小さいとき、帰無仮説を棄却し、対立仮説を支持します。"
    },
    {
        id: 7,
        question: "「統計的に有意である」とはどういう意味ですか。",
        options: [
            "平均値が大きい",
            "帰無仮説を棄却できる（効果や差があると判断できる）",
            "データが多い",
            "グラフがきれい"
        ],
        correct: 2,
        explanation: "「統計的に有意」とは、検定の結果、帰無仮説を棄却でき、効果や差があると判断できることを意味します。"
    },
    {
        id: 8,
        question: "帰無仮説が棄却されなかったとき、どう解釈しますか。",
        options: [
            "帰無仮説が正しいと証明された",
            "効果や差があるとは言えない（証拠不十分）",
            "対立仮説が正しい",
            "実験が失敗した"
        ],
        correct: 2,
        explanation: "帰無仮説が棄却されない場合、効果や差があるとは言えません（証拠不十分）。ただし、帰無仮説が正しいと証明されたわけではありません。"
    },
    {
        id: 9,
        question: "第一種の過誤（αエラー）とは何ですか。",
        options: [
            "帰無仮説が正しいのに、誤って棄却してしまう過誤",
            "帰無仮説が間違っているのに、棄却しない過誤",
            "データの入力ミス",
            "計算ミス"
        ],
        correct: 1,
        explanation: "第一種の過誤は、帰無仮説が実際には正しいのに、誤って棄却してしまう過誤です。"
    },
    {
        id: 10,
        question: "仮説検定の結果、「新薬に効果がある」と結論づけられました。しかし実際には効果がなかったとき、これは何と呼ばれますか。",
        options: [
            "正しい判断",
            "第一種の過誤",
            "第二種の過誤",
            "標本誤差"
        ],
        correct: 2,
        explanation: "実際には効果がない（帰無仮説が正しい）のに「効果がある」と判断した（帰無仮説を棄却した）ので、第一種の過誤です。"
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
    examId: 'grade3-section10_applied_3',
    examTitle: '3級 Section10_Applied_3',
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
