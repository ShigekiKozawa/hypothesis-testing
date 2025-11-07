import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section8Histogram1() {
  const questions: Question[] = [
    {
        id: 1,
        question: "ヒストグラムとは何ですか。",
        options: [
            "円グラフ",
            "量的データの度数分布を柱状グラフで表したもの",
            "折れ線グラフ",
            "散布図",
        ],
        correct: 2,
        explanation: "ヒストグラムは、量的データを階級（区間）に分けて、各階級の度数を柱状グラフで表したものです。"
    },
    {
        id: 2,
        question: "ヒストグラムの横軸は何を表しますか。",
        options: [
            "度数",
            "データの階級（区間）",
            "平均値",
            "中央値",
        ],
        correct: 2,
        explanation: "横軸は、データを区切った階級（区間）を表します。"
    },
    {
        id: 3,
        question: "ヒストグラムの縦軸は何を表しますか。",
        options: [
            "データの値",
            "各階級の度数（個数）または相対度数",
            "平均値",
            "範囲",
        ],
        correct: 2,
        explanation: "縦軸は、各階級の度数（データの個数）または相対度数を表します。"
    },
    {
        id: 4,
        question: "ヒストグラムから何がわかりますか。",
        options: [
            "平均値だけ",
            "データの分布の形や散らばり",
            "データの相関",
            "何もわからない",
        ],
        correct: 2,
        explanation: "ヒストグラムからは、データの分布の形（左右対称か、偏っているかなど）や散らばりがわかります。"
    },
    {
        id: 5,
        question: "ヒストグラムで柱が高いほど、その階級には何がありますか。",
        options: [
            "平均が大きい",
            "データが多い",
            "データが少ない",
            "外れ値がある",
        ],
        correct: 2,
        explanation: "柱が高いほど、その階級に属するデータの個数が多いことを示します。"
    },
    {
        id: 6,
        question: "ヒストグラムが左右対称の山型のとき、どういう分布ですか。",
        options: [
            "正規分布に近い",
            "偏った分布",
            "一様分布",
            "判断できない",
        ],
        correct: 1,
        explanation: "左右対称の山型（釣鐘型）の分布は、正規分布に近い形です。"
    },
    {
        id: 7,
        question: "ヒストグラムで右に裾が長い形のとき、どういう分布ですか。",
        options: [
            "右に偏った分布（正の歪み）",
            "左に偏った分布（負の歪み）",
            "対称な分布",
            "一様分布",
        ],
        correct: 1,
        explanation: "右に裾が長い形は、右に偏った分布（正の歪み）です。大きい値の方に少数のデータがあります。"
    },
    {
        id: 8,
        question: "ヒストグラムから中央値はどの程度推測できますか。",
        options: [
            "正確にわかる",
            "おおよその位置は推測できる",
            "全くわからない",
            "必ず平均と同じ",
        ],
        correct: 2,
        explanation: "ヒストグラムから、データが真ん中で2等分される位置を推測することで、中央値のおおよその位置がわかります。"
    },
    {
        id: 9,
        question: "ヒストグラムで階級の幅を変えると、グラフの見え方はどうなりますか。",
        options: [
            "変わらない",
            "変わる（幅が広いと滑らかに、狭いと細かく）",
            "必ず同じ",
            "判断できない",
        ],
        correct: 2,
        explanation: "階級の幅を変えると、グラフの見え方が変わります。幅が広いと滑らかな形に、狭いと細かい変動が見えます。"
    },
    {
        id: 10,
        question: "ヒストグラムと棒グラフの違いは何ですか。",
        options: [
            "全く同じ",
            "ヒストグラムは量的データの分布、棒グラフは質的データや項目別の比較",
            "ヒストグラムは円形",
            "違いはない",
        ],
        correct: 2,
        explanation: "ヒストグラムは量的データの度数分布を示し、棒グラフは質的データや項目別の数量を比較するのに使います。"
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
    examId: 'grade4-section8_histogram_1',
    examTitle: '4級 Section8_Histogram_1',
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
