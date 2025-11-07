import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section5ANOVA3() {
  const questions: Question[] = [
    {
        id: 1,
        question: "散布図を見ると、データが2つのグループに分かれて分布していました。全体の相関係数と各グループ内の相関係数について、正しい記述を選んでください。",
        options: [
            "全体の相関係数の方が常に大きい",
            "各グループ内の相関係数の方が常に大きい",
            "どちらが大きいかは状況による",
            "必ず等しい"
        ],
        correct: 3,
        explanation: "これはシンプソンのパラドックスに関連する問題です。グループ分けによって、全体の相関と部分の相関が異なる場合があります。"
    },
    {
        id: 2,
        question: "相関係数r=0.3のとき、決定係数R²はいくらですか。",
        options: [
            "0.09",
            "0.3",
            "0.6",
            "0.9"
        ],
        correct: 1,
        explanation: "決定係数R²は相関係数の2乗です。R² = 0.3² = 0.09 です。R²は「一方の変数で他方の変数の変動の何%を説明できるか」を示します。"
    },
    {
        id: 3,
        question: "ある散布図で、点が完全に右上がりの直線上に並んでいます。この場合の相関係数はいくらですか。",
        options: [
            "0",
            "0.5",
            "0.9",
            "1"
        ],
        correct: 4,
        explanation: "点が完全に右上がりの直線上に並んでいる場合、完全な正の相関があるため、相関係数r=1です。"
    },
    {
        id: 4,
        question: "次の記述のうち、正しいものを選んでください。",
        options: [
            "相関係数が大きいほど因果関係が強い",
            "相関係数が0.5以上なら因果関係がある",
            "相関があっても因果関係があるとは限らない",
            "因果関係がなければ相関もない"
        ],
        correct: 3,
        explanation: "相関と因果は別の概念です。相関があっても、①逆の因果、②第3の変数（交絡因子）、③偶然などの可能性があり、因果関係があるとは限りません。"
    },
    {
        id: 5,
        question: "50人のデータから身長と体重の相関係数を計算したところr=0.7でした。このうち外れ値1人（身長は平均的だが体重が極端に重い）を除いて計算し直すと、相関係数はどうなると予想されますか。",
        options: [
            "必ず大きくなる",
            "必ず小さくなる",
            "大きくなる可能性が高い",
            "判断できない"
        ],
        correct: 3,
        explanation: "この外れ値は直線関係から外れているため、除去すると相関係数が大きくなる（より直線的になる）可能性が高いです。ただし、必ずそうなるとは限りません。"
    },
    {
        id: 6,
        question: "学力テストの国語と数学の得点の相関係数がr=0.6でした。これについて誤った解釈を選んでください。",
        options: [
            "国語が得意な人は数学も得意な傾向がある",
            "国語の点数で数学の点数の36%を説明できる",
            "国語の点数が高いと必ず数学も高い",
            "中程度の正の相関がある"
        ],
        correct: 3,
        explanation: "相関係数r=0.6は中程度の正の相関を示しますが、「必ず」高いとは言えません。相関は傾向を示すものであり、例外は存在します。"
    },
    {
        id: 7,
        question: "散布図で、xが小さい範囲では正の相関、xが大きい範囲では負の相関が見られました。このような場合、全体の相関係数はどうなりますか。",
        options: [
            "正になる",
            "負になる",
            "0に近くなる",
            "1になる"
        ],
        correct: 3,
        explanation: "正の部分と負の部分が相殺されるため、全体の相関係数は0に近くなります。これは相関係数が線形関係のみを捉える限界の例です。"
    },
    {
        id: 8,
        question: "次のうち、疑似相関（見かけ上の相関）の例として最も適切なものを選んでください。",
        options: [
            "身長と体重の正の相関",
            "気温とアイスクリームの売上の正の相関",
            "靴のサイズと語彙力の正の相関（子供のデータ）",
            "勉強時間とテストの点数の正の相関"
        ],
        correct: 3,
        explanation: "靴のサイズと語彙力の相関は、年齢という第3の変数によって生じる疑似相関です。年齢が上がると両方とも増えるため、見かけ上の相関が生じます。"
    },
    {
        id: 9,
        question: "相関係数を正しく解釈するために必要なことを選んでください。\\n\\nI. 散布図を確認する\\nII. 外れ値の有無を確認する\\nIII. 因果関係を仮定する",
        options: [
            "IとIIのみ",
            "IとIIIのみ",
            "IIとIIIのみ",
            "すべて"
        ],
        correct: 1,
        explanation: "IとIIは正しいです。散布図で分布の形状を確認し、外れ値の影響を考慮することが重要です。IIIは誤りで、相関から因果関係を仮定してはいけません。"
    },
    {
        id: 10,
        question: "次の記述のうち、正しいものを選んでください。",
        options: [
            "相関係数が大きければ回帰直線の傾きも大きい",
            "相関係数が0なら2つの変数は完全に独立",
            "相関係数の絶対値が大きいほど散布図の点は直線に近い",
            "相関係数が正なら因果関係がある"
        ],
        correct: 3,
        explanation: "相関係数の絶対値が大きいほど、点は直線に近く分布します。相関係数と回帰直線の傾きは別の概念であり、相関係数が0でも非線形関係はあり得ます。また、相関は因果を意味しません。"
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
    examId: 'grade3-section5_anova_3',
    examTitle: '3級 Section5_ANOVA_3',
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
