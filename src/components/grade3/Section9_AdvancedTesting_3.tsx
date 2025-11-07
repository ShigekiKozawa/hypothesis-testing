import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section9AdvancedTesting3() {
  const questions: Question[] = [
    {
        id: 1,
        question: "実験計画で、対照群とは何ですか。",
        options: [
            "新しい処理を受けるグループ",
            "処理を受けないグループ（比較のための基準）",
            "最も大きいグループ",
            "最初に選ばれたグループ"
        ],
        correct: 2,
        explanation: "対照群は、処理を受けないグループで、実験群との比較のための基準となります。"
    },
    {
        id: 2,
        question: "実験群とは何ですか。",
        options: [
            "処理を受けないグループ",
            "新しい処理を受けるグループ",
            "全員が含まれるグループ",
            "ランダムに選ばれたグループ"
        ],
        correct: 2,
        explanation: "実験群は、新しい処理や介入を受けるグループです。"
    },
    {
        id: 3,
        question: "実験で、無作為化（ランダム化）を行う理由はどれですか。",
        options: [
            "簡単だから",
            "実験群と対照群の条件を揃えるため",
            "時間を節約するため",
            "費用を削減するため"
        ],
        correct: 2,
        explanation: "無作為化により、実験群と対照群の条件（年齢、性別など）が均等になり、公平な比較ができます。"
    },
    {
        id: 4,
        question: "新しい肥料の効果を調べる実験で、最も適切な方法はどれですか。",
        options: [
            "全ての畑に新しい肥料を使う",
            "新しい肥料を使う畑と使わない畑を無作為に分ける",
            "好きな畑だけ新しい肥料を使う",
            "最も良い畑だけ新しい肥料を使う"
        ],
        correct: 2,
        explanation: "無作為に分けることで、土地の条件などの影響を均等にし、肥料の効果を正しく評価できます。"
    },
    {
        id: 5,
        question: "実験で、他の条件を統制する（揃える）理由はどれですか。",
        options: [
            "見た目を良くするため",
            "調べたい要因以外の影響を排除するため",
            "データを増やすため",
            "時間を短縮するため"
        ],
        correct: 2,
        explanation: "他の条件を統制することで、調べたい要因（例：肥料の種類）の効果だけを正確に評価できます。"
    },
    {
        id: 6,
        question: "プラセボ効果とは何ですか。",
        options: [
            "薬の副作用",
            "実際には効果がない処理でも、効果があると信じることで改善が見られる現象",
            "実験の失敗",
            "測定誤差"
        ],
        correct: 2,
        explanation: "プラセボ効果は、実際には効果がない処理（偽薬など）でも、効果があると信じることで症状が改善する心理的な現象です。"
    },
    {
        id: 7,
        question: "二重盲検法とは何ですか。",
        options: [
            "実験を2回行う",
            "被験者も実験者も、どちらが実験群か対照群か知らない方法",
            "2つのグループに分ける",
            "2種類の処理を行う"
        ],
        correct: 2,
        explanation: "二重盲検法は、被験者も実験者も、どちらが実験群（本物）か対照群（プラセボ）か知らない状態で実験を行う方法です。"
    },
    {
        id: 8,
        question: "実験で、サンプルサイズ（標本サイズ）を大きくする理由はどれですか。",
        options: [
            "費用を増やすため",
            "偶然のばらつきの影響を小さくし、結果の信頼性を高めるため",
            "時間をかけるため",
            "複雑にするため"
        ],
        correct: 2,
        explanation: "サンプルサイズを大きくすると、偶然のばらつきの影響が小さくなり、結果の信頼性が高まります。"
    },
    {
        id: 9,
        question: "次のうち、実験計画として適切でないものはどれですか。",
        options: [
            "無作為化を行う",
            "対照群を設ける",
            "他の条件を統制する",
            "効果が出そうな人だけを実験群に入れる"
        ],
        correct: 4,
        explanation: "効果が出そうな人だけを実験群に入れると、公平な比較ができません。無作為化が必要です。"
    },
    {
        id: 10,
        question: "観察研究と実験研究の違いはどれですか。",
        options: [
            "観察研究は処理を加えない、実験研究は処理を加える",
            "観察研究は実験室で行う",
            "実験研究は費用が安い",
            "違いはない"
        ],
        correct: 1,
        explanation: "観察研究は自然な状態を観察するだけですが、実験研究は研究者が意図的に処理（介入）を加えて効果を調べます。"
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
    examId: 'grade3-section9_advancedtesting_3',
    examTitle: '3級 Section9_AdvancedTesting_3',
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
