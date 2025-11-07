import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section6DataCollection1() {
  const questions: Question[] = [
    {
        id: 1,
        question: "次のクロス集計表から、「男性」かつ「賛成」の人数を読み取ってください。\n\n【アンケート結果】\n　　　　｜賛成｜反対｜合計\n男性　　｜ 45 ｜ 25 ｜ 70\n女性　　｜ 55 ｜ 35 ｜ 90\n合計　　｜100 ｜ 60 ｜160",
        options: [
            "45人",
            "55人",
            "70人",
            "100人"
        ],
        correct: 1,
        explanation: "クロス集計表の「男性」行と「賛成」列の交点を読み取ると45人です。"
    },
    {
        id: 2,
        question: "上記のクロス集計表で、「賛成」の人の割合は全体の何%ですか。",
        options: [
            "約62.5%",
            "約37.5%",
            "約43.75%",
            "約28.13%"
        ],
        correct: 1,
        explanation: "賛成の人数は100人、全体は160人なので、100÷160=0.625=62.5%です。"
    },
    {
        id: 3,
        question: "クロス集計表について、正しい記述を選んでください。",
        options: [
            "2つの変数の関係を表にまとめたもの",
            "常に2×2の表である",
            "平均値を計算するために使う",
            "分散を求めるために使う"
        ],
        correct: 1,
        explanation: "クロス集計表は、2つのカテゴリカル変数の関係を表にまとめたものです。2×2に限らず、3×3や2×4なども可能です。"
    },
    {
        id: 4,
        question: "次のクロス集計表から、男性の中で「賛成」の人の割合を計算してください。\n\n　　　　｜賛成｜反対｜合計\n男性　　｜ 30 ｜ 20 ｜ 50\n女性　　｜ 40 ｜ 10 ｜ 50\n合計　　｜ 70 ｜ 30 ｜100",
        options: [
            "30%",
            "40%",
            "60%",
            "70%"
        ],
        correct: 3,
        explanation: "男性の中で賛成の人の割合は、30÷50=0.6=60%です。"
    },
    {
        id: 5,
        question: "上記のクロス集計表から、「賛成」の人の中で女性の割合を計算してください。",
        options: [
            "約40%",
            "約57.1%",
            "約80%",
            "約70%"
        ],
        correct: 2,
        explanation: "賛成の人は70人、そのうち女性は40人なので、40÷70≈0.571=57.1%です。"
    },
    {
        id: 6,
        question: "クロス集計表で、行の合計と列の合計の交点には何が入りますか。",
        options: [
            "平均値",
            "中央値",
            "全体の合計",
            "標準偏差"
        ],
        correct: 3,
        explanation: "クロス集計表の右下（行の合計と列の合計の交点）には、全体の合計（総数）が入ります。"
    },
    {
        id: 7,
        question: "次のクロス集計表について、「A商品を購入した人」の中で「B商品も購入した人」の割合を計算してください。\n\n　　　　　　｜B購入｜B未購入｜合計\nA購入　　　｜  80  ｜   20   ｜ 100\nA未購入　　｜  40  ｜  160   ｜ 200\n合計　　　　｜ 120 ｜  180   ｜ 300",
        options: [
            "約26.7%",
            "約66.7%",
            "80%",
            "40%"
        ],
        correct: 3,
        explanation: "A商品を購入した人は100人、そのうちB商品も購入した人は80人なので、80÷100=0.8=80%です。"
    },
    {
        id: 8,
        question: "クロス集計表から読み取れない情報はどれですか。",
        options: [
            "各カテゴリーの度数",
            "2つの変数の関連性",
            "因果関係の向き",
            "割合の計算"
        ],
        correct: 3,
        explanation: "クロス集計表からは2つの変数の関連性や度数、割合は読み取れますが、因果関係の向き（どちらが原因でどちらが結果か）は判断できません。"
    },
    {
        id: 9,
        question: "次のクロス集計表で、「男性」と「女性」で「賛成」の割合を比較してください。\n\n　　　　｜賛成｜反対｜合計\n男性　　｜ 20 ｜ 30 ｜ 50\n女性　　｜ 40 ｜ 10 ｜ 50\n合計　　｜ 60 ｜ 40 ｜100",
        options: [
            "男性の方が賛成の割合が高い",
            "女性の方が賛成の割合が高い",
            "同じ割合",
            "判断できない"
        ],
        correct: 2,
        explanation: "男性の賛成割合は20÷50=40%、女性の賛成割合は40÷50=80%なので、女性の方が高いです。"
    },
    {
        id: 10,
        question: "クロス集計表で、2つの変数が「独立」であるとはどういう意味ですか。",
        options: [
            "片方の変数が他方に影響を与えない",
            "必ず因果関係がある",
            "度数が等しい",
            "合計が100になる"
        ],
        correct: 1,
        explanation: "2つの変数が独立とは、一方の変数の値が他方の変数の分布に影響を与えないことを意味します。"
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
    examId: 'grade3-section6_datacollection_1',
    examTitle: '3級 Section6_DataCollection_1',
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
