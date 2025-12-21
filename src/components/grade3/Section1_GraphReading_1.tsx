import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

/**
 * 3級 Section1: 記述統計とグラフ読解 (1/3)
 * ヒストグラムと箱ひげ図
 */

export default function Section1_GraphReading_1() {
  const questions: Question[] = [
    {
      id: 1,
      question: "以下のヒストグラムは、ある高校の生徒50人の通学時間（分）を示しています。中央値が含まれる階級はどれですか。\n\n階級の度数：\n0-10分: 5人\n10-20分: 12人\n20-30分: 18人\n30-40分: 10人\n40-50分: 5人",
      options: ["0-10分", "10-20分", "20-30分", "30-40分"],
      correct: 3,
      explanation: "50人のデータの中央値は、25番目と26番目の値の平均です。累積度数を見ると、0-10分:5人、0-20分:17人、0-30分:35人なので、25番目と26番目は20-30分の階級に含まれます。",
      chartType: 'histogram',
      barData: [
        { category: '0-10', value: 5 },
        { category: '10-20', value: 12 },
        { category: '20-30', value: 18 },
        { category: '30-40', value: 10 },
        { category: '40-50', value: 5 }
      ],
      chartLabels: { x: '通学時間（分）', y: '人数' }
    },
    {
      id: 2,
      question: "あるクラスの数学テストの点数を箱ひげ図で表しました。この箱ひげ図から読み取れる情報として正しいものはどれですか。\n\n箱ひげ図の5数要約：\n最小値: 40点\n第1四分位数: 60点\n中央値: 70点\n第3四分位数: 80点\n最大値: 95点",
      options: [
        "平均点は70点である",
        "四分位範囲は20点である",
        "75%の生徒が80点以上である",
        "最頻値は70点である"
      ],
      correct: 2,
      explanation: "四分位範囲はQ3 - Q1 = 80 - 60 = 20点です。平均値は箱ひげ図からは読み取れません。75%の生徒はQ3（80点）以下で、80点以上は25%です。最頻値も箱ひげ図からは読み取れません。",
      chartType: 'boxplot',
      boxPlotData: { min: 40, q1: 60, median: 70, q3: 80, max: 95 },
      chartLabels: { x: '', y: '点数' }
    },
    {
      id: 3,
      question: "下のヒストグラムは、ある市の世帯あたりの月間電気使用量（kWh）を示しています。このヒストグラムから読み取れることとして正しいものはどれですか。\n\n階級の度数：\n100-150: 8世帯\n150-200: 15世帯\n200-250: 22世帯\n250-300: 18世帯\n300-350: 7世帯",
      options: [
        "データは左右対称である",
        "データは右に裾を引いている",
        "最頻階級は200-250kWhである",
        "平均値は中央値より小さい"
      ],
      correct: 3,
      explanation: "最頻階級は度数が最も多い200-250kWhです。データは左側（低い値）に裾を引いており、このような分布では平均値<中央値となります。",
      chartType: 'histogram',
      barData: [
        { category: '100-150', value: 8 },
        { category: '150-200', value: 15 },
        { category: '200-250', value: 22 },
        { category: '250-300', value: 18 },
        { category: '300-350', value: 7 }
      ],
      chartLabels: { x: '電気使用量（kWh）', y: '世帯数' }
    },
    {
      id: 4,
      question: "2つのクラスA、Bの英語テストの箱ひげ図を比較しました。次の記述のうち、正しいものはどれですか。\n\nクラスA: 最小値30、Q1=50、中央値60、Q3=70、最大値90\nクラスB: 最小値40、Q1=60、中央値70、Q3=75、最大値85",
      options: [
        "クラスAの方が得点のばらつきが小さい",
        "クラスBの方が中央値が高い",
        "クラスAの範囲はクラスBより小さい",
        "クラスAの四分位範囲はクラスBより大きい"
      ],
      correct: 2,
      explanation: "クラスBの中央値は70点で、クラスAの60点より高いです。クラスAの範囲は90-30=60、クラスBは85-40=45です。クラスAの四分位範囲は70-50=20、クラスBは75-60=15なので、Aの方が大きいです。",
      chartType: 'boxplot',
      boxPlotData: { min: 30, q1: 50, median: 60, q3: 70, max: 90 },
      chartLabels: { x: 'クラスA', y: '点数' }
    },
    {
      id: 5,
      question: "下のヒストグラムは100人の体重（kg）のデータです。第1四分位数が含まれる階級として最も適切なものはどれですか。\n\n階級の度数：\n40-45kg: 5人\n45-50kg: 15人\n50-55kg: 30人\n55-60kg: 35人\n60-65kg: 15人",
      options: ["40-45kg", "45-50kg", "50-55kg", "55-60kg"],
      correct: 2,
      explanation: "第1四分位数は、データを小さい順に並べたときの25%の位置、つまり25番目の値です。累積度数：0-45kg:5人、0-50kg:20人、0-55kg:50人。25番目は45-50kgの階級に含まれます。",
      chartType: 'histogram',
      barData: [
        { category: '40-45', value: 5 },
        { category: '45-50', value: 15 },
        { category: '50-55', value: 30 },
        { category: '55-60', value: 35 },
        { category: '60-65', value: 15 }
      ],
      chartLabels: { x: '体重（kg）', y: '人数' }
    },
    {
      id: 6,
      question: "箱ひげ図において、外れ値を検出する基準として一般的に使用されるものはどれですか。ただし、IQRは四分位範囲を表します。",
      options: [
        "Q1 - IQR または Q3 + IQR より外側",
        "Q1 - 1.5×IQR または Q3 + 1.5×IQR より外側",
        "Q1 - 2×IQR または Q3 + 2×IQR より外側",
        "平均値 ± 2×標準偏差より外側"
      ],
      correct: 2,
      explanation: "箱ひげ図における外れ値の一般的な基準は、Q1 - 1.5×IQR より小さい値、またはQ3 + 1.5×IQR より大きい値です。これはTukeyの方法として知られています。",
      chartType: 'boxplot',
      boxPlotData: { min: 10, q1: 25, median: 40, q3: 55, max: 70 },
      chartLabels: { x: '', y: '値' }
    },
    {
      id: 7,
      question: "あるスーパーマーケットの1日あたりの来客数を30日間調査し、ヒストグラムにまとめました。平均値が含まれる階級として最も適切なものはどれですか。\n\n階級の度数：\n200-300人: 3日\n300-400人: 7日\n400-500人: 12日\n500-600人: 6日\n600-700人: 2日",
      options: ["200-300人", "300-400人", "400-500人", "500-600人"],
      correct: 3,
      explanation: "各階級の中央値で近似計算すると、合計は (250×3 + 350×7 + 450×12 + 550×6 + 650×2) = 12,850人。平均は12,850÷30 ≒ 428人で、400-500人の階級に含まれます。",
      chartType: 'histogram',
      barData: [
        { category: '200-300', value: 3 },
        { category: '300-400', value: 7 },
        { category: '400-500', value: 12 },
        { category: '500-600', value: 6 },
        { category: '600-700', value: 2 }
      ],
      chartLabels: { x: '来客数（人）', y: '日数' }
    },
    {
      id: 8,
      question: "ある工場で製造された部品の長さを測定し、箱ひげ図にまとめました。この箱ひげ図から、中央50%のデータが含まれる範囲はどれですか。\n\n5数要約：\n最小値: 48cm\nQ1: 62cm\n中央値: 70cm\nQ3: 78cm\n最大値: 92cm",
      options: [
        "48cm～92cm",
        "62cm～78cm",
        "62cm～92cm",
        "48cm～70cm"
      ],
      correct: 2,
      explanation: "中央50%のデータは、第1四分位数（Q1）から第3四分位数（Q3）までの範囲です。したがって、62cm～78cmとなります。この範囲は箱ひげ図の「箱」の部分に対応します。",
      chartType: 'boxplot',
      boxPlotData: { min: 48, q1: 62, median: 70, q3: 78, max: 92 },
      chartLabels: { x: '', y: '長さ（cm）' }
    },
    {
      id: 9,
      question: "下のヒストグラムは、あるクラスの小テスト（20点満点）の結果です。このような分布において、平均値・中央値・最頻値の大小関係として正しいものはどれですか。\n\n階級の度数：\n0-5点: 2人\n5-10点: 3人\n10-15点: 8人\n15-20点: 17人",
      options: [
        "平均値 < 中央値 < 最頻値",
        "中央値 < 平均値 < 最頻値",
        "最頻値 < 中央値 < 平均値",
        "平均値 = 中央値 = 最頻値"
      ],
      correct: 1,
      explanation: "度数が高得点側（右側）に偏っており、低得点側（左側）に裾を引いている分布（負の歪度）では、左側の外れ値の影響で平均値が中央値より小さくなります。最頻値は度数が最も多い階級にあるため最も大きくなります。したがって、平均値 < 中央値 < 最頻値となります。",
      chartType: 'histogram',
      barData: [
        { category: '0-5', value: 2 },
        { category: '5-10', value: 3 },
        { category: '10-15', value: 8 },
        { category: '15-20', value: 17 }
      ],
      chartLabels: { x: '点数', y: '人数' }
    },
    {
      id: 10,
      question: "あるクラスの5人の小テストの点数は {8, 9, 10, 11, 12} でした。ここに欠席していた生徒が追試を受けて2点を取りました。この生徒を含めた6人のデータについて、次の記述のうち正しいものはどれですか。",
      options: [
        "平均値は大きく下がるが、中央値は変わらない",
        "中央値は大きく下がるが、平均値は変わらない",
        "平均値も中央値も大きく下がる",
        "平均値も中央値も変わらない"
      ],
      correct: 1,
      explanation: "元の5人の平均は10点、中央値も10点でした。2点を追加すると、平均は(8+9+10+11+12+2)/6=8.67点に下がります。しかし、中央値は並べた{2,8,9,10,11,12}の3番目と4番目の平均=(9+10)/2=9.5点となり、わずかしか下がりません。外れ値（2点）が平均値には大きく影響するが、中央値には影響が小さいことがわかります。"
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
    examId: 'grade3-section1_graphreading_1',
    examTitle: '3級 - Section1: 記述統計とグラフ読解 (1/3)',
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
        title="3級 - Section1: 記述統計とグラフ読解 (1/3)"
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
      title="3級 - Section1: 記述統計とグラフ読解 (1/3)"
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
