import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section7BoxPlot2() {
  const questions: Question[] = [
    {
        id: 1,
        question: "箱ひげ図で外れ値はどう表示されますか。",
        options: [
            "箱の中",
            "ひげの先",
            "ひげの外に点で表示",
            "表示されない",
        ],
        correct: 3,
        explanation: "外れ値は、ひげの外に個別の点として表示されることが多いです。"
    },
    {
        id: 2,
        question: "箱ひげ図で、ひげの長さが左右で大きく異なるとき、何を意味しますか。",
        options: [
            "データに偏りがある",
            "データが対称",
            "平均が大きい",
            "判断できない",
        ],
        correct: 1,
        explanation: "ひげの長さが左右で異なる場合、データの分布に偏りがあることを示します。"
    },
    {
        id: 3,
        question: "箱ひげ図から四分位範囲（IQR）はどう読み取りますか。",
        options: [
            "ひげ全体の長さ",
            "箱の長さ（Q3 - Q1）",
            "中央値",
            "読み取れない",
        ],
        correct: 2,
        explanation: "箱の長さが四分位範囲IQR（Q3 - Q1）を表します。"
    },
    {
        id: 4,
        question: "箱ひげ図で、2つのグループの箱が重なっているとき、何が言えますか。",
        options: [
            "2つのグループは全く同じ",
            "2つのグループのデータの範囲に重なりがある",
            "必ず外れ値がある",
            "判断できない",
        ],
        correct: 2,
        explanation: "箱が重なっている場合、2つのグループのデータの範囲（特に中央50%）に重なりがあることを示します。"
    },
    {
        id: 5,
        question: "箱ひげ図で、中央値の位置を見ることで何がわかりますか。",
        options: [
            "データの散らばり",
            "データの中心の位置",
            "データの個数",
            "平均値",
        ],
        correct: 2,
        explanation: "中央値の位置から、データの中心（真ん中の値）がどこにあるかがわかります。"
    },
    {
        id: 6,
        question: "箱ひげ図で、箱が非常に短いとき、どういう意味ですか。",
        options: [
            "データの中央50%が集中している",
            "データが広く散らばっている",
            "平均が小さい",
            "外れ値が多い",
        ],
        correct: 1,
        explanation: "箱が短い（IQRが小さい）ほど、データの中央50%が集中しています。"
    },
    {
        id: 7,
        question: "箱ひげ図からヒストグラムの形をある程度推測できますか。",
        options: [
            "できる（箱の位置や偏りから）",
            "できない",
            "必ず同じ形",
            "判断できない",
        ],
        correct: 1,
        explanation: "箱ひげ図から、データの中心、散らばり、偏りの情報を使って、ヒストグラムのおおよその形を推測できます。"
    },
    {
        id: 8,
        question: "箱ひげ図で、2つのグループの箱の長さが同じとき、何が言えますか。",
        options: [
            "2つのグループの四分位範囲（IQR）が同じ",
            "2つのグループは全く同じデータ",
            "中央値が同じ",
            "平均が同じ",
        ],
        correct: 1,
        explanation: "箱の長さが同じなら、2つのグループの四分位範囲IQRが同じです。"
    },
    {
        id: 9,
        question: "箱ひげ図で、上側のひげが長く、下側のひげが短いとき、どういう分布ですか。",
        options: [
            "右に裾が長い（正の歪み）",
            "左に裾が長い（負の歪み）",
            "対称",
            "判断できない",
        ],
        correct: 1,
        explanation: "上側（大きい方）のひげが長い場合、右に裾が長い分布（正の歪み）を示します。"
    },
    {
        id: 10,
        question: "箱ひげ図で、Q1とQ3の間にデータの何%が含まれますか。",
        options: [
            "25%",
            "50%",
            "75%",
            "100%",
        ],
        correct: 2,
        explanation: "Q1とQ3の間（箱の部分）には、データの中央50%が含まれます。"
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
    examId: 'grade4-section7_boxplot_2',
    examTitle: '4級 Section7_BoxPlot_2',
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
