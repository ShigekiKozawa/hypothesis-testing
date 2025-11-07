import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section3FrequencyTable3() {
  const questions: Question[] = [
    {
        id: 1,
        question: "次のデータを度数分布表にまとめるとき、最初にすることは何ですか。",
        options: [
            "平均を計算する",
            "階級（区間）を決める",
            "グラフを描く",
            "何もしない",
        ],
        correct: 2,
        explanation: "度数分布表を作る最初のステップは、データを区切る階級（区間）を決めることです。"
    },
    {
        id: 2,
        question: "階級「20以上30未満」に含まれるのはどれですか。",
        options: [
            "19",
            "20",
            "30",
            "31",
        ],
        correct: 2,
        explanation: "「20以上30未満」には、20は含まれますが、30は含まれません。"
    },
    {
        id: 3,
        question: "階級「50〜60」の階級値はいくらですか。",
        options: [
            "50",
            "55",
            "60",
            "110",
        ],
        correct: 2,
        explanation: "階級値は階級の中央値で、(50+60)÷2=55です。"
    },
    {
        id: 4,
        question: "データが5, 15, 25, 35のとき、階級幅10で度数分布表を作ると、0〜10の階級の度数はいくらですか。",
        options: [
            "0",
            "1（データ5）",
            "2",
            "4",
        ],
        correct: 2,
        explanation: "0以上10未満（または以下）の階級に含まれるのは5だけなので、度数は1です。"
    },
    {
        id: 5,
        question: "度数分布表で、最も度数が大きい階級が2つあるとき、分布はどうですか。",
        options: [
            "単峰性",
            "二峰性の可能性がある",
            "必ず正規分布",
            "判断できない",
        ],
        correct: 2,
        explanation: "最も度数が大きい階級（山）が2つある場合、二峰性の分布の可能性があります。"
    },
    {
        id: 6,
        question: "度数分布表から正確な最大値はわかりますか。",
        options: [
            "わかる",
            "わからない（最大値を含む階級はわかる）",
            "必ず階級値",
            "判断できない",
        ],
        correct: 2,
        explanation: "度数分布表では、最大値がどの階級に含まれるかはわかりますが、正確な値はわかりません。"
    },
    {
        id: 7,
        question: "度数分布表から正確な中央値はわかりますか。",
        options: [
            "わかる",
            "おおよその位置は推定できるが正確にはわからない",
            "必ず階級値",
            "判断できない",
        ],
        correct: 2,
        explanation: "累積度数から中央値のおおよその位置（階級）は推定できますが、正確な値は元のデータが必要です。"
    },
    {
        id: 8,
        question: "度数分布表で、度数が0の階級があるとき、どう解釈しますか。",
        options: [
            "エラー",
            "その範囲にデータがない",
            "必ず削除する",
            "判断できない",
        ],
        correct: 2,
        explanation: "度数が0の階級は、その範囲にデータが1つもないことを示します。"
    },
    {
        id: 9,
        question: "度数分布表を作ると失われる情報は何ですか。",
        options: [
            "何も失われない",
            "個々のデータの正確な値",
            "平均値",
            "度数",
        ],
        correct: 2,
        explanation: "階級にまとめることで、個々のデータの正確な値の情報は失われます。"
    },
    {
        id: 10,
        question: "度数分布表で、階級幅が異なる場合、ヒストグラムを描くときに注意すべきことは何ですか。",
        options: [
            "何もない",
            "柱の高さを度数密度（度数÷階級幅）にする",
            "必ず描けない",
            "判断できない",
        ],
        correct: 2,
        explanation: "階級幅が異なる場合、柱の高さを度数ではなく度数密度（度数÷階級幅）にしないと、誤解を招きます。"
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
    examId: 'grade4-section3_frequencytable_3',
    examTitle: '4級 Section3_FrequencyTable_3',
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
