import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section2Probability3() {
  const questions: Question[] = [
    {
      id: 1,
      question: "100人の国語の試験結果の度数分布表があります。\n\n0〜20点: 5人\n20〜40点: 15人\n40〜60点: 30人\n60〜80点: 35人\n80〜100点: 15人\n\n中央値が含まれる階級はどれですか。",
      options: [
        "20〜40点",
        "40〜60点",
        "60〜80点",
        "80〜100点"
      ],
      correct: 3,
      explanation: "100人のデータなので、中央値は50番目と51番目の平均です。累積度数で見ると、0〜60点までで50人（5+15+30）なので、50番目と51番目はともに60〜80点の階級に含まれます。"
    },
    {
      id: 2,
      question: "もみじの葉の「裂けている数」のデータがあります。\n\nデータ: 5, 5, 5, 7, 7, 9, 11\n\nこのデータに14を追加したとき、平均値と中央値はどう変化しますか。",
      options: [
        "平均値も中央値も増加する",
        "平均値は増加するが中央値は変わらない",
        "平均値は変わらないが中央値は増加する",
        "平均値も中央値も変わらない"
      ],
      correct: 2,
      explanation: "元のデータの平均値 = (5+5+5+7+7+9+11) ÷ 7 = 49 ÷ 7 = 7、中央値 = 7。14を追加すると平均値 = 63 ÷ 8 = 7.875に増加しますが、中央値は4番目と5番目の平均で (7+7) ÷ 2 = 7 のままです。"
    },
    {
      id: 3,
      question: "30人の数学のテスト結果から作成した箱ひげ図があります。\n\n最小値: 40点\n第1四分位数（Q1）: 60点\n中央値（Q2）: 70点\n第3四分位数（Q3）: 85点\n最大値: 100点\n\n四分位範囲（IQR）はいくつですか。",
      options: ["15点", "20点", "25点", "30点"],
      correct: 3,
      explanation: "四分位範囲（IQR）= Q3 - Q1 = 85 - 60 = 25点 です。"
    },
    {
      id: 4,
      question: "次のもみじの葉のデータについて、正しい記述を選んでください。\n\nデータ: 5, 5, 5, 7, 7, 9, 11\n\nI. 分布は右に偏っている\nII. 最頻値は5である\nIII. 平均値と中央値は等しい",
      options: [
        "IとIIのみ",
        "IとIIIのみ",
        "IIとIIIのみ",
        "すべて正しい"
      ],
      correct: 4,
      explanation: "I. 右に偏っている（右裾が長い）。II. 最頻値は最も多く出現する5。III. 平均値 = 7、中央値 = 7 で等しい。すべて正しいです。"
    },
    {
      id: 5,
      question: "ある試験の得点分布について、以下の記述があります。\n\n「度数分布の形状は左右対称で、平均値、中央値、最頻値がすべて70点である」\n\nこの分布として最も適切なのはどれですか。",
      options: [
        "左に偏った分布",
        "右に偏った分布",
        "正規分布に近い対称な分布",
        "一様分布"
      ],
      correct: 3,
      explanation: "平均値、中央値、最頻値がすべて等しく、左右対称な分布は正規分布（ベル型カーブ）に近い分布です。"
    },
    {
      id: 6,
      question: "テスト結果の度数分布表を作成する際、階級の数を決める一般的な目安はどれですか。（データ数が100程度の場合）",
      options: [
        "3〜5階級",
        "7〜12階級",
        "20〜30階級",
        "50階級以上"
      ],
      correct: 2,
      explanation: "一般的に、データ数が100程度の場合、階級の数は7〜12程度が適切とされています。スタージェスの公式（1+log₂n）を使うこともあります。"
    },
    {
      id: 7,
      question: "次のテスト結果の記述について、正しいものを選んでください。\n\n「Aさんの国語の偏差値は60、数学の偏差値は65である」\n\nI. Aさんは数学の方が成績が良い\nII. Aさんの国語の点数は必ず数学の点数より低い\nIII. 偏差値は平均50、標準偏差10に標準化した値である",
      options: [
        "IとIIのみ",
        "IとIIIのみ",
        "IIとIIIのみ",
        "すべて正しい"
      ],
      correct: 2,
      explanation: "I. 偏差値が高い方が相対的に成績が良いので正しい。II. 誤り。科目によって平均点や標準偏差が異なるため、偏差値だけでは実際の点数の高低は判断できません。III. 正しい。"
    },
    {
      id: 8,
      question: "データ変換について、正しい記述を選んでください。\n\n「あるクラスのテストの点数を、すべて2倍してから10点を加えた」\n\nこのとき、平均値と標準偏差はどうなりますか。",
      options: [
        "平均値は2倍+10、標準偏差は2倍",
        "平均値は2倍、標準偏差は2倍+10",
        "平均値は2倍+10、標準偏差は変わらない",
        "平均値も標準偏差も2倍+10"
      ],
      correct: 1,
      explanation: "データをax+bに変換すると、平均値はa×(元の平均)+b、標準偏差はa×(元の標準偏差)になります。この場合、平均値は2倍+10、標準偏差は2倍です。"
    },
    {
      id: 9,
      question: "次の記述のうち、誤っているものはどれですか。",
      options: [
        "範囲（レンジ）は外れ値の影響を受けやすい",
        "四分位範囲（IQR）は外れ値の影響を受けにくい",
        "標準偏差は平均値と同じ単位を持つ",
        "分散の単位は元のデータと同じ"
      ],
      correct: 4,
      explanation: "分散の単位は元のデータの単位の2乗です（例：データがcmなら分散はcm²）。標準偏差は分散の平方根なので元のデータと同じ単位になります。"
    },
    {
      id: 10,
      question: "次のデータの代表値について、正しい記述を選んでください。\n\nデータ: 10, 12, 14, 14, 16, 18, 100\n\nI. 平均値は中央値より大きい\nII. 最頻値は14である\nIII. このデータには外れ値（100）が含まれている",
      options: [
        "IとIIのみ",
        "IとIIIのみ",
        "IIとIIIのみ",
        "すべて正しい"
      ],
      correct: 4,
      explanation: "I. 平均値 = (10+12+14+14+16+18+100) ÷ 7 ≈ 26.3、中央値 = 14 なので正しい。II. 最頻値は14で正しい。III. 100は他の値から大きく離れているので外れ値と考えられます。すべて正しいです。"
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
    examId: 'grade3-section2_probability_3',
    examTitle: '3級 Section2_Probability_3',
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
