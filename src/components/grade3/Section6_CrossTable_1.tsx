import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section6_CrossTable_1() {
  const questions: Question[] = [
    {
      id: 1,
      question: "次のクロス集計表から、A商品を購入した人の総数はいくつですか。\n\n           購入した | 購入しない | 合計\n男性      30       |    20      |  50\n女性      40       |    10      |  50\n合計      70       |    30      | 100",
      options: ["30", "50", "70", "100"],
      correct: 3,
      explanation: "A商品を購入した人は、男性30人+女性40人=70人です。"
    },
    {
      id: 2,
      question: "上記のクロス集計表で、男性のうちA商品を購入した人の割合はいくつですか。",
      options: ["30%", "43%", "60%", "70%"],
      correct: 3,
      explanation: "男性の購入者は30人、男性の合計は50人なので、30/50 = 0.6 = 60%です。"
    },
    {
      id: 3,
      question: "次のクロス集計表で、コーヒーを飲む人のうち紅茶も飲む人の割合はいくつですか。\n\n           紅茶飲む | 紅茶飲まない | 合計\nコーヒー飲む   20   |     30       |  50\nコーヒー飲まない 10   |     40       |  50\n合計           30   |     70       | 100",
      options: ["20%", "30%", "40%", "50%"],
      correct: 3,
      explanation: "コーヒーを飲む人は50人、そのうち紅茶も飲む人は20人なので、20/50 = 0.4 = 40%です。"
    },
    {
      id: 4,
      question: "クロス集計表から読み取れる情報として誤っているものはどれですか。",
      options: [
        "2つの変数の関係",
        "各カテゴリの度数",
        "条件付き割合",
        "因果関係"
      ],
      correct: 4,
      explanation: "クロス集計表からは2つの変数の関係や度数、条件付き割合は読み取れますが、因果関係はわかりません。"
    },
    {
      id: 5,
      question: "次のクロス集計表で、空欄Xに入る数値はいくつですか。\n\n         好き | 普通 | 嫌い | 合計\n男性     15  |  10  |   5  |  30\n女性     25  |  X   |  10  |  50\n合計     40  |  25  |  15  |  80",
      options: ["10", "15", "20", "25"],
      correct: 2,
      explanation: "女性の合計は50人、好き25人+嫌い10人=35人なので、普通は50-35=15人です。または、普通の合計25人-男性10人=15人。"
    },
    {
      id: 6,
      question: "スポーツクラブの会員200人を対象にした調査結果です。テニスをする人のうち、水泳もする人の人数として正しいものはどれですか。\n\n         水泳する | 水泳しない | 合計\nテニスする  40    |    60      | 100\nテニスしない 30    |    70      | 100\n合計        70    |   130      | 200",
      options: ["30", "40", "70", "100"],
      correct: 2,
      explanation: "テニスをする人のうち、水泳もする人は40人です。"
    },
    {
      id: 7,
      question: "次のクロス集計表で、女性の割合が最も高い職業はどれですか。\n\n       男性 | 女性 | 合計\n職業A   60  |  40  | 100\n職業B   30  |  30  |  60\n職業C   20  |  40  |  60",
      options: ["職業A", "職業B", "職業C", "すべて同じ"],
      correct: 3,
      explanation: "各職業の女性割合：A=40%, B=50%, C=66.7%。職業Cが最も高いです。"
    },
    {
      id: 8,
      question: "クロス集計表において、行の合計と列の合計がそれぞれ表すものとして正しい組み合わせはどれですか。",
      options: [
        "行の合計：行変数の各カテゴリの度数、列の合計：列変数の各カテゴリの度数",
        "行の合計：列変数の各カテゴリの度数、列の合計：行変数の各カテゴリの度数",
        "行の合計と列の合計は常に同じ",
        "行の合計と列の合計は無意味"
      ],
      correct: 1,
      explanation: "行の合計は行変数（各行）のカテゴリの度数、列の合計は列変数（各列）のカテゴリの度数を表します。"
    },
    {
      id: 9,
      question: "150人を対象にした調査で、スマホを持っている人は90人、タブレットを持っている人は70人、両方持っている人は40人でした。どちらも持っていない人は何人ですか。",
      options: ["10", "20", "30", "40"],
      correct: 3,
      explanation: "ベン図で考えます。スマホのみ=50人、タブレットのみ=30人、両方=40人。合計120人なので、どちらも持っていない人は150-120=30人です。"
    },
    {
      id: 10,
      question: "次のクロス集計表で、満足度が「高い」人の割合が最も高い年齢層はどれですか。\n\n       満足度高 | 満足度低 | 合計\n20代    30     |   70    | 100\n30代    50     |   50    | 100\n40代    60     |   40    | 100",
      options: ["20代", "30代", "40代", "すべて同じ"],
      correct: 3,
      explanation: "各年代の満足度が高い人の割合：20代=30%、30代=50%、40代=60%。40代が最も高いです。"
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
    examId: 'grade3-section6_crosstable_1',
    examTitle: '3級 - Section6: クロス集計表・実験計画 (1/2)',
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

  // 問題が空の場合
  if (questions.length === 0) {
    return (
      <ExamLayout
        title="3級 - Section6: クロス集計表・実験計画 (1/2)"
        backLink="/"
        bestScore={bestScore}
      >
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">📝 問題データがまだ作成されていません</p>
          <p className="text-gray-500 mb-2">このセクションの問題は、AI問題生成機能で作成できます。</p>
          <p className="text-sm text-gray-400">
            ホーム画面の「AI問題生成モード」から、このセクションを選択して問題を生成してください。
          </p>
        </div>
      </ExamLayout>
    );
  }

  return (
    <ExamLayout
      title="3級 - Section6: クロス集計表・実験計画 (1/2)"
      backLink="/"
      bestScore={bestScore}
    >
      <QuestionCard
        question={currentQuestion}
        questionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        userAnswer={answers[currentQuestion?.id]}
        onAnswer={handleAnswer}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
      />
    </ExamLayout>
  );
}
