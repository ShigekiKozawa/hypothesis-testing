import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section10Applied1() {
  const questions: Question[] = [
    {
        id: 1,
        question: "標本平均とは何ですか。",
        options: [
            "母集団全体の平均",
            "標本のデータの平均",
            "最大値と最小値の平均",
            "中央値"
        ],
        correct: 2,
        explanation: "標本平均は、標本として選ばれたデータの平均値です。"
    },
    {
        id: 2,
        question: "標本平均の期待値E(X̄)は、母平均μとどういう関係ですか。",
        options: [
            "E(X̄) < μ",
            "E(X̄) = μ",
            "E(X̄) > μ",
            "E(X̄) = 2μ"
        ],
        correct: 2,
        explanation: "標本平均の期待値は母平均と等しくなります：E(X̄) = μ"
    },
    {
        id: 3,
        question: "標本サイズをnとするとき、標本平均の分散V(X̄)は母分散σ²とどういう関係ですか。",
        options: [
            "V(X̄) = σ²",
            "V(X̄) = σ²/n",
            "V(X̄) = nσ²",
            "V(X̄) = σ"
        ],
        correct: 2,
        explanation: "標本平均の分散は、母分散を標本サイズで割った値になります：V(X̄) = σ²/n"
    },
    {
        id: 4,
        question: "標本サイズを大きくすると、標本平均のばらつきはどうなりますか。",
        options: [
            "大きくなる",
            "小さくなる",
            "変わらない",
            "2倍になる"
        ],
        correct: 2,
        explanation: "標本サイズを大きくすると、標本平均の分散σ²/nが小さくなり、ばらつきが小さくなります。"
    },
    {
        id: 5,
        question: "中心極限定理とは何ですか。",
        options: [
            "母集団が正規分布なら標本も正規分布",
            "標本サイズが大きければ、標本平均の分布は正規分布に近づく",
            "平均値は常に中央値に等しい",
            "全てのデータは正規分布に従う"
        ],
        correct: 2,
        explanation: "中心極限定理は、母集団の分布によらず、標本サイズが十分大きければ標本平均の分布が正規分布に近づくという定理です。"
    },
    {
        id: 6,
        question: "中心極限定理が成り立つために、標本サイズはおおよそいくら以上必要ですか。",
        options: [
            "n ≥ 5",
            "n ≥ 10",
            "n ≥ 30",
            "n ≥ 100"
        ],
        correct: 3,
        explanation: "一般的には、標本サイズn≥30程度あれば中心極限定理が十分に成り立つとされています。"
    },
    {
        id: 7,
        question: "母集団が正規分布でない場合、標本平均の分布はどうなりますか。",
        options: [
            "常に正規分布にならない",
            "標本サイズが大きければ正規分布に近づく",
            "母集団と同じ分布",
            "一様分布"
        ],
        correct: 2,
        explanation: "母集団が正規分布でなくても、標本サイズが大きければ中心極限定理により標本平均の分布は正規分布に近づきます。"
    },
    {
        id: 8,
        question: "標本平均の標準誤差とは何ですか。",
        options: [
            "標本平均の標準偏差（σ/√n）",
            "母集団の標準偏差",
            "標本の標準偏差",
            "最大値と最小値の差"
        ],
        correct: 1,
        explanation: "標本平均の標準誤差は、標本平均の標準偏差のことで、σ/√nで計算されます。"
    },
    {
        id: 9,
        question: "標本サイズを4倍にすると、標本平均の標準誤差はどうなりますか。",
        options: [
            "4倍になる",
            "2倍になる",
            "1/2になる",
            "1/4になる"
        ],
        correct: 3,
        explanation: "標準誤差 = σ/√n なので、nが4倍になると√nは2倍になり、標準誤差は1/2になります。"
    },
    {
        id: 10,
        question: "推測統計において、標本から母集団の特徴を推測する根拠となるのは何ですか。",
        options: [
            "標本平均は必ず母平均と等しい",
            "標本平均の分布が予測可能（正規分布に近い）",
            "全ての標本が同じ値になる",
            "母集団は常に正規分布"
        ],
        correct: 2,
        explanation: "中心極限定理により標本平均の分布が予測可能（正規分布に近い）なため、母集団の特徴を推測できます。"
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
    examId: 'grade3-section10_applied_1',
    examTitle: '3級 Section10_Applied_1',
    grade: '3級',
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
      title="📊 結果発表 🎉"
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
