import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section4_Probability_1() {
  const questions: Question[] = [
    {
      id: 1,
      question: "サイコロを1回振って、偶数の目が出る確率はいくつですか。",
      options: ["1/6", "1/3", "1/2", "2/3"],
      correct: 3,
      explanation: "偶数の目は2, 4, 6の3通り。全体は6通りなので、確率は3/6 = 1/2です。"
    },
    {
      id: 2,
      question: "赤玉5個、白玉3個が入った袋から1個取り出すとき、赤玉が出る確率はいくつですか。",
      options: ["3/8", "5/8", "3/5", "5/3"],
      correct: 2,
      explanation: "全体は8個、赤玉は5個なので、確率は5/8です。"
    },
    {
      id: 3,
      question: "コインを2回投げて、少なくとも1回は表が出る確率はいくつですか。",
      options: ["1/4", "1/2", "3/4", "1"],
      correct: 3,
      explanation: "余事象で考えます。「少なくとも1回表」の余事象は「2回とも裏」で、確率は(1/2)×(1/2)=1/4。よって求める確率は1-1/4=3/4です。"
    },
    {
      id: 4,
      question: "52枚のトランプから1枚引いて、ハートまたはキングである確率はいくつですか。",
      options: ["4/13", "5/13", "16/52", "17/52"],
      correct: 3,
      explanation: "ハートは13枚、キングは4枚ですが、ハートのキングは重複しているので、13+4-1=16枚。確率は16/52 = 4/13です。選択肢3の16/52が正解です（約分前）。"
    },
    {
      id: 5,
      question: "サイコロを2回振って、出た目の和が5になる確率はいくつですか。",
      options: ["1/9", "1/6", "2/9", "1/3"],
      correct: 1,
      explanation: "和が5になる組み合わせは(1,4), (2,3), (3,2), (4,1)の4通り。全体は6×6=36通りなので、確率は4/36 = 1/9です。"
    },
    {
      id: 6,
      question: "袋の中に赤玉4個、白玉6個が入っています。1個取り出して戻さずにもう1個取り出すとき、2個とも赤玉である確率はいくつですか。",
      options: ["2/15", "4/25", "1/5", "8/45"],
      correct: 1,
      explanation: "1個目が赤の確率は4/10、2個目も赤の確率は3/9（戻さないので）。よって(4/10)×(3/9)=(12/90)=2/15です。"
    },
    {
      id: 7,
      question: "10人の中から3人を選ぶ組み合わせの数（10C3）はいくつですか。",
      options: ["30", "120", "720", "1000"],
      correct: 2,
      explanation: "10C3 = 10!/(3!×7!) = (10×9×8)/(3×2×1) = 720/6 = 120です。"
    },
    {
      id: 8,
      question: "ある事象Aが起こる確率が0.3のとき、Aが起こらない確率（余事象）はいくつですか。",
      options: ["0.3", "0.5", "0.7", "1.0"],
      correct: 3,
      explanation: "余事象の確率は1 - P(A) = 1 - 0.3 = 0.7です。"
    },
    {
      id: 9,
      question: "あるクラスで、数学が得意な生徒は60%、英語が得意な生徒は50%、両方得意な生徒は30%です。数学が得意な生徒の中で、英語も得意な生徒の割合（条件付き確率）はいくつですか。\n\n※P(英語|数学) = P(数学∩英語) / P(数学)",
      options: ["30%", "50%", "60%", "90%"],
      correct: 2,
      explanation: "P(英語|数学) = P(数学∩英語) / P(数学) = 0.30 / 0.60 = 0.5 = 50%です。数学が得意な生徒（60%）の中で、英語も得意な生徒は30%なので、条件付き確率は0.30 / 0.60 = 0.5 = 50%となります。"
    },
    {
      id: 10,
      question: "5枚のカード（1, 2, 3, 4, 5）から2枚を同時に引くとき、2枚の数字の和が奇数になる確率はいくつですか。",
      options: ["2/5", "1/2", "3/5", "4/5"],
      correct: 3,
      explanation: "和が奇数になるのは「奇数+偶数」または「偶数+奇数」のとき。奇数は3枚(1,3,5)、偶数は2枚(2,4)。組み合わせは3×2=6通り。全体は5C2=10通りなので、確率は6/10=3/5です。"
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
    examId: 'grade3-section4_probability_1',
    examTitle: '3級 - Section4: 確率と確率分布 (1/2)',
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

  // 問題が空の場合
  if (questions.length === 0) {
    return (
      <ExamLayout
        title="3級 - Section4: 確率と確率分布 (1/2)"
        backLink="/"
        bestScore={bestScore}
      >
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">📝 問題データがまだ作成されていません</p>
          <p className="text-gray-500 mb-2">このセクションの問題は、AI問題生成機能で作成できます。</p>
          <p className="text-sm text-gray-400">
            ホーム画面の「AI問題生成モード」から、このセクションを選択して問題を生成してください。
          </p>
        </div>
      </ExamLayout>
    );
  }

  return (
    <ExamLayout
      title="3級 - Section4: 確率と確率分布 (1/2)"
      backLink="/"
      bestScore={bestScore}
    >
      <QuestionCard
        question={currentQuestion}
        questionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        userAnswer={answers[currentQuestion?.id]}
        onAnswer={handleAnswer}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
      />
    </ExamLayout>
  );
}
