import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section9AdvancedTesting2() {
  const questions: Question[] = [
    {
        id: 1,
        question: "無作為抽出とは何ですか。",
        options: [
            "好きな人を選ぶ",
            "母集団から偏りなくランダムに選ぶ",
            "最初の人を選ぶ",
            "年齢順に選ぶ"
        ],
        correct: 2,
        explanation: "無作為抽出は、母集団のどの個体も等しい確率で選ばれるように、偏りなくランダムに選ぶ方法です。"
    },
    {
        id: 2,
        question: "無作為抽出が重要な理由はどれですか。",
        options: [
            "簡単だから",
            "偏りのない標本が得られ、母集団を正しく推測できるから",
            "費用が安いから",
            "時間がかからないから"
        ],
        correct: 2,
        explanation: "無作為抽出により偏りのない標本が得られ、母集団の特徴を正しく推測できます。"
    },
    {
        id: 3,
        question: "次のうち、無作為抽出の方法として適切なものはどれですか。",
        options: [
            "手を挙げた人を選ぶ",
            "くじ引きで選ぶ",
            "先生が好きな生徒を選ぶ",
            "友達を選ぶ"
        ],
        correct: 2,
        explanation: "くじ引きは、全員が等しい確率で選ばれる無作為抽出の方法です。"
    },
    {
        id: 4,
        question: "サンプリングバイアスとは何ですか。",
        options: [
            "標本が母集団の特徴を正しく反映していない偏り",
            "データの計算ミス",
            "標本数が多すぎる",
            "無作為抽出の結果"
        ],
        correct: 1,
        explanation: "サンプリングバイアスは、標本の選び方に偏りがあり、母集団の特徴を正しく反映していない状態です。"
    },
    {
        id: 5,
        question: "次のうち、サンプリングバイアスが起きやすい方法はどれですか。",
        options: [
            "乱数表を使う",
            "街頭で協力者を募る",
            "くじ引き",
            "コンピュータでランダムに選ぶ"
        ],
        correct: 2,
        explanation: "街頭で協力者を募ると、特定の属性（時間帯、場所、性別など）に偏りが生じやすいです。"
    },
    {
        id: 6,
        question: "乱数表を使った抽出方法の説明として正しいものはどれですか。",
        options: [
            "好きな数字を選ぶ",
            "表の数字を順番に読んで、該当する番号の個体を選ぶ",
            "大きい数字だけ選ぶ",
            "偶数だけ選ぶ"
        ],
        correct: 2,
        explanation: "乱数表の数字を順番に（または任意の開始位置から）読み、該当する番号の個体を選びます。"
    },
    {
        id: 7,
        question: "100人の中から10人を無作為に選ぶとき、各人が選ばれる確率はいくらですか。",
        options: [
            "1/10",
            "1/100",
            "10/100",
            "1/5"
        ],
        correct: 1,
        explanation: "10人選ぶので、各人が選ばれる確率は10/100=1/10です。"
    },
    {
        id: 8,
        question: "無作為抽出を行っても、標本と母集団に多少の差が生じるのはなぜですか。",
        options: [
            "抽出方法が間違っている",
            "偶然のばらつき（標本誤差）があるから",
            "データが間違っている",
            "母集団が大きすぎる"
        ],
        correct: 2,
        explanation: "無作為抽出でも、偶然のばらつき（標本誤差）により、標本と母集団に多少の差が生じます。"
    },
    {
        id: 9,
        question: "次のうち、無作為抽出でない方法はどれですか。",
        options: [
            "乱数表を使う",
            "コンピュータでランダムに選ぶ",
            "志願者（希望者）を選ぶ",
            "くじ引き"
        ],
        correct: 3,
        explanation: "志願者（希望者）を選ぶ方法は、特定の性質を持つ人が選ばれやすく、無作為抽出ではありません。"
    },
    {
        id: 10,
        question: "層化抽出とは何ですか。",
        options: [
            "母集団を層に分け、各層から無作為に抽出",
            "母集団全体から直接抽出",
            "一定間隔で抽出",
            "最初の人を選ぶ"
        ],
        correct: 1,
        explanation: "層化抽出は、母集団を特性（性別、年齢など）で層に分け、各層から無作為に抽出する方法です。"
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
    examId: 'grade3-section9_advancedtesting_2',
    examTitle: '3級 Section9_AdvancedTesting_2',
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
