import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section4Graphs2() {
  const questions: Question[] = [
    {
        id: 1,
        question: "四分位数とは何ですか。",
        options: [
            "データを4等分する3つの値（Q1, Q2, Q3）",
            "データの平均",
            "データの最大値",
            "データの個数"
        ],
        correct: 1,
        explanation: "四分位数は、データを小さい順に並べて4等分する3つの値（第1四分位数Q1、第2四分位数Q2（中央値）、第3四分位数Q3）です。"
    },
    {
        id: 2,
        question: "第2四分位数（Q2）は、他に何と呼ばれますか。",
        options: [
            "平均値",
            "中央値（メジアン）",
            "最頻値",
            "範囲"
        ],
        correct: 2,
        explanation: "第2四分位数Q2は、データの真ん中の値で、中央値（メジアン）と同じです。"
    },
    {
        id: 3,
        question: "四分位範囲（IQR）とは何ですか。",
        options: [
            "Q1 + Q3",
            "Q3 - Q1",
            "Q2 - Q1",
            "最大値 - 最小値"
        ],
        correct: 2,
        explanation: "四分位範囲IQR = Q3（第3四分位数）- Q1（第1四分位数）で、データの中央50%の散らばりを示します。"
    },
    {
        id: 4,
        question: "次のデータの第1四分位数Q1はいくらですか。\n\n2, 4, 6, 8, 10, 12, 14",
        options: [
            "4",
            "6",
            "8",
            "10"
        ],
        correct: 1,
        explanation: "7個のデータを4等分すると、下位25%の境界は2番目の値4になります。"
    },
    {
        id: 5,
        question: "四分位範囲が大きいとき、データの特徴はどうですか。",
        options: [
            "データの中央50%が集中している",
            "データの中央50%が散らばっている",
            "データ数が多い",
            "平均が大きい"
        ],
        correct: 2,
        explanation: "四分位範囲が大きいほど、データの中央50%が散らばっています。"
    },
    {
        id: 6,
        question: "四分位範囲の利点はどれですか。",
        options: [
            "計算が最も簡単",
            "外れ値の影響を受けにくい",
            "必ず範囲と同じ",
            "平均と同じ"
        ],
        correct: 2,
        explanation: "四分位範囲は、データの中央50%だけを使うので、外れ値の影響を受けにくい利点があります。"
    },
    {
        id: 7,
        question: "データが1, 3, 5, 7, 9のとき、第3四分位数Q3はいくらですか。",
        options: [
            "5",
            "7",
            "8",
            "9"
        ],
        correct: 2,
        explanation: "5個のデータを4等分すると、上位25%の境界は4番目の値7になります。"
    },
    {
        id: 8,
        question: "四分位範囲は、データのどの部分の散らばりを表しますか。",
        options: [
            "全データ",
            "中央50%のデータ",
            "上位25%のデータ",
            "下位25%のデータ"
        ],
        correct: 2,
        explanation: "四分位範囲IQR = Q3 - Q1 は、Q1とQ3の間（中央50%）のデータの散らばりを表します。"
    },
    {
        id: 9,
        question: "範囲と四分位範囲を比較したとき、外れ値に強いのはどちらですか。",
        options: [
            "範囲",
            "四分位範囲",
            "同じ",
            "判断できない"
        ],
        correct: 2,
        explanation: "四分位範囲は中央50%のみを使うので、範囲（最大値-最小値）より外れ値の影響を受けにくいです。"
    },
    {
        id: 10,
        question: "箱ひげ図の「箱」の長さは何を表しますか。",
        options: [
            "範囲",
            "四分位範囲（IQR）",
            "標準偏差",
            "平均値"
        ],
        correct: 2,
        explanation: "箱ひげ図の箱の長さは四分位範囲IQR（Q3 - Q1）を表します。"
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
    examId: 'grade4-section4_graphs_2',
    examTitle: '4級 Section4_Graphs_2',
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
