import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section5_Inference_1() {
  const questions: Question[] = [
    {
      id: 1,
      question: "ある工場で製造される部品の重量は、母平均μ=100g、母標準偏差σ=8gの正規分布に従います。25個の標本を取ったとき、標本平均の標準誤差はいくつですか。",
      options: ["0.32g", "1.6g", "3.2g", "8g"],
      correct: 2,
      explanation: "標準誤差 = σ/√n = 8/√25 = 8/5 = 1.6gです。"
    },
    {
      id: 2,
      question: "サンプルサイズn=64、標本平均X̄=50、標本標準偏差s=16の標本から、母平均の95%信頼区間を計算すると[46.08, 53.92]となりました。帰無仮説μ=48を有意水準5%で検定すると、どう判断されますか。",
      options: [
        "帰無仮説を棄却する",
        "帰無仮説を棄却しない",
        "判断できない",
        "有意水準を変更する必要がある"
      ],
      correct: 2,
      explanation: "信頼区間[46.08, 53.92]には、帰無仮説の値μ=48が含まれています。したがって、有意水準5%で帰無仮説を棄却しません。"
    },
    {
      id: 3,
      question: "100人の学生の試験結果から、平均点70点、標準偏差20点が得られました。標本平均の標準誤差はいくつですか。",
      options: ["0.2点", "2点", "5点", "20点"],
      correct: 2,
      explanation: "標準誤差 = s/√n = 20/√100 = 20/10 = 2点です。"
    },
    {
      id: 4,
      question: "ある製品の平均寿命について、95%信頼区間が[1850時間, 2150時間]と計算されました。帰無仮説「平均寿命は2000時間である（μ=2000）」を有意水準5%で検定すると、どう判断されますか。",
      options: [
        "帰無仮説を棄却する",
        "帰無仮説を棄却しない",
        "対立仮説を棄却する",
        "検定できない"
      ],
      correct: 2,
      explanation: "信頼区間[1850, 2150]には、帰無仮説の値μ=2000が含まれているため、帰無仮説を棄却しません。"
    },
    {
      id: 5,
      question: "標本サイズn=100、標本平均52、標本標準偏差20から、95%信頼区間として[48.08, 55.92]が得られました。帰無仮説μ=50を有意水準5%で検定すると、どう判断されますか。",
      options: [
        "帰無仮説を棄却する",
        "帰無仮説を棄却しない",
        "両側検定では判断できない",
        "片側検定に変更する必要がある"
      ],
      correct: 2,
      explanation: "信頼区間[48.08, 55.92]には、帰無仮説の値μ=50が含まれているため、有意水準5%で帰無仮説を棄却しません。"
    },
    {
      id: 6,
      question: "母標準偏差σ=12の母集団から、サンプルサイズを36から144に増やした場合、標本平均の標準誤差は元の何倍になりますか。",
      options: ["4倍", "2倍", "1/2倍", "1/4倍"],
      correct: 3,
      explanation: "標準誤差 = σ/√n なので、nを4倍（36→144）にすると、標準誤差は 1/√4 = 1/2倍になります。元：12/√36=2、新：12/√144=1。"
    },
    {
      id: 7,
      question: "ある地域の平均年収について、95%信頼区間が[380万円, 420万円]と計算されました。帰無仮説「平均年収は400万円である」を有意水準5%で検定すると、どう判断されますか。",
      options: [
        "帰無仮説を棄却する",
        "帰無仮説を棄却しない",
        "信頼区間が広すぎるため判断できない",
        "サンプルサイズを増やす必要がある"
      ],
      correct: 2,
      explanation: "信頼区間[380, 420]には、帰無仮説の値400が含まれているため、帰無仮説を棄却しません。"
    },
    {
      id: 8,
      question: "n=49、標本平均X̄=75、標本標準偏差s=14の標本から、母平均の95%信頼区間の幅（上限-下限）を計算してください。（95%信頼区間：X̄ ± 1.96×s/√n）",
      options: ["約2", "約4", "約8", "約16"],
      correct: 3,
      explanation: "標準誤差 = 14/√49 = 14/7 = 2。信頼区間の幅 = 2 × 1.96 × 2 ≒ 2 × 2 × 2 = 8です。"
    },
    {
      id: 9,
      question: "サンプルサイズn=100、標本平均58、標本標準偏差10から、95%信頼区間[56.04, 59.96]が得られました。帰無仮説μ=60を有意水準5%で検定すると、どう判断されますか。",
      options: [
        "帰無仮説を棄却する",
        "帰無仮説を棄却しない",
        "標本平均が小さいため検定できない",
        "有意水準を1%に変更する必要がある"
      ],
      correct: 1,
      explanation: "信頼区間[56.04, 59.96]には、帰無仮説の値μ=60が含まれていないため、有意水準5%で帰無仮説を棄却します。"
    },
    {
      id: 10,
      question: "母標準偏差σ=20の母集団から、サンプルサイズn=25の標本を取ったとき、標本平均の標準誤差を求めてください。",
      options: ["0.8", "4", "5", "20"],
      correct: 4,
      explanation: "標準誤差 = σ/√n = 20/√25 = 20/5 = 4です。"
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
    examId: 'grade3-section5_inference_1',
    examTitle: '3級 - Section5: 推測統計の基礎 (1/2)',
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
        title="3級 - Section5: 推測統計の基礎 (1/2)"
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
      title="3級 - Section5: 推測統計の基礎 (1/2)"
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
