import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section6DataCollection2() {
  const questions: Question[] = [
    {
        id: 1,
        question: "次のクロス集計表について、「商品Aを購入した人」の中で「満足」と回答した人の割合はいくらですか。\n\n　　　　　｜満足｜不満｜合計\n商品A　　｜ 70 ｜ 30 ｜100\n商品B　　｜ 50 ｜ 50 ｜100\n合計　　　｜120 ｜ 80 ｜200",
        options: [
            "35%",
            "58.3%",
            "70%",
            "60%"
        ],
        correct: 3,
        explanation: "商品Aを購入した人は100人、そのうち満足は70人なので、70÷100=70%です。"
    },
    {
        id: 2,
        question: "上記のクロス集計表で、「満足」と回答した人の中で「商品A」を購入した人の割合はいくらですか。",
        options: [
            "約58.3%",
            "70%",
            "50%",
            "60%"
        ],
        correct: 1,
        explanation: "満足と回答した人は120人、そのうち商品Aは70人なので、70÷120≈58.3%です。"
    },
    {
        id: 3,
        question: "クロス集計表から相対度数を計算する際の分母は何ですか。",
        options: [
            "行の合計",
            "列の合計",
            "全体の合計",
            "どれでもよい"
        ],
        correct: 4,
        explanation: "相対度数の分母は、何を基準にするかによって異なります。行を基準なら行の合計、列を基準なら列の合計、全体を基準なら全体の合計を使います。"
    },
    {
        id: 4,
        question: "次のクロス集計表で、「性別」と「賛否」は独立と言えますか。\n\n　　　　｜賛成｜反対｜合計\n男性　　｜ 50 ｜ 50 ｜100\n女性　　｜ 50 ｜ 50 ｜100\n合計　　｜100 ｜100 ｜200",
        options: [
            "独立と言える",
            "独立とは言えない",
            "判断できない",
            "完全に依存している"
        ],
        correct: 1,
        explanation: "男性も女性も賛成50%、反対50%で同じ割合なので、性別と賛否は独立していると言えます。"
    },
    {
        id: 5,
        question: "クロス集計表で、期待度数を計算する公式はどれですか。",
        options: [
            "(行の合計×列の合計)÷全体の合計",
            "行の合計÷列の合計",
            "列の合計÷行の合計",
            "行の合計×列の合計"
        ],
        correct: 1,
        explanation: "期待度数=（行の合計×列の合計）÷全体の合計 で計算します。これは2つの変数が独立の場合に期待される度数です。"
    },
    {
        id: 6,
        question: "次のクロス集計表について、Aグループの「はい」の割合とBグループの「はい」の割合の差を計算してください。\n\n　　　　　｜はい｜いいえ｜合計\nグループA｜ 60 ｜  40  ｜100\nグループB｜ 30 ｜  70  ｜100\n合計　　　｜ 90 ｜ 110  ｜200",
        options: [
            "10%",
            "20%",
            "30%",
            "40%"
        ],
        correct: 3,
        explanation: "Aグループの「はい」の割合は60%、Bグループは30%なので、差は60%-30%=30%です。"
    },
    {
        id: 7,
        question: "クロス集計表で、複数の変数（3つ以上）の関係を見るにはどうすればよいですか。",
        options: [
            "2つずつ組み合わせた複数の表を作る",
            "1つの表にすべて入れる",
            "不可能",
            "平均値を使う"
        ],
        correct: 1,
        explanation: "3つ以上の変数の関係を見るには、2つずつ組み合わせた複数のクロス集計表を作成するか、3元クロス集計表（層別クロス集計表）を作成します。"
    },
    {
        id: 8,
        question: "次のクロス集計表から、カイ二乗検定を行うために必要な「期待度数」を計算してください（左上のセルのみ）。\n\n　　　　｜Yes｜No ｜合計\nグループA｜ 40｜ 60｜100\nグループB｜ 30｜ 70｜100\n合計　　　｜ 70｜130｜200",
        options: [
            "30",
            "35",
            "40",
            "50"
        ],
        correct: 2,
        explanation: "期待度数=（行の合計×列の合計）÷全体の合計=（100×70）÷200=35です。"
    },
    {
        id: 9,
        question: "クロス集計表の「周辺度数」とは何ですか。",
        options: [
            "表の中心のセルの値",
            "行の合計と列の合計",
            "全体の合計のみ",
            "外れ値"
        ],
        correct: 2,
        explanation: "周辺度数とは、クロス集計表の行の合計（行周辺度数）と列の合計（列周辺度数）のことです。"
    },
    {
        id: 10,
        question: "クロス集計表から2つの変数の関連性を評価する統計量として適切なものはどれですか。",
        options: [
            "平均値",
            "標準偏差",
            "カイ二乗統計量",
            "相関係数"
        ],
        correct: 3,
        explanation: "カテゴリカル変数間の関連性を評価するには、カイ二乗統計量やクラメールのVなどを使います。相関係数は量的変数用です。"
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
    examId: 'grade3-section6_datacollection_2',
    examTitle: '3級 Section6_DataCollection_2',
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
