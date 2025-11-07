import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Grade4Exam2() {
  const questions: Question[] = [
    {
      id: 1,
      question: "次のうち、質的データはどれですか。",
      options: [
        "身長",
        "体重",
        "趣味",
        "年齢"
      ],
      correct: 3,
      explanation: "趣味はカテゴリーを表す質的データです。身長、体重、年齢は数値で測れる量的データです。"
    },
    {
      id: 2,
      question: "次の幹葉図で、データの個数は何個ですか。\n\n1 | 5 8\n2 | 3 5 7 9\n3 | 1 4 6\n4 | 2",
      options: [
        "8個",
        "9個",
        "10個",
        "11個"
      ],
      correct: 3,
      explanation: "幹葉図で、葉（右側の数字）の個数を数えます。2+4+3+1 = 10個です。"
    },
    {
      id: 3,
      question: "ある学級の男子20人、女子20人の数学の平均点がそれぞれ75点、65点でした。学級全体の平均点は何点ですか。",
      options: [
        "68点",
        "70点",
        "72点",
        "75点"
      ],
      correct: 2,
      explanation: "全体の平均 = (75×20 + 65×20) ÷ 40 = (1500+1300) ÷ 40 = 2800 ÷ 40 = 70点です。"
    },
    {
      id: 4,
      question: "次の箱ひげ図で、データの散らばりが最も大きいのはどれですか。\n\nA: 最小値10、Q1:15、Q2:20、Q3:25、最大値30\nB: 最小値5、Q1:12、Q2:18、Q3:24、最大値35",
      options: [
        "Aの方が大きい",
        "Bの方が大きい",
        "同じ",
        "判断できない"
      ],
      correct: 2,
      explanation: "範囲で比較すると、Aは30-10=20、Bは35-5=30。Bの方が範囲が大きく、散らばりが大きいと言えます。"
    },
    {
      id: 5,
      question: "次のヒストグラムで、中央値が含まれる階級はどれですか。\n\n0〜10: 5人\n10〜20: 10人\n20〜30: 20人\n30〜40: 15人\n合計: 50人",
      options: [
        "0〜10",
        "10〜20",
        "20〜30",
        "30〜40"
      ],
      correct: 3,
      explanation: "50人の中央値は25番目と26番目の平均です。累積度数は5、15、35、50なので、25番目と26番目は20〜30の階級に含まれます。"
    },
    {
      id: 6,
      question: "ある学校の生徒300人のうち、眼鏡をかけている生徒が90人でした。眼鏡をかけている生徒の相対度数はいくらですか。",
      options: [
        "0.2",
        "0.25",
        "0.3",
        "0.35"
      ],
      correct: 3,
      explanation: "相対度数 = 90 ÷ 300 = 0.3です。"
    },
    {
      id: 7,
      question: "1から6までの数字が書かれたカードが1枚ずつあります。このうち1枚を選ぶとき、偶数のカードを選ぶ確率はいくらですか。",
      options: [
        "1/6",
        "1/3",
        "1/2",
        "2/3"
      ],
      correct: 3,
      explanation: "偶数は2、4、6の3枚です。確率は 3/6 = 1/2 です。"
    },
    {
      id: 8,
      question: "次のデータの四分位範囲を求めてください。\n\nデータ（小さい順）: 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65",
      options: [
        "20",
        "25",
        "30",
        "35"
      ],
      correct: 3,
      explanation: "12個のデータで、Q1は3番目と4番目の平均（22.5）、Q3は9番目と10番目の平均（52.5）。四分位範囲 = 52.5 - 22.5 = 30です。"
    },
    {
      id: 9,
      question: "ある商品の昨年の売上が120万円、今年の売上が150万円でした。対前年増加額はいくらですか。",
      options: [
        "20万円",
        "25万円",
        "30万円",
        "35万円"
      ],
      correct: 3,
      explanation: "増加額 = 今年 - 昨年 = 150 - 120 = 30万円です。"
    },
    {
      id: 10,
      question: "次の度数分布表で、20〜30の階級の相対度数を求めてください。\n\n0〜10: 10人\n10〜20: 20人\n20〜30: 30人\n30〜40: 20人\n40〜50: 20人\n合計: 100人",
      options: [
        "0.2",
        "0.25",
        "0.3",
        "0.35"
      ],
      correct: 3,
      explanation: "相対度数 = 30 ÷ 100 = 0.3です。"
    },
    {
      id: 11,
      question: "過去のデータから、雨が降る確率が20%であることが分かっています。10日間で雨が降ると予想される日数は何日ですか。",
      options: [
        "1日",
        "2日",
        "3日",
        "4日"
      ],
      correct: 2,
      explanation: "期待値 = 10 × 0.2 = 2日です。"
    },
    {
      id: 12,
      question: "次の散布図の説明として正しいものはどれですか。\n\n（点が右下がりに分布している図）",
      options: [
        "正の相関がある",
        "負の相関がある",
        "相関がない",
        "強い相関がある"
      ],
      correct: 2,
      explanation: "点が右下がりに分布している場合、一方が増えるともう一方が減る傾向があるため、負の相関があります。"
    },
    {
      id: 13,
      question: "全国の小学生約600万人のうち、3000人を選んで調査を行いました。この600万人を何と呼びますか。",
      options: [
        "標本",
        "母集団",
        "サンプル",
        "データ"
      ],
      correct: 2,
      explanation: "調査対象全体を母集団といいます。この場合、600万人が母集団です。"
    },
    {
      id: 14,
      question: "次のデータの中央値を求めてください。\n\nデータ: 8, 12, 15, 20, 25",
      options: [
        "12",
        "15",
        "16",
        "20"
      ],
      correct: 2,
      explanation: "5個のデータの中央値は3番目の値で、15です。"
    },
    {
      id: 15,
      question: "コインを3回投げるとき、表が2回出る確率はいくらですか。",
      options: [
        "1/8",
        "2/8",
        "3/8",
        "4/8"
      ],
      correct: 3,
      explanation: "全パターンは8通り。表が2回出るパターンは（表表裏、表裏表、裏表表）の3通りなので、確率は 3/8 です。"
    },
    {
      id: 16,
      question: "次の度数分布表で、10〜20の階級の階級値はいくつですか。",
      options: [
        "10",
        "12",
        "15",
        "20"
      ],
      correct: 3,
      explanation: "階級値 = (階級の下限 + 上限) ÷ 2 = (10+20) ÷ 2 = 15です。"
    },
    {
      id: 17,
      question: "ある試験の平均点が50点、標準偏差が10点です。60点の人の偏差値はいくらですか。",
      options: [
        "50",
        "55",
        "60",
        "65"
      ],
      correct: 3,
      explanation: "偏差値 = 50 + 10×(得点-平均)÷標準偏差 = 50 + 10×(60-50)÷10 = 50 + 10 = 60です。"
    },
    {
      id: 18,
      question: "次のクロス集計表で、女子で「いいえ」と答えた人の割合は何%ですか。\n\n　　　　はい　いいえ　合計\n男子　　20　　30　　50\n女子　　35　　15　　50\n合計　　55　　45　　100",
      options: [
        "15%",
        "25%",
        "30%",
        "35%"
      ],
      correct: 3,
      explanation: "女子で「いいえ」の割合 = 15 ÷ 50 × 100 = 30%です。"
    },
    {
      id: 19,
      question: "次のデータで、第3四分位数はいくつですか。\n\nデータ（小さい順）: 5, 10, 15, 20, 25, 30, 35, 40",
      options: [
        "25",
        "27.5",
        "30",
        "32.5"
      ],
      correct: 4,
      explanation: "8個のデータの第3四分位数は、上位25%の位置、つまり6番目と7番目の平均です。(30+35)÷2 = 32.5です。"
    },
    {
      id: 20,
      question: "袋の中に赤玉4個、青玉6個が入っています。1個取り出すとき、赤玉が出る確率はいくらですか。",
      options: [
        "2/5",
        "3/5",
        "4/10",
        "6/10"
      ],
      correct: 1,
      explanation: "赤玉の確率 = 4 ÷ (4+6) = 4/10 = 2/5 です。"
    },
    {
      id: 21,
      question: "ある商品の定価が5000円、これを20%引きで販売するとき、販売価格はいくらですか。",
      options: [
        "3500円",
        "3800円",
        "4000円",
        "4200円"
      ],
      correct: 3,
      explanation: "販売価格 = 5000 × (1 - 0.2) = 5000 × 0.8 = 4000円です。"
    },
    {
      id: 22,
      question: "次のヒストグラムで、15点未満の生徒の割合は何%ですか。\n\n0〜5点: 5人\n5〜10点: 10人\n10〜15点: 15人\n15〜20点: 30人\n20〜25点: 40人\n合計: 100人",
      options: [
        "20%",
        "25%",
        "30%",
        "35%"
      ],
      correct: 3,
      explanation: "15点未満は5+10+15=30人です。割合は 30÷100×100 = 30%です。"
    },
    {
      id: 23,
      question: "ある調査で、調査対象者を年齢層ごとに分けて、各層から無作為に選ぶ方法を何といいますか。",
      options: [
        "単純無作為抽出",
        "層別抽出",
        "系統抽出",
        "有意抽出"
      ],
      correct: 2,
      explanation: "層別抽出は、母集団をいくつかの層に分けて、各層から無作為に標本を選ぶ方法です。"
    },
    {
      id: 24,
      question: "次のデータの最頻値を求めてください。\n\nデータ: 3, 5, 5, 7, 8, 8, 8, 10, 12",
      options: [
        "5",
        "7",
        "8",
        "10"
      ],
      correct: 3,
      explanation: "最頻値は最も多く現れる値です。8が3回出現しているので、最頻値は8です。"
    },
    {
      id: 25,
      question: "実験で、新しい教育方法を試すグループを何といいますか。",
      options: [
        "対照群",
        "実験群",
        "標本群",
        "母集団"
      ],
      correct: 2,
      explanation: "実験群は、新しい処理や方法を試すグループです。対照群は処理をしないグループです。"
    },
    {
      id: 26,
      question: "次の円グラフで、「野球」を選んだ人が全体の25%でした。全体が80人のとき、野球を選んだ人は何人ですか。",
      options: [
        "15人",
        "18人",
        "20人",
        "25人"
      ],
      correct: 3,
      explanation: "80人 × 0.25 = 20人です。"
    },
    {
      id: 27,
      question: "次のデータの標準偏差に最も近い値はどれですか。\n\nデータ: 4, 6, 8, 10, 12（平均値は8、分散は8）",
      options: [
        "2.0",
        "2.4",
        "2.8",
        "3.2"
      ],
      correct: 3,
      explanation: "標準偏差は分散の平方根です。√8 ≒ 2.83 ≒ 2.8です。"
    },
    {
      id: 28,
      question: "袋の中に赤玉3個、白玉7個が入っています。2個同時に取り出すとき、2個とも赤玉を引く確率はいくらですか。",
      options: [
        "1/15",
        "2/15",
        "3/45",
        "6/45"
      ],
      correct: 1,
      explanation: "1個目が赤の確率は 3/10、2個目も赤の確率は 2/9。2個とも赤の確率は (3/10)×(2/9) = 6/90 = 1/15です。"
    },
    {
      id: 29,
      question: "ある地域の5つの町の人口が、3000人、4000人、5000人、6000人、7000人です。平均人口は何人ですか。",
      options: [
        "4500人",
        "5000人",
        "5500人",
        "6000人"
      ],
      correct: 2,
      explanation: "平均 = (3000+4000+5000+6000+7000) ÷ 5 = 25000 ÷ 5 = 5000人です。"
    },
    {
      id: 30,
      question: "次のデータで、範囲（レンジ）が最も大きいのはどれですか。",
      options: [
        "データA: 10, 15, 20, 25, 30",
        "データB: 5, 10, 20, 25, 35",
        "データC: 8, 12, 18, 22, 28",
        "データD: 15, 18, 22, 25, 30"
      ],
      correct: 2,
      explanation: "範囲はAが20、Bが30、Cが20、Dが15です。Bの範囲が最も大きいです。"
    }
  ];

  const exam = useExam({
    examId: 'grade4-exam2',
    examTitle: '4級 模擬試験2',
    grade: '4級',
    questions,
  });

  if (exam.showResult) {
    const score = exam.calculateScore();
    const percentage = (score / questions.length) * 100;
    return (
      <ResultScreen
        score={score}
        totalQuestions={questions.length}
        percentage={percentage}
        questions={questions}
        answers={exam.answers}
        onReset={exam.resetExam}
        backLink="/"
      />
    );
  }

  const currentQuestion = questions[exam.currentQuestionIndex];

  return (
    <ExamLayout
      title="📝 統計検定4級 模擬試験2"
      backLink="/"
      bestScore={exam.bestScore}
    >
      <div className="mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-700">
            <strong>試験時間:</strong> 60分 | <strong>問題数:</strong> 30問 | <strong>合格ライン:</strong> 60点以上
          </p>
        </div>
      </div>

      <QuestionCard
        question={currentQuestion}
        questionIndex={exam.currentQuestionIndex}
        totalQuestions={questions.length}
        userAnswer={exam.answers[currentQuestion.id]}
        onAnswer={exam.handleAnswer}
        onPrevious={exam.handlePrevious}
        onNext={exam.handleNext}
        onSubmit={exam.handleSubmit}
      />
    </ExamLayout>
  );
}
