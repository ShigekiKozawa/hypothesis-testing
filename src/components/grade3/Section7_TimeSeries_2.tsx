import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section7TimeSeries2() {
  const questions: Question[] = [
    {
        id: 1,
        question: "赤玉5個、白玉3個の袋から2個同時に取り出すとき、2個とも赤玉である確率はいくらですか。",
        options: [
            "5/14",
            "3/14",
            "5/8",
            "3/8"
        ],
        correct: 1,
        explanation: "組み合わせで計算します。2個とも赤玉は5C2=10通り、全体は8C2=28通りなので、10/28=5/14です。"
    },
    {
        id: 2,
        question: "条件付き確率P(B|A)の意味として正しいものはどれですか。",
        options: [
            "AとBが同時に起こる確率",
            "Aが起こった条件下でBが起こる確率",
            "Bが起こった条件下でAが起こる確率",
            "AまたはBが起こる確率"
        ],
        correct: 2,
        explanation: "P(B|A)は「Aが起こったという条件のもとでBが起こる確率」を表します。"
    },
    {
        id: 3,
        question: "2つの事象が独立であるとき、P(B|A)はいくらですか。",
        options: [
            "P(A)",
            "P(B)",
            "P(A)×P(B)",
            "1"
        ],
        correct: 2,
        explanation: "2つの事象が独立の場合、P(B|A)=P(B)となります。Aの発生がBの確率に影響しません。"
    },
    {
        id: 4,
        question: "サイコロを2回振って、少なくとも1回は6が出る確率はいくらですか。",
        options: [
            "1/6",
            "11/36",
            "1/3",
            "5/36"
        ],
        correct: 2,
        explanation: "余事象を使います。2回とも6以外の確率は(5/6)×(5/6)=25/36。よって1-25/36=11/36です。"
    },
    {
        id: 5,
        question: "10本のくじの中に当たりが2本あります。2本引いて（非復元）、2本とも当たる確率はいくらですか。",
        options: [
            "1/45",
            "2/45",
            "1/25",
            "1/50"
        ],
        correct: 1,
        explanation: "1本目が当たる確率は2/10、2本目も当たる確率は1/9（非復元）。(2/10)×(1/9)=2/90=1/45です。"
    },
    {
        id: 6,
        question: "ベイズの定理を使う場面として適切なものはどれですか。",
        options: [
            "事前確率から事後確率を求める",
            "平均値を計算する",
            "分散を求める",
            "回帰分析を行う"
        ],
        correct: 1,
        explanation: "ベイズの定理は、事前確率と尤度から事後確率を計算するために使います。"
    },
    {
        id: 7,
        question: "コインを3回投げて、ちょうど2回表が出る確率はいくらですか。",
        options: [
            "1/8",
            "3/8",
            "1/2",
            "5/8"
        ],
        correct: 2,
        explanation: "表が2回、裏が1回出る組み合わせは3C2=3通り。各パターンの確率は(1/2)³=1/8。よって3×(1/8)=3/8です。"
    },
    {
        id: 8,
        question: "確率の乗法定理で、P(AかつB)を正しく表した式はどれですか。",
        options: [
            "P(A)×P(B|A)",
            "P(A)+P(B)",
            "P(A)×P(B)のみ",
            "P(A)-P(B)"
        ],
        correct: 1,
        explanation: "一般に、P(AかつB)=P(A)×P(B|A)です。独立の場合はP(B|A)=P(B)となり、P(A)×P(B)になります。"
    },
    {
        id: 9,
        question: "排反な事象とはどういう意味ですか。",
        options: [
            "必ず同時に起こる",
            "絶対に同時には起こらない",
            "確率が等しい",
            "独立である"
        ],
        correct: 2,
        explanation: "排反な事象とは、同時には起こらない事象のことです。例えば、サイコロで「1が出る」と「2が出る」は排反です。"
    },
    {
        id: 10,
        question: "確率が0の事象について正しい記述を選んでください。",
        options: [
            "絶対に起こらない事象",
            "起こりにくい事象",
            "起こりやすい事象",
            "必ず起こる事象"
        ],
        correct: 1,
        explanation: "確率が0の事象は、理論上絶対に起こらない事象です。逆に確率が1の事象は必ず起こります。"
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
    examId: 'grade3-section7_timeseries_2',
    examTitle: '3級 Section7_TimeSeries_2',
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
