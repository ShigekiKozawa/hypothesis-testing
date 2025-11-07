import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section9Sample3() {
  const questions: Question[] = [
    {
        id: 1,
        question: "標本の大きさ（サンプルサイズ）とは何ですか。",
        options: [
            "母集団の大きさ",
            "標本に含まれるデータの個数",
            "平均値",
            "中央値",
        ],
        correct: 2,
        explanation: "標本の大きさ（サンプルサイズ）は、標本に含まれるデータの個数（n）です。"
    },
    {
        id: 2,
        question: "標本の大きさが大きいほど、推測の精度はどうなりますか。",
        options: [
            "悪くなる",
            "良くなる（標本誤差が小さくなる）",
            "変わらない",
            "判断できない",
        ],
        correct: 2,
        explanation: "標本の大きさが大きいほど、標本誤差が小さくなり、母集団の推測精度が向上します。"
    },
    {
        id: 3,
        question: "標本の大きさが小さいとき、何が問題ですか。",
        options: [
            "何もない",
            "標本誤差が大きく、推測が不正確になる",
            "必ず正確",
            "判断できない",
        ],
        correct: 2,
        explanation: "標本の大きさが小さいと、標本誤差が大きくなり、母集団の特徴を正確に推測できません。"
    },
    {
        id: 4,
        question: "標本調査の信頼性を高めるには、どうすれば良いですか。",
        options: [
            "標本を小さくする",
            "標本を無作為に選び、十分な大きさにする",
            "好きなものを選ぶ",
            "何もしない",
        ],
        correct: 2,
        explanation: "標本を無作為に選び、十分な大きさ（サンプルサイズ）にすることで、信頼性が高まります。"
    },
    {
        id: 5,
        question: "復元抽出とは何ですか。",
        options: [
            "選んだ要素を母集団に戻してから次を選ぶ",
            "選んだ要素を戻さない",
            "何も選ばない",
            "判断できない",
        ],
        correct: 1,
        explanation: "復元抽出は、1つ選んだ後、それを母集団に戻してから次を選ぶ方法です。"
    },
    {
        id: 6,
        question: "非復元抽出とは何ですか。",
        options: [
            "選んだ要素を母集団に戻す",
            "選んだ要素を戻さずに次を選ぶ",
            "何も選ばない",
            "判断できない",
        ],
        correct: 2,
        explanation: "非復元抽出は、1つ選んだ後、それを戻さずに次を選ぶ方法です。通常の標本調査では非復元抽出が使われます。"
    },
    {
        id: 7,
        question: "標本平均は、母平均のどのような推定値ですか。",
        options: [
            "必ず等しい",
            "不偏推定量（平均的に母平均と一致）",
            "必ず大きい",
            "必ず小さい",
        ],
        correct: 2,
        explanation: "標本平均は、母平均の不偏推定量です。多くの標本を取ると、その平均は母平均に一致します。"
    },
    {
        id: 8,
        question: "標本調査で、回答率が低いと何が問題ですか。",
        options: [
            "何もない",
            "回答しない人に偏りがあると、結果が偏る",
            "必ず正確",
            "判断できない",
        ],
        correct: 2,
        explanation: "回答率が低いと、回答しない人と回答する人で特性が異なる場合、結果に偏り（無回答バイアス）が生じます。"
    },
    {
        id: 9,
        question: "標本調査の結果を母集団に一般化するときに必要な条件は何ですか。",
        options: [
            "標本が大きければ何でも良い",
            "標本が母集団を代表している",
            "標本が小さい",
            "何もない",
        ],
        correct: 2,
        explanation: "標本が母集団を代表している（無作為抽出など）ことが、結果を一般化する条件です。"
    },
    {
        id: 10,
        question: "母集団が小さい場合、全数調査と標本調査のどちらが良いですか。",
        options: [
            "必ず標本調査",
            "全数調査の方が現実的な場合が多い",
            "どちらでも同じ",
            "判断できない",
        ],
        correct: 2,
        explanation: "母集団が小さい場合、標本調査の利点（時間・費用削減）が小さいので、全数調査の方が現実的です。"
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
    examId: 'grade4-section9_sample_3',
    examTitle: '4級 Section9_Sample_3',
    grade: '4級',
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
