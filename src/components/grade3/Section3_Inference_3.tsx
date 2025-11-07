import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section3Inference3() {
  const questions: Question[] = [
    {
      id: 1,
      question: "次のデータセットについて、偏差値60の人の素点を求めてください。\n\n平均値: 50点\n標準偏差: 10点",
      options: ["55点", "60点", "65点", "70点"],
      correct: 2,
      explanation: "偏差値 = 50 + 10 × (素点 - 平均値) ÷ 標準偏差。60 = 50 + 10 × (x - 50) ÷ 10 より、10 = (x - 50)、したがって x = 60点 です。"
    },
    {
      id: 2,
      question: "ある試験で、平均点が65点、標準偏差が8点でした。72点の人の偏差値はいくらですか。",
      options: ["約58.75", "約60.0", "約58.25", "約61.25"],
      correct: 1,
      explanation: "偏差値 = 50 + 10 × (72 - 65) ÷ 8 = 50 + 10 × 7 ÷ 8 = 50 + 8.75 = 58.75 です。"
    },
    {
      id: 3,
      question: "次のデータの箱ひげ図を描く際に必要な5数要約について、正しい記述を選んでください。\n\nデータ（昇順）: 2, 5, 7, 10, 12, 15, 18, 20, 25",
      options: [
        "最小値=2、Q1=6、Q2=12、Q3=19、最大値=25",
        "最小値=2、Q1=7、Q2=12、Q3=18、最大値=25",
        "最小値=2、Q1=5、Q2=12、Q3=20、最大値=25",
        "最小値=2、Q1=7、Q2=10、Q3=20、最大値=25"
      ],
      correct: 2,
      explanation: "9個のデータなので、Q2（中央値）は5番目の12です。Q1は下半分（2,5,7,10）の中央値なので(5+7)÷2=6、ではなく中央2つの間なので7、Q3は上半分（15,18,20,25）の中央値で(18+20)÷2=19、ではなく18です。正しい計算ではQ1=7、Q3=18です。"
    },
    {
      id: 4,
      question: "あるデータセットについて、すべての値を2倍してから5を足すデータ変換を行いました。\n\n元のデータ: 平均値=20、標準偏差=4\n\n変換後のデータの平均値と標準偏差はいくらですか。",
      options: [
        "平均値=45、標準偏差=8",
        "平均値=40、標準偏差=13",
        "平均値=45、標準偏差=13",
        "平均値=40、標準偏差=8"
      ],
      correct: 1,
      explanation: "y = 2x + 5 の変換では、平均値は 2×20+5=45、標準偏差は定数項の影響を受けないので 2×4=8 です。"
    },
    {
      id: 5,
      question: "2つのグループの箱ひげ図を比較したところ、以下のことがわかりました。\n\nグループA: Q1=30、Q2=50、Q3=70、IQR=40\nグループB: Q1=40、Q2=50、Q3=60、IQR=20\n\n正しい記述を選んでください。",
      options: [
        "グループAの方がばらつきが大きい",
        "グループBの方がばらつきが大きい",
        "両グループのばらつきは同じ",
        "中央値が同じなので比較できない"
      ],
      correct: 1,
      explanation: "四分位範囲（IQR）が大きいほど、データのばらつきが大きいです。グループAのIQR（40）の方が大きいので、Aの方がばらつきが大きいです。"
    },
    {
      id: 6,
      question: "次のうち、外れ値の影響を最も受けにくい統計量はどれですか。",
      options: [
        "平均値",
        "範囲（レンジ）",
        "標準偏差",
        "四分位範囲"
      ],
      correct: 4,
      explanation: "四分位範囲（IQR）は中央50%のデータのみを使うため、外れ値の影響をほとんど受けません。平均値、範囲、標準偏差はいずれも外れ値の影響を受けやすいです。"
    },
    {
      id: 7,
      question: "次のデータについて、標準偏差を2倍した場合、分散は何倍になりますか。",
      options: ["1倍（変わらない）", "2倍", "4倍", "8倍"],
      correct: 3,
      explanation: "標準偏差をk倍すると、分散はk²倍になります。標準偏差を2倍すると、分散は2²=4倍になります。"
    },
    {
      id: 8,
      question: "ある会社の社員の年収について、変動係数が0.25でした。平均年収が400万円の場合、標準偏差はいくらですか。",
      options: ["50万円", "75万円", "100万円", "125万円"],
      correct: 3,
      explanation: "変動係数 = 標準偏差 ÷ 平均値 なので、0.25 = 標準偏差 ÷ 400、したがって標準偏差 = 0.25 × 400 = 100万円 です。"
    },
    {
      id: 9,
      question: "次のデータの範囲（レンジ）と四分位範囲（IQR）の関係について、正しい記述を選んでください。\n\nデータ（昇順）: 5, 10, 15, 20, 25, 30, 35",
      options: [
        "範囲 = IQR",
        "範囲 < IQR",
        "範囲 > IQR",
        "比較できない"
      ],
      correct: 3,
      explanation: "範囲=35-5=30、Q1=10、Q3=30、IQR=30-10=20。範囲（30）>IQR（20）です。一般に、外れ値がない限り範囲≧IQRとなります。"
    },
    {
      id: 10,
      question: "分散と標準偏差について、正しい記述を選んでください。\n\nI. 分散は平均からの偏差の二乗の平均である\nII. 標準偏差は元のデータと同じ単位を持つ\nIII. 標準偏差は常に非負である",
      options: [
        "IとIIのみ",
        "IとIIIのみ",
        "IIとIIIのみ",
        "すべて正しい"
      ],
      correct: 4,
      explanation: "すべて正しいです。I. 分散の定義。II. 標準偏差=√分散なので元のデータと同じ単位。III. 分散は非負なので、その平方根である標準偏差も非負です。"
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
    examId: 'grade3-section3_inference_3',
    examTitle: '3級 Section3_Inference_3',
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
