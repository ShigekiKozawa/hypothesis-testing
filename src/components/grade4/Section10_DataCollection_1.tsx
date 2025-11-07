import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section10DataCollection1() {
  const questions: Question[] = [
    {
        id: 1,
        question: "データの種類で、量的データとは何ですか。",
        options: [
            "カテゴリーで分類されるデータ",
            "数値で測定できるデータ",
            "文字データ",
            "画像データ",
        ],
        correct: 2,
        explanation: "量的データは、身長、体重、点数など、数値で測定できるデータです。"
    },
    {
        id: 2,
        question: "データの種類で、質的データとは何ですか。",
        options: [
            "数値で測定できるデータ",
            "カテゴリーや属性で分類されるデータ",
            "必ず数字",
            "何もない",
        ],
        correct: 2,
        explanation: "質的データは、性別、血液型、好きな色など、カテゴリーや属性で分類されるデータです。"
    },
    {
        id: 3,
        question: "次のうち、量的データはどれですか。",
        options: [
            "血液型",
            "好きな色",
            "身長",
            "出身地",
        ],
        correct: 3,
        explanation: "身長は数値で測定できる量的データです。他は質的データです。"
    },
    {
        id: 4,
        question: "次のうち、質的データはどれですか。",
        options: [
            "体重",
            "テストの点数",
            "性別",
            "気温",
        ],
        correct: 3,
        explanation: "性別はカテゴリーで分類される質的データです。他は量的データです。"
    },
    {
        id: 5,
        question: "量的データの中で、離散データとは何ですか。",
        options: [
            "連続的な値",
            "とびとびの値（整数など）",
            "必ず小数",
            "カテゴリー",
        ],
        correct: 2,
        explanation: "離散データは、人数、個数など、とびとびの値を取る量的データです。"
    },
    {
        id: 6,
        question: "量的データの中で、連続データとは何ですか。",
        options: [
            "とびとびの値",
            "連続的な値（小数を含む）",
            "必ず整数",
            "カテゴリー",
        ],
        correct: 2,
        explanation: "連続データは、身長、体重、時間など、連続的な値を取る量的データです。"
    },
    {
        id: 7,
        question: "次のうち、離散データはどれですか。",
        options: [
            "身長",
            "体重",
            "クラスの人数",
            "気温",
        ],
        correct: 3,
        explanation: "クラスの人数は整数でとびとびの値を取る離散データです。"
    },
    {
        id: 8,
        question: "次のうち、連続データはどれですか。",
        options: [
            "サイコロの目",
            "家族の人数",
            "100m走のタイム",
            "血液型",
        ],
        correct: 3,
        explanation: "100m走のタイムは連続的な値を取る連続データです。"
    },
    {
        id: 9,
        question: "順序尺度とは何ですか。",
        options: [
            "順序に意味がある質的データ（大中小、満足度など）",
            "順序に意味がない",
            "必ず数値",
            "何もない",
        ],
        correct: 1,
        explanation: "順序尺度は、満足度（高・中・低）、成績（優・良・可）など、順序に意味がある質的データです。"
    },
    {
        id: 10,
        question: "名義尺度とは何ですか。",
        options: [
            "順序に意味がある",
            "順序に意味がない質的データ（血液型、性別など）",
            "必ず数値",
            "何もない",
        ],
        correct: 2,
        explanation: "名義尺度は、血液型、性別など、単に分類するだけで順序に意味がない質的データです。"
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
    examId: 'grade4-section10_datacollection_1',
    examTitle: '4級 Section10_DataCollection_1',
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
