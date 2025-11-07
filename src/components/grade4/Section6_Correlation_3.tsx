import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section6Correlation3() {
  const questions: Question[] = [
    {
        id: 1,
        question: "散布図から相関が見えたとき、次に何を確認すべきですか。",
        options: [
            "平均だけを見る",
            "因果関係があるか慎重に考える",
            "何もしない",
            "必ず因果関係がある",
        ],
        correct: 2,
        explanation: "相関が見えても、因果関係があるかは別問題です。第三の要因なども慎重に検討する必要があります。"
    },
    {
        id: 2,
        question: "アイスクリームの売上と溺死者数に正の相関がある場合、どう解釈すべきですか。",
        options: [
            "アイスを食べると溺れる",
            "溺れるとアイスが売れる",
            "両方とも夏（気温）という第三の要因の影響",
            "アイスと溺死は直接関係がある",
        ],
        correct: 3,
        explanation: "夏（気温）という第三の要因が両方に影響している「疑似相関」の例です。"
    },
    {
        id: 3,
        question: "外れ値とは何ですか。",
        options: [
            "平均値",
            "他のデータから大きく離れた値",
            "中央値",
            "最小値",
        ],
        correct: 2,
        explanation: "外れ値は、他の大部分のデータから大きく離れた値のことです。"
    },
    {
        id: 4,
        question: "散布図に外れ値があるとき、相関係数にどう影響しますか。",
        options: [
            "影響しない",
            "大きく影響する可能性がある",
            "必ず0になる",
            "必ず1になる",
        ],
        correct: 2,
        explanation: "外れ値があると、相関係数が大きく影響を受ける可能性があります。"
    },
    {
        id: 5,
        question: "散布図で外れ値を見つけたら、どうすべきですか。",
        options: [
            "必ず削除する",
            "無視する",
            "記録ミスか特殊な理由がないか確認する",
            "何もしない",
        ],
        correct: 3,
        explanation: "外れ値を見つけたら、記録ミスや測定エラー、特殊な理由がないかを確認することが重要です。"
    },
    {
        id: 6,
        question: "2つの変数に強い相関があっても、因果関係がないことはありますか。",
        options: [
            "ない（相関=因果）",
            "ある（疑似相関など）",
            "必ずある",
            "判断できない",
        ],
        correct: 2,
        explanation: "疑似相関など、強い相関があっても直接の因果関係がない場合があります。"
    },
    {
        id: 7,
        question: "散布図で回帰直線とは何ですか。",
        options: [
            "横軸の線",
            "縦軸の線",
            "データの傾向を表す直線",
            "平均を表す線",
        ],
        correct: 3,
        explanation: "回帰直線は、散布図のデータの傾向（関係）を最もよく表す直線です。"
    },
    {
        id: 8,
        question: "散布図で、xが増えてもyがほとんど変わらない場合、相関はどうですか。",
        options: [
            "強い正の相関",
            "強い負の相関",
            "ほとんど相関がない",
            "必ず因果関係がある",
        ],
        correct: 3,
        explanation: "xが変わってもyが変わらないなら、2つの変数にはほとんど相関がありません。"
    },
    {
        id: 9,
        question: "散布図で「層別」とは何ですか。",
        options: [
            "全データを1つのグラフにする",
            "データをグループ分けして別々に表示する",
            "平均を計算する",
            "外れ値を削除する",
        ],
        correct: 2,
        explanation: "層別とは、データをグループ（性別、年代など）に分けて、それぞれの散布図を作成することです。"
    },
    {
        id: 10,
        question: "散布図から予測を行うときに使う直線は何ですか。",
        options: [
            "横軸",
            "縦軸",
            "回帰直線",
            "円",
        ],
        correct: 3,
        explanation: "散布図から予測を行うには、データの傾向を表す回帰直線を使います。"
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
    examId: 'grade4-section6_correlation_3',
    examTitle: '4級 Section6_Correlation_3',
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
