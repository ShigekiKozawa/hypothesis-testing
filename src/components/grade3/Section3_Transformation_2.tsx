import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section3_Transformation_2() {
  const questions: Question[] = [
    {
      id: 1,
      question: "データXの平均が40、標準偏差が6です。Y = 3X + 5 と変換したときのYの平均と標準偏差はいくつですか。",
      options: [
        "平均125、標準偏差18",
        "平均125、標準偏差6",
        "平均45、標準偏差18",
        "平均45、標準偏差6"
      ],
      correct: 1,
      explanation: "1次変換では平均は aμ + b、標準偏差は |a|σ。a=3, b=5 より平均=3×40+5=125、標準偏差=3×6=18。"
    },
    {
      id: 2,
      question: "あるテストで平均65、標準偏差8のとき、81点の偏差値はいくつですか。（偏差値=10×(x−平均)/標準偏差+50）",
      options: ["60", "65", "70", "80"],
      correct: 3,
      explanation: "偏差値=10×(81−65)/8+50=10×2+50=70。"
    },
    {
      id: 3,
      question: "ある製品の測定で平均120、標準偏差15、観測値105のとき、標準化した値（z値）はいくつですか。",
      options: ["-2", "-1", "-0.5", "1"],
      correct: 2,
      explanation: "z=(105−120)/15=−1。"
    },
    {
      id: 4,
      question: "平均70、標準偏差7のデータXで観測値84が得られました。Y=2X と変換したときのYの標準化得点（z値）はいくつですか。",
      options: ["-2", "-1", "0", "2"],
      correct: 4,
      explanation: "Xのzは(84−70)/7=2。Yの平均140、標準偏差14、Y=168より(168−140)/14=2。"
    },
    {
      id: 5,
      question: "ある製造ラインで平均360、標準偏差18のとき、変動係数はいくつですか。",
      options: ["3%", "5%", "10%", "20%"],
      correct: 2,
      explanation: "CV=(18/360)×100=5%。"
    },
    {
      id: 6,
      question: "2つのグループのばらつきを相対的に比較します。どちらの変動係数が大きいですか。\n\nA: 平均80、標準偏差12\nB: 平均60、標準偏差10",
      options: [
        "Aの方が大きい",
        "Bの方が大きい",
        "同じ",
        "判断できない"
      ],
      correct: 2,
      explanation: "A:12/80=15%、B:10/60≈16.7%。Bが大きい。"
    },
    {
      id: 7,
      question: "平均が0、標準偏差が5のデータの変動係数はどうなりますか。",
      options: ["定義できない", "0%", "100%", "5%"],
      correct: 1,
      explanation: "CV=標準偏差/平均。平均が0のため定義できない。"
    },
    {
      id: 8,
      question: "平均100、標準偏差15のデータに一様に20を加えたとき、変動係数はどうなりますか。",
      options: [
        "15%のまま",
        "12.5%に減少",
        "18%に増加",
        "判断できない"
      ],
      correct: 2,
      explanation: "元CV=15/100=15%。加算後は平均120、標準偏差15で12.5%。"
    },
    {
      id: 9,
      question: "平均40、標準偏差8のデータをすべて2倍にしたとき、変動係数はどうなりますか。",
      options: [
        "20%のまま",
        "10%に減少",
        "30%に増加",
        "計算不能"
      ],
      correct: 1,
      explanation: "CV=σ/μ。定数倍では分子・分母とも同倍率で変化するため不変（8/40=20%）。"
    },
    {
      id: 10,
      question: "2つの科目でどちらが上位に位置するかを標準化で比較します。\n\n数学: 平均70、標準偏差8、得点86\n英語: 平均60、標準偏差12、得点78",
      options: [
        "数学の方が上位",
        "英語の方が上位",
        "同じ",
        "判断できない"
      ],
      correct: 1,
      explanation: "数学z=(86−70)/8=2.0、英語z=(78−60)/12=1.5。数学の方が上位。"
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
    examId: 'grade3-section3_transformation_2',
    examTitle: '3級 - Section3: データの変換と統計量 (2/2)',
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
        title="3級 - Section3: データの変換と統計量 (2/2)"
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
      title="3級 - Section3: データの変換と統計量 (2/2)"
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
