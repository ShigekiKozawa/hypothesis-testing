import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section5ANOVA2() {
  const questions: Question[] = [
    {
        id: 1,
        question: "10人の英語と数学の得点から相関係数を計算したところ、r=0.9でした。これについて正しい記述を選んでください。",
        options: [
            "英語が得意な人は数学も得意な傾向が強い",
            "英語の点数が高い人は必ず数学も高い",
            "因果関係がある",
            "比例関係にある"
        ],
        correct: 1,
        explanation: "相関係数r=0.9は強い正の相関を示し、「英語が得意な人は数学も得意な傾向が強い」と言えますが、必ずそうとは限らず、因果関係や比例関係を意味するものではありません。"
    },
    {
        id: 2,
        question: "気温とアイスクリームの売上の相関係数を計算したところr=0.7でした。これについて正しい解釈を選んでください。",
        options: [
            "気温が高いとアイスクリームの売上も高い傾向がある",
            "気温がアイスクリームの売上の原因である",
            "完全な比例関係",
            "因果関係が証明された"
        ],
        correct: 1,
        explanation: "相関係数r=0.7は正の相関を示しますが、これは傾向を表すだけで、因果関係や比例関係を証明するものではありません。"
    },
    {
        id: 3,
        question: "次の散布図のうち、相関係数が最も0に近いものはどれですか。",
        options: [
            "右上がりの直線状",
            "右下がりの直線状",
            "円形にランダムに散らばっている",
            "放物線状"
        ],
        correct: 3,
        explanation: "円形にランダムに散らばっている場合、xとyの間に線形的な関係がないため、相関係数は0に近くなります。"
    },
    {
        id: 4,
        question: "共分散と相関係数の関係について、正しい記述を選んでください。",
        options: [
            "共分散=相関係数",
            "相関係数=共分散÷(xの標準偏差×yの標準偏差)",
            "共分散=相関係数の2乗",
            "関係ない"
        ],
        correct: 2,
        explanation: "相関係数は、共分散をxとyの標準偏差の積で割った値です。これにより、相関係数は単位に依存しない-1から1の値になります。"
    },
    {
        id: 5,
        question: "散布図で、点が右下がりの直線に近い形で分布しています。相関係数の値として最も適切なものを選んでください。",
        options: [
            "約0.8",
            "約0.2",
            "約-0.8",
            "約0"
        ],
        correct: 3,
        explanation: "右下がりの直線に近い形は強い負の相関を示すため、相関係数は-1に近い値、例えば-0.8程度になります。"
    },
    {
        id: 6,
        question: "2つの変数xとyについて、xを2倍してから相関係数を計算すると、元の相関係数とどうなりますか。",
        options: [
            "2倍になる",
            "半分になる",
            "変わらない",
            "必ず0になる"
        ],
        correct: 3,
        explanation: "相関係数はデータの一次変換（定数倍や定数の加減）に対して不変です。xを2倍しても相関係数は変わりません。"
    },
    {
        id: 7,
        question: "アイスクリームの売上と水難事故の件数に正の相関がありました。これについて正しい解釈を選んでください。",
        options: [
            "アイスクリームを食べると水難事故が増える",
            "水難事故が増えるとアイスクリームが売れる",
            "両方とも気温という第3の変数と関連している可能性がある",
            "偶然の一致"
        ],
        correct: 3,
        explanation: "これは疑似相関の典型例です。両方とも気温が高いと増えるため、見かけ上の相関が生じています。相関≠因果であり、第3の変数（交絡因子）を考慮する必要があります。"
    },
    {
        id: 8,
        question: "相関係数を計算する際の注意点として、正しいものを選んでください。",
        options: [
            "外れ値の影響を受けにくい",
            "非線形関係も正確に捉えられる",
            "線形関係の強さを示すが、非線形関係は捉えられない",
            "因果関係を証明できる"
        ],
        correct: 3,
        explanation: "相関係数は線形（直線的）関係の強さを示す指標です。非線形関係（曲線的な関係）は捉えられず、また因果関係を証明するものでもありません。"
    },
    {
        id: 9,
        question: "都道府県別のコンビニ店舗数と人口の相関係数を計算したところr=0.95でした。これについて正しい記述を選んでください。",
        options: [
            "人口が多い都道府県ほどコンビニ店舗数も多い傾向が非常に強い",
            "人口がコンビニ店舗数の原因である",
            "完全に比例している",
            "必ず人口÷10がコンビニ店舗数になる"
        ],
        correct: 1,
        explanation: "相関係数r=0.95は非常に強い正の相関を示しますが、これは傾向を表すだけで、因果関係、完全な比例、具体的な比率を意味するものではありません。"
    },
    {
        id: 10,
        question: "次のうち、相関係数が負になる可能性が最も高い組み合わせはどれですか。",
        options: [
            "身長と体重",
            "気温とアイスクリームの売上",
            "車の速度と到着時間",
            "勉強時間とテストの点数"
        ],
        correct: 3,
        explanation: "車の速度が速いと到着時間は短くなるため、負の相関になります。他の選択肢はすべて正の相関が予想されます。"
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
    examId: 'grade3-section5_anova_2',
    examTitle: '3級 Section5_ANOVA_2',
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
