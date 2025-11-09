import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section8Multivariate1() {
  const questions: Question[] = [
    {
        id: 1,
        question: "折れ線グラフが最も適しているデータはどれですか。",
        options: [
            "カテゴリー別の割合",
            "時間による変化",
            "2つの変数の関係",
            "データの分布"
        ],
        correct: 2,
        explanation: "折れ線グラフは時系列データ（時間による変化）を示すのに最適です。"
    },
    {
        id: 2,
        question: "次の折れ線グラフで、値が最も増加した期間はどれですか。\n\n（1月→2月:+5、2月→3月:+10、3月→4月:+3）",
        options: [
            "1月→2月",
            "2月→3月",
            "3月→4月",
            "同じ"
        ],
        correct: 2,
        explanation: "2月→3月の増加量が+10で最も大きいです。"
    },
    {
        id: 3,
        question: "折れ線グラフで、線が右下がりのとき、データはどう変化していますか。",
        options: [
            "増加している",
            "減少している",
            "変化していない",
            "判断できない"
        ],
        correct: 2,
        explanation: "線が右下がりのとき、データは減少傾向にあります。"
    },
    {
        id: 4,
        question: "時系列グラフで、季節変動とは何ですか。",
        options: [
            "毎年同じ時期に見られる規則的な変動",
            "不規則な変動",
            "長期的な傾向",
            "一時的な変動"
        ],
        correct: 1,
        explanation: "季節変動は、毎年同じ時期（季節）に繰り返し見られる規則的な変動です。"
    },
    {
        id: 5,
        question: "下のグラフで、7月の売上が例年より高い理由として最も適切なものはどれですか。",
        options: [
            "季節変動",
            "長期的な成長",
            "一時的なキャンペーン効果",
            "測定誤差"
        ],
        correct: 3,
        explanation: "例年と異なる特定月の突出した値は、一時的な要因（キャンペーンなど）による可能性が高いです。7月だけが突出して高く、他の月は平均的な推移を示しています。",
        chartType: 'line',
        chartData: [
            { name: '1月', value: 120 },
            { name: '2月', value: 115 },
            { name: '3月', value: 130 },
            { name: '4月', value: 125 },
            { name: '5月', value: 135 },
            { name: '6月', value: 140 },
            { name: '7月', value: 220 },
            { name: '8月', value: 145 },
            { name: '9月', value: 130 },
            { name: '10月', value: 135 },
            { name: '11月', value: 150 },
            { name: '12月', value: 160 }
        ],
        chartLabels: { x: '月', y: '売上（万円）' }
    },
    {
        id: 6,
        question: "時系列グラフで、トレンド（傾向）とは何ですか。",
        options: [
            "短期的な変動",
            "長期的な増加または減少の傾向",
            "季節的な変化",
            "不規則な変動"
        ],
        correct: 2,
        explanation: "トレンドは、長期的な増加または減少の傾向のことです。"
    },
    {
        id: 7,
        question: "次の折れ線グラフで、2018年から2022年までの全体的な傾向はどうですか。\n\n（値が80→85→90→95→100と推移）",
        options: [
            "減少傾向",
            "横ばい",
            "増加傾向",
            "不規則"
        ],
        correct: 3,
        explanation: "値が継続的に上昇しているので、増加傾向です。"
    },
    {
        id: 8,
        question: "複数の折れ線グラフを1つのグラフに描く目的は何ですか。",
        options: [
            "見た目を良くする",
            "異なるグループや変数を比較する",
            "データを減らす",
            "誤差を小さくする"
        ],
        correct: 2,
        explanation: "複数の線を描くことで、異なるグループ（例：地域、製品など）の時系列変化を比較できます。"
    },
    {
        id: 9,
        question: "時系列グラフで、急激な変化が見られたとき、最初に確認すべきことはどれですか。",
        options: [
            "すぐに結論を出す",
            "データの記録ミスや特殊な出来事がないか確認する",
            "無視する",
            "グラフを描き直す"
        ],
        correct: 2,
        explanation: "急激な変化が見られたら、まずデータの記録ミスや特殊な出来事（災害、政策変更など）がないか確認することが重要です。"
    },
    {
        id: 10,
        question: "時系列データを分析する際の注意点として正しいものはどれですか。",
        options: [
            "1つのデータ点だけで判断する",
            "短期的な変動と長期的な傾向を区別する",
            "データの順序を無視する",
            "最新のデータだけを見る"
        ],
        correct: 2,
        explanation: "時系列データでは、短期的な変動（ノイズ）と長期的な傾向（トレンド）を区別することが重要です。"
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
    examId: 'grade3-section8_multivariate_1',
    examTitle: '3級 Section8_Multivariate_1',
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
