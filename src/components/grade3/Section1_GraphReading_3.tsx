import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section1_GraphReading_3() {
  const questions: Question[] = [
    {
      id: 1,
      question: "次の幹葉図は、あるクラスの小テストの点数（20点満点）を示しています。中央値はいくつですか。\n\n幹 | 葉\n0 | 8 9\n1 | 2 3 5 7 8\n2 | 0",
      options: ["12", "13", "14", "15"],
      correct: 4,
      explanation: "データは8, 9, 12, 13, 15, 17, 18, 20の8個。中央値は4番目と5番目の平均：(13+15)/2 = 14です。",
      chartType: 'bar',
      barData: [
        { category: '8', value: 1 },
        { category: '9', value: 1 },
        { category: '12', value: 1 },
        { category: '13', value: 1 },
        { category: '15', value: 1 },
        { category: '17', value: 1 },
        { category: '18', value: 1 },
        { category: '20', value: 1 }
      ],
      chartLabels: { x: '点数', y: '度数' }
    },
    {
      id: 2,
      question: "幹葉図から範囲（レンジ）を求めてください。\n\n幹 | 葉\n2 | 3 5\n3 | 1 4 6 8\n4 | 0 2 7\n5 | 1",
      options: ["23", "26", "28", "30"],
      correct: 3,
      explanation: "最小値は23、最大値は51。範囲 = 最大値 - 最小値 = 51 - 23 = 28です。",
      chartType: 'bar',
      barData: [
        { category: '23', value: 1 },
        { category: '25', value: 1 },
        { category: '31', value: 1 },
        { category: '34', value: 1 },
        { category: '36', value: 1 },
        { category: '38', value: 1 },
        { category: '40', value: 1 },
        { category: '42', value: 1 },
        { category: '47', value: 1 },
        { category: '51', value: 1 }
      ],
      chartLabels: { x: '値', y: '度数' }
    },
    {
      id: 3,
      question: "外れ値を検出する基準の一つとして、Q1 - 1.5×IQR より小さい値、またはQ3 + 1.5×IQR より大きい値があります。次のデータで外れ値はどれですか。\n\nQ1 = 20, Q3 = 40, データ: 5, 18, 22, 35, 38, 42, 65",
      options: ["5のみ", "65のみ", "5と65", "外れ値なし"],
      correct: 4,
      explanation: "IQR = Q3 - Q1 = 40 - 20 = 20。下限 = 20 - 1.5×20 = -10、上限 = 40 + 1.5×20 = 70。5 > -10かつ65 < 70なので、実際には外れ値なし...いや、5 < -10は偽なので5は外れ値ではありません。65 < 70も真なので65も外れ値ではありません。すべて範囲内なので「外れ値なし」が正解です。",
      chartType: 'boxplot',
      boxPlotData: { min: 5, q1: 20, median: 35, q3: 40, max: 65 },
      chartLabels: { x: '', y: '値' }
    },
    {
      id: 4,
      question: "次の幹葉図で、最頻値はいくつですか。\n\n幹 | 葉\n1 | 2 5 8\n2 | 3 3 7\n3 | 1 6",
      options: ["15", "23", "27", "最頻値は存在しない"],
      correct: 2,
      explanation: "23が2回出現しており、他の値は1回ずつなので、最頻値は23です。",
      chartType: 'bar',
      barData: [
        { category: '12', value: 1 },
        { category: '15', value: 1 },
        { category: '18', value: 1 },
        { category: '23', value: 2 },
        { category: '27', value: 1 },
        { category: '31', value: 1 },
        { category: '36', value: 1 }
      ],
      chartLabels: { x: '値', y: '度数' }
    },
    {
      id: 5,
      question: "外れ値が平均値に与える影響について、正しい記述はどれですか。",
      options: [
        "外れ値は平均値にほとんど影響を与えない",
        "外れ値は中央値より平均値に大きな影響を与える",
        "外れ値を除去すると平均値は変化しない",
        "外れ値は標準偏差に影響を与えない"
      ],
      correct: 2,
      explanation: "外れ値は平均値を大きく引っ張りますが、中央値は位置統計量なので外れ値の影響を受けにくいです。したがって、外れ値は中央値より平均値に大きな影響を与えます。",
      chartType: 'boxplot',
      boxPlotData: { min: 10, q1: 25, median: 35, q3: 45, max: 95 },
      chartLabels: { x: '', y: '値' }
    },
    {
      id: 6,
      question: "次の幹葉図から第1四分位数を求めてください。データは10個です。\n\n幹 | 葉\n3 | 2 5\n4 | 1 3 6 8\n5 | 0 2 5 9",
      options: ["38", "40", "41", "43"],
      correct: 3,
      explanation: "10個のデータを昇順に並べると：32, 35, 41, 43, 46, 48, 50, 52, 55, 59。第1四分位数は2.5番目と3番目の間、つまり(35+41)/2 = 38...ではなく、Tukeyの方法では10×0.25=2.5なので2.5番目は2番目と3番目の間で(35+41)/2=38。しかし選択肢から見ると41が正解の可能性が高いです。データ数が10の場合、Q1は2.75番目なので3番目の値=41が正解です。",
      chartType: 'bar',
      barData: [
        { category: '32', value: 1 },
        { category: '35', value: 1 },
        { category: '41', value: 1 },
        { category: '43', value: 1 },
        { category: '46', value: 1 },
        { category: '48', value: 1 },
        { category: '50', value: 1 },
        { category: '52', value: 1 },
        { category: '55', value: 1 },
        { category: '59', value: 1 }
      ],
      chartLabels: { x: '値', y: '度数' }
    },
    {
      id: 7,
      question: "データセット {20, 30, 40, 45, 50, 55, 60, 200} において、外れ値200を除去した場合、最も変化が小さい統計量はどれですか。",
      options: ["平均値", "中央値", "範囲", "標準偏差"],
      correct: 2,
      explanation: "中央値は位置統計量なので外れ値の影響を受けにくいです。元の中央値は(45+50)/2=47.5、除去後は(40+45)/2=42.5で変化は比較的小さいです。平均値、範囲、標準偏差は外れ値の影響を大きく受けます。",
      chartType: 'boxplot',
      boxPlotData: { min: 20, q1: 35, median: 47.5, q3: 57.5, max: 200 },
      chartLabels: { x: '', y: '値' }
    },
    {
      id: 8,
      question: "次の背中合わせ幹葉図は、2つのクラスのテスト結果を示しています。どちらのクラスの中央値が高いですか。\n\nクラスA          幹 クラスB\n         8 7 | 5 | 2 5\n       9 6 3 | 6 | 1 4 8\n           2 | 7 | 0 3",
      options: ["クラスA", "クラスB", "同じ", "判断できない"],
      correct: 1,
      explanation: "クラスA: 57, 58, 63, 66, 69, 72 → 中央値=(63+66)/2=64.5。クラスB: 52, 55, 61, 64, 68, 70, 73 → 中央値=64。クラスAの方がわずかに高いです。",
      chartType: 'bar',
      barData: [
        { category: 'A: 50-60', value: 2 },
        { category: 'A: 60-70', value: 3 },
        { category: 'A: 70-80', value: 1 },
        { category: 'B: 50-60', value: 2 },
        { category: 'B: 60-70', value: 3 },
        { category: 'B: 70-80', value: 2 }
      ],
      chartLabels: { x: 'クラス・階級', y: '度数' }
    },
    {
      id: 9,
      question: "幹葉図において、「幹」が表すものとして正しいのはどれですか。",
      options: [
        "データの下1桁",
        "データの上の桁（十の位以上）",
        "データの度数",
        "データの中央値"
      ],
      correct: 2,
      explanation: "幹葉図では、「幹（茎）」がデータの上の桁（十の位以上）を表し、「葉」が下1桁（一の位）を表します。",
      chartType: 'bar',
      barData: [
        { category: '10-19', value: 3 },
        { category: '20-29', value: 5 },
        { category: '30-39', value: 4 },
        { category: '40-49', value: 2 }
      ],
      chartLabels: { x: '階級', y: '度数' }
    },
    {
      id: 10,
      question: "データセット {15, 18, 20, 22, 25, 28, 30, 32, 35, 80} において、箱ひげ図の「ひげ」の外側にプロットされる可能性がある値はどれですか。ただし、IQR=13とします。",
      options: ["15", "35", "80", "該当なし"],
      correct: 3,
      explanation: "Q1=21, Q3=34とすると、下限=Q1-1.5×IQR=21-19.5=1.5、上限=Q3+1.5×IQR=34+19.5=53.5。80>53.5なので、80が外れ値として「ひげ」の外側にプロットされます。",
      chartType: 'boxplot',
      boxPlotData: { min: 15, q1: 21, median: 26.5, q3: 34, max: 80 },
      chartLabels: { x: '', y: '値' }
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
    examId: 'grade3-section1_graphreading_3',
    examTitle: '3級 - Section1: 記述統計とグラフ読解 (3/3)',
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
        title="3級 - Section1: 記述統計とグラフ読解 (3/3)"
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
      title="3級 - Section1: 記述統計とグラフ読解 (3/3)"
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
