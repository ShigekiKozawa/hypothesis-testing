import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section4Regression2() {
  const questions: Question[] = [
    {
      id: 1,
      question: "次の2つのクラスの箱ひげ図を比較してください。\n\nクラスA: 最小値=40、Q1=55、Q2=65、Q3=75、最大値=90\nクラスB: 最小値=50、Q1=60、Q2=65、Q3=70、最大値=80\n\n正しい記述を選んでください。",
      options: [
        "クラスAの方が点数のばらつきが大きい",
        "クラスBの方が点数のばらつきが大きい",
        "両クラスのばらつきは同じ",
        "中央値が同じなので比較できない"
      ],
      correct: 1,
      explanation: "四分位範囲で比較します。A: IQR=75-55=20、B: IQR=70-60=10。クラスAの方がばらつきが大きいです。"
    },
    {
      id: 2,
      question: "下のヒストグラムで、相対度数が最も大きい階級を選んでください。",
      options: [
        "0〜10点",
        "10〜20点",
        "20〜30点",
        "30〜40点"
      ],
      correct: 3,
      explanation: "相対度数は度数÷全体です。20〜30点の相対度数は 20÷50=0.4 で最も大きいです。",
      chartType: 'bar',
      barData: [
        { name: '0-10', value: 5 },
        { name: '10-20', value: 10 },
        { name: '20-30', value: 20 },
        { name: '30-40', value: 10 },
        { name: '40-50', value: 5 }
      ],
      chartLabels: { x: '点数', y: '度数（人）' }
    },
    {
      id: 3,
      question: "次の箱ひげ図について、箱の長さ（IQR）を求めてください。\n\nQ1=30、Q2=45、Q3=60",
      options: ["15", "30", "45", "60"],
      correct: 2,
      explanation: "箱の長さ = 四分位範囲（IQR）= Q3 - Q1 = 60 - 30 = 30 です。"
    },
    {
      id: 4,
      question: "下のヒストグラムの分布の形状について、正しい記述を選んでください。",
      options: [
        "左に偏っている（平均値 < 中央値）",
        "右に偏っている（平均値 > 中央値）",
        "ほぼ対称である",
        "判断できない"
      ],
      correct: 3,
      explanation: "このヒストグラムはほぼ左右対称の釣鐘型（正規分布に近い形）をしています。平均値と中央値はほぼ等しくなります。",
      chartType: 'bar',
      barData: [
        { name: '0-10', value: 1 },
        { name: '10-20', value: 2 },
        { name: '20-30', value: 5 },
        { name: '30-40', value: 10 },
        { name: '40-50', value: 8 },
        { name: '50-60', value: 3 },
        { name: '60-70', value: 1 }
      ],
      chartLabels: { x: '点数', y: '度数（人）' }
    },
    {
      id: 5,
      question: "箱ひげ図で、外れ値として表示される点がある場合、その点は何を意味しますか。",
      options: [
        "平均値",
        "中央値",
        "他のデータから大きく離れた値",
        "最頻値"
      ],
      correct: 3,
      explanation: "箱ひげ図で点として表示される外れ値は、Q1 - 1.5×IQR より小さい、またはQ3 + 1.5×IQR より大きい値で、他のデータから大きく外れた値を示します。"
    },
    {
      id: 6,
      question: "下のヒストグラムから、平均値が含まれる階級を推定してください。",
      options: [
        "20〜30点",
        "30〜40点",
        "40〜50点",
        "50〜60点"
      ],
      correct: 2,
      explanation: "階級値を使って平均値を計算すると、(15×2 + 25×5 + 35×8 + 45×4 + 55×1) ÷ 20 = (30+125+280+180+55) ÷ 20 = 670 ÷ 20 = 33.5点 となり、30〜40点の階級に含まれます。",
      chartType: 'bar',
      barData: [
        { name: '10-20', value: 2 },
        { name: '20-30', value: 5 },
        { name: '30-40', value: 8 },
        { name: '40-50', value: 4 },
        { name: '50-60', value: 1 }
      ],
      chartLabels: { x: '点数', y: '度数（人）' }
    },
    {
      id: 7,
      question: "2つのヒストグラムを見比べたとき、分布の形状が異なることがわかりました。\n\nヒストグラムA: 左側に裾が長い\nヒストグラムB: 右側に裾が長い\n\n正しい記述を選んでください。",
      options: [
        "Aは平均値 > 中央値、Bは平均値 < 中央値",
        "Aは平均値 < 中央値、Bは平均値 > 中央値",
        "両方とも平均値 = 中央値",
        "判断できない"
      ],
      correct: 2,
      explanation: "左側に裾が長い（左に偏っている）場合は平均値 < 中央値、右側に裾が長い（右に偏っている）場合は平均値 > 中央値となります。"
    },
    {
      id: 8,
      question: "次の箱ひげ図から、データの範囲（レンジ）を求めてください。\n\n最小値=10、Q1=25、Q2=40、Q3=55、最大値=70",
      options: ["30", "40", "60", "70"],
      correct: 3,
      explanation: "範囲（レンジ）= 最大値 - 最小値 = 70 - 10 = 60 です。"
    },
    {
      id: 9,
      question: "次のヒストグラムについて、第3四分位数（Q3）が含まれる階級を推定してください。\n\n【データ: 全40人】\n0〜10点: 5人（累積5人）\n10〜20点: 8人（累積13人）\n20〜30点: 12人（累積25人）\n30〜40点: 10人（累積35人）\n40〜50点: 5人（累積40人）",
      options: [
        "20〜30点",
        "30〜40点",
        "40〜50点",
        "判断できない"
      ],
      correct: 2,
      explanation: "Q3は上位25%の境界、つまり全体の75%の位置です。40人の75%は30番目。累積度数を見ると、30番目は30〜40点の階級に含まれます（25人までで終わり、35人までで次の階級）。"
    },
    {
      id: 10,
      question: "箱ひげ図とヒストグラムを組み合わせて使う利点は何ですか。",
      options: [
        "箱ひげ図で5数要約を把握し、ヒストグラムで詳細な分布の形状を把握できる",
        "両方とも平均値を表示できる",
        "箱ひげ図だけで十分なので利点はない",
        "ヒストグラムだけで十分なので利点はない"
      ],
      correct: 1,
      explanation: "箱ひげ図は5数要約と外れ値を簡潔に示し、ヒストグラムは度数分布の詳細な形状を示すため、組み合わせることでデータの特徴を多角的に把握できます。"
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
    examId: 'grade3-section4_regression_2',
    examTitle: '3級 Section4_Regression_2',
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
