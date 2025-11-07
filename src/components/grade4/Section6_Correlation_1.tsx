import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section6Correlation1() {
  const questions: Question[] = [
    {
        id: 1,
        question: "散布図とは何ですか。",
        options: [
            "1つの変数のグラフ",
            "2つの変数の関係を示す図",
            "度数分布図",
            "円グラフ",
        ],
        correct: 2,
        explanation: "散布図は、2つの変数の関係を点で表したグラフです。"
    },
    {
        id: 2,
        question: "散布図の横軸（x軸）と縦軸（y軸）には何を置きますか。",
        options: [
            "同じ変数を2回",
            "それぞれ異なる変数",
            "平均と中央値",
            "最大値と最小値",
        ],
        correct: 2,
        explanation: "散布図では、横軸と縦軸にそれぞれ異なる変数を置きます。"
    },
    {
        id: 3,
        question: "散布図で点が右上がりに分布しているとき、2つの変数の関係はどうですか。",
        options: [
            "正の相関がある",
            "負の相関がある",
            "相関がない",
            "判断できない",
        ],
        correct: 1,
        explanation: "右上がりの分布は、一方が増えるともう一方も増える「正の相関」を示します。"
    },
    {
        id: 4,
        question: "散布図で点が右下がりに分布しているとき、2つの変数の関係はどうですか。",
        options: [
            "正の相関がある",
            "負の相関がある",
            "相関がない",
            "判断できない",
        ],
        correct: 2,
        explanation: "右下がりの分布は、一方が増えるともう一方が減る「負の相関」を示します。"
    },
    {
        id: 5,
        question: "散布図で点がバラバラに散らばっているとき、2つの変数の関係はどうですか。",
        options: [
            "強い正の相関",
            "強い負の相関",
            "ほとんど相関がない",
            "必ず因果関係がある",
        ],
        correct: 3,
        explanation: "点がバラバラなら、2つの変数にはほとんど相関がありません。"
    },
    {
        id: 6,
        question: "身長と体重の散布図で、点が右上がりの分布を示しました。どう解釈しますか。",
        options: [
            "身長が高いほど体重が重い傾向",
            "身長が高いほど体重が軽い傾向",
            "身長と体重は無関係",
            "判断できない",
        ],
        correct: 1,
        explanation: "右上がりなので、身長が高いほど体重が重い傾向（正の相関）があります。"
    },
    {
        id: 7,
        question: "散布図の点が直線に近いほど、相関はどうなりますか。",
        options: [
            "相関が強い",
            "相関が弱い",
            "相関がない",
            "判断できない",
        ],
        correct: 1,
        explanation: "点が直線に近いほど、2つの変数の相関が強いことを示します。"
    },
    {
        id: 8,
        question: "散布図から何がわかりますか。",
        options: [
            "1つのデータの平均",
            "2つの変数の関係の傾向",
            "データの個数だけ",
            "何もわからない",
        ],
        correct: 2,
        explanation: "散布図からは、2つの変数の関係の傾向（相関の有無や強さ）がわかります。"
    },
    {
        id: 9,
        question: "勉強時間とテスト点数の散布図で、点が右上がりなら何が言えますか。",
        options: [
            "勉強時間が長いほど点数が高い傾向",
            "勉強時間が長いほど点数が低い傾向",
            "勉強時間と点数は無関係",
            "必ず100点になる",
        ],
        correct: 1,
        explanation: "右上がりは正の相関なので、勉強時間が長いほど点数が高い傾向があると言えます。"
    },
    {
        id: 10,
        question: "散布図の1つの点は何を表しますか。",
        options: [
            "平均値",
            "1つのデータの2つの変数の値",
            "全データの合計",
            "中央値",
        ],
        correct: 2,
        explanation: "散布図の各点は、1つのデータにおける2つの変数の値（x, y）を表します。"
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
    examId: 'grade4-section6_correlation_1',
    examTitle: '4級 Section6_Correlation_1',
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
