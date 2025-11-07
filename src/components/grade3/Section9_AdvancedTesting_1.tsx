import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section9AdvancedTesting1() {
  const questions: Question[] = [
    {
        id: 1,
        question: "母集団とは何ですか。",
        options: [
            "調査で選ばれた一部",
            "調査したい対象全体",
            "データの平均",
            "最も多いグループ"
        ],
        correct: 2,
        explanation: "母集団とは、調査や研究の対象となる全体の集団のことです。"
    },
    {
        id: 2,
        question: "標本とは何ですか。",
        options: [
            "母集団全体",
            "母集団から選ばれた一部",
            "データの中央値",
            "最大値と最小値"
        ],
        correct: 2,
        explanation: "標本とは、母集団から実際に調査するために選ばれた一部の集団です。"
    },
    {
        id: 3,
        question: "全数調査とは何ですか。",
        options: [
            "標本だけを調査",
            "母集団全体を調査",
            "無作為に選んだ人だけ調査",
            "アンケート調査のみ"
        ],
        correct: 2,
        explanation: "全数調査（悉皆調査）は、母集団全体を対象に調査することです。"
    },
    {
        id: 4,
        question: "標本調査の利点はどれですか。",
        options: [
            "全数調査より時間と費用がかかる",
            "母集団全体が分かる",
            "全数調査より時間と費用を削減できる",
            "誤差が全くない"
        ],
        correct: 3,
        explanation: "標本調査は、全数調査に比べて時間と費用を大幅に削減できる利点があります。"
    },
    {
        id: 5,
        question: "次のうち、全数調査が適している場合はどれですか。",
        options: [
            "日本の全人口の調査",
            "ある会社の全社員（50人）の調査",
            "全国の全世帯の調査",
            "世界中の人の調査"
        ],
        correct: 2,
        explanation: "母集団が小さい場合（例：社員50人）は、全数調査が可能で適しています。"
    },
    {
        id: 6,
        question: "標本調査で推測した結果に誤差が生じる理由はどれですか。",
        options: [
            "標本は母集団の一部だから",
            "必ずデータが間違っているから",
            "調査員のミスのみ",
            "計算が複雑だから"
        ],
        correct: 1,
        explanation: "標本は母集団の一部なので、推測結果には標本誤差（ばらつき）が生じます。"
    },
    {
        id: 7,
        question: "推測統計とは何ですか。",
        options: [
            "データを表やグラフで整理する",
            "標本から母集団の特徴を推測する",
            "データの平均を計算する",
            "データを収集する"
        ],
        correct: 2,
        explanation: "推測統計は、標本から母集団の特徴を推測する統計学の分野です。"
    },
    {
        id: 8,
        question: "1000人の母集団から100人を無作為抽出して調査しました。この100人は何と呼ばれますか。",
        options: [
            "母集団",
            "標本",
            "全数",
            "対象外"
        ],
        correct: 2,
        explanation: "母集団から選ばれた100人は標本です。"
    },
    {
        id: 9,
        question: "標本サイズを大きくすると、標本誤差はどうなりますか。",
        options: [
            "大きくなる",
            "小さくなる",
            "変わらない",
            "2倍になる"
        ],
        correct: 2,
        explanation: "標本サイズを大きくすると、標本誤差は小さくなり、推測の精度が上がります。"
    },
    {
        id: 10,
        question: "国勢調査は、全数調査と標本調査のどちらですか。",
        options: [
            "全数調査",
            "標本調査",
            "どちらでもない",
            "年によって異なる"
        ],
        correct: 1,
        explanation: "国勢調査は、日本に住む全ての人を対象とする全数調査です。"
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
    examId: 'grade3-section9_advancedtesting_1',
    examTitle: '3級 Section9_AdvancedTesting_1',
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
