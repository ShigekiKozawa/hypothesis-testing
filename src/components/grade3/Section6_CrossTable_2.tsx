import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section6_CrossTable_2() {
  const questions: Question[] = [
    {
      id: 1,
      question: "ある大学の学生5000人から500人を無作為に抽出して調査を行いました。この場合、母集団はどれですか。",
      options: [
        "抽出された500人",
        "大学の学生5000人",
        "全国の大学生",
        "調査に回答した学生"
      ],
      correct: 2,
      explanation: "母集団は、調査の対象となる全体の集合です。この場合、大学の学生5000人全体が母集団です。抽出された500人は標本です。"
    },
    {
      id: 2,
      question: "無作為抽出の目的として最も適切なものはどれですか。",
      options: [
        "調査コストを削減するため",
        "偏りのない代表的な標本を得るため",
        "調査時間を短縮するため",
        "母集団を完全に把握するため"
      ],
      correct: 2,
      explanation: "無作為抽出の主な目的は、母集団の特性を公平に反映する、偏りのない代表的な標本を得ることです。"
    },
    {
      id: 3,
      question: "1000人の従業員から100人を選ぶ際、最初の従業員リストから10人おきに選ぶ方法を何といいますか。",
      options: [
        "単純無作為抽出",
        "系統抽出",
        "層化抽出",
        "集落抽出"
      ],
      correct: 2,
      explanation: "一定の間隔（この場合10人おき）で対象を選ぶ方法を系統抽出（または系統サンプリング）といいます。"
    },
    {
      id: 4,
      question: "2つの新しいダイエット方法の効果を比較する実験を計画しています。最も適切な実験デザインはどれですか。",
      options: [
        "参加者が好きな方法を選ぶ",
        "参加者を無作為に2つのグループに分け、それぞれ異なる方法を試す",
        "最初に申し込んだ人から順に方法Aを割り当てる",
        "年齢の若い人には方法Aを割り当てる"
      ],
      correct: 2,
      explanation: "無作為割り付けにより、グループ間の偏りを最小化し、公平な比較ができます。これが実験計画の基本原則です。"
    },
    {
      id: 5,
      question: "サンプリングバイアスが生じる原因として最も適切なものはどれですか。",
      options: [
        "標本サイズが大きすぎる",
        "標本が母集団を代表していない",
        "調査期間が長すぎる",
        "質問項目が多すぎる"
      ],
      correct: 2,
      explanation: "サンプリングバイアスは、標本が母集団の特性を適切に反映していないときに生じます。例えば、特定のグループが過剰または過少に含まれる場合などです。"
    },
    {
      id: 6,
      question: "対応のあるデータ（ペアデータ）として適切な例はどれですか。",
      options: [
        "男性グループと女性グループの身長",
        "治療前と治療後の同じ患者の血圧",
        "A高校とB高校の生徒の成績",
        "10代と20代の体重"
      ],
      correct: 2,
      explanation: "対応のあるデータは、同じ対象を2回測定した場合や、ペアを組んだ対象のデータです。治療前後の同じ患者のデータはその典型例です。"
    },
    {
      id: 7,
      question: "実験において、無作為化の主な目的は何ですか。",
      options: [
        "実験を早く終わらせるため",
        "測定誤差を減らすため",
        "交絡因子の影響を均等にするため",
        "標本サイズを増やすため"
      ],
      correct: 3,
      explanation: "無作為化の主な目的は、年齢・性別など の交絡因子（第3の変数）の影響を各グループに均等に分散させ、公平な比較を可能にすることです。"
    },
    {
      id: 8,
      question: "標本調査と全数調査（悉皆調査）の比較として正しいものはどれですか。",
      options: [
        "標本調査の方が必ず正確である",
        "全数調査にはサンプリング誤差がある",
        "標本調査は時間とコストを節約できるが、サンプリング誤差がある",
        "全数調査は常に標本調査より優れている"
      ],
      correct: 3,
      explanation: "標本調査は時間とコストの面で有利ですが、サンプリング誤差が生じます。全数調査にはサンプリング誤差はありませんが、時間とコストがかかり、非標本誤差（測定誤差など）が生じる可能性があります。"
    },
    {
      id: 9,
      question: "ある中学校の生徒の学習時間を調査するため、以下の方法で標本を選びました。無作為抽出と言えるのはどれですか。",
      options: [
        "1年1組の生徒全員を選ぶ",
        "各学年の代表委員を選ぶ",
        "全生徒に番号を振り、乱数表を使って選ぶ",
        "先生が「平均的」と思う生徒を選ぶ"
      ],
      correct: 3,
      explanation: "無作為抽出とは、母集団のどの個体も等しい確率で選ばれる抽出法です。選択肢1（特定のクラスだけ）、2（代表委員のみ）、4（恣意的選択）は偏りがあり、無作為ではありません。乱数表を使った選択（選択肢3）のみが無作為抽出です。"
    },
    {
      id: 10,
      question: "新しい肥料Aの効果を検証するため、ある農場の畑Xで肥料Aを使い、別の農場の畑Yで従来の肥料Bを使って収穫量を比較しました。この実験の問題点として最も適切なものはどれですか。",
      options: [
        "肥料以外の条件（土壌、気候など）が揃っていない",
        "実験期間が短すぎる",
        "標本サイズが大きすぎる",
        "無作為化が不要である"
      ],
      correct: 1,
      explanation: "実験計画の基本原則は、比較したい要因（この場合は肥料）以外の条件をすべて揃えることです。異なる農場では土壌・気候・管理方法などが異なるため、肥料の効果だけを正しく評価できません。同じ農場内で畑を分けて比較すべきです。"
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
    examId: 'grade3-section6_crosstable_2',
    examTitle: '3級 - Section6: クロス集計表・実験計画 (2/2)',
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
        title="3級 - Section6: クロス集計表・実験計画 (2/2)"
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
      title="3級 - Section6: クロス集計表・実験計画 (2/2)"
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
