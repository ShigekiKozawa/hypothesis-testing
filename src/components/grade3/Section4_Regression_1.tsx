import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section4Regression1() {
  const questions: Question[] = [
    {
      id: 1,
      question: "次の箱ひげ図から、第1四分位数（Q1）を読み取ってください。\n\n【箱ひげ図の説明】\n最小値: 10\nQ1（箱の左端）: 20\nQ2（箱の中の線、中央値）: 30\nQ3（箱の右端）: 40\n最大値: 50",
      options: ["10", "20", "30", "40"],
      correct: 2,
      explanation: "箱ひげ図では、箱の左端がQ1（第1四分位数）を表します。この図ではQ1=20です。"
    },
    {
      id: 2,
      question: "箱ひげ図の「箱」は何を表していますか。",
      options: [
        "データ全体の範囲",
        "平均値±標準偏差の範囲",
        "Q1からQ3までの範囲（中央50%のデータ）",
        "外れ値の範囲"
      ],
      correct: 3,
      explanation: "箱ひげ図の「箱」は、Q1からQ3までの範囲、つまり中央50%のデータが含まれる範囲を表します。"
    },
    {
      id: 3,
      question: "次のヒストグラムから、最も度数が多い階級（最頻値が含まれる階級）を選んでください。\n\n【ヒストグラムの説明】\n10〜20点: 5人\n20〜30点: 12人\n30〜40点: 8人\n40〜50点: 3人",
      options: [
        "10〜20点",
        "20〜30点",
        "30〜40点",
        "40〜50点"
      ],
      correct: 2,
      explanation: "度数が最も多い階級は20〜30点（12人）です。この階級に最頻値（モード）が含まれます。"
    },
    {
      id: 4,
      question: "ヒストグラムの階級の幅を狭くすると、どうなりますか。",
      options: [
        "データの分布がより詳細にわかるが、度数が少なくなる",
        "データの分布が見にくくなる",
        "平均値が変わる",
        "分散が小さくなる"
      ],
      correct: 1,
      explanation: "階級の幅を狭くすると、分布の細かい特徴がわかりやすくなりますが、各階級の度数は少なくなります。"
    },
    {
      id: 5,
      question: "次の2つの箱ひげ図を比較したとき、正しい記述を選んでください。\n\nグループA: Q1=20、Q2=30、Q3=40\nグループB: Q1=25、Q2=30、Q3=35",
      options: [
        "グループAの方がばらつきが大きい",
        "グループBの方がばらつきが大きい",
        "両グループのばらつきは同じ",
        "中央値が同じなので比較できない"
      ],
      correct: 1,
      explanation: "四分位範囲（IQR）で比較します。A: IQR=40-20=20、B: IQR=35-25=10。グループAの方がばらつきが大きいです。"
    },
    {
      id: 6,
      question: "次のヒストグラムについて、平均値が中央値より大きいか小さいか判断してください。\n\n【ヒストグラムの説明】\n0〜10: 度数2\n10〜20: 度数3\n20〜30: 度数5\n30〜40: 度数8\n40〜50: 度数2\n50〜60: 度数1\n\n※右側に少し裾が伸びている分布",
      options: [
        "平均値 < 中央値（左に偏っている）",
        "平均値 > 中央値（右に偏っている）",
        "平均値 = 中央値",
        "判断できない"
      ],
      correct: 2,
      explanation: "分布が右側に裾を引いている（右に偏っている）場合、平均値は中央値より大きくなります。極端な値（50〜60）が平均値を引き上げるためです。"
    },
    {
      id: 7,
      question: "箱ひげ図で、箱の中の線は何を表していますか。",
      options: [
        "平均値",
        "中央値（Q2）",
        "最頻値",
        "標準偏差"
      ],
      correct: 2,
      explanation: "箱ひげ図の箱の中の線は、中央値（Q2、第2四分位数）を表します。"
    },
    {
      id: 8,
      question: "次のヒストグラムから、中央値が含まれる階級を特定してください。\n\n【データ: 全30人】\n0〜10点: 3人（累積3人）\n10〜20点: 5人（累積8人）\n20〜30点: 10人（累積18人）\n30〜40点: 8人（累積26人）\n40〜50点: 4人（累積30人）",
      options: [
        "10〜20点",
        "20〜30点",
        "30〜40点",
        "40〜50点"
      ],
      correct: 2,
      explanation: "30人の中央値は15番目と16番目の平均です。累積度数を見ると、15〜16番目は20〜30点の階級に含まれます（8人までで終わり、18人までで次の階級）。"
    },
    {
      id: 9,
      question: "ヒストグラムと箱ひげ図の違いについて、正しい記述を選んでください。",
      options: [
        "ヒストグラムは分布の形状がわかり、箱ひげ図は5数要約がわかる",
        "ヒストグラムは5数要約がわかり、箱ひげ図は分布の形状がわかる",
        "両方とも同じ情報を表している",
        "どちらも平均値を表示する"
      ],
      correct: 1,
      explanation: "ヒストグラムは度数分布の詳細な形状を示し、箱ひげ図は5数要約（最小値、Q1、Q2、Q3、最大値）と外れ値を簡潔に示します。"
    },
    {
      id: 10,
      question: "次の箱ひげ図について、外れ値と判定される基準を選んでください。\n\nQ1=20、Q3=40、IQR=20",
      options: [
        "20未満、または40より大きい",
        "0未満、または60より大きい",
        "-10未満、または70より大きい",
        "10未満、または50より大きい"
      ],
      correct: 3,
      explanation: "外れ値の基準は Q1 - 1.5×IQR より小さい、またはQ3 + 1.5×IQR より大きい値です。Q1 - 1.5×20 = 20 - 30 = -10、Q3 + 1.5×20 = 40 + 30 = 70 です。"
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
    examId: 'grade3-section4_regression_1',
    examTitle: '3級 Section4_Regression_1',
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
