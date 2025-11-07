import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section5Probability2() {
  const questions: Question[] = [
    {
        id: 1,
        question: "場合の数とは何ですか。",
        options: [
            "平均値",
            "起こりうる全ての結果の個数",
            "確率",
            "データの個数",
        ],
        correct: 2,
        explanation: "場合の数とは、ある条件のもとで起こりうる全ての結果（場合）の個数です。"
    },
    {
        id: 2,
        question: "コインを2回投げるとき、起こりうる場合の数はいくつですか。",
        options: [
            "2通り",
            "3通り",
            "4通り",
            "6通り",
        ],
        correct: 3,
        explanation: "(表,表)(表,裏)(裏,表)(裏,裏)の4通りです。"
    },
    {
        id: 3,
        question: "サイコロを2回投げるとき、起こりうる場合の数はいくつですか。",
        options: [
            "12通り",
            "24通り",
            "36通り",
            "48通り",
        ],
        correct: 3,
        explanation: "1回目6通り × 2回目6通り = 36通りです。"
    },
    {
        id: 4,
        question: "A, B, Cの3人を1列に並べる方法は何通りありますか。",
        options: [
            "3通り",
            "4通り",
            "6通り",
            "9通り",
        ],
        correct: 3,
        explanation: "ABC, ACB, BAC, BCA, CAB, CBAの6通りです。3×2×1=6です。"
    },
    {
        id: 5,
        question: "1,2,3の3枚のカードから2枚を選んで並べる（順序あり）方法は何通りありますか。",
        options: [
            "3通り",
            "4通り",
            "6通り",
            "9通り",
        ],
        correct: 3,
        explanation: "(1,2)(1,3)(2,1)(2,3)(3,1)(3,2)の6通りです。3×2=6です。"
    },
    {
        id: 6,
        question: "赤、青、黄の3色の旗から2色を選ぶ（順序なし）方法は何通りありますか。",
        options: [
            "2通り",
            "3通り",
            "6通り",
            "9通り",
        ],
        correct: 2,
        explanation: "(赤,青)(赤,黄)(青,黄)の3通りです。順序を考えないので6÷2=3です。"
    },
    {
        id: 7,
        question: "積の法則とは何ですか。",
        options: [
            "確率を掛け算する",
            "複数の事柄が順に起こるとき、場合の数は各場合の数の積",
            "平均を掛ける",
            "データを掛け算",
        ],
        correct: 2,
        explanation: "積の法則：事柄AがmFIRST通り、事柄BがnR通りのとき、AとBが順に起こる場合の数はm×n通りです。"
    },
    {
        id: 8,
        question: "A,B,C,Dの4人から2人を選ぶ（順序なし）方法は何通りありますか。",
        options: [
            "4通り",
            "6通り",
            "12通り",
            "24通り",
        ],
        correct: 2,
        explanation: "4人から2人選ぶ組合せは4×3÷2=6通りです。"
    },
    {
        id: 9,
        question: "サイコロを1回投げて、3以下の目が出る場合の数はいくつですか。",
        options: [
            "1通り",
            "2通り",
            "3通り",
            "6通り",
        ],
        correct: 3,
        explanation: "1,2,3の3通りです。"
    },
    {
        id: 10,
        question: "5人の中から代表を1人選ぶ方法は何通りありますか。",
        options: [
            "1通り",
            "5通り",
            "10通り",
            "120通り",
        ],
        correct: 2,
        explanation: "5人のうち誰か1人を選ぶので5通りです。"
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
    examId: 'grade4-section5_probability_2',
    examTitle: '4級 Section5_Probability_2',
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
