import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section5_Inference_2() {
  const questions: Question[] = [
    {
      id: 1,
      question: "新しいダイエット法の効果を検証するため、30人を対象に実験を行いました。平均減少体重3.2kg、標準偏差2.4kgという結果が得られ、95%信頼区間は[2.34kg, 4.06kg]と計算されました。帰無仮説「このダイエット法では体重は減少しない（μ=0）」を有意水準5%で検定すると、どう判断されますか。",
      options: [
        "帰無仮説を棄却する（効果があると言える）",
        "帰無仮説を棄却しない（効果があるとは言えない）",
        "サンプルサイズが小さすぎて判断できない",
        "信頼区間を99%に変更する必要がある"
      ],
      correct: 1,
      explanation: "信頼区間[2.34, 4.06]には、帰無仮説の値μ=0が含まれていないため、帰無仮説を棄却します。ダイエット法には効果があると言えます。"
    },
    {
      id: 2,
      question: "ある薬の効果を検証する実験で、p値が0.03と計算されました。有意水準5%で検定を行う場合、どう判断されますか。",
      options: [
        "帰無仮説を棄却する",
        "帰無仮説を棄却しない",
        "有意水準を1%に変更する",
        "サンプルサイズを増やす"
      ],
      correct: 1,
      explanation: "p値(0.03) < 有意水準(0.05)なので、帰無仮説を棄却します。薬には統計的に有意な効果があると言えます。"
    },
    {
      id: 3,
      question: "工場で製造される部品の平均重量が100gかどうかを検定するため、50個の標本を測定しました。平均98.5g、標準偏差4gで、95%信頼区間は[97.39g, 99.61g]と計算されました。帰無仮説μ=100gを有意水準5%で検定すると、どう判断されますか。",
      options: [
        "帰無仮説を棄却する",
        "帰無仮説を棄却しない",
        "標本平均が100gより小さいため検定できない",
        "片側検定に変更する必要がある"
      ],
      correct: 1,
      explanation: "信頼区間[97.39, 99.61]には、帰無仮説の値μ=100が含まれていないため、帰無仮説を棄却します。平均重量は100gとは言えません。"
    },
    {
      id: 4,
      question: "ある市で新商品を購入した人の割合を調べたところ、200人中130人でした。95%信頼区間を近似すると[0.584, 0.716]となりました。帰無仮説 p=0.5 を有意水準5%で検定すると、どう判断されますか。",
      options: [
        "帰無仮説を棄却する",
        "帰無仮説を棄却しない",
        "標本数が足りないため判断できない",
        "片側検定に変更する必要がある"
      ],
      correct: 1,
      explanation: "区間[0.584, 0.716]は0.5を含まないため、有意水準5%で帰無仮説p=0.5を棄却する。"
    },
    {
      id: 5,
      question: "ある商品の平均満足度が5点（10点満点）かどうかを検定するため、100人の顧客を調査しました。平均5.8点、標準偏差2.5点で、95%信頼区間は[5.31点, 6.29点]と計算されました。帰無仮説μ=5点を有意水準5%で検定すると、どう判断されますか。",
      options: [
        "帰無仮説を棄却する",
        "帰無仮説を棄却しない",
        "満足度が高いため検定の必要はない",
        "標本サイズを減らす必要がある"
      ],
      correct: 1,
      explanation: "信頼区間[5.31, 6.29]には、帰無仮説の値μ=5が含まれていないため、帰無仮説を棄却します。平均満足度は5点より高いと言えます。"
    },
    {
      id: 6,
      question: "新薬の効果を検証する実験で、p値が0.002と計算されました。有意水準1%で検定を行う場合、どう判断されますか。",
      options: [
        "帰無仮説を棄却する",
        "帰無仮説を棄却しない",
        "p値が小さすぎるため信頼できない",
        "有意水準を0.1%に変更する"
      ],
      correct: 1,
      explanation: "p値(0.002) < 有意水準(0.01)なので、帰無仮説を棄却します。新薬には非常に強い統計的に有意な効果があると言えます。"
    },
    {
      id: 7,
      question: "ある地域の平均通勤時間が60分かどうかを検定するため、80人を調査しました。平均58分、標準偏差12分で、95%信頼区間は[55.38分, 60.62分]と計算されました。帰無仮説μ=60分を有意水準5%で検定すると、どう判断されますか。",
      options: [
        "帰無仮説を棄却する",
        "帰無仮説を棄却しない",
        "標本平均が60分より小さいため棄却する",
        "信頼区間の幅が広すぎるため判断できない"
      ],
      correct: 2,
      explanation: "信頼区間[55.38, 60.62]には、帰無仮説の値μ=60が含まれているため、帰無仮説を棄却しません。平均通勤時間が60分と異なるとは言えません。"
    },
    {
      id: 8,
      question: "母標準偏差σ=10が既知とします。95%信頼区間の幅を比較します。n=25 のときの幅と n=100 のときの幅はどちらが狭いですか。（幅=2×1.96×σ/√n）",
      options: [
        "n=25 の方が狭い",
        "n=100 の方が狭い",
        "同じ",
        "比較できない"
      ],
      correct: 2,
      explanation: "n=25: 幅=2×1.96×10/5=7.84、n=100: 幅=2×1.96×10/10=3.92。n=100の方が狭い。"
    },
    {
      id: 9,
      question: "新しい肥料の効果を検証する実験で、収穫量の平均増加が2.5kg、標準偏差1.8kgという結果が得られました（n=36）。95%信頼区間は[1.91kg, 3.09kg]と計算されました。帰無仮説「肥料の効果はない（μ=0）」を有意水準5%で検定すると、どう判断されますか。",
      options: [
        "帰無仮説を棄却する（効果があると言える）",
        "帰無仮説を棄却しない（効果があるとは言えない）",
        "平均増加が正なので検定の必要はない",
        "信頼区間に0が含まれるため判断できない"
      ],
      correct: 1,
      explanation: "信頼区間[1.91, 3.09]には、帰無仮説の値μ=0が含まれていないため、帰無仮説を棄却します。肥料には効果があると言えます。"
    },
    {
      id: 10,
      question: "あるサービスの平均利用時間が30分かどうかを検定するため、64人を調査しました。平均32分、標準偏差8分で、95%信頼区間は[30.04分, 33.96分]と計算されました。帰無仮説μ=30分を有意水準5%で検定すると、どう判断されますか。",
      options: [
        "帰無仮説を棄却する",
        "帰無仮説を棄却しない",
        "信頼区間の下限が30.04分なので境界線上で判断できない",
        "標本サイズを増やす必要がある"
      ],
      correct: 2,
      explanation: "信頼区間[30.04, 33.96]には、帰無仮説の値μ=30が含まれているため、帰無仮説を棄却しません。平均利用時間が30分と異なるとは言えません。"
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
    examId: 'grade3-section5_inference_2',
    examTitle: '3級 - Section5: 推測統計の基礎 (2/2)',
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
        title="3級 - Section5: 推測統計の基礎 (2/2)"
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
      title="3級 - Section5: 推測統計の基礎 (2/2)"
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
