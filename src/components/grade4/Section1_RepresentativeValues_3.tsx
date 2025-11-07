import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section1RepresentativeValues3() {
  const questions: Question[] = [
    {
        id: 1,
        question: "次の調査項目で、量的データはいくつありますか。\n\nA. 年齢\nB. 性別\nC. 体重\nD. 好きな色\nE. テストの点数",
        options: [
            "2つ",
            "3つ",
            "4つ",
            "5つ"
        ],
        correct: 2,
        explanation: "年齢、体重、テストの点数の3つが量的データです。"
    },
    {
        id: 2,
        question: "ある学校の部活動別の部員数を示すのに最も適したグラフはどれですか。",
        options: [
            "折れ線グラフ",
            "円グラフ",
            "棒グラフ",
            "散布図"
        ],
        correct: 3,
        explanation: "カテゴリー別の度数を比較するには棒グラフが適しています。"
    },
    {
        id: 3,
        question: "1ヶ月間の気温の変化を記録しました。このデータを表すのに最も適したグラフはどれですか。",
        options: [
            "円グラフ",
            "棒グラフ",
            "折れ線グラフ",
            "ヒストグラム"
        ],
        correct: 3,
        explanation: "時間による変化（時系列データ）を示すには折れ線グラフが適しています。"
    },
    {
        id: 4,
        question: "クラス全体の身長の分布を調べたいとき、最も適したグラフはどれですか。",
        options: [
            "円グラフ",
            "ヒストグラム",
            "折れ線グラフ",
            "帯グラフ"
        ],
        correct: 2,
        explanation: "連続データの分布を示すにはヒストグラムが適しています。"
    },
    {
        id: 5,
        question: "次のうち、データの個々の値を保持しながら分布を示せるグラフはどれですか。",
        options: [
            "ヒストグラム",
            "箱ひげ図",
            "ドットプロット",
            "円グラフ"
        ],
        correct: 3,
        explanation: "ドットプロットは個々のデータ点を保持しながら分布を視覚化できます。"
    },
    {
        id: 6,
        question: "産業別就業者の割合を示すのに最も適したグラフはどれですか。",
        options: [
            "折れ線グラフ",
            "円グラフ",
            "散布図",
            "箱ひげ図"
        ],
        correct: 2,
        explanation: "全体に対する各カテゴリーの割合を示すには円グラフが適しています。"
    },
    {
        id: 7,
        question: "次のデータで質的データはどれですか。\n\nA. 郵便番号\nB. 気温\nC. 身長\nD. 体重",
        options: [
            "A",
            "B",
            "C",
            "D"
        ],
        correct: 1,
        explanation: "郵便番号は数字ですが計算に意味がないため質的データです。"
    },
    {
        id: 8,
        question: "2つのクラスの数学のテスト結果を比較するのに適したグラフはどれですか。",
        options: [
            "円グラフ",
            "箱ひげ図",
            "帯グラフ",
            "散布図"
        ],
        correct: 2,
        explanation: "箱ひげ図は複数のグループの分布を比較するのに適しています。"
    },
    {
        id: 9,
        question: "次のグラフのうち、時系列データの表示に最も適していないものはどれですか。",
        options: [
            "折れ線グラフ",
            "積み上げ面グラフ",
            "円グラフ",
            "棒グラフ（時系列）"
        ],
        correct: 3,
        explanation: "円グラフは割合を示すグラフで、時系列データの表示には適していません。"
    },
    {
        id: 10,
        question: "相関関係を調べるのに最も適したグラフはどれですか。",
        options: [
            "散布図",
            "ヒストグラム",
            "円グラフ",
            "箱ひげ図"
        ],
        correct: 1,
        explanation: "2つの変数の相関関係を調べるには散布図が最適です。"
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
    examId: 'grade4-section1_representativevalues_3',
    examTitle: '4級 Section1_RepresentativeValues_3',
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
