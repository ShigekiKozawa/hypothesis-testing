import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section10DataCollection3() {
  const questions: Question[] = [
    {
        id: 1,
        question: "横断研究とは何ですか。",
        options: [
            "長期間追跡する",
            "ある時点でのデータを一度に集める研究",
            "必ず実験",
            "何もない",
        ],
        correct: 2,
        explanation: "横断研究は、ある特定の時点で、複数の対象のデータを一度に集める研究です。"
    },
    {
        id: 2,
        question: "縦断研究（追跡研究）とは何ですか。",
        options: [
            "一度だけ調査する",
            "同じ対象を長期間にわたって追跡調査する研究",
            "必ず実験",
            "何もない",
        ],
        correct: 2,
        explanation: "縦断研究は、同じ対象を長期間にわたって繰り返し調査し、変化を追跡する研究です。"
    },
    {
        id: 3,
        question: "縦断研究の利点は何ですか。",
        options: [
            "簡単で短時間",
            "時間的な変化や因果関係を調べやすい",
            "費用がかからない",
            "何もない",
        ],
        correct: 2,
        explanation: "縦断研究は、時間的な変化や因果関係の方向を調べやすい利点があります。"
    },
    {
        id: 4,
        question: "縦断研究の欠点は何ですか。",
        options: [
            "何もない",
            "時間・費用がかかり、対象者が脱落する可能性がある",
            "必ず横断研究より良い",
            "判断できない",
        ],
        correct: 2,
        explanation: "縦断研究は、長期間の追跡が必要で、時間・費用がかかり、対象者が途中で脱落する欠点があります。"
    },
    {
        id: 5,
        question: "コホート研究とは何ですか。",
        options: [
            "一度だけ調査",
            "特定の集団（コホート）を長期間追跡する縦断研究",
            "必ず実験",
            "何もない",
        ],
        correct: 2,
        explanation: "コホート研究は、特定の集団（例：同じ年に生まれた人）を長期間追跡する縦断研究です。"
    },
    {
        id: 6,
        question: "データ収集で、記録ミスや測定エラーを防ぐにはどうすれば良いですか。",
        options: [
            "何もしない",
            "測定方法を統一し、複数回確認する",
            "適当に測る",
            "判断できない",
        ],
        correct: 2,
        explanation: "測定方法を統一し、複数回確認することで、記録ミスや測定エラーを防げます。"
    },
    {
        id: 7,
        question: "データの信頼性とは何ですか。",
        options: [
            "データの量",
            "同じ測定を繰り返したとき、同じ結果が得られる一貫性",
            "必ず正しい",
            "何もない",
        ],
        correct: 2,
        explanation: "データの信頼性（再現性）は、同じ測定を繰り返したとき、同じ結果が得られる一貫性のことです。"
    },
    {
        id: 8,
        question: "データの妥当性とは何ですか。",
        options: [
            "データの量",
            "測定したいものを正しく測定できているか",
            "必ず信頼性と同じ",
            "何もない",
        ],
        correct: 2,
        explanation: "データの妥当性は、測定したいもの（例：学力）を正しく測定できているかを示します。"
    },
    {
        id: 9,
        question: "調査票（アンケート）を作成するとき、注意すべきことは何ですか。",
        options: [
            "複雑な質問にする",
            "質問は明確で、誘導や二重質問を避ける",
            "必ず難しくする",
            "何もない",
        ],
        correct: 2,
        explanation: "質問は明確で、誘導質問（特定の答えに誘導）や二重質問（2つの内容を1つで聞く）を避けるべきです。"
    },
    {
        id: 10,
        question: "データ収集の倫理で重要なことは何ですか。",
        options: [
            "何もない",
            "対象者の同意を得て、プライバシーを保護する",
            "必ず秘密にしない",
            "判断できない",
        ],
        correct: 2,
        explanation: "対象者のインフォームド・コンセント（説明と同意）を得て、個人情報やプライバシーを保護することが重要です。"
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
    examId: 'grade4-section10_datacollection_3',
    examTitle: '4級 Section10_DataCollection_3',
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
