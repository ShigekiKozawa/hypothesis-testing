import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section4Graphs1() {
  const questions: Question[] = [
    {
        id: 1,
        question: "範囲（レンジ）とは何ですか。",
        options: [
            "データの平均値",
            "最大値 - 最小値",
            "データの個数",
            "中央値"
        ],
        correct: 2,
        explanation: "範囲（レンジ）= 最大値 - 最小値 で、データの散らばりの最も単純な指標です。"
    },
    {
        id: 2,
        question: "次のデータの範囲はいくらですか。\n\n5, 8, 3, 12, 7",
        options: [
            "5",
            "7",
            "9",
            "12"
        ],
        correct: 3,
        explanation: "範囲 = 最大値12 - 最小値3 = 9です。"
    },
    {
        id: 3,
        question: "範囲が大きいとき、データの特徴はどうですか。",
        options: [
            "データが集中している",
            "データが散らばっている",
            "データの個数が多い",
            "平均が大きい"
        ],
        correct: 2,
        explanation: "範囲が大きいほど、データが広い範囲に散らばっています。"
    },
    {
        id: 4,
        question: "2つのクラスのテスト結果の範囲が、A組:20点、B組:10点のとき、どちらが散らばっていますか。",
        options: [
            "A組",
            "B組",
            "同じ",
            "判断できない"
        ],
        correct: 1,
        explanation: "範囲が大きいA組（20点）の方が、B組（10点）より散らばっています。"
    },
    {
        id: 5,
        question: "範囲の欠点はどれですか。",
        options: [
            "計算が複雑",
            "外れ値の影響を受けやすい",
            "必ず0になる",
            "平均と同じ"
        ],
        correct: 2,
        explanation: "範囲は最大値と最小値のみを使うため、1つの外れ値があると大きく影響を受けます。"
    },
    {
        id: 6,
        question: "次のうち、範囲が0になるのはどのような場合ですか。",
        options: [
            "データが多い",
            "全てのデータが同じ値",
            "最大値が大きい",
            "平均が0"
        ],
        correct: 2,
        explanation: "全てのデータが同じ値のとき、最大値=最小値なので範囲は0になります。"
    },
    {
        id: 7,
        question: "データが10, 20, 30, 40, 50のとき、範囲はいくらですか。",
        options: [
            "30",
            "40",
            "50",
            "60"
        ],
        correct: 2,
        explanation: "範囲 = 50 - 10 = 40です。"
    },
    {
        id: 8,
        question: "範囲は、データの散らばりのどの部分を表していますか。",
        options: [
            "データ全体の広がり（最大値と最小値の差）",
            "データの中央の散らばり",
            "平均からの距離",
            "データの個数"
        ],
        correct: 1,
        explanation: "範囲は、データ全体の広がり（最大値と最小値の差）を表します。"
    },
    {
        id: 9,
        question: "データに1つだけ非常に大きな値（外れ値）が追加されたとき、範囲はどうなりますか。",
        options: [
            "変わらない",
            "大きくなる",
            "小さくなる",
            "0になる"
        ],
        correct: 2,
        explanation: "外れ値が最大値になると、範囲は大きくなります。範囲は外れ値の影響を受けやすい指標です。"
    },
    {
        id: 10,
        question: "範囲を使う利点はどれですか。",
        options: [
            "外れ値に強い",
            "計算が簡単で直感的",
            "常に正確",
            "平均と同じ"
        ],
        correct: 2,
        explanation: "範囲は「最大値 - 最小値」なので計算が簡単で、データの散らばりを直感的に理解できる利点があります。"
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
    examId: 'grade4-section4_graphs_1',
    examTitle: '4級 Section4_Graphs_1',
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
