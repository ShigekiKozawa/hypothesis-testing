import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section3Inference1() {
  const questions: Question[] = [
    {
      id: 1,
      question: "次のデータの範囲（レンジ）を求めてください。\n\nデータ: 12, 18, 25, 30, 45",
      options: ["18", "25", "30", "33"],
      correct: 4,
      explanation: "範囲（レンジ）= 最大値 - 最小値 = 45 - 12 = 33 です。"
    },
    {
      id: 2,
      question: "次のデータから、第1四分位数（Q1）、中央値（Q2）、第3四分位数（Q3）を求めてください。\n\nデータ（昇順）: 10, 15, 20, 25, 30, 35, 40\n\nQ1、Q2、Q3の組み合わせはどれですか。",
      options: [
        "Q1=15, Q2=25, Q3=35",
        "Q1=12.5, Q2=25, Q3=37.5",
        "Q1=15, Q2=20, Q3=35",
        "Q1=10, Q2=25, Q3=40"
      ],
      correct: 1,
      explanation: "7個のデータなので、Q2（中央値）は4番目の25です。Q1は下半分（10,15,20）の中央値で15、Q3は上半分（30,35,40）の中央値で35です。"
    },
    {
      id: 3,
      question: "四分位範囲（IQR）について、正しい記述を選んでください。",
      options: [
        "IQR = Q3 - Q1",
        "IQR = Q3 + Q1",
        "IQR = 最大値 - 最小値",
        "IQR = Q2 - Q1"
      ],
      correct: 1,
      explanation: "四分位範囲（IQR）= Q3 - Q1 です。データの中央50%が含まれる範囲を表します。"
    },
    {
      id: 4,
      question: "次のデータについて、標準偏差を求めてください。\n\nデータ: 4, 6, 8, 10, 12\n平均値: 8\n分散: 8",
      options: [
        "約2.0",
        "約2.8",
        "約3.2",
        "約4.0"
      ],
      correct: 2,
      explanation: "標準偏差 = √分散 = √8 ≈ 2.83 です。最も近い選択肢は 約2.8 です。"
    },
    {
      id: 5,
      question: "2つのグループA、Bについて、データのばらつきを比較したい。平均値と標準偏差は以下の通りです。\n\nグループA: 平均60点、標準偏差10点\nグループB: 平均80点、標準偏差12点\n\n変動係数を用いて比較する場合、正しい記述はどれですか。",
      options: [
        "AとBのばらつきは同じ",
        "Aの方が相対的なばらつきが大きい",
        "Bの方が相対的なばらつきが大きい",
        "変動係数では比較できない"
      ],
      correct: 2,
      explanation: "変動係数 = 標準偏差 ÷ 平均値。A: 10÷60≈0.167、B: 12÷80=0.15。変動係数はAの方が大きいので、平均値に対する相対的なばらつきはAの方が大きいです。"
    },
    {
      id: 6,
      question: "外れ値を検出する方法として、四分位範囲を使う場合の一般的な基準はどれですか。",
      options: [
        "Q1 - 1.5×IQR より小さい、またはQ3 + 1.5×IQR より大きい",
        "Q1 - IQR より小さい、またはQ3 + IQR より大きい",
        "平均値 ± 2×標準偏差 の外側",
        "最大値と最小値"
      ],
      correct: 1,
      explanation: "一般的に、Q1 - 1.5×IQR より小さい値、またはQ3 + 1.5×IQR より大きい値を外れ値とみなします。これは箱ひげ図でもよく使われる基準です。"
    },
    {
      id: 7,
      question: "次のデータセットについて、範囲（レンジ）と四分位範囲（IQR）を比較してください。\n\nデータ: 5, 10, 12, 14, 15, 16, 18, 20, 100\n\nI. 範囲は外れ値（100）の影響を受けやすい\nII. 四分位範囲は外れ値の影響を受けにくい\nIII. 範囲の方が四分位範囲より大きい",
      options: [
        "IとIIのみ",
        "IとIIIのみ",
        "IIとIIIのみ",
        "すべて正しい"
      ],
      correct: 4,
      explanation: "すべて正しいです。I. 範囲=100-5=95で外れ値の影響大。II. IQR=Q3-Q1で外れ値の影響小。III. 範囲（95）>IQR（約8）です。"
    },
    {
      id: 8,
      question: "標準偏差の性質について、正しい記述を選んでください。\n\nI. すべてのデータに定数を加えても標準偏差は変わらない\nII. すべてのデータを2倍すると標準偏差も2倍になる\nIII. 標準偏差は分散の平方根である",
      options: [
        "IとIIのみ",
        "IとIIIのみ",
        "IIとIIIのみ",
        "すべて正しい"
      ],
      correct: 4,
      explanation: "すべて正しいです。I. データにbを加えても散らばりは変わらない。II. データをa倍すると標準偏差もa倍。III. 標準偏差=√分散の定義です。"
    },
    {
      id: 9,
      question: "次のテスト結果について、正しい記述を選んでください。\n\nクラスA: 平均70点、標準偏差5点\nクラスB: 平均70点、標準偏差15点",
      options: [
        "クラスAの方が点数のばらつきが大きい",
        "クラスBの方が点数のばらつきが大きい",
        "両クラスのばらつきは同じ",
        "平均が同じなので比較できない"
      ],
      correct: 2,
      explanation: "標準偏差が大きいほどばらつきが大きいです。クラスBの標準偏差（15点）の方が大きいので、Bの方が点数のばらつきが大きいです。"
    },
    {
      id: 10,
      question: "ある工場で製造される製品の重量を測定したところ、平均500g、標準偏差10gでした。別の製品は平均1000g、標準偏差15gでした。\n\nどちらの製品の方が、製造のばらつきが相対的に小さいと言えますか。",
      options: [
        "500gの製品（変動係数が小さい）",
        "1000gの製品（変動係数が小さい）",
        "両方同じ",
        "比較できない"
      ],
      correct: 2,
      explanation: "変動係数で比較します。500g製品: 10÷500=0.02、1000g製品: 15÷1000=0.015。1000g製品の方が変動係数が小さく、相対的なばらつきが小さいです。"
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
    examId: 'grade3-section3_inference_1',
    examTitle: '3級 Section3_Inference_1',
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
