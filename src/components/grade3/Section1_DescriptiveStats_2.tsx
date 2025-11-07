import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section1DescriptiveStats2() {
  const questions: Question[] = [
    {
      id: 1,
      question: "特急券には以下の情報が記載されています。\n\nI. 発車時刻（例: 14:23）\nII. 特急料金（例: 3,500円）\nIII. 座席番号（例: 5号車12番A席）\n\nこれらのうち、量的変数はどれですか。",
      options: [
        "Iのみ",
        "IIのみ",
        "IとIIのみ",
        "すべて"
      ],
      correct: 2,
      explanation: "特急料金は金額なので量的変数です。発車時刻は時間の順序はあるが計算（平均など）はできないので質的変数（順序尺度）、座席番号は名前として扱われるので質的変数（名義尺度）です。"
    },
    {
      id: 2,
      question: "台風情報として以下のデータが発表されています。\n\nA. 台風番号（例: 台風第15号）\nB. 強さの区分（例: 強い、非常に強い）\nC. 中心気圧（例: 960hPa）\n\n量的変数と質的変数の正しい組み合わせはどれですか。",
      options: [
        "量的: Cのみ、質的: AとB",
        "量的: AとC、質的: B",
        "量的: BとC、質的: A",
        "すべて量的変数"
      ],
      correct: 1,
      explanation: "中心気圧（C）は数値として計算可能な量的変数です。台風番号（A）は番号だが順序に意味がないので質的変数（名義尺度）、強さの区分（B）は順序のある質的変数（順序尺度）です。"
    },
    {
      id: 3,
      question: "選挙結果のデータについて、次の変数のうち量的変数を選んでください。\n\na. 得票数\nb. 投票者数\nc. 最多得票政党名",
      options: [
        "aのみ",
        "aとbのみ",
        "bとcのみ",
        "すべて"
      ],
      correct: 2,
      explanation: "得票数と投票者数は数値として計算可能な量的変数です。政党名はカテゴリを表す質的変数（名義尺度）です。"
    },
    {
      id: 4,
      question: "次のグラフに関する記述のうち、正しいものを選んでください。\n\nI. 棒グラフは横軸にカテゴリ、縦軸に度数を取る\nII. 円グラフは各部分の面積が全体に占める割合を表す\nIII. 折れ線グラフは時系列の変化を表すのに適している",
      options: [
        "IとIIのみ",
        "IとIIIのみ",
        "IIとIIIのみ",
        "すべて正しい"
      ],
      correct: 4,
      explanation: "すべて正しい記述です。棒グラフは質的変数の度数、円グラフは割合、折れ線グラフは時系列変化を表すのに適しています。"
    },
    {
      id: 5,
      question: "ヒストグラムと棒グラフの違いについて、正しい記述はどれですか。",
      options: [
        "ヒストグラムは連続的な量的変数、棒グラフは質的変数を表す",
        "ヒストグラムは質的変数、棒グラフは量的変数を表す",
        "両者に違いはない",
        "ヒストグラムは横軸、棒グラフは縦軸に変数を取る"
      ],
      correct: 1,
      explanation: "ヒストグラムは連続的な量的変数の分布を表し、階級間に隙間がありません。棒グラフは質的変数やカテゴリの度数を表し、棒の間に隙間があります。"
    },
    {
      id: 6,
      question: "ある市の月別降水量を表すのに最も適しているグラフはどれですか。",
      options: [
        "円グラフ",
        "散布図",
        "折れ線グラフ",
        "箱ひげ図"
      ],
      correct: 3,
      explanation: "月別の降水量は時系列データなので、折れ線グラフが最も適しています。季節変動のパターンが視覚的に分かりやすくなります。"
    },
    {
      id: 7,
      question: "ある企業の4つの部門（営業、製造、管理、研究）の人数を比較したい場合、適切なグラフはどれですか。",
      options: [
        "折れ線グラフ",
        "散布図",
        "棒グラフまたは円グラフ",
        "ヒストグラム"
      ],
      correct: 3,
      explanation: "各部門の人数という質的変数のカテゴリ別の度数を比較するには、棒グラフが適しています。全体に占める割合を見る場合は円グラフも有効です。"
    },
    {
      id: 8,
      question: "散布図について、正しい記述を選んでください。",
      options: [
        "1つの変数の分布を表すのに適している",
        "2つの変数の関係を調べるのに適している",
        "時系列の変化を表すのに適している",
        "割合を表すのに適している"
      ],
      correct: 2,
      explanation: "散布図は2つの変数の関係（相関など）を視覚的に調べるのに適しています。各データ点を2次元平面上にプロットします。"
    },
    {
      id: 9,
      question: "グラフの選択について、誤っているものはどれですか。",
      options: [
        "時系列データ → 折れ線グラフ",
        "全体に占める割合 → 円グラフ",
        "身長と体重の関係 → 散布図",
        "連続的な量的変数の分布 → 円グラフ"
      ],
      correct: 4,
      explanation: "連続的な量的変数の分布を表すにはヒストグラムが適しています。円グラフは全体を100%として各部分の割合を表すグラフです。"
    },
    {
      id: 10,
      question: "100人の学生の身長データ（140cm〜190cm）を視覚化する場合、最も適切なグラフはどれですか。",
      options: [
        "棒グラフ（各身長ごとに1本）",
        "ヒストグラム（階級幅10cmなど）",
        "円グラフ",
        "折れ線グラフ"
      ],
      correct: 2,
      explanation: "連続的な量的変数（身長）の分布を表すには、適切な階級幅でヒストグラムを作成するのが最適です。個々の値を棒グラフにすると煩雑になります。"
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
    examId: 'grade3-section1_descriptivestats_2',
    examTitle: '3級 Section1_DescriptiveStats_2',
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
