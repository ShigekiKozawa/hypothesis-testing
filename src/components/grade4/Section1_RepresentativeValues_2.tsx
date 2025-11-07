import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section1RepresentativeValues2() {
  const questions: Question[] = [
    {
        id: 1,
        question: "棒グラフの特徴として正しいものはどれですか。",
        options: [
            "時間の変化を示すのに最適",
            "カテゴリー間の量を比較できる",
            "全体に対する割合を示す",
            "2つの変数の関係を示す"
        ],
        correct: 2,
        explanation: "棒グラフはカテゴリー間の量（度数）を比較するのに適しています。"
    },
    {
        id: 2,
        question: "円グラフが表すものとして最も適切なものはどれですか。",
        options: [
            "時間の推移",
            "全体に対する各カテゴリーの割合",
            "データの散らばり",
            "平均値"
        ],
        correct: 2,
        explanation: "円グラフは全体を100%として、各カテゴリーが占める割合を示します。"
    },
    {
        id: 3,
        question: "折れ線グラフが最も適している場面はどれですか。",
        options: [
            "血液型の割合を示す",
            "時間による気温の変化を示す",
            "身長の分布を示す",
            "2つのグループを比較する"
        ],
        correct: 2,
        explanation: "折れ線グラフは時系列データ（時間による変化）を示すのに最適です。"
    },
    {
        id: 4,
        question: "ヒストグラムの説明として正しいものはどれですか。",
        options: [
            "カテゴリーごとの度数を棒で示す",
            "連続データを階級に分けて度数を示す",
            "時間の推移を線で結ぶ",
            "全体の割合を円で示す"
        ],
        correct: 2,
        explanation: "ヒストグラムは連続データを階級に分けて、各階級の度数を棒で表します。"
    },
    {
        id: 5,
        question: "帯グラフ（100%積み上げ棒グラフ）の特徴はどれですか。",
        options: [
            "実数の大きさを比較する",
            "割合の比較に適している",
            "時系列の変化を示す",
            "相関関係を示す"
        ],
        correct: 2,
        explanation: "帯グラフは全体を100%として、各カテゴリーの割合を比較するのに適しています。"
    },
    {
        id: 6,
        question: "ドットプロット（度数分布図）の利点はどれですか。",
        options: [
            "個々のデータ点を確認できる",
            "大量のデータに適している",
            "時系列の変化が明確",
            "全体の割合が分かりやすい"
        ],
        correct: 1,
        explanation: "ドットプロットは個々のデータ点を確認しながら分布を視覚化できる利点があります。"
    },
    {
        id: 7,
        question: "散布図が示すものはどれですか。",
        options: [
            "1つの変数の分布",
            "2つの変数の関係",
            "時間の推移",
            "カテゴリーの割合"
        ],
        correct: 2,
        explanation: "散布図は2つの量的変数の関係（相関）を視覚化します。"
    },
    {
        id: 8,
        question: "次のグラフのうち、質的データを表すのに適していないものはどれですか。",
        options: [
            "棒グラフ",
            "円グラフ",
            "ヒストグラム",
            "帯グラフ"
        ],
        correct: 3,
        explanation: "ヒストグラムは連続した量的データの分布を示すグラフで、質的データには適していません。"
    },
    {
        id: 9,
        question: "複数のグループの分布を同時に比較するのに最も適したグラフはどれですか。",
        options: [
            "円グラフ",
            "箱ひげ図",
            "折れ線グラフ",
            "ドットプロット"
        ],
        correct: 2,
        explanation: "箱ひげ図は複数のグループのデータ分布（中央値、四分位範囲など）を同時に比較できます。"
    },
    {
        id: 10,
        question: "棒グラフとヒストグラムの違いとして正しいものはどれですか。",
        options: [
            "棒グラフは質的データ、ヒストグラムは量的データに使う",
            "棒グラフは時系列、ヒストグラムは割合を示す",
            "両者に違いはない",
            "棒グラフは連続、ヒストグラムは離散データに使う"
        ],
        correct: 1,
        explanation: "棒グラフは質的データ（カテゴリーデータ）、ヒストグラムは量的データ（連続データ）の分布を示します。"
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
    examId: 'grade4-section1_representativevalues_2',
    examTitle: '4級 Section1_RepresentativeValues_2',
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
