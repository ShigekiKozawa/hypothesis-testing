import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section2Dispersion3() {
  const questions: Question[] = [
    {
        id: 1,
        question: "右に裾が長い分布（右に歪んだ分布）のとき、平均値と中央値の大小関係はどうなりますか。",
        options: [
            "平均値<中央値",
            "平均値=中央値",
            "平均値>中央値",
            "判断できない"
        ],
        correct: 3,
        explanation: "右に裾が長い分布では、極端に大きい値に引っ張られて平均値>中央値となります。"
    },
    {
        id: 2,
        question: "次のデータに外れ値（100）が追加されたとき、最も大きく変化する代表値はどれですか。\n\n元のデータ: 10, 12, 15, 18, 20",
        options: [
            "平均値",
            "中央値",
            "最頻値",
            "中央値と最頻値は変わらない"
        ],
        correct: 1,
        explanation: "平均値は全てのデータの影響を受けるため、外れ値が加わると大きく変化します。中央値は順序だけを見るので影響が小さいです。"
    },
    {
        id: 3,
        question: "度数分布表から中央値が含まれる階級を見つけるには、何を利用しますか。",
        options: [
            "度数",
            "相対度数",
            "累積度数",
            "階級値"
        ],
        correct: 3,
        explanation: "累積度数を使って、全体の50%の位置（中央値）が含まれる階級を特定します。"
    },
    {
        id: 4,
        question: "次の場合、データの代表値として最も適切なものはどれですか。\n\n「クラスのテストの点数で、ほとんどの生徒は60~80点だが、1人だけ0点がいる」",
        options: [
            "平均値",
            "中央値",
            "最頻値",
            "最大値"
        ],
        correct: 2,
        explanation: "外れ値（0点）がある場合、影響を受けにくい中央値が適切です。"
    },
    {
        id: 5,
        question: "全てのデータに同じ数（例えば10）を足すと、平均値はどうなりますか。",
        options: [
            "変わらない",
            "10増える",
            "10減る",
            "2倍になる"
        ],
        correct: 2,
        explanation: "全てのデータに同じ数を足すと、平均値も同じだけ増えます。"
    },
    {
        id: 6,
        question: "全てのデータを2倍にすると、平均値はどうなりますか。",
        options: [
            "変わらない",
            "2増える",
            "2倍になる",
            "半分になる"
        ],
        correct: 3,
        explanation: "全てのデータを定数倍すると、平均値も同じ倍率になります。"
    },
    {
        id: 7,
        question: "次のヒストグラムで、平均値が最も大きくなるのはどれですか。",
        options: [
            "左に裾が長い分布",
            "左右対称な分布",
            "右に裾が長い分布",
            "一様分布"
        ],
        correct: 3,
        explanation: "右に裾が長い分布では、大きな値に引っ張られて平均値が大きくなります。"
    },
    {
        id: 8,
        question: "度数分布表で、最頻階級の階級値を代表値として使うことの利点は何ですか。",
        options: [
            "計算が簡単",
            "最も多くのデータが集まっている階級の中心を表せる",
            "外れ値の影響を受けない",
            "すべてのデータを考慮できる"
        ],
        correct: 2,
        explanation: "最頻階級の階級値は、最も多くのデータが集まっている階級の中心を表すため、分布の特徴を捉えやすいです。"
    },
    {
        id: 9,
        question: "20人のデータの平均値が50、30人のデータの平均値が70のとき、全体50人の平均値はいくらですか。",
        options: [
            "60",
            "62",
            "65",
            "70"
        ],
        correct: 2,
        explanation: "(50×20+70×30)÷50=(1000+2100)÷50=3100÷50=62です。これを加重平均と言います。"
    },
    {
        id: 10,
        question: "次のうち、データの「ばらつき」を表す指標はどれですか。",
        options: [
            "平均値",
            "中央値",
            "範囲",
            "最頻値"
        ],
        correct: 3,
        explanation: "範囲（レンジ）=最大値-最小値で、データのばらつきを表す指標です。平均値、中央値、最頻値は代表値で中心傾向を表します。"
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
    examId: 'grade4-section2_dispersion_3',
    examTitle: '4級 Section2_Dispersion_3',
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
