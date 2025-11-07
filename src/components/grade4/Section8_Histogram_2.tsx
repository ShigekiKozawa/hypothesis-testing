import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Section8Histogram2() {
  const questions: Question[] = [
    {
        id: 1,
        question: "ヒストグラムで最頻値（モード）はどう読み取りますか。",
        options: [
            "最も低い柱の階級",
            "最も高い柱の階級",
            "横軸の端",
            "読み取れない",
        ],
        correct: 2,
        explanation: "最も高い柱（度数が最大）の階級が、最頻値（モード）を含む階級です。"
    },
    {
        id: 2,
        question: "ヒストグラムで、柱が2つの山（ピーク）を持つとき、どういう分布ですか。",
        options: [
            "単峰性",
            "二峰性（バイモーダル）",
            "一様分布",
            "正規分布",
        ],
        correct: 2,
        explanation: "2つの山を持つ分布を二峰性（バイモーダル）分布と言います。異なる2つのグループが混在している可能性があります。"
    },
    {
        id: 3,
        question: "ヒストグラムで、全ての柱がほぼ同じ高さのとき、どういう分布ですか。",
        options: [
            "正規分布",
            "一様分布（均等分布）",
            "偏った分布",
            "二峰性",
        ],
        correct: 2,
        explanation: "全ての階級の度数がほぼ同じとき、一様分布（均等分布）と言います。"
    },
    {
        id: 4,
        question: "ヒストグラムから平均値は正確にわかりますか。",
        options: [
            "正確にわかる",
            "おおよその位置は推測できるが正確ではない",
            "全くわからない",
            "必ず中央値と同じ",
        ],
        correct: 2,
        explanation: "ヒストグラムからは、分布の中心付近に平均値があると推測できますが、正確な値は計算が必要です。"
    },
    {
        id: 5,
        question: "ヒストグラムで左に裾が長い形のとき、平均と中央値の関係はどうですか。",
        options: [
            "平均 < 中央値",
            "平均 > 中央値",
            "平均 = 中央値",
            "判断できない",
        ],
        correct: 1,
        explanation: "左に裾が長い（負の歪み）とき、平均は中央値より小さくなる傾向があります。"
    },
    {
        id: 6,
        question: "ヒストグラムで右に裾が長い形のとき、平均と中央値の関係はどうですか。",
        options: [
            "平均 < 中央値",
            "平均 > 中央値",
            "平均 = 中央値",
            "判断できない",
        ],
        correct: 2,
        explanation: "右に裾が長い（正の歪み）とき、平均は中央値より大きくなる傾向があります。"
    },
    {
        id: 7,
        question: "ヒストグラムで、階級の幅が全て同じであることが重要ですか。",
        options: [
            "重要（幅が異なると誤解を招く）",
            "重要でない",
            "必ず同じでなければならない",
            "判断できない",
        ],
        correct: 1,
        explanation: "階級の幅が異なると、柱の高さが度数を正しく反映せず、誤解を招きます。通常は幅を同じにします。"
    },
    {
        id: 8,
        question: "ヒストグラムから外れ値はどう見つけますか。",
        options: [
            "必ず見つかる",
            "他の柱から離れた位置に単独で低い柱がある",
            "最も高い柱",
            "見つけられない",
        ],
        correct: 2,
        explanation: "他の柱から離れた位置に、単独で低い柱がある場合、その階級に外れ値が含まれている可能性があります。"
    },
    {
        id: 9,
        question: "ヒストグラムの柱と柱の間に隙間がないのはなぜですか。",
        options: [
            "デザイン",
            "量的データの連続性を示すため",
            "必ず隙間がある",
            "判断できない",
        ],
        correct: 2,
        explanation: "量的データは連続的なので、階級と階級の間に切れ目がないことを示すため、柱の間に隙間を作りません。"
    },
    {
        id: 10,
        question: "ヒストグラムで、データの散らばりはどう判断しますか。",
        options: [
            "柱の高さ",
            "柱が広い範囲に分布しているか、狭い範囲に集中しているか",
            "柱の色",
            "判断できない",
        ],
        correct: 2,
        explanation: "柱が広い範囲に分布していれば散らばりが大きく、狭い範囲に集中していれば散らばりが小さいです。"
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
    examId: 'grade4-section8_histogram_2',
    examTitle: '4級 Section8_Histogram_2',
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
