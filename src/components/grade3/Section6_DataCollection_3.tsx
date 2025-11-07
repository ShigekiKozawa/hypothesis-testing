import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section6DataCollection3() {
  const questions: Question[] = [
    {
        id: 1,
        question: "次のクロス集計表で、全体に対する各セルの割合（相対度数）を計算してください（左上のセルのみ）。\n\n　　　　｜商品A｜商品B｜合計\n購入　　｜  30 ｜  20 ｜ 50\n未購入　｜  20 ｜  30 ｜ 50\n合計　　｜  50 ｜  50 ｜100",
        options: [
            "20%",
            "25%",
            "30%",
            "50%"
        ],
        correct: 3,
        explanation: "左上のセル（購入×商品A）は30人で、全体は100人なので、30÷100=30%です。"
    },
    {
        id: 2,
        question: "上記のクロス集計表で、「購入」した人の中で「商品A」を選んだ人の割合はいくらですか。",
        options: [
            "30%",
            "50%",
            "60%",
            "100%"
        ],
        correct: 3,
        explanation: "購入した人は50人、そのうち商品Aは30人なので、30÷50=60%です。"
    },
    {
        id: 3,
        question: "クロス集計表で、行パーセントと列パーセントの違いは何ですか。",
        options: [
            "計算方法は同じ",
            "行パーセントは行の合計を分母、列パーセントは列の合計を分母とする",
            "行パーセントは列の合計を分母、列パーセントは行の合計を分母とする",
            "違いはない"
        ],
        correct: 2,
        explanation: "行パーセントは各行の合計を分母として計算し、列パーセントは各列の合計を分母として計算します。"
    },
    {
        id: 4,
        question: "次のクロス集計表で、「男性」の「賛成」の期待度数を計算してください（独立を仮定）。\n\n　　　　｜賛成｜反対｜合計\n男性　　｜  ? ｜  ? ｜ 60\n女性　　｜  ? ｜  ? ｜ 40\n合計　　｜ 50 ｜ 50 ｜100",
        options: [
            "25",
            "30",
            "35",
            "40"
        ],
        correct: 2,
        explanation: "期待度数=（行の合計×列の合計）÷全体の合計=（60×50）÷100=30です。"
    },
    {
        id: 5,
        question: "クロス集計表から計算できる指標として誤っているものはどれですか。",
        options: [
            "行パーセント",
            "列パーセント",
            "相関係数",
            "条件付き確率"
        ],
        correct: 3,
        explanation: "相関係数はクロス集計表（カテゴリカル変数）からは計算できません。相関係数は量的変数間の線形関係を測る指標です。"
    },
    {
        id: 6,
        question: "3×3のクロス集計表には、全部でいくつのセルがありますか（周辺度数を除く）。",
        options: [
            "3個",
            "6個",
            "9個",
            "12個"
        ],
        correct: 3,
        explanation: "3×3のクロス集計表は、3行×3列=9個のセルがあります。"
    },
    {
        id: 7,
        question: "次のクロス集計表で、「A商品購入者」と「B商品購入者」の条件付き確率P(B|A)を計算してください。\n\n　　　　　　｜B購入｜B未購入｜合計\nA購入　　　｜  40  ｜   60   ｜ 100\nA未購入　　｜  20  ｜  180   ｜ 200\n合計　　　　｜  60  ｜  240   ｜ 300",
        options: [
            "約13.3%",
            "20%",
            "40%",
            "60%"
        ],
        correct: 3,
        explanation: "P(B|A)は「A購入の条件下でBも購入する確率」です。A購入者100人中、B購入者は40人なので、40÷100=40%です。"
    },
    {
        id: 8,
        question: "クロス集計表で、2つの変数が完全に独立している場合、何が成り立ちますか。",
        options: [
            "すべてのセルの観測度数=期待度数",
            "すべてのセルの値が等しい",
            "行の合計=列の合計",
            "判断できない"
        ],
        correct: 1,
        explanation: "2つの変数が完全に独立している場合、すべてのセルで観測度数=期待度数となります。"
    },
    {
        id: 9,
        question: "クロス集計表を作成する際の注意点として正しいものはどれですか。",
        options: [
            "必ず2×2の表にする",
            "量的変数をそのまま使う",
            "カテゴリーを適切に設定する",
            "平均値を計算する"
        ],
        correct: 3,
        explanation: "クロス集計表を作成する際は、カテゴリーを適切に設定し、意味のある区分にすることが重要です。量的変数は階級分けしてカテゴリカルにする必要があります。"
    },
    {
        id: 10,
        question: "クロス集計表から導かれる知見として誤っているものはどれですか。",
        options: [
            "2つの変数の関連性の強さ",
            "因果関係の証明",
            "条件付き確率",
            "度数の比較"
        ],
        correct: 2,
        explanation: "クロス集計表からは関連性は読み取れますが、因果関係を証明することはできません。相関≠因果であり、実験や理論的根拠が必要です。"
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
    examId: 'grade3-section6_datacollection_3',
    examTitle: '3級 Section6_DataCollection_3',
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
