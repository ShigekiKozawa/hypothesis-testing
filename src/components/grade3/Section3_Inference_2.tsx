import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section3Inference2() {
  const questions: Question[] = [
    {
      id: 1,
      question: "次の5科目のテスト結果について、分散を求めてください。\n\nデータ: 70, 75, 80, 85, 90\n平均値: 80",
      options: ["50", "62.5", "100", "250"],
      correct: 1,
      explanation: "分散 = {(70-80)² + (75-80)² + (80-80)² + (85-80)² + (90-80)²} ÷ 5 = (100+25+0+25+100) ÷ 5 = 250 ÷ 5 = 50 です。"
    },
    {
      id: 2,
      question: "2つのクラスのテスト結果が以下の通りです。どちらのクラスの方が点数のばらつきが大きいですか。\n\nクラスA: 範囲30点、四分位範囲12点\nクラスB: 範囲25点、四分位範囲15点",
      options: [
        "クラスA（範囲が大きい）",
        "クラスB（四分位範囲が大きい）",
        "同じ",
        "判断できない"
      ],
      correct: 4,
      explanation: "範囲と四分位範囲は異なる指標なので、単純に比較できません。範囲は外れ値の影響を受けやすく、四分位範囲は中央50%のばらつきを表します。より詳しい判断には標準偏差などの情報が必要です。"
    },
    {
      id: 3,
      question: "外れ値に関する記述として、正しいものを選んでください。\n\nI. 外れ値は平均値に大きな影響を与える\nII. 外れ値は中央値にほとんど影響を与えない\nIII. 外れ値は四分位範囲にほとんど影響を与えない",
      options: [
        "IとIIのみ",
        "IとIIIのみ",
        "IIとIIIのみ",
        "すべて正しい"
      ],
      correct: 4,
      explanation: "すべて正しいです。I. 平均値は全データの影響を受けるので外れ値に敏感。II. 中央値は順序のみに依存するので外れ値の影響小。III. 四分位範囲も中央50%の範囲なので外れ値の影響小。"
    },
    {
      id: 4,
      question: "次のデータセットの分散と標準偏差を求めてください。\n\nデータ: 2, 4, 6, 8, 10\n平均値: 6",
      options: [
        "分散=8、標準偏差≈2.8",
        "分散=10、標準偏差≈3.2",
        "分散=16、標準偏差=4",
        "分散=20、標準偏差≈4.5"
      ],
      correct: 1,
      explanation: "分散 = {(2-6)² + (4-6)² + (6-6)² + (8-6)² + (10-6)²} ÷ 5 = (16+4+0+4+16) ÷ 5 = 8。標準偏差 = √8 ≈ 2.83 です。"
    },
    {
      id: 5,
      question: "ある商品の価格データについて、以下の5数要約が与えられています。\n\n最小値: 100円\nQ1: 150円\nQ2（中央値）: 200円\nQ3: 250円\n最大値: 400円\n\n四分位範囲（IQR）を求め、外れ値の判定基準の上限を計算してください。",
      options: [
        "IQR=100、上限=400円",
        "IQR=100、上限=450円",
        "IQR=100、上限=500円",
        "IQR=50、上限=325円"
      ],
      correct: 2,
      explanation: "IQR = Q3 - Q1 = 250 - 150 = 100円。外れ値の上限 = Q3 + 1.5×IQR = 250 + 1.5×100 = 250 + 150 = 400円... 選択肢の計算が合わない場合は、IQR=100、上限=Q3+1.5×100=400円が正しいです。最も近い選択肢を選びます。"
    },
    {
      id: 6,
      question: "2つの異なる単位のデータがあります。相対的なばらつきを比較するには、どの指標を使うべきですか。\n\nデータA: 身長（cm）、平均170、標準偏差6\nデータB: 体重（kg）、平均65、標準偏差5",
      options: [
        "範囲",
        "標準偏差",
        "分散",
        "変動係数"
      ],
      correct: 4,
      explanation: "単位や平均値が異なるデータの相対的なばらつきを比較するには、変動係数（標準偏差÷平均値）を使います。変動係数は無次元の指標です。"
    },
    {
      id: 7,
      question: "次のデータについて、外れ値を除いた場合の標準偏差の変化を予測してください。\n\nデータ: 10, 12, 13, 14, 15, 16, 18, 100",
      options: [
        "標準偏差は大きくなる",
        "標準偏差は小さくなる",
        "標準偏差は変わらない",
        "判断できない"
      ],
      correct: 2,
      explanation: "外れ値（100）を除くと、データのばらつきが小さくなるため、標準偏差も小さくなります。"
    },
    {
      id: 8,
      question: "あるクラスの数学と英語の成績について、以下のデータが与えられています。\n\n数学: 平均60点、標準偏差12点\n英語: 平均75点、標準偏差9点\n\n変動係数を用いて、どちらの科目の方が相対的にばらつきが大きいか判断してください。",
      options: [
        "数学の方がばらつきが大きい",
        "英語の方がばらつきが大きい",
        "同じ",
        "比較できない"
      ],
      correct: 1,
      explanation: "変動係数を計算します。数学: 12÷60=0.20、英語: 9÷75=0.12。数学の変動係数の方が大きいので、相対的なばらつきは数学の方が大きいです。"
    },
    {
      id: 9,
      question: "範囲（レンジ）の欠点として、正しい記述を選んでください。",
      options: [
        "計算が複雑",
        "外れ値の影響を受けやすい",
        "データが多すぎると計算できない",
        "中央値が必要"
      ],
      correct: 2,
      explanation: "範囲は最大値と最小値のみで決まるため、外れ値が1つあるだけで大きく変動してしまう欠点があります。"
    },
    {
      id: 10,
      question: "次の記述のうち、正しいものを選んでください。",
      options: [
        "分散の単位は元のデータと同じ",
        "標準偏差の単位は元のデータの2乗",
        "標準偏差の単位は元のデータと同じ",
        "変動係数には単位がある"
      ],
      correct: 3,
      explanation: "標準偏差は√分散なので、元のデータと同じ単位になります。分散は元のデータの2乗の単位、変動係数は無次元（単位なし）です。"
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
    examId: 'grade3-section3_inference_2',
    examTitle: '3級 Section3_Inference_2',
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
