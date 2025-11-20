import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section3_Transformation_1() {
  const questions: Question[] = [
    {
      id: 1,
      question: "あるテストの平均点が60点、標準偏差が10点です。すべての生徒の点数に5点を加えた場合、新しい平均点と標準偏差はいくつですか。",
      options: [
        "平均点65点、標準偏差10点",
        "平均点60点、標準偏差15点",
        "平均点65点、標準偏差15点",
        "平均点60点、標準偏差10点"
      ],
      correct: 1,
      explanation: "すべてのデータに定数cを加えると、平均値もc増加しますが、標準偏差は変わりません。平均=60+5=65点、標準偏差=10点です。"
    },
    {
      id: 2,
      question: "データの平均が50、標準偏差が8です。すべてのデータを2倍にした場合、新しい平均と標準偏差はいくつですか。",
      options: [
        "平均100、標準偏差8",
        "平均50、標準偏差16",
        "平均100、標準偏差16",
        "平均100、標準偏差4"
      ],
      correct: 3,
      explanation: "すべてのデータをa倍すると、平均値もa倍、標準偏差もa倍になります。平均=50×2=100、標準偏差=8×2=16です。"
    },
    {
      id: 3,
      question: "テストの点数（100点満点）の平均が70点、標準偏差が15点です。ある生徒が80点を取りました。この生徒の偏差値はいくつですか。",
      options: ["約53", "約57", "約60", "約67"],
      correct: 2,
      explanation: "偏差値 = 10 × (得点 - 平均) / 標準偏差 + 50 = 10 × (80 - 70) / 15 + 50 = 10 × 10/15 + 50 = 6.67 + 50 = 56.67 ≒ 57です。"
    },
    {
      id: 4,
      question: "データセット {10, 20, 30, 40, 50} の平均は30、標準偏差は約14.14です。すべてのデータを「3倍して10を加える」変換を行った場合、新しい平均はいくつですか。",
      options: ["40", "100", "110", "120"],
      correct: 2,
      explanation: "Y = 3X + 10 の変換では、平均も同様に変換されます。新しい平均 = 3×30 + 10 = 90 + 10 = 100です。"
    },
    {
      id: 5,
      question: "データの1次変換 Y = 2X - 10 を行ったとき、元のデータの標準偏差が5の場合、変換後のデータの標準偏差はいくつですか。",
      options: ["0", "5", "10", "15"],
      correct: 3,
      explanation: "Y = aX + b の変換では、標準偏差は|a|倍になります。定数項bは標準偏差に影響しません。標準偏差 = |2| × 5 = 10です。"
    },
    {
      id: 6,
      question: "ある試験で平均点60点、標準偏差10点のクラスがあります。Aさんは70点を取りました。この試験を「すべての点数を1.5倍にして調整する」場合、Aさんの偏差値はどうなりますか。",
      options: [
        "低くなる",
        "高くなる",
        "変わらない",
        "判断できない"
      ],
      correct: 3,
      explanation: "偏差値は標準化された値なので、すべてのデータを同じ比率で変換（定数倍）しても変わりません。Aさんの偏差値は変わりません。"
    },
    {
      id: 7,
      question: "データの平均が100、分散が25です。すべてのデータから20を引いた場合、新しい平均と分散はいくつですか。",
      options: [
        "平均80、分散25",
        "平均100、分散5",
        "平均80、分散5",
        "平均80、分散20"
      ],
      correct: 1,
      explanation: "すべてのデータから定数cを引くと、平均値もc減少しますが、分散（および標準偏差）は変わりません。平均=100-20=80、分散=25です。"
    },
    {
      id: 8,
      question: "データセット {2, 4, 6, 8, 10} があります。平均は6、標準偏差は約2.83です。このデータを標準化（z得点化）した場合、元の値8はいくつになりますか。",
      options: ["約-0.71", "約0.71", "約1.41", "約2.83"],
      correct: 2,
      explanation: "標準化：z = (X - 平均) / 標準偏差 = (8 - 6) / 2.83 = 2 / 2.83 ≒ 0.71です。"
    },
    {
      id: 9,
      question: "データを Y = -X + 100 で変換した場合、元のデータの標準偏差が12のとき、変換後の標準偏差はいくつですか。",
      options: ["0", "12", "88", "112"],
      correct: 2,
      explanation: "Y = aX + b の変換では、標準偏差は|a|倍になります。a = -1なので、標準偏差 = |-1| × 12 = 12です。符号は影響しません。"
    },
    {
      id: 10,
      question: "データセットの平均が80、標準偏差が10です。このデータを「2倍にして20を加える」変換を行った場合、新しい平均と標準偏差の組み合わせとして正しいものはどれですか。",
      options: [
        "平均180、標準偏差10",
        "平均180、標準偏差20",
        "平均160、標準偏差20",
        "平均160、標準偏差30"
      ],
      correct: 2,
      explanation: "Y = 2X + 20 の変換では、平均 = 2×80 + 20 = 180、標準偏差 = |2| × 10 = 20となります。"
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
    examId: 'grade3-section3_transformation_1',
    examTitle: '3級 - Section3: データの変換と統計量 (1/2)',
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

  // 問題が空の場合
  if (questions.length === 0) {
    return (
      <ExamLayout
        title="3級 - Section3: データの変換と統計量 (1/2)"
        backLink="/"
        bestScore={bestScore}
      >
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">📝 問題データがまだ作成されていません</p>
          <p className="text-gray-500 mb-2">このセクションの問題は、AI問題生成機能で作成できます。</p>
          <p className="text-sm text-gray-400">
            ホーム画面の「AI問題生成モード」から、このセクションを選択して問題を生成してください。
          </p>
        </div>
      </ExamLayout>
    );
  }

  return (
    <ExamLayout
      title="3級 - Section3: データの変換と統計量 (1/2)"
      backLink="/"
      bestScore={bestScore}
    >
      <QuestionCard
        question={currentQuestion}
        questionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        userAnswer={answers[currentQuestion?.id]}
        onAnswer={handleAnswer}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
      />
    </ExamLayout>
  );
}
