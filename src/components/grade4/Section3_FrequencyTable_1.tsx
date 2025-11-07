import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section3FrequencyTable1() {
  const questions: Question[] = [
    {
        id: 1,
        question: "度数分布表とは何ですか。",
        options: [
            "平均を示す表",
            "データを階級（区間）に分けて、各階級の度数をまとめた表",
            "円グラフ",
            "散布図",
        ],
        correct: 2,
        explanation: "度数分布表は、量的データを階級（区間）に分けて、各階級のデータの個数（度数）をまとめた表です。"
    },
    {
        id: 2,
        question: "度数分布表の「階級」とは何ですか。",
        options: [
            "データの個数",
            "データを区切った区間（例：0〜10点）",
            "平均値",
            "中央値",
        ],
        correct: 2,
        explanation: "階級とは、データを区切った区間のことです。例えば、0〜10点、10〜20点などです。"
    },
    {
        id: 3,
        question: "度数分布表の「度数」とは何ですか。",
        options: [
            "平均値",
            "各階級に含まれるデータの個数",
            "中央値",
            "範囲",
        ],
        correct: 2,
        explanation: "度数とは、各階級に含まれるデータの個数（頻度）のことです。"
    },
    {
        id: 4,
        question: "度数分布表の「階級値」とは何ですか。",
        options: [
            "最大値",
            "各階級の中央の値（階級の代表値）",
            "最小値",
            "合計",
        ],
        correct: 2,
        explanation: "階級値は、各階級の中央の値で、その階級を代表する値です。例：0〜10点の階級値は5です。"
    },
    {
        id: 5,
        question: "度数分布表で、全ての度数を合計すると何になりますか。",
        options: [
            "平均値",
            "データの総数（n）",
            "中央値",
            "0",
        ],
        correct: 2,
        explanation: "全ての階級の度数を合計すると、データの総数（n）になります。"
    },
    {
        id: 6,
        question: "度数分布表から平均値を求めるには、どうしますか。",
        options: [
            "度数の合計",
            "各階級値×度数を合計して、データ総数で割る",
            "最大値-最小値",
            "中央値を見る",
        ],
        correct: 2,
        explanation: "平均値≒（各階級値×度数）の合計÷データ総数 で求めます。"
    },
    {
        id: 7,
        question: "度数分布表の「階級幅」とは何ですか。",
        options: [
            "度数",
            "各階級の区間の幅（例：10点）",
            "平均値",
            "中央値",
        ],
        correct: 2,
        explanation: "階級幅は、各階級の区間の幅です。例：0〜10点の階級幅は10です。"
    },
    {
        id: 8,
        question: "度数分布表を作るとき、階級幅は全て同じにすべきですか。",
        options: [
            "必ず違う",
            "通常は同じにする（比較しやすいため）",
            "どちらでも良い",
            "判断できない",
        ],
        correct: 2,
        explanation: "通常は階級幅を全て同じにします。異なると比較が難しくなります。"
    },
    {
        id: 9,
        question: "度数分布表で、度数が最も大きい階級を何と言いますか。",
        options: [
            "平均値",
            "最頻階級（モードを含む階級）",
            "中央値",
            "範囲",
        ],
        correct: 2,
        explanation: "度数が最も大きい階級を最頻階級と言い、最頻値（モード）を含む階級です。"
    },
    {
        id: 10,
        question: "度数分布表を作る目的は何ですか。",
        options: [
            "データを減らす",
            "データの分布の特徴（集中や散らばり）を把握しやすくする",
            "必ず平均を求める",
            "何もない",
        ],
        correct: 2,
        explanation: "度数分布表を作ることで、大量のデータの分布の特徴（どこに集中しているか、散らばりなど）を把握しやすくなります。"
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
    examId: 'grade4-section3_frequencytable_1',
    examTitle: '4級 Section3_FrequencyTable_1',
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
