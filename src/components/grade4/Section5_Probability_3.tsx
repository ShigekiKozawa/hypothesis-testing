import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section5Probability3() {
  const questions: Question[] = [
    {
        id: 1,
        question: "独立な事象とは何ですか。",
        options: [
            "必ず同時に起こる",
            "一方の結果が他方に影響を与えない",
            "必ず片方だけ起こる",
            "同じ確率",
        ],
        correct: 2,
        explanation: "独立な事象とは、一方の出来事の結果が、もう一方の出来事の確率に影響を与えない関係です。"
    },
    {
        id: 2,
        question: "コインを2回投げるとき、1回目と2回目の結果は独立ですか。",
        options: [
            "独立",
            "独立でない",
            "場合による",
            "判断できない",
        ],
        correct: 1,
        explanation: "1回目の結果は2回目に影響しないので、独立です。"
    },
    {
        id: 3,
        question: "2つの独立な事象AとBが両方とも起こる確率はどう計算しますか。",
        options: [
            "P(A) + P(B)",
            "P(A) × P(B)",
            "P(A) - P(B)",
            "P(A) ÷ P(B)",
        ],
        correct: 2,
        explanation: "独立な事象が両方とも起こる確率は、各事象の確率の積です：P(A∩B) = P(A) × P(B)"
    },
    {
        id: 4,
        question: "サイコロを2回投げるとき、2回とも1の目が出る確率はいくらですか。",
        options: [
            "1/12",
            "1/18",
            "1/36",
            "1/6",
        ],
        correct: 3,
        explanation: "1回目1の目:1/6、2回目1の目:1/6。独立なので(1/6)×(1/6)=1/36です。"
    },
    {
        id: 5,
        question: "コインを2回投げるとき、2回とも表が出る確率はいくらですか。",
        options: [
            "1/2",
            "1/3",
            "1/4",
            "2/3",
        ],
        correct: 3,
        explanation: "1回目表:1/2、2回目表:1/2。独立なので(1/2)×(1/2)=1/4です。"
    },
    {
        id: 6,
        question: "袋から玉を取り出して元に戻す「復元抽出」は、独立な試行ですか。",
        options: [
            "独立",
            "独立でない",
            "場合による",
            "判断できない",
        ],
        correct: 1,
        explanation: "復元抽出では、1回目の結果が2回目に影響しないので独立です。"
    },
    {
        id: 7,
        question: "袋から玉を取り出して元に戻さない「非復元抽出」は、独立な試行ですか。",
        options: [
            "独立",
            "独立でない",
            "場合による",
            "判断できない",
        ],
        correct: 2,
        explanation: "非復元抽出では、1回目で取った玉が2回目にはないので、独立ではありません。"
    },
    {
        id: 8,
        question: "サイコロAとサイコロBを同時に投げるとき、AとBの結果は独立ですか。",
        options: [
            "独立",
            "独立でない",
            "必ず同じ",
            "判断できない",
        ],
        correct: 1,
        explanation: "2つのサイコロの結果は互いに影響しないので、独立です。"
    },
    {
        id: 9,
        question: "コインを3回投げるとき、3回とも表が出る確率はいくらですか。",
        options: [
            "1/3",
            "1/4",
            "1/6",
            "1/8",
        ],
        correct: 4,
        explanation: "各回表が出る確率は1/2。独立なので(1/2)×(1/2)×(1/2)=1/8です。"
    },
    {
        id: 10,
        question: "2つの事象が独立でないとき、両方が起こる確率はどう計算しますか。",
        options: [
            "必ず掛け算",
            "P(A)×P(B)は使えない。条件付き確率を考慮する",
            "必ず足し算",
            "計算できない",
        ],
        correct: 2,
        explanation: "独立でない場合、単純な積の法則は使えず、P(A∩B)=P(A)×P(B|A)のように条件付き確率を考慮します。"
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
    examId: 'grade4-section5_probability_3',
    examTitle: '4級 Section5_Probability_3',
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
