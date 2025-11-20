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
      explanation: "母集団は、調査の対象となる全体の集合です。この場合、大学の学生5000人全体が母集団です。抽出された500人は標本です。",
      chartType: 'bar',
      barData: [
        { category: '母集団', value: 5000 },
        { category: '標本', value: 500 }
      ],
      chartLabels: { x: '', y: '人数' }
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
      explanation: "無作為抽出の主な目的は、母集団の特性を公平に反映する、偏りのない代表的な標本を得ることです。",
      chartType: 'bar',
      barData: [
        { category: '無作為抽出', value: 1 },
        { category: '有意抽出', value: 1 }
      ],
      chartLabels: { x: '抽出方法', y: '' }
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
      explanation: "一定の間隔（この場合10人おき）で対象を選ぶ方法を系統抽出（または系統サンプリング）といいます。",
      chartType: 'bar',
      barData: [
        { category: '1番目', value: 1 },
        { category: '11番目', value: 1 },
        { category: '21番目', value: 1 },
        { category: '31番目', value: 1 }
      ],
      chartLabels: { x: '選ばれる順番', y: '' }
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
      explanation: "無作為割り付けにより、グループ間の偏りを最小化し、公平な比較ができます。これが実験計画の基本原則です。",
      chartType: 'bar',
      barData: [
        { category: 'グループA', value: 50 },
        { category: 'グループB', value: 50 }
      ],
      chartLabels: { x: '', y: '人数' }
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
      explanation: "サンプリングバイアスは、標本が母集団の特性を適切に反映していないときに生じます。例えば、特定のグループが過剰または過少に含まれる場合などです。",
      chartType: 'bar',
      barData: [
        { category: '偏りあり', value: 1 },
        { category: '偏りなし', value: 1 }
      ],
      chartLabels: { x: '標本の状態', y: '' }
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
      explanation: "対応のあるデータは、同じ対象を2回測定した場合や、ペアを組んだ対象のデータです。治療前後の同じ患者のデータはその典型例です。",
      chartType: 'bar',
      barData: [
        { category: '治療前', value: 140 },
        { category: '治療後', value: 125 }
      ],
      chartLabels: { x: '', y: '血圧（平均）' }
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
      explanation: "無作為化の主な目的は、年齢・性別など の交絡因子（第3の変数）の影響を各グループに均等に分散させ、公平な比較を可能にすることです。",
      chartType: 'bar',
      barData: [
        { category: '無作為化あり', value: 90 },
        { category: '無作為化なし', value: 60 }
      ],
      chartLabels: { x: '', y: '信頼性（概念）' }
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
      explanation: "標本調査は時間とコストの面で有利ですが、サンプリング誤差が生じます。全数調査にはサンプリング誤差はありませんが、時間とコストがかかり、非標本誤差（測定誤差など）が生じる可能性があります。",
      chartType: 'bar',
      barData: [
        { category: '標本調査', value: 1 },
        { category: '全数調査', value: 1 }
      ],
      chartLabels: { x: '調査方法', y: '' }
    },
    {
      id: 9,
      question: "次の調査方法のうち、サンプリングバイアスが最も生じやすいものはどれですか。",
      options: [
        "乱数表を使って対象者を選ぶ",
        "インターネットで「自主的に回答してくれる人」を募集する",
        "住民基本台帳から系統抽出する",
        "年齢層ごとに人数を定めて無作為抽出する"
      ],
      correct: 2,
      explanation: "自主的に回答する人だけを対象にすると、関心の高い人や特定の意見を持つ人に偏る可能性が高く、サンプリングバイアスが生じやすいです。",
      chartType: 'bar',
      barData: [
        { category: '無作為抽出', value: 10 },
        { category: '自主回答', value: 80 }
      ],
      chartLabels: { x: '', y: 'バイアスリスク（概念）' }
    },
    {
      id: 10,
      question: "新薬の効果を検証する実験で、参加者を2つのグループに分けました。一方には新薬を、もう一方には見た目が同じだが効果のない偽薬を投与しました。この偽薬を何といいますか。",
      options: [
        "プラシーボ（プラセボ）",
        "コントロール",
        "サンプル",
        "ブランク"
      ],
      correct: 1,
      explanation: "見た目は同じだが有効成分を含まない偽薬をプラシーボ（プラセボ）といいます。これにより、心理的効果（プラシーボ効果）を考慮した評価ができます。",
      chartType: 'bar',
      barData: [
        { category: '新薬グループ', value: 50 },
        { category: 'プラシーボグループ', value: 50 }
      ],
      chartLabels: { x: '', y: '人数' }
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
