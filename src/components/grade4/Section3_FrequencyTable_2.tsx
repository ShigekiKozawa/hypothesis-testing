import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section3FrequencyTable2() {
  const questions: Question[] = [
    {
        id: 1,
        question: "相対度数とは何ですか。",
        options: [
            "データの個数",
            "各階級の度数を全体に対する割合で表したもの",
            "平均値",
            "範囲",
        ],
        correct: 2,
        explanation: "相対度数は、各階級の度数をデータの総数で割った値（割合）です。"
    },
    {
        id: 2,
        question: "相対度数の合計はいくらになりますか。",
        options: [
            "0",
            "1（または100%）",
            "データ総数",
            "平均値",
        ],
        correct: 2,
        explanation: "全ての階級の相対度数を合計すると1（または100%）になります。"
    },
    {
        id: 3,
        question: "相対度数を使う利点は何ですか。",
        options: [
            "計算が簡単",
            "データ数が異なるグループを比較しやすい",
            "必ず正確",
            "何もない",
        ],
        correct: 2,
        explanation: "相対度数（割合）を使うと、データ数が異なるグループでも分布を比較しやすくなります。"
    },
    {
        id: 4,
        question: "累積度数とは何ですか。",
        options: [
            "1つの階級の度数",
            "ある階級までの度数を順に合計したもの",
            "平均値",
            "範囲",
        ],
        correct: 2,
        explanation: "累積度数は、最初の階級から順に度数を足していった合計です。"
    },
    {
        id: 5,
        question: "累積相対度数とは何ですか。",
        options: [
            "度数",
            "ある階級までの相対度数を順に合計したもの",
            "平均値",
            "範囲",
        ],
        correct: 2,
        explanation: "累積相対度数は、最初の階級から順に相対度数を足していった合計です。"
    },
    {
        id: 6,
        question: "累積相対度数の最後の階級の値はいくらになりますか。",
        options: [
            "0",
            "1（または100%）",
            "平均値",
            "判断できない",
        ],
        correct: 2,
        explanation: "最後の階級の累積相対度数は1（または100%）になります。"
    },
    {
        id: 7,
        question: "累積度数から中央値を推定するには、どうしますか。",
        options: [
            "最大の累積度数を見る",
            "累積度数がデータ総数の半分（50%）になる階級を探す",
            "最小の累積度数を見る",
            "計算できない",
        ],
        correct: 2,
        explanation: "累積度数または累積相対度数が50%になる位置が、中央値のおおよその位置です。"
    },
    {
        id: 8,
        question: "度数分布表で「以上、未満」の境界を明確にする理由は何ですか。",
        options: [
            "見やすくする",
            "どの階級に含めるかを明確にするため",
            "必ず「以上」にする",
            "何もない",
        ],
        correct: 2,
        explanation: "例えば10点ちょうどの人を「0〜10点未満」か「10〜20点未満」のどちらに含めるか、ルールを明確にする必要があります。"
    },
    {
        id: 9,
        question: "ヒストグラムと度数分布表の関係はどれですか。",
        options: [
            "全く無関係",
            "度数分布表をグラフ化したものがヒストグラム",
            "必ずヒストグラムの方が良い",
            "判断できない",
        ],
        correct: 2,
        explanation: "ヒストグラムは、度数分布表のデータを柱状グラフで視覚化したものです。"
    },
    {
        id: 10,
        question: "度数分布表で階級数を決めるとき、どう考えますか。",
        options: [
            "必ず5個",
            "データ数に応じて適切に決める（多すぎても少なすぎても不適切）",
            "必ず100個",
            "適当に決める",
        ],
        correct: 2,
        explanation: "階級数は、データ数に応じて適切に決めます。多すぎると細かすぎて、少なすぎると粗すぎて特徴が見えません。"
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
    examId: 'grade4-section3_frequencytable_2',
    examTitle: '4級 Section3_FrequencyTable_2',
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
