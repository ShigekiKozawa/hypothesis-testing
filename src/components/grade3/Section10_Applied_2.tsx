import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section10Applied2() {
  const questions: Question[] = [
    {
        id: 1,
        question: "点推定とは何ですか。",
        options: [
            "母集団のパラメータを1つの値で推定する",
            "母集団のパラメータを区間で推定する",
            "標本を選ぶ方法",
            "グラフを描く方法"
        ],
        correct: 1,
        explanation: "点推定は、標本から得られた統計量を用いて、母集団のパラメータ（母平均など）を1つの値で推定することです。"
    },
    {
        id: 2,
        question: "母平均μの点推定値として最も一般的なものはどれですか。",
        options: [
            "標本の最大値",
            "標本平均",
            "標本の中央値",
            "標本の範囲"
        ],
        correct: 2,
        explanation: "母平均の点推定値としては、標本平均が最も一般的に使われます。"
    },
    {
        id: 3,
        question: "区間推定とは何ですか。",
        options: [
            "母集団のパラメータを1つの値で推定する",
            "母集団のパラメータを含むと考えられる区間を推定する",
            "標本のばらつきを計算する",
            "データを区間に分ける"
        ],
        correct: 2,
        explanation: "区間推定は、母集団のパラメータが含まれると考えられる区間（信頼区間）を推定することです。"
    },
    {
        id: 4,
        question: "95%信頼区間とは何ですか。",
        options: [
            "データの95%が含まれる区間",
            "同じ方法で何度も標本を取ったとき、約95%の確率で母平均が含まれる区間",
            "母平均の95%の値",
            "標本平均の95%"
        ],
        correct: 2,
        explanation: "95%信頼区間は、同じ方法で何度も標本抽出を行ったとき、約95%の確率で真の母平均が含まれる区間です。"
    },
    {
        id: 5,
        question: "信頼区間の幅に影響する要因はどれですか。",
        options: [
            "標本サイズと信頼度",
            "データの色",
            "グラフの種類",
            "調査の日時"
        ],
        correct: 1,
        explanation: "信頼区間の幅は、標本サイズ（大きいほど狭くなる）と信頼度（高いほど広くなる）に影響されます。"
    },
    {
        id: 6,
        question: "標本サイズを大きくすると、信頼区間の幅はどうなりますか。",
        options: [
            "広くなる",
            "狭くなる",
            "変わらない",
            "2倍になる"
        ],
        correct: 2,
        explanation: "標本サイズを大きくすると、推定の精度が上がり、信頼区間の幅は狭くなります。"
    },
    {
        id: 7,
        question: "信頼度を95%から99%に上げると、信頼区間の幅はどうなりますか。",
        options: [
            "広くなる",
            "狭くなる",
            "変わらない",
            "半分になる"
        ],
        correct: 1,
        explanation: "信頼度を上げると、より確実に母平均を含むために、信頼区間の幅は広くなります。"
    },
    {
        id: 8,
        question: "次のうち、点推定の欠点はどれですか。",
        options: [
            "計算が複雑",
            "推定値の信頼性や精度がわからない",
            "常に正確",
            "時間がかかる"
        ],
        correct: 2,
        explanation: "点推定は1つの値を示すだけで、その推定値がどれくらい信頼できるか（精度）がわかりません。"
    },
    {
        id: 9,
        question: "区間推定の利点はどれですか。",
        options: [
            "計算が簡単",
            "推定の不確実性（精度）を示せる",
            "常に正確",
            "1つの値だけ示す"
        ],
        correct: 2,
        explanation: "区間推定は、信頼区間の幅により推定の不確実性や精度を示すことができます。"
    },
    {
        id: 10,
        question: "標本から母平均を推定するとき、推定値が母平均と完全に一致することは稀です。その理由はどれですか。",
        options: [
            "計算ミス",
            "標本誤差（偶然のばらつき）があるから",
            "測定器の故障",
            "調査員の能力不足"
        ],
        correct: 2,
        explanation: "標本は母集団の一部なので、偶然のばらつき（標本誤差）により、推定値は母平均と完全には一致しません。"
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
    examId: 'grade3-section10_applied_2',
    examTitle: '3級 Section10_Applied_2',
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
