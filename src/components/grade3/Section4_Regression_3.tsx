import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section4Regression3() {
  const questions: Question[] = [
    {
      id: 1,
      question: "次の箱ひげ図を見て、データの下位25%と上位25%の範囲を答えてください。\n\n最小値=5、Q1=15、Q2=25、Q3=35、最大値=50",
      options: [
        "下位25%: 5〜15、上位25%: 35〜50",
        "下位25%: 5〜25、上位25%: 25〜50",
        "下位25%: 15〜25、上位25%: 25〜35",
        "判断できない"
      ],
      correct: 1,
      explanation: "箱ひげ図では、最小値からQ1までが下位25%、Q3から最大値までが上位25%のデータ範囲を表します。"
    },
    {
      id: 2,
      question: "下のヒストグラムから、累積相対度数を計算してください。20点未満の累積相対度数はいくらですか。",
      options: ["0.1", "0.2", "0.3", "0.4"],
      correct: 3,
      explanation: "20点未満は0〜20点の範囲です。累積度数は3+6=9人。累積相対度数は 9÷30=0.3 です。",
      chartType: 'bar',
      barData: [
        { name: '0-10', value: 3 },
        { name: '10-20', value: 6 },
        { name: '20-30', value: 12 },
        { name: '30-40', value: 6 },
        { name: '40-50', value: 3 }
      ],
      chartLabels: { x: '点数', y: '度数（人）' }
    },
    {
      id: 3,
      question: "次の箱ひげ図について、中央値が平均値とほぼ等しいと判断できる根拠を選んでください。\n\n最小値=10、Q1=20、Q2=30、Q3=40、最大値=50",
      options: [
        "箱とひげがほぼ左右対称だから",
        "Q2がQ1とQ3の中点だから",
        "最大値と最小値の差が40だから",
        "IQRが20だから"
      ],
      correct: 1,
      explanation: "箱ひげ図がほぼ左右対称の場合、データの分布も対称的であり、平均値と中央値がほぼ等しくなります。"
    },
    {
      id: 4,
      question: "下のヒストグラムで、「40点以上」の人は全体の何%ですか。",
      options: ["25%", "30%", "40%", "50%"],
      correct: 4,
      explanation: "40点以上は 15+8+2=25人。25÷50=0.5 なので50%です。",
      chartType: 'bar',
      barData: [
        { name: '0-20', value: 5 },
        { name: '20-40', value: 20 },
        { name: '40-60', value: 15 },
        { name: '60-80', value: 8 },
        { name: '80-100', value: 2 }
      ],
      chartLabels: { x: '点数', y: '度数（人）' }
    },
    {
      id: 5,
      question: "次の2つの箱ひげ図を比較したとき、どちらが「データのばらつき」が小さいですか。\n\nグループA: IQR=30、範囲=80\nグループB: IQR=15、範囲=90",
      options: [
        "グループA（IQRが大きい）",
        "グループB（IQRが小さい）",
        "同じ",
        "判断できない"
      ],
      correct: 2,
      explanation: "四分位範囲（IQR）が小さいほど、中央50%のデータのばらつきが小さいです。グループBの方がばらつきが小さいと言えます。"
    },
    {
      id: 6,
      question: "次のヒストグラムで、標準偏差が最も小さいと考えられる分布はどれですか。",
      options: [
        "すべての階級の度数がほぼ等しい（平坦な分布）",
        "中央の階級に度数が集中している（尖った分布）",
        "両端の階級に度数が集中している（二峰性の分布）",
        "判断できない"
      ],
      correct: 2,
      explanation: "標準偏差はデータのばらつきを表します。中央に度数が集中している分布は、データが平均値の近くに集まっているため、標準偏差が小さくなります。"
    },
    {
      id: 7,
      question: "箱ひげ図で、ある生徒の得点が「Q3」と同じでした。この生徒は全体の上位何%に入りますか。",
      options: ["約25%", "約50%", "約75%", "約100%"],
      correct: 1,
      explanation: "Q3（第3四分位数）は上位25%の境界を表します。Q3の位置にいる生徒は、上位25%に入ります。"
    },
    {
      id: 8,
      question: "次のヒストグラムと箱ひげ図の組み合わせで、正しく対応しているものを選んでください。\n\n【ヒストグラム】右側に裾が長い分布\n【箱ひげ図の候補】\nA: 箱の右側のひげが長い\nB: 箱の左側のひげが長い\nC: 箱とひげが対称",
      options: [
        "A",
        "B",
        "C",
        "判断できない"
      ],
      correct: 1,
      explanation: "ヒストグラムで右側に裾が長い場合、箱ひげ図でも右側（大きい値の方向）のひげが長くなります。"
    },
    {
      id: 9,
      question: "次のヒストグラムから、度数分布表を作成しました。階級値を使って平均値を計算する際の注意点は何ですか。",
      options: [
        "階級値は階級の中央値であり、実際のデータの平均値とは誤差がある",
        "階級値を使えば常に正確な平均値が求められる",
        "階級値は最大値と最小値の平均である",
        "階級値は使わずに度数だけで計算できる"
      ],
      correct: 1,
      explanation: "階級値は各階級の中央値を代表値として使うため、階級内のデータの分布によっては実際の平均値と誤差が生じます。"
    },
    {
      id: 10,
      question: "次の2つの箱ひげ図について、正しい記述を選んでください。\n\nグループA: 箱が小さく、ひげが長い\nグループB: 箱が大きく、ひげが短い",
      options: [
        "グループAは中央50%が密集し、外側に外れ値的なデータがある",
        "グループBは中央50%が密集し、外側に外れ値的なデータがある",
        "両グループのばらつきは同じ",
        "判断できない"
      ],
      correct: 1,
      explanation: "箱（IQR）が小さいということは中央50%のデータが密集していることを意味し、ひげが長いということは外側に離れたデータがあることを意味します。"
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
    examId: 'grade3-section4_regression_3',
    examTitle: '3級 Section4_Regression_3',
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
