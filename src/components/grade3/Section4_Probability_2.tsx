import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section4_Probability_2() {
  const questions: Question[] = [
    {
      id: 1,
      question: "コインを3回投げるとき、表がちょうど2回出る確率はいくつですか。",
      options: ["1/8", "3/8", "1/2", "5/8"],
      correct: 2,
      explanation: "表が2回出る組み合わせは(表表裏)(表裏表)(裏表表)の3通り。各確率は(1/2)³=1/8なので、3×(1/8)=3/8です。"
    },
    {
      id: 2,
      question: "確率が0.2の事象を5回繰り返すとき、ちょうど1回成功する確率として正しい計算式はどれですか。",
      options: [
        "5 × (0.2)¹ × (0.8)⁴",
        "5 × (0.2)⁴ × (0.8)¹",
        "(0.2)¹ × (0.8)⁴",
        "(0.2)⁵"
      ],
      correct: 1,
      explanation: "二項分布の公式：nCk × p^k × (1-p)^(n-k)。ここではn=5, k=1なので、5C1 × (0.2)¹ × (0.8)⁴ = 5 × (0.2)¹ × (0.8)⁴です。"
    },
    {
      id: 3,
      question: "サイコロを4回振って、6の目が少なくとも1回出る確率はいくらですか。（余事象を利用）",
      options: [
        "1 - (5/6)⁴",
        "1 - (1/6)⁴",
        "(1/6)⁴",
        "4 × (1/6)"
      ],
      correct: 1,
      explanation: "余事象「6が1回も出ない」の確率は(5/6)⁴。よって求める確率は1 - (5/6)⁴です。"
    },
    {
      id: 4,
      question: "ある選手のフリースロー成功率は0.8です。5回のフリースローで成功する回数の期待値はいくつですか。",
      options: ["0.8", "1.6", "4", "5"],
      correct: 3,
      explanation: "二項分布の期待値はnp = 5 × 0.8 = 4です。平均的に4回成功すると期待されます。"
    },
    {
      id: 5,
      question: "確率0.3の事象を10回繰り返すとき、成功回数の期待値はいくつですか。",
      options: ["0.3", "3", "7", "10"],
      correct: 2,
      explanation: "二項分布の期待値はnp = 10 × 0.3 = 3です。平均的に3回成功すると期待されます。"
    },
    {
      id: 6,
      question: "不良品が10%含まれている製品を5個抽出するとき、不良品がちょうど0個である確率として正しいものはどれですか。",
      options: [
        "(0.9)⁵",
        "(0.1)⁵",
        "5 × (0.9)⁵",
        "1 - (0.9)⁵"
      ],
      correct: 1,
      explanation: "不良品が0個 = すべて良品なので、(0.9)⁵です。"
    },
    {
      id: 7,
      question: "コインを10回投げるとき、表が5回出る確率を計算するのに必要な組み合わせの数（10C5）はいくつですか。",
      options: ["50", "120", "252", "1024"],
      correct: 3,
      explanation: "10C5 = 10!/(5!×5!) = (10×9×8×7×6)/(5×4×3×2×1) = 30240/120 = 252です。"
    },
    {
      id: 8,
      question: "サイコロを12回振るとき、1の目が出る回数の期待値はいくつですか。",
      options: ["1", "2", "6", "12"],
      correct: 2,
      explanation: "二項分布の期待値はnp = 12 × (1/6) = 2です。平均的に2回、1の目が出ると期待されます。"
    },
    {
      id: 9,
      question: "サイコロを6回振って、1の目がちょうど2回出る確率として正しい計算式はどれですか。",
      options: [
        "6C2 × (1/6)² × (5/6)⁴",
        "6C2 × (5/6)² × (1/6)⁴",
        "(1/6)² × (5/6)⁴",
        "6 × (1/6)²"
      ],
      correct: 1,
      explanation: "二項分布：6C2 × (1/6)² × (5/6)⁴ です。n=6, k=2, p=1/6なので、この式が正しいです。"
    },
    {
      id: 10,
      question: "二項分布B(20, 0.5)の期待値と分散として正しいものはどれですか。",
      options: [
        "期待値10、分散5",
        "期待値10、分散10",
        "期待値20、分散10",
        "期待値5、分散5"
      ],
      correct: 1,
      explanation: "二項分布の期待値はnp=20×0.5=10、分散はnp(1-p)=20×0.5×0.5=5です。"
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
    examId: 'grade3-section4_probability_2',
    examTitle: '3級 - Section4: 確率と確率分布 (2/2)',
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
        title="3級 - Section4: 確率と確率分布 (2/2)"
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
      title="3級 - Section4: 確率と確率分布 (2/2)"
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
