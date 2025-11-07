import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section7TimeSeries3() {
  const questions: Question[] = [
    {
        id: 1,
        question: "二項分布について、コインをn回投げてr回表が出る確率の公式に含まれるものはどれですか。",
        options: [
            "組み合わせnCr",
            "順列nPr",
            "平均値",
            "標準偏差のみ"
        ],
        correct: 1,
        explanation: "二項分布の確率は、nCr × p^r × (1-p)^(n-r) で計算されます。組み合わせnCrが含まれます。"
    },
    {
        id: 2,
        question: "期待値の定義として正しいものはどれですか。",
        options: [
            "最も起こりやすい値",
            "確率変数の値と確率の積の和",
            "確率の平均",
            "標準偏差の2乗"
        ],
        correct: 2,
        explanation: "期待値E(X)=Σ(x×P(x))で、確率変数の値とその確率の積の総和です。"
    },
    {
        id: 3,
        question: "サイコロを1回振ったときの出る目の期待値はいくらですか。",
        options: [
            "3",
            "3.5",
            "4",
            "6"
        ],
        correct: 2,
        explanation: "E(X)=(1+2+3+4+5+6)/6=21/6=3.5です。"
    },
    {
        id: 4,
        question: "確率変数Xに定数aを足したとき、期待値E(X+a)はどうなりますか。",
        options: [
            "E(X)+a",
            "E(X)×a",
            "E(X)",
            "a"
        ],
        correct: 1,
        explanation: "期待値の性質より、E(X+a)=E(X)+a です。"
    },
    {
        id: 5,
        question: "独立な2つの確率変数X、Yについて、E(X+Y)はどうなりますか。",
        options: [
            "E(X)+E(Y)",
            "E(X)×E(Y)",
            "E(X)-E(Y)",
            "E(X)/E(Y)"
        ],
        correct: 1,
        explanation: "独立でなくても、E(X+Y)=E(X)+E(Y)が成り立ちます（期待値の線形性）。"
    },
    {
        id: 6,
        question: "確率の問題で「少なくとも1回は〜」という問題を解く際に便利な方法はどれですか。",
        options: [
            "直接計算する",
            "余事象を使う",
            "平均を使う",
            "中央値を使う"
        ],
        correct: 2,
        explanation: "「少なくとも1回」の問題は、余事象「1回も起こらない」を使うと計算が簡単になります。"
    },
    {
        id: 7,
        question: "確率変数の分散V(X)の定義として正しいものはどれですか。",
        options: [
            "E(X²)",
            "E((X-E(X))²)",
            "E(X)の2乗",
            "標準偏差"
        ],
        correct: 2,
        explanation: "分散V(X)=E((X-E(X))²)です。期待値からの偏差の2乗の期待値です。"
    },
    {
        id: 8,
        question: "確率が1の事象を何と呼びますか。",
        options: [
            "排反事象",
            "独立事象",
            "全事象",
            "余事象"
        ],
        correct: 3,
        explanation: "確率が1の事象（必ず起こる事象）を全事象と呼びます。"
    },
    {
        id: 9,
        question: "次のうち、確率の値として正しくないものはどれですか。",
        options: [
            "0",
            "0.5",
            "1",
            "1.2"
        ],
        correct: 4,
        explanation: "確率は0以上1以下の値を取ります。1.2は1より大きいので確率として不適切です。"
    },
    {
        id: 10,
        question: "モンティ・ホール問題で示される重要な概念は何ですか。",
        options: [
            "確率は条件によって変わる",
            "確率は常に一定",
            "期待値の計算",
            "分散の性質"
        ],
        correct: 1,
        explanation: "モンティ・ホール問題は、情報が与えられることで確率が変化することを示す有名な問題です。条件付き確率の重要性を示しています。"
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
    examId: 'grade3-section7_timeseries_3',
    examTitle: '3級 Section7_TimeSeries_3',
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
