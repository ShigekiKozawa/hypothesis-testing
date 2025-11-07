import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section9Sample2() {
  const questions: Question[] = [
    {
        id: 1,
        question: "無作為抽出（ランダムサンプリング）とは何ですか。",
        options: [
            "好きなものを選ぶ",
            "母集団の各要素が等しい確率で選ばれるように抽出する",
            "最初のものを選ぶ",
            "何も選ばない",
        ],
        correct: 2,
        explanation: "無作為抽出は、母集団の各要素が等しい確率で選ばれるように、偏りなくランダムに抽出する方法です。"
    },
    {
        id: 2,
        question: "無作為抽出を行う理由は何ですか。",
        options: [
            "楽だから",
            "標本が母集団を代表し、偏りを避けるため",
            "何もない",
            "判断できない",
        ],
        correct: 2,
        explanation: "無作為抽出を行うことで、標本が母集団を代表し、調査結果に偏りが生じるのを避けられます。"
    },
    {
        id: 3,
        question: "単純無作為抽出とは何ですか。",
        options: [
            "複雑な方法",
            "母集団から等しい確率で無作為に選ぶ最も基本的な方法",
            "層別抽出",
            "何もしない",
        ],
        correct: 2,
        explanation: "単純無作為抽出は、母集団から各要素を等しい確率で無作為に選ぶ、最も基本的な抽出方法です。"
    },
    {
        id: 4,
        question: "層化抽出（層別抽出）とは何ですか。",
        options: [
            "母集団を層に分けて、各層から無作為に抽出する",
            "全て同じグループから選ぶ",
            "好きなものを選ぶ",
            "何もしない",
        ],
        correct: 1,
        explanation: "層化抽出は、母集団をいくつかの層（グループ）に分けて、各層から無作為に抽出する方法です。"
    },
    {
        id: 5,
        question: "層化抽出の利点は何ですか。",
        options: [
            "楽だから",
            "各層の特徴を反映した代表性の高い標本が得られる",
            "何もない",
            "常に悪い",
        ],
        correct: 2,
        explanation: "層化抽出は、各層（例：年代、地域）の特徴を反映した、代表性の高い標本が得られる利点があります。"
    },
    {
        id: 6,
        question: "系統抽出（等間隔抽出）とは何ですか。",
        options: [
            "最初だけ選ぶ",
            "リストから一定間隔で抽出する",
            "ランダムに選ぶ",
            "何もしない",
        ],
        correct: 2,
        explanation: "系統抽出は、リストから最初の1つを無作為に選び、その後は一定間隔（例：5人おき）で抽出する方法です。"
    },
    {
        id: 7,
        question: "有意抽出（意図的抽出）とは何ですか。",
        options: [
            "無作為に選ぶ",
            "調査者が意図的に特定の要素を選ぶ",
            "等間隔で選ぶ",
            "何もしない",
        ],
        correct: 2,
        explanation: "有意抽出は、調査者の判断で意図的に特定の要素を選ぶ方法です。代表性に欠ける可能性があります。"
    },
    {
        id: 8,
        question: "サンプリングバイアス（標本抽出の偏り）とは何ですか。",
        options: [
            "標本が母集団を正しく代表していない偏り",
            "正しい標本",
            "無作為抽出",
            "何もない",
        ],
        correct: 1,
        explanation: "サンプリングバイアスは、標本の選び方に偏りがあり、母集団を正しく代表していない状態です。"
    },
    {
        id: 9,
        question: "インターネット調査で「自主的に回答した人だけ」を標本にすると、何が問題ですか。",
        options: [
            "正しい",
            "自主的に回答する人に偏り、母集団を代表しない",
            "必ず正確",
            "何もない",
        ],
        correct: 2,
        explanation: "自主的に回答する人だけでは、特定の意見を持つ人に偏り（自己選択バイアス）、母集団を代表しません。"
    },
    {
        id: 10,
        question: "無作為抽出を実際に行う方法はどれですか。",
        options: [
            "友達を選ぶ",
            "乱数表やコンピュータの乱数を使う",
            "最初の人を選ぶ",
            "適当に選ぶ",
        ],
        correct: 2,
        explanation: "乱数表やコンピュータで生成した乱数を使って、偏りなく無作為に抽出します。"
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
    examId: 'grade4-section9_sample_2',
    examTitle: '4級 Section9_Sample_2',
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
