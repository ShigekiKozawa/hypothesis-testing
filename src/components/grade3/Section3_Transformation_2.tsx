import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section3_Transformation_2() {
  const questions: Question[] = [
    {
      id: 1,
      question: "製品Aの重量の平均は250g、標準偏差は25gです。製品Aの変動係数はいくつですか。",
      options: ["5%", "10%", "20%", "25%"],
      correct: 2,
      explanation: "変動係数 = (標準偏差 / 平均値) × 100 = (25 / 250) × 100 = 10%です。"
    },
    {
      id: 2,
      question: "データAの平均が100、標準偏差が20です。データAの変動係数はいくつですか。",
      options: ["5%", "20%", "50%", "100%"],
      correct: 2,
      explanation: "変動係数 = (標準偏差 / 平均値) × 100 = (20 / 100) × 100 = 20%です。"
    },
    {
      id: 3,
      question: "2つのクラスのテスト結果があります。どちらのクラスのばらつきが相対的に大きいですか。\n\nクラスA: 平均60点、標準偏差12点\nクラスB: 平均80点、標準偏差20点",
      options: [
        "クラスAの方が大きい",
        "クラスBの方が大きい",
        "同じ",
        "判断できない"
      ],
      correct: 2,
      explanation: "変動係数で比較します。A: 12/60×100=20%、B: 20/80×100=25%。Bの方が相対的なばらつきが大きいです。"
    },
    {
      id: 4,
      question: "商品Xの価格は平均1000円、標準偏差150円です。商品Xの変動係数はいくつですか。",
      options: ["6.7%", "15%", "150%", "1000%"],
      correct: 2,
      explanation: "変動係数 = (標準偏差 / 平均値) × 100 = (150 / 1000) × 100 = 15%です。"
    },
    {
      id: 5,
      question: "ある工場の製品Aの重量は平均500g、標準偏差10gです。製品Bの重量は平均50g、標準偏差2gです。どちらの製品の方が相対的なばらつきが大きいですか。",
      options: [
        "製品A",
        "製品B",
        "同じ",
        "判断できない"
      ],
      correct: 2,
      explanation: "変動係数で比較します。A: 10/500×100=2%、B: 2/50×100=4%。製品Bの方が相対的なばらつきが大きいです。"
    },
    {
      id: 6,
      question: "ある店舗の日別売上の平均は8万円、標準偏差は2万円です。この店舗の売上の変動係数はいくつですか。",
      options: ["4%", "10%", "25%", "40%"],
      correct: 3,
      explanation: "変動係数 = (標準偏差 / 平均値) × 100 = (2 / 8) × 100 = 25%です。"
    },
    {
      id: 7,
      question: "3つのデータセットがあります。変動係数が最も小さいのはどれですか。\n\nA: 平均100、標準偏差15\nB: 平均200、標準偏差20\nC: 平均50、標準偏差10",
      options: [
        "A",
        "B",
        "C",
        "すべて同じ"
      ],
      correct: 2,
      explanation: "A: 15/100×100=15%、B: 20/200×100=10%、C: 10/50×100=20%。Bの変動係数が最も小さく、相対的なばらつきが最も小さいです。"
    },
    {
      id: 8,
      question: "データセットXは平均40、標準偏差6です。データセットYは平均80、標準偏差6です。標準偏差は同じですが、変動係数が大きいのはどちらですか。",
      options: [
        "X",
        "Y",
        "同じ",
        "判断できない"
      ],
      correct: 1,
      explanation: "X: 6/40×100=15%、Y: 6/80×100=7.5%。平均値が小さいXの方が変動係数は大きくなります。"
    },
    {
      id: 9,
      question: "データセットの平均が150、変動係数が20%です。このデータセットの標準偏差はいくつですか。",
      options: ["7.5", "15", "30", "750"],
      correct: 3,
      explanation: "変動係数 = (標準偏差 / 平均) × 100 より、標準偏差 = 変動係数 × 平均 / 100 = 20 × 150 / 100 = 30です。"
    },
    {
      id: 10,
      question: "ある学校の2つの科目の結果があります。どちらの科目の方が相対的なばらつきが大きいですか。\n\n数学: 平均70点、標準偏差14点\n英語: 平均50点、標準偏差12点",
      options: [
        "数学",
        "英語",
        "同じ",
        "判断できない"
      ],
      correct: 2,
      explanation: "変動係数で比較します。数学: 14/70×100=20%、英語: 12/50×100=24%。英語の方が相対的なばらつきが大きいです。"
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
    examId: 'grade3-section3_transformation_2',
    examTitle: '3級 - Section3: データの変換と統計量 (2/2)',
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
        title="3級 - Section3: データの変換と統計量 (2/2)"
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
      title="3級 - Section3: データの変換と統計量 (2/2)"
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
