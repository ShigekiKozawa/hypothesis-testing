import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section8Histogram3() {
  const questions: Question[] = [
    {
        id: 1,
        question: "ヒストグラムを作成する手順はどれですか。",
        options: [
            "データを集める→階級を決める→度数を数える→グラフを描く",
            "グラフを描く→データを集める",
            "平均を計算する→グラフを描く",
            "何もしない",
        ],
        correct: 1,
        explanation: "ヒストグラム作成の手順：データを集める→階級を決める→各階級の度数を数える→グラフを描く です。"
    },
    {
        id: 2,
        question: "ヒストグラムの階級数は、どのように決めますか。",
        options: [
            "必ず10個",
            "データ数に応じて適切に決める（スタージェスの公式など）",
            "必ず5個",
            "適当に決める",
        ],
        correct: 2,
        explanation: "階級数は、データ数に応じて適切に決めます。スタージェスの公式（1+log2(n)）などが使われます。"
    },
    {
        id: 3,
        question: "ヒストグラムで相対度数を使う利点は何ですか。",
        options: [
            "平均がわかる",
            "データ数が異なるグループを比較しやすい",
            "必ず使うべき",
            "何もない",
        ],
        correct: 2,
        explanation: "相対度数（割合）を使うと、データ数が異なるグループのヒストグラムを比較しやすくなります。"
    },
    {
        id: 4,
        question: "ヒストグラムと度数分布表の関係はどれですか。",
        options: [
            "全く無関係",
            "度数分布表をグラフ化したものがヒストグラム",
            "ヒストグラムの方が正確",
            "判断できない",
        ],
        correct: 2,
        explanation: "ヒストグラムは、度数分布表のデータを視覚的にグラフ化したものです。"
    },
    {
        id: 5,
        question: "ヒストグラムで、階級の境界値がデータと重なるとき、どう処理しますか。",
        options: [
            "無視する",
            "「以上、未満」などのルールを明確にする",
            "必ず削除",
            "判断できない",
        ],
        correct: 2,
        explanation: "階級の境界値の扱いは、「以上、未満」などのルールを明確にして、どの階級に含めるか統一します。"
    },
    {
        id: 6,
        question: "ヒストグラムから四分位数は読み取れますか。",
        options: [
            "正確に読み取れる",
            "累積度数を使えばおおよそ推測できる",
            "全く読み取れない",
            "必ず中央値と同じ",
        ],
        correct: 2,
        explanation: "ヒストグラムまたは累積度数を使えば、四分位数のおおよその位置を推測できます。"
    },
    {
        id: 7,
        question: "ヒストグラムで、柱の面積は何を表しますか。",
        options: [
            "平均値",
            "その階級の度数（階級幅が同じ場合）",
            "中央値",
            "範囲",
        ],
        correct: 2,
        explanation: "階級の幅が同じ場合、柱の面積はその階級の度数（データの個数）に比例します。"
    },
    {
        id: 8,
        question: "ヒストグラムから、データの個数（n）はどう求めますか。",
        options: [
            "最大値-最小値",
            "全ての柱の度数を合計する",
            "平均値×階級数",
            "求められない",
        ],
        correct: 2,
        explanation: "全ての階級の度数を合計すると、データの総数nが求められます。"
    },
    {
        id: 9,
        question: "ヒストグラムと箱ひげ図を比較したとき、ヒストグラムの利点は何ですか。",
        options: [
            "複数グループの比較がしやすい",
            "データの分布の形が詳しくわかる",
            "外れ値がわかる",
            "何もない",
        ],
        correct: 2,
        explanation: "ヒストグラムは、データの分布の詳しい形（山の数、偏りなど）がわかる利点があります。"
    },
    {
        id: 10,
        question: "ヒストグラムで、柱がない（度数0）の階級があるとき、どう解釈しますか。",
        options: [
            "エラー",
            "その範囲にデータがない",
            "必ず外れ値",
            "判断できない",
        ],
        correct: 2,
        explanation: "柱がない（度数0）の階級は、その範囲にデータが1つもないことを示します。"
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
    examId: 'grade4-section8_histogram_3',
    examTitle: '4級 Section8_Histogram_3',
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
