import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section2Dispersion1() {
  const questions: Question[] = [
    {
        id: 1,
        question: "次の度数分布表で、30~40点の階級の度数は何人ですか。\n\n【テストの点数（20人）】\n0~10点: 2人\n10~20点: 3人\n20~30点: 5人\n30~40点: 7人\n40~50点: 3人",
        options: [
            "3人",
            "5人",
            "7人",
            "10人"
        ],
        correct: 3,
        explanation: "30~40点の階級の度数は7人です。"
    },
    {
        id: 2,
        question: "問1の度数分布表で、20点未満の生徒は全体の何%ですか。",
        options: [
            "10%",
            "15%",
            "20%",
            "25%"
        ],
        correct: 4,
        explanation: "20点未満は0~10点の2人と10~20点の3人で合計5人。5÷20×100=25%です。"
    },
    {
        id: 3,
        question: "度数分布表の「階級」とは何ですか。",
        options: [
            "データの個数",
            "データを区切った範囲",
            "データの合計",
            "データの平均"
        ],
        correct: 2,
        explanation: "階級とは、データを一定の幅で区切った範囲のことです。"
    },
    {
        id: 4,
        question: "相対度数の説明として正しいものはどれですか。",
        options: [
            "各階級のデータの個数",
            "各階級の度数の全体に対する割合",
            "度数の累積値",
            "階級の幅"
        ],
        correct: 2,
        explanation: "相対度数は、各階級の度数が全体に占める割合です。"
    },
    {
        id: 5,
        question: "次の度数分布表で、最も度数が大きい階級はどれですか。\n\n【身長（30人）】\n140~145cm: 3人\n145~150cm: 8人\n150~155cm: 12人\n155~160cm: 5人\n160~165cm: 2人",
        options: [
            "140~145cm",
            "145~150cm",
            "150~155cm",
            "155~160cm"
        ],
        correct: 3,
        explanation: "最も度数が大きい階級（最頻階級）は150~155cmで12人です。"
    },
    {
        id: 6,
        question: "累積度数とは何ですか。",
        options: [
            "各階級の度数",
            "最初の階級からその階級までの度数の合計",
            "全体の度数",
            "相対度数の合計"
        ],
        correct: 2,
        explanation: "累積度数は、最初の階級からその階級までの度数を合計したものです。"
    },
    {
        id: 7,
        question: "問5の度数分布表で、150cm未満の生徒の累積度数は何人ですか。",
        options: [
            "3人",
            "8人",
            "11人",
            "23人"
        ],
        correct: 3,
        explanation: "140~145cmの3人と145~150cmの8人を合計して11人です。"
    },
    {
        id: 8,
        question: "度数分布表で、全ての階級の相対度数の合計はいくつですか。",
        options: [
            "0",
            "0.5",
            "1",
            "階級数による"
        ],
        correct: 3,
        explanation: "相対度数は割合なので、全ての階級の相対度数を合計すると1（100%）になります。"
    },
    {
        id: 9,
        question: "階級の幅が等しい度数分布表で、最も度数が大きい階級を何と呼びますか。",
        options: [
            "最頻階級",
            "中央階級",
            "最大階級",
            "代表階級"
        ],
        correct: 1,
        explanation: "最も度数が大きい階級を最頻階級（モード階級）と呼びます。"
    },
    {
        id: 10,
        question: "次の度数分布表で、全体の人数は何人ですか。\n\n【体重】\n40~45kg: 相対度数0.2\n45~50kg: 相対度数0.3\n50~55kg: 相対度数0.5\n（全体の人数をnとする）",
        options: [
            "相対度数だけでは分からない",
            "10人",
            "20人",
            "100人"
        ],
        correct: 1,
        explanation: "相対度数だけからは全体の人数は分かりません。度数が必要です。"
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
    examId: 'grade4-section2_dispersion_1',
    examTitle: '4級 Section2_Dispersion_1',
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
