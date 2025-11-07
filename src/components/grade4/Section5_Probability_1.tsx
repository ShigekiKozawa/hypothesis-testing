import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section5Probability1() {
  const questions: Question[] = [
    {
        id: 1,
        question: "確率とは何ですか。",
        options: [
            "起こった回数",
            "ある出来事が起こる可能性を数値で表したもの",
            "データの平均",
            "最大値"
        ],
        correct: 2,
        explanation: "確率は、ある出来事が起こる可能性を0から1（または0%から100%）の数値で表したものです。"
    },
    {
        id: 2,
        question: "確率の値が取る範囲はどれですか。",
        options: [
            "0以上1以下",
            "0より大きく1より小さい",
            "1以上",
            "負の値もある"
        ],
        correct: 1,
        explanation: "確率は0（絶対に起こらない）から1（必ず起こる）までの値を取ります。"
    },
    {
        id: 3,
        question: "サイコロを1回投げて1の目が出る確率はいくらですか。",
        options: [
            "1/2",
            "1/3",
            "1/6",
            "1/12"
        ],
        correct: 3,
        explanation: "6つの目のうち1が出るのは1通りなので、確率は1/6です。"
    },
    {
        id: 4,
        question: "コインを1回投げて表が出る確率はいくらですか。",
        options: [
            "1/4",
            "1/3",
            "1/2",
            "2/3"
        ],
        correct: 3,
        explanation: "表と裏の2通りのうち表は1通りなので、確率は1/2です。"
    },
    {
        id: 5,
        question: "確率が0のとき、どういう意味ですか。",
        options: [
            "必ず起こる",
            "絶対に起こらない",
            "50%の確率",
            "判断できない"
        ],
        correct: 2,
        explanation: "確率が0のとき、その出来事は絶対に起こりません。"
    },
    {
        id: 6,
        question: "確率が1のとき、どういう意味ですか。",
        options: [
            "絶対に起こらない",
            "50%の確率",
            "必ず起こる",
            "判断できない"
        ],
        correct: 3,
        explanation: "確率が1のとき、その出来事は必ず起こります。"
    },
    {
        id: 7,
        question: "赤玉3個、青玉2個が入った袋から1個取り出すとき、赤玉を取り出す確率はいくらですか。",
        options: [
            "2/5",
            "3/5",
            "1/2",
            "3/2"
        ],
        correct: 2,
        explanation: "全体5個のうち赤玉は3個なので、確率は3/5です。"
    },
    {
        id: 8,
        question: "起こりうる全ての場合の確率を足すといくらになりますか。",
        options: [
            "0",
            "0.5",
            "1",
            "2"
        ],
        correct: 3,
        explanation: "全ての場合の確率を足すと1（100%）になります。これは確率の基本性質です。"
    },
    {
        id: 9,
        question: "サイコロを1回投げて、偶数の目が出る確率はいくらですか。",
        options: [
            "1/6",
            "1/3",
            "1/2",
            "2/3"
        ],
        correct: 3,
        explanation: "偶数の目は2,4,6の3通り。6通りのうち3通りなので確率は3/6 = 1/2です。"
    },
    {
        id: 10,
        question: "確率を計算する基本的な公式はどれですか。",
        options: [
            "(最大値-最小値)/2",
            "ある出来事が起こる場合の数 / 起こりうる全ての場合の数",
            "平均値/データ数",
            "データ数×2"
        ],
        correct: 2,
        explanation: "確率 = ある出来事が起こる場合の数 / 起こりうる全ての場合の数 です。"
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
    examId: 'grade4-section5_probability_1',
    examTitle: '4級 Section5_Probability_1',
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
