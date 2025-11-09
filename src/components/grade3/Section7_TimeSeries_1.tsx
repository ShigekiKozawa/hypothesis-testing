import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section7TimeSeries1() {
  const questions: Question[] = [
    {
        id: 1,
        question: "サイコロを1回振って、偶数の目が出る確率はいくらですか。",
        options: [
            "1/6",
            "1/3",
            "1/2",
            "2/3"
        ],
        correct: 3,
        explanation: "偶数の目は2,4,6の3通り、全体は6通りなので、3/6=1/2です。"
    },
    {
        id: 2,
        question: "52枚のトランプから1枚引いたとき、ハートが出る確率はいくらですか。",
        options: [
            "1/13",
            "1/4",
            "1/2",
            "4/13"
        ],
        correct: 2,
        explanation: "ハートは13枚、全体は52枚なので、13/52=1/4です。"
    },
    {
        id: 3,
        question: "赤玉5個、白玉3個が入った袋から1個取り出すとき、赤玉が出る確率はいくらですか。",
        options: [
            "3/8",
            "5/8",
            "1/2",
            "3/5"
        ],
        correct: 2,
        explanation: "赤玉は5個、全体は8個なので、5/8です。"
    },
    {
        id: 4,
        question: "確率の基本性質として正しいものはどれですか。",
        options: [
            "確率は負の値を取ることがある",
            "すべての事象の確率の和は1",
            "確率は1より大きくなることがある",
            "確率は必ず1/2"
        ],
        correct: 2,
        explanation: "すべての起こりうる事象の確率の和は1になります。確率は0以上1以下の値を取ります。"
    },
    {
        id: 5,
        question: "コインを2回投げたとき、2回とも表が出る確率はいくらですか。",
        options: [
            "1/2",
            "1/3",
            "1/4",
            "1/8"
        ],
        correct: 3,
        explanation: "1回目が表の確率は1/2、2回目も表の確率は1/2。独立なので、(1/2)×(1/2)=1/4です。"
    },
    {
        id: 6,
        question: "余事象の確率について、正しい式を選んでください。事象Aの確率をP(A)とします。",
        options: [
            "P(Aでない)=1-P(A)",
            "P(Aでない)=1+P(A)",
            "P(Aでない)=2-P(A)",
            "P(Aでない)=P(A)"
        ],
        correct: 1,
        explanation: "余事象の確率は、P(Aでない)=1-P(A)です。"
    },
    {
        id: 7,
        question: "サイコロを1回振って、6以外の目が出る確率はいくらですか。",
        options: [
            "1/6",
            "5/6",
            "1/2",
            "2/3"
        ],
        correct: 2,
        explanation: "6が出る確率は1/6なので、余事象を使うと1-1/6=5/6です。"
    },
    {
        id: 8,
        question: "独立な2つの事象A、Bについて、P(A)=0.4、P(B)=0.5のとき、P(AかつB)はいくらですか。",
        options: [
            "0.2",
            "0.45",
            "0.9",
            "0.1"
        ],
        correct: 1,
        explanation: "独立なので、P(AかつB)=P(A)×P(B)=0.4×0.5=0.2です。"
    },
    {
        id: 9,
        question: "赤玉4個、白玉6個の袋から復元抽出で2回玉を取り出します。2回とも赤玉が出る確率はいくらですか。",
        options: [
            "4/25",
            "6/25",
            "16/100",
            "2/5"
        ],
        correct: 3,
        explanation: "復元抽出なので、1回目も2回目も赤玉の確率は4/10=2/5。(2/5)×(2/5)=4/25=16/100です。"
    },
    {
        id: 10,
        question: "確率の加法定理について、排反な事象A、Bの場合の式はどれですか。",
        options: [
            "P(AまたはB)=P(A)+P(B)",
            "P(AまたはB)=P(A)×P(B)",
            "P(AまたはB)=P(A)-P(B)",
            "P(AまたはB)=1"
        ],
        correct: 1,
        explanation: "排反な事象（同時に起こらない事象）の場合、P(AまたはB)=P(A)+P(B)です。"
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
    examId: 'grade3-section7_timeseries_1',
    examTitle: '3級 Section7_TimeSeries_1',
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
