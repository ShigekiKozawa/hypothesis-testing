import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section9Sample1() {
  const questions: Question[] = [
    {
        id: 1,
        question: "母集団とは何ですか。",
        options: [
            "調査で選ばれた一部",
            "調査の対象となる全体の集団",
            "データの平均",
            "最大値",
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
            "平均値",
            "中央値",
        ],
        correct: 2,
        explanation: "標本とは、母集団から実際に調査するために選ばれた一部のことです。"
    },
    {
        id: 3,
        question: "全数調査（悉皆調査）とは何ですか。",
        options: [
            "一部だけ調べる",
            "母集団全体を調べる",
            "平均を計算する",
            "何も調べない",
        ],
        correct: 2,
        explanation: "全数調査（悉皆調査）は、母集団全体を調べる調査です。"
    },
    {
        id: 4,
        question: "標本調査とは何ですか。",
        options: [
            "母集団全体を調べる",
            "母集団から一部を選んで調べる",
            "平均を計算する",
            "何も調べない",
        ],
        correct: 2,
        explanation: "標本調査は、母集団から一部（標本）を選んで調べ、母集団全体の特徴を推測する調査です。"
    },
    {
        id: 5,
        question: "標本調査の利点はどれですか。",
        options: [
            "時間・費用を節約できる",
            "必ず正確",
            "何もない",
            "常に全数調査より悪い",
        ],
        correct: 1,
        explanation: "標本調査は、全数調査に比べて時間・費用・労力を大幅に節約できる利点があります。"
    },
    {
        id: 6,
        question: "標本調査の欠点はどれですか。",
        options: [
            "費用がかかる",
            "標本抽出誤差がある",
            "時間がかかる",
            "何もない",
        ],
        correct: 2,
        explanation: "標本調査では、標本が母集団を完全に代表できないため、標本抽出誤差（サンプリング誤差）が生じます。"
    },
    {
        id: 7,
        question: "国勢調査は、全数調査ですか、標本調査ですか。",
        options: [
            "全数調査",
            "標本調査",
            "どちらでもない",
            "判断できない",
        ],
        correct: 1,
        explanation: "国勢調査は、日本に住む全ての人を対象とする全数調査（悉皆調査）です。"
    },
    {
        id: 8,
        question: "テレビの視聴率調査は、全数調査ですか、標本調査ですか。",
        options: [
            "全数調査",
            "標本調査",
            "どちらでもない",
            "判断できない",
        ],
        correct: 2,
        explanation: "視聴率調査は、一部の世帯を選んで調べる標本調査です。"
    },
    {
        id: 9,
        question: "標本から得られた統計量を使って、母集団の特徴を推測することを何と言いますか。",
        options: [
            "記述統計",
            "推測統計（統計的推測）",
            "グラフ作成",
            "何もしない",
        ],
        correct: 2,
        explanation: "標本から母集団の特徴を推測することを、推測統計（統計的推測）と言います。"
    },
    {
        id: 10,
        question: "標本調査で重要なことは何ですか。",
        options: [
            "標本を好きに選ぶ",
            "標本が母集団を代表するように偏りなく選ぶ",
            "標本数を必ず1にする",
            "何も考えない",
        ],
        correct: 2,
        explanation: "標本が母集団を代表するように、偏りなく（無作為に）選ぶことが重要です。"
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
    examId: 'grade4-section9_sample_1',
    examTitle: '4級 Section9_Sample_1',
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
