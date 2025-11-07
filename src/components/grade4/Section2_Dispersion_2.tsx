import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section2Dispersion2() {
  const questions: Question[] = [
    {
        id: 1,
        question: "次のデータの平均値を計算してください。\n\nデータ: 5, 8, 10, 12, 15",
        options: [
            "8",
            "10",
            "12",
            "15"
        ],
        correct: 2,
        explanation: "平均値=(5+8+10+12+15)÷5=50÷5=10です。"
    },
    {
        id: 2,
        question: "次のデータの中央値（メジアン）を求めてください。\n\nデータ: 3, 7, 9, 12, 18",
        options: [
            "7",
            "9",
            "10",
            "12"
        ],
        correct: 2,
        explanation: "5個のデータを小さい順に並べた時の真ん中（3番目）の値は9です。"
    },
    {
        id: 3,
        question: "次のデータの最頻値（モード）を求めてください。\n\nデータ: 2, 3, 3, 5, 7, 7, 7, 9",
        options: [
            "3",
            "5",
            "7",
            "9"
        ],
        correct: 3,
        explanation: "最も多く出現する値は7（3回）です。"
    },
    {
        id: 4,
        question: "次のデータの中央値を求めてください。\n\nデータ: 4, 6, 10, 14",
        options: [
            "6",
            "8",
            "10",
            "12"
        ],
        correct: 2,
        explanation: "偶数個のデータの中央値は、真ん中の2つ（6と10）の平均で(6+10)÷2=8です。"
    },
    {
        id: 5,
        question: "平均値の説明として正しいものはどれですか。",
        options: [
            "最も多く出現する値",
            "データを小さい順に並べた時の真ん中の値",
            "すべてのデータの合計をデータ数で割った値",
            "最大値と最小値の差"
        ],
        correct: 3,
        explanation: "平均値は、すべてのデータの合計をデータ数で割った値です。"
    },
    {
        id: 6,
        question: "次のデータで、平均値、中央値、最頻値がすべて同じ値になるのはどれですか。",
        options: [
            "1, 2, 3, 4, 5",
            "2, 2, 3, 4, 5",
            "3, 3, 3, 3, 3",
            "1, 3, 5, 7, 9"
        ],
        correct: 3,
        explanation: "すべて同じ値3のとき、平均値=中央値=最頻値=3になります。"
    },
    {
        id: 7,
        question: "次の度数分布表から平均値を推定してください。（階級値を使用）\n\n【点数（10人）】\n0~10点: 2人（階級値5）\n10~20点: 5人（階級値15）\n20~30点: 3人（階級値25）",
        options: [
            "13点",
            "15点",
            "17点",
            "20点"
        ],
        correct: 2,
        explanation: "平均値=(5×2+15×5+25×3)÷10=(10+75+75)÷10=160÷10=16点です。選択肢から最も近い15点を選びます。"
    },
    {
        id: 8,
        question: "外れ値があるとき、影響を受けにくい代表値はどれですか。",
        options: [
            "平均値",
            "中央値",
            "最大値",
            "範囲"
        ],
        correct: 2,
        explanation: "中央値は順序に基づくため、極端な値（外れ値）の影響を受けにくいです。"
    },
    {
        id: 9,
        question: "次のデータの中央値を求めてください。\n\nデータ: 12, 8, 15, 10, 20, 6, 18",
        options: [
            "10",
            "12",
            "15",
            "18"
        ],
        correct: 2,
        explanation: "小さい順に並べると6, 8, 10, 12, 15, 18, 20。7個なので真ん中（4番目）は12です。"
    },
    {
        id: 10,
        question: "10人のテストの平均点が70点でした。そのうち1人が80点だったことが分かっています。残り9人の平均点はいくらですか。",
        options: [
            "65点",
            "68.9点",
            "70点",
            "72点"
        ],
        correct: 2,
        explanation: "全体の合計=70×10=700点。残り9人の合計=700-80=620点。平均=620÷9≒68.9点です。"
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
    examId: 'grade4-section2_dispersion_2',
    examTitle: '4級 Section2_Dispersion_2',
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
