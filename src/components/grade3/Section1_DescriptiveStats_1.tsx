import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section1DescriptiveStats1() {
  const questions: Question[] = [
    {
      id: 1,
      question: "あるカフェのレシートには次の情報が記載されています。\n\nI. 日付（例: 2024年11月5日）\nII. 商品名（例: コーヒー、サンドイッチ）\nIII. 金額（例: 500円、800円）\nIV. ポイント残高（例: 1,234ポイント）\n\nこれらのうち、量的変数はどれですか。",
      options: [
        "IとIIのみ",
        "IIIとIVのみ",
        "I、III、IVのみ",
        "すべて"
      ],
      correct: 2,
      explanation: "量的変数は数値として計算可能なデータです。金額とポイント残高は量的変数です。日付は順序はあるが計算できないので質的変数（または順序変数）、商品名は質的変数（名義変数）です。"
    },
    {
      id: 2,
      question: "次のa〜cの目的に対して、最も適切なグラフの組み合わせはどれですか。\n\na. 第1次産業、第2次産業、第3次産業別の就業者割合の比較\nb. ある店舗の5年間の売上高の推移\nc. あるクラスで2回実施したテストの点数のばらつきの比較",
      options: [
        "a. 円グラフ、b. 折れ線グラフ、c. 箱ひげ図",
        "a. 棒グラフ、b. 円グラフ、c. ヒストグラム",
        "a. 折れ線グラフ、b. 棒グラフ、c. 散布図",
        "a. 円グラフ、b. 箱ひげ図、c. 折れ線グラフ"
      ],
      correct: 1,
      explanation: "a. 割合の比較には円グラフが適しています。b. 時系列の変化には折れ線グラフが適しています。c. ばらつきの比較には箱ひげ図が適しています。"
    },
    {
      id: 3,
      question: "質的変数を表現する棒グラフについて、正しい記述を選んでください。\n\nI. 各棒の高さは度数を表す\nII. カテゴリの順序を入れ替えても情報は変わらない（名義尺度の場合）\nIII. 横軸に必ず数値を取る必要がある",
      options: [
        "IとIIのみ",
        "IとIIIのみ",
        "IIとIIIのみ",
        "すべて正しい"
      ],
      correct: 1,
      explanation: "Iは正しい。IIは名義尺度の場合は正しいです（順序尺度の場合は順序を変えると意味が変わります）。IIIは誤り。棒グラフの横軸はカテゴリ名（質的変数）です。"
    },
    {
      id: 4,
      question: "ヒストグラムについて、正しい記述を選んでください。\n\nI. 階級の幅を変えると、ヒストグラムの形が変わることがある\nII. 縦軸は度数または相対度数を表す\nIII. 連続的な量的変数の分布を表すのに適している",
      options: [
        "IとIIのみ",
        "IとIIIのみ",
        "IIとIIIのみ",
        "すべて正しい"
      ],
      correct: 4,
      explanation: "すべて正しい記述です。ヒストグラムは階級の幅の設定によって見た目が変わり、連続的な量的変数の分布を視覚化するのに適しています。"
    },
    {
      id: 5,
      question: "円グラフが最も適している場面はどれですか。",
      options: [
        "気温の経年変化を示す",
        "予算の費目別割合を示す",
        "身長と体重の関係を示す",
        "テスト点数の分布を示す"
      ],
      correct: 2,
      explanation: "円グラフは全体を100%として各部分の割合を示すのに適しています。予算の費目別割合は円グラフで表現するのが最適です。"
    },
    {
      id: 6,
      question: "次の図書館の利用者数データのうち、折れ線グラフで表現するのに最も適しているのはどれですか。",
      options: [
        "年齢層別の利用者数",
        "月別の利用者数の推移（過去3年間）",
        "利用者の男女比",
        "貸出冊数の階級別度数分布"
      ],
      correct: 2,
      explanation: "折れ線グラフは時系列データの変化を表すのに適しています。月別の利用者数の推移は折れ線グラフで表現するのが最適です。"
    },
    {
      id: 7,
      question: "ある会社の4つの支店A、B、C、Dの売上を比較したい場合、最も適しているグラフはどれですか。",
      options: [
        "円グラフ",
        "棒グラフ",
        "折れ線グラフ",
        "散布図"
      ],
      correct: 2,
      explanation: "複数のカテゴリ（支店）の数値を比較する場合は棒グラフが適しています。各支店の売上高を棒の高さで比較できます。"
    },
    {
      id: 8,
      question: "次のグラフに関する記述のうち、正しいものを選んでください。\n\nI. 箱ひげ図は中央値や四分位数を視覚的に表現できる\nII. ヒストグラムと棒グラフは同じものである\nIII. 散布図は2つの変数の関係を調べるのに適している",
      options: [
        "IとIIのみ",
        "IとIIIのみ",
        "IIとIIIのみ",
        "すべて正しい"
      ],
      correct: 2,
      explanation: "Iは正しい。IIは誤り。ヒストグラムは連続的な量的変数の分布を表し、棒グラフは質的変数やカテゴリの度数を表します。IIIは正しい。"
    },
    {
      id: 9,
      question: "次の変数のうち、質的変数はどれですか。",
      options: [
        "気温（℃）",
        "血液型（A、B、O、AB）",
        "体重（kg）",
        "年齢（歳）"
      ],
      correct: 2,
      explanation: "血液型はカテゴリを表す質的変数（名義尺度）です。気温、体重、年齢はすべて数値で計算可能な量的変数です。"
    },
    {
      id: 10,
      question: "ある学校で、学年別（1年、2年、3年）の生徒数と、各学年の平均身長を調査しました。これらのデータを視覚化する場合、適切なグラフの組み合わせはどれですか。",
      options: [
        "学年別生徒数: 円グラフ、平均身長: 棒グラフ",
        "学年別生徒数: 棒グラフ、平均身長: 折れ線グラフ",
        "学年別生徒数: 折れ線グラフ、平均身長: 散布図",
        "学年別生徒数: ヒストグラム、平均身長: 円グラフ"
      ],
      correct: 1,
      explanation: "学年別生徒数は各カテゴリ（学年）の度数なので円グラフまたは棒グラフが適切。平均身長の学年間比較には棒グラフが適しています。"
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
    examId: 'grade3-section1_descriptivestats_1',
    examTitle: '3級 Section1_DescriptiveStats_1',
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
