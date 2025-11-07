import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section7BoxPlot1() {
  const questions: Question[] = [
    {
        id: 1,
        question: "箱ひげ図とは何ですか。",
        options: [
            "平均を示す図",
            "データの分布を5つの数値（最小値、Q1、Q2、Q3、最大値）で示す図",
            "円グラフ",
            "折れ線グラフ",
        ],
        correct: 2,
        explanation: "箱ひげ図は、最小値、第1四分位数Q1、中央値Q2、第3四分位数Q3、最大値の5つの数値でデータの分布を示すグラフです。"
    },
    {
        id: 2,
        question: "箱ひげ図の「箱」の部分は何を表しますか。",
        options: [
            "全データの範囲",
            "データの中央50%（Q1からQ3）",
            "平均値",
            "最大値と最小値",
        ],
        correct: 2,
        explanation: "箱の部分は、第1四分位数Q1から第3四分位数Q3までの中央50%のデータを表します。"
    },
    {
        id: 3,
        question: "箱ひげ図の箱の中の線は何を表しますか。",
        options: [
            "平均値",
            "中央値（第2四分位数Q2）",
            "最大値",
            "最小値",
        ],
        correct: 2,
        explanation: "箱の中の線は、中央値（第2四分位数Q2）を表します。"
    },
    {
        id: 4,
        question: "箱ひげ図の「ひげ」は何を表しますか。",
        options: [
            "平均値",
            "Q1とQ3",
            "最小値と最大値（またはその付近）",
            "標準偏差",
        ],
        correct: 3,
        explanation: "ひげは、データの最小値と最大値（または外れ値を除いた範囲）を表します。"
    },
    {
        id: 5,
        question: "箱ひげ図から何がわかりますか。",
        options: [
            "平均値だけ",
            "データの散らばりや分布の特徴",
            "データの個数だけ",
            "何もわからない",
        ],
        correct: 2,
        explanation: "箱ひげ図からは、データの中心、散らばり、分布の偏りなどの特徴がわかります。"
    },
    {
        id: 6,
        question: "箱ひげ図で箱が長いとき、どういう意味ですか。",
        options: [
            "データの中央50%が集中している",
            "データの中央50%が散らばっている",
            "平均が大きい",
            "データ数が多い",
        ],
        correct: 2,
        explanation: "箱が長い（四分位範囲IQRが大きい）ほど、データの中央50%が散らばっています。"
    },
    {
        id: 7,
        question: "2つの箱ひげ図を比較するとき、何を見ますか。",
        options: [
            "色だけ",
            "中央値の位置、箱の長さ、ひげの長さ",
            "グラフの大きさ",
            "何も見ない",
        ],
        correct: 2,
        explanation: "中央値の位置（中心）、箱の長さ（散らばり）、ひげの長さなどを比較します。"
    },
    {
        id: 8,
        question: "箱ひげ図で、箱の中の線が箱の中央にないとき、どういう意味ですか。",
        options: [
            "データに偏りがある",
            "データが等間隔",
            "必ずエラー",
            "判断できない",
        ],
        correct: 1,
        explanation: "中央値が箱の中央にない場合、データの分布に偏り（歪み）があることを示します。"
    },
    {
        id: 9,
        question: "箱ひげ図からデータの範囲（最大値-最小値）はどう読み取りますか。",
        options: [
            "箱の長さ",
            "ひげの全体の長さ",
            "箱の中の線",
            "読み取れない",
        ],
        correct: 2,
        explanation: "ひげ全体の長さ（最小値から最大値まで）がデータの範囲を示します。"
    },
    {
        id: 10,
        question: "箱ひげ図は、どんなときに便利ですか。",
        options: [
            "1つのデータだけを見るとき",
            "複数のグループのデータを比較するとき",
            "平均だけを知りたいとき",
            "何の役にも立たない",
        ],
        correct: 2,
        explanation: "箱ひげ図は、複数のグループのデータの分布を視覚的に比較するのに便利です。"
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
    examId: 'grade4-section7_boxplot_1',
    examTitle: '4級 Section7_BoxPlot_1',
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
