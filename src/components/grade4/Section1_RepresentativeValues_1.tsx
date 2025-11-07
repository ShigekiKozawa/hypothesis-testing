import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section1RepresentativeValues1() {
  const questions: Question[] = [
    {
        id: 1,
        question: "次のデータのうち、量的データはどれですか。\n\nA. 好きな色\nB. 身長（cm）\nC. 血液型\nD. 出身地",
        options: [
            "A",
            "B",
            "C",
            "D"
        ],
        correct: 2,
        explanation: "量的データは数値で測定できるデータです。身長は量的データ、その他は質的データです。"
    },
    {
        id: 2,
        question: "次のデータのうち、質的データはどれですか。\n\nA. 体重（kg）\nB. テストの点数\nC. 好きな動物\nD. 気温（℃）",
        options: [
            "A",
            "B",
            "C",
            "D"
        ],
        correct: 3,
        explanation: "質的データはカテゴリー（種類）を表すデータです。好きな動物は質的データです。"
    },
    {
        id: 3,
        question: "あるクラスの「好きなスポーツ」を調べました。このデータを視覚化するのに最も適したグラフはどれですか。",
        options: [
            "折れ線グラフ",
            "円グラフ",
            "散布図",
            "箱ひげ図"
        ],
        correct: 2,
        explanation: "質的データ（カテゴリーデータ）の割合を示すには円グラフが適しています。"
    },
    {
        id: 4,
        question: "ある店の1年間の売上の推移を示すのに最も適したグラフはどれですか。",
        options: [
            "円グラフ",
            "棒グラフ",
            "折れ線グラフ",
            "ヒストグラム"
        ],
        correct: 3,
        explanation: "時系列データ（時間の経過に伴う変化）を示すには折れ線グラフが適しています。"
    },
    {
        id: 5,
        question: "次のうち、量的データの例として正しいものはどれですか。",
        options: [
            "性別",
            "1週間の読書時間",
            "好きな科目",
            "住んでいる都道府県"
        ],
        correct: 2,
        explanation: "1週間の読書時間は数値で測定できる量的データです。"
    },
    {
        id: 6,
        question: "クラスの生徒の通学方法（徒歩、自転車、バス、電車）の人数を比較するのに適したグラフはどれですか。",
        options: [
            "折れ線グラフ",
            "散布図",
            "棒グラフ",
            "箱ひげ図"
        ],
        correct: 3,
        explanation: "カテゴリー別の度数を比較するには棒グラフが適しています。"
    },
    {
        id: 7,
        question: "次のデータで、量的データと質的データの組み合わせとして正しいものはどれですか。\n\nI. 靴のサイズ（cm）\nII. 好きな季節\nIII. 体温（℃）",
        options: [
            "量的: I, II  質的: III",
            "量的: I, III  質的: II",
            "量的: II, III  質的: I",
            "量的: II  質的: I, III"
        ],
        correct: 2,
        explanation: "靴のサイズと体温は数値で測定できる量的データ、好きな季節はカテゴリーを表す質的データです。"
    },
    {
        id: 8,
        question: "生徒の身長の分布を視覚化するのに適したグラフはどれですか。",
        options: [
            "円グラフ",
            "折れ線グラフ",
            "ヒストグラム",
            "帯グラフ"
        ],
        correct: 3,
        explanation: "連続した量的データの分布を示すにはヒストグラムが適しています。"
    },
    {
        id: 9,
        question: "次のうち、質的データはいくつありますか。\n\nA. 気温\nB. 出席番号\nC. 血液型\nD. 好きな食べ物\nE. 身長",
        options: [
            "1つ",
            "2つ",
            "3つ",
            "4つ"
        ],
        correct: 3,
        explanation: "出席番号、血液型、好きな食べ物の3つが質的データです。出席番号は数字ですが計算に意味がないため質的データです。"
    },
    {
        id: 10,
        question: "2つのクラスのテスト結果の分布を比較するのに適したグラフはどれですか。",
        options: [
            "円グラフ",
            "箱ひげ図",
            "折れ線グラフ",
            "帯グラフ"
        ],
        correct: 2,
        explanation: "箱ひげ図は複数のグループのデータ分布を比較するのに適しています。"
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
    examId: 'grade4-section1_representativevalues_1',
    examTitle: '4級 Section1_RepresentativeValues_1',
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
