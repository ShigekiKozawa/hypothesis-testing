import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section1DescriptiveStats3() {
  const questions: Question[] = [
    {
      id: 1,
      question: "次のデータのうち、質的変数と量的変数の組み合わせとして正しいものはどれですか。\n\nあるアンケート調査で以下の項目を調査しました。\n\nA. 年齢（歳）\nB. 性別（男・女）\nC. 満足度（5段階評価：1〜5）\nD. 年収（万円）",
      options: [
        "質的: AとD、量的: BとC",
        "質的: BとC、量的: AとD",
        "質的: Bのみ、量的: A、C、D",
        "すべて量的変数"
      ],
      correct: 3,
      explanation: "性別（B）は質的変数（名義尺度）です。満足度（C）は数値ですが順序尺度なので通常は質的変数として扱いますが、統計処理上は量的変数として扱うこともあります。年齢と年収は明確な量的変数です。最も適切な答えはBのみが質的変数です。"
    },
    {
      id: 2,
      question: "グラフの特徴について、正しい記述を選んでください。\n\nI. 棒グラフの棒の順序を入れ替えても、名義尺度のデータでは情報は変わらない\nII. ヒストグラムでは階級の境界に棒が接している\nIII. 円グラフでは各部分の角度が全体の360度に対する割合を表す",
      options: [
        "Iのみ",
        "IとIIのみ",
        "IとIIIのみ",
        "すべて正しい"
      ],
      correct: 4,
      explanation: "すべて正しい記述です。I. 名義尺度（血液型など）は順序に意味がないので入れ替え可能。II. ヒストグラムは連続データなので棒が接する。III. 円グラフは角度で割合を表します。"
    },
    {
      id: 3,
      question: "ある会社の過去10年間の売上高の推移を示したい場合、最も適切なグラフはどれですか。",
      options: [
        "円グラフ",
        "箱ひげ図",
        "折れ線グラフ",
        "ヒストグラム"
      ],
      correct: 3,
      explanation: "時系列データの変化や傾向を示すには折れ線グラフが最も適しています。時間の経過とともにどう変化したかが視覚的に分かりやすくなります。"
    },
    {
      id: 4,
      question: "次のグラフとその用途の組み合わせで、誤っているものはどれですか。",
      options: [
        "箱ひげ図 → データのばらつきや外れ値の確認",
        "散布図 → 2つの変数の相関関係の確認",
        "ヒストグラム → 連続データの度数分布の確認",
        "円グラフ → 2変数の関係性の確認"
      ],
      correct: 4,
      explanation: "円グラフは全体に占める各部分の割合を示すグラフで、2変数の関係性を示すものではありません。2変数の関係には散布図が適しています。"
    },
    {
      id: 5,
      question: "20人の生徒の身長データ（単位: cm）: 155, 158, 160, 162, 165, 165, 168, 170, 172, 175, 175, 175, 178, 180, 182, 182, 185, 188, 190, 195\n\nこのデータを視覚化する方法として適切なものを選んでください。",
      options: [
        "棒グラフ（各身長に1本ずつ）",
        "ヒストグラム（階級幅5cm程度）",
        "円グラフ",
        "折れ線グラフ"
      ],
      correct: 2,
      explanation: "連続的な量的変数の分布を表すには、適切な階級幅でヒストグラムを作成するのが最適です。個々の値を棒グラフにすると見づらくなります。"
    },
    {
      id: 6,
      question: "ある市の産業別就業者数の内訳を示す場合、最も適切なグラフの組み合わせはどれですか。",
      options: [
        "円グラフまたは帯グラフ（100%積み上げ棒グラフ）",
        "折れ線グラフ",
        "散布図",
        "ヒストグラム"
      ],
      correct: 1,
      explanation: "全体に占める各産業の割合を示すには、円グラフまたは帯グラフ（100%積み上げ棒グラフ）が適しています。"
    },
    {
      id: 7,
      question: "次の記述のうち、誤っているものはどれですか。",
      options: [
        "棒グラフは質的データの各カテゴリの度数を比較するのに適している",
        "ヒストグラムは横軸の階級の順序を入れ替えても情報は変わらない",
        "散布図は2つの量的変数の関係を調べるのに適している",
        "箱ひげ図は中央値や四分位数を視覚的に表現できる"
      ],
      correct: 2,
      explanation: "ヒストグラムは連続的な量的変数を階級に分けたもので、階級には順序があります。したがって、階級の順序を入れ替えると情報が変わってしまいます。"
    },
    {
      id: 8,
      question: "ある学校の各学年（1年、2年、3年）の生徒数と平均身長を調査しました。この2種類のデータを表現する際に、それぞれ最も適切なグラフはどれですか。",
      options: [
        "生徒数: ヒストグラム、平均身長: 円グラフ",
        "生徒数: 棒グラフ、平均身長: 棒グラフ",
        "生徒数: 折れ線グラフ、平均身長: 散布図",
        "生徒数: 散布図、平均身長: ヒストグラム"
      ],
      correct: 2,
      explanation: "学年別の生徒数は各学年（カテゴリ）の度数なので棒グラフが適しています。学年別の平均身長の比較も棒グラフが適しています。"
    },
    {
      id: 9,
      question: "次の変数の組み合わせのうち、散布図で表現するのに適しているのはどれですか。",
      options: [
        "年齢と血液型",
        "身長と体重",
        "性別と年収",
        "月と気温"
      ],
      correct: 2,
      explanation: "散布図は2つの量的変数の関係を調べるのに適しています。身長と体重はともに量的変数なので散布図で表現できます。年齢と血液型、性別と年収は一方または両方が質的変数です。"
    },
    {
      id: 10,
      question: "データの視覚化に関する次の記述のうち、正しいものを選んでください。\n\nI. グラフは目的に応じて適切に選択する必要がある\nII. どのようなデータでも円グラフで表現できる\nIII. ヒストグラムの階級幅を変えると、見た目の印象が変わることがある",
      options: [
        "IとIIのみ",
        "IとIIIのみ",
        "IIとIIIのみ",
        "すべて正しい"
      ],
      correct: 2,
      explanation: "Iは正しい。IIは誤り。円グラフは全体に占める割合を示すためのもので、すべてのデータに適しているわけではありません。IIIは正しい。階級幅によって分布の見え方が変わります。"
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
    examId: 'grade3-section1_descriptivestats_3',
    examTitle: '3級 Section1_DescriptiveStats_3',
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
