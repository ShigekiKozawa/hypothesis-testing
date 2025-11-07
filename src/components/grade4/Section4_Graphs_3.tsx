import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section4Graphs3() {
  const questions: Question[] = [
    {
        id: 1,
        question: "2つのクラスのテスト結果の散らばりを比較するとき、どの指標を使いますか。",
        options: [
            "平均値",
            "範囲、四分位範囲、分散など",
            "データの個数",
            "最大値"
        ],
        correct: 2,
        explanation: "散らばりを比較するには、範囲、四分位範囲、分散、標準偏差などの散らばりの指標を使います。"
    },
    {
        id: 2,
        question: "2つのグループのデータがあります。A組:範囲20、B組:範囲30。どちらが散らばっていますか。",
        options: [
            "A組",
            "B組",
            "同じ",
            "判断できない"
        ],
        correct: 2,
        explanation: "範囲が大きいB組（30）の方が、データが散らばっています。"
    },
    {
        id: 3,
        question: "箱ひげ図を使って2つのデータを比較するとき、箱の長さ（IQR）が長いほど何を意味しますか。",
        options: [
            "中央値が大きい",
            "データの中央50%が散らばっている",
            "データ数が多い",
            "平均が大きい"
        ],
        correct: 2,
        explanation: "箱の長さ（四分位範囲IQR）が長いほど、データの中央50%が散らばっています。"
    },
    {
        id: 4,
        question: "散らばりが小さいとき、データの特徴はどうですか。",
        options: [
            "データが集中している（ばらつきが小さい）",
            "データが広がっている",
            "平均が大きい",
            "中央値が小さい"
        ],
        correct: 1,
        explanation: "散らばりが小さいとは、データが平均や中央値の近くに集中している状態です。"
    },
    {
        id: 5,
        question: "2つのデータセットがあり、平均は同じですが、範囲が異なります。この2つは何が違いますか。",
        options: [
            "中心の位置",
            "散らばりの程度",
            "データ数",
            "違いはない"
        ],
        correct: 2,
        explanation: "平均が同じでも範囲が異なる場合、散らばりの程度（ばらつき）が異なります。"
    },
    {
        id: 6,
        question: "ヒストグラムで、横に広がったグラフと縦に集中したグラフを比較したとき、散らばりが大きいのはどちらですか。",
        options: [
            "横に広がったグラフ",
            "縦に集中したグラフ",
            "同じ",
            "判断できない"
        ],
        correct: 1,
        explanation: "横に広がったグラフの方が、データが広い範囲に分布しており、散らばりが大きいです。"
    },
    {
        id: 7,
        question: "2つのクラスのテスト結果を比較します。A組:全員が70～80点、B組:30～100点。どちらが散らばっていますか。",
        options: [
            "A組",
            "B組",
            "同じ",
            "判断できない"
        ],
        correct: 2,
        explanation: "B組は30～100点と広範囲に分布しているので、A組より散らばっています。"
    },
    {
        id: 8,
        question: "2つの箱ひげ図を比較するとき、散らばりを判断するために見るべき部分はどれですか。",
        options: [
            "中央値の線の位置",
            "箱の長さ（IQR）とひげの長さ",
            "箱の色",
            "データ数"
        ],
        correct: 2,
        explanation: "箱の長さ（四分位範囲）とひげの長さ（範囲）を見ることで、散らばりの程度を比較できます。"
    },
    {
        id: 9,
        question: "全員が同じ点数を取ったテストと、点数がばらついたテストを比較したとき、散らばりが0なのはどちらですか。",
        options: [
            "全員が同じ点数のテスト",
            "点数がばらついたテスト",
            "両方",
            "どちらでもない"
        ],
        correct: 1,
        explanation: "全員が同じ点数の場合、範囲も四分位範囲も0になり、散らばりは0です。"
    },
    {
        id: 10,
        question: "2つのデータを比較するとき、散らばりだけでなく何を一緒に見ると良いですか。",
        options: [
            "データの色",
            "中心の位置（平均や中央値）",
            "調査の日時",
            "測定者の名前"
        ],
        correct: 2,
        explanation: "データを比較するときは、中心の位置（平均や中央値）と散らばり（範囲やIQRなど）の両方を見ることが重要です。"
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
    examId: 'grade4-section4_graphs_3',
    examTitle: '4級 Section4_Graphs_3',
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
