import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section2Probability1() {
  const questions: Question[] = [
    {
      id: 1,
      question: "次のデータの平均値を求めてください。\n\nデータ: 2, 4, 6, 8, 10",
      options: ["4", "5", "6", "7"],
      correct: 3,
      explanation: "平均値 = (2+4+6+8+10) ÷ 5 = 30 ÷ 5 = 6 です。"
    },
    {
      id: 2,
      question: "次のデータの中央値を求めてください。\n\nデータ: 3, 7, 5, 9, 11",
      options: ["5", "7", "9", "11"],
      correct: 2,
      explanation: "データを小さい順に並べると 3, 5, 7, 9, 11 となり、真ん中の値は 7 です。"
    },
    {
      id: 3,
      question: "次のデータの最頻値（モード）を求めてください。\n\nデータ: 2, 3, 3, 4, 5, 3, 6",
      options: ["2", "3", "4", "5"],
      correct: 2,
      explanation: "最頻値は最も多く出現する値です。3が3回出現しており、最頻値は 3 です。"
    },
    {
      id: 4,
      question: "10人のテストの点数が以下の通りです。中央値はいくつですか。\n\n点数: 55, 60, 65, 70, 75, 80, 85, 90, 95, 100",
      options: ["72.5", "75", "77.5", "80"],
      correct: 3,
      explanation: "データ数が偶数（10個）なので、中央値は5番目（75点）と6番目（80点）の平均値です。(75+80) ÷ 2 = 77.5点 です。"
    },
    {
      id: 5,
      question: "次の度数分布表において、中央値が含まれる階級はどれですか。\n\n【20人のテスト結果】\n0〜20点: 2人\n20〜40点: 5人\n40〜60点: 8人\n60〜80点: 3人\n80〜100点: 2人",
      options: [
        "0〜20点",
        "20〜40点",
        "40〜60点",
        "60〜80点"
      ],
      correct: 3,
      explanation: "20人のデータなので、中央値は10番目と11番目の平均です。累積度数で見ると、2+5=7人が40点未満、2+5+8=15人が60点未満なので、10番目と11番目はともに40〜60点の階級に含まれます。"
    },
    {
      id: 6,
      question: "次の度数分布表から、平均値を計算してください。（階級値を使って計算します）\n\n【小テストの点数（10人）】\n0〜2点: 1人\n2〜4点: 3人\n4〜6点: 4人\n6〜8点: 2人\n\n階級値: 1, 3, 5, 7",
      options: ["3.8点", "4.0点", "4.4点", "4.8点"],
      correct: 3,
      explanation: "平均値 = (1×1 + 3×3 + 5×4 + 7×2) ÷ 10 = (1+9+20+14) ÷ 10 = 44 ÷ 10 = 4.4点 です。"
    },
    {
      id: 7,
      question: "幹葉図（茎葉図）について、正しい記述を選んでください。\n\nI. 幹（茎）は十の位、葉は一の位を表すことが多い\nII. 元のデータの値を失わずに分布を表現できる\nIII. データ数が多い場合でもコンパクトに表現できる",
      options: [
        "IとIIのみ",
        "IとIIIのみ",
        "IIとIIIのみ",
        "すべて正しい"
      ],
      correct: 4,
      explanation: "すべて正しい記述です。幹葉図は元のデータの値を保持しながら、分布の形も視覚的に示せる優れた表現方法です。"
    },
    {
      id: 8,
      question: "次のデータについて、平均値と中央値の関係はどれですか。\n\nデータ: 1, 2, 3, 4, 100",
      options: [
        "平均値 < 中央値",
        "平均値 = 中央値",
        "平均値 > 中央値",
        "比較できない"
      ],
      correct: 3,
      explanation: "平均値 = (1+2+3+4+100) ÷ 5 = 110 ÷ 5 = 22、中央値 = 3 です。外れ値（100）の影響で平均値が中央値より大きくなっています。"
    },
    {
      id: 9,
      question: "度数分布表を作成する際の注意点として、正しいものを選んでください。\n\nI. 階級の幅はすべて等しくするのが一般的\nII. 階級の数は多すぎても少なすぎても分布の特徴がわかりにくい\nIII. 階級の境界値がデータの値と重なる場合は、上の階級に含める",
      options: [
        "IとIIのみ",
        "IとIIIのみ",
        "IIとIIIのみ",
        "すべて正しい"
      ],
      correct: 1,
      explanation: "IとIIは正しい。IIIは慣例によりますが、一般的には「以上〜未満」または「より大きい〜以下」のように境界を明確に定義します。上の階級に含めるとは限りません。"
    },
    {
      id: 10,
      question: "次の代表値について、外れ値の影響を最も受けにくいのはどれですか。",
      options: [
        "平均値",
        "中央値",
        "最頻値",
        "範囲"
      ],
      correct: 2,
      explanation: "中央値は外れ値の影響を受けにくい統計量です。平均値は外れ値の影響を強く受けます。最頻値は外れ値の影響を受けにくいですが、データによっては複数存在したり存在しなかったりします。"
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
    examId: 'grade3-section2_probability_1',
    examTitle: '3級 Section2_Probability_1',
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
