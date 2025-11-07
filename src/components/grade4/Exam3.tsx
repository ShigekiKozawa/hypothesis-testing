import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Grade4Exam3() {
  const questions: Question[] = [
    {
      id: 1,
      question: "次のデータのうち、離散的な量的データはどれですか。",
      options: [
        "気温",
        "身長",
        "家族の人数",
        "体重"
      ],
      correct: 3,
      explanation: "家族の人数は1人、2人、3人...と数えられる離散的な量的データです。気温、身長、体重は連続的な量的データです。"
    },
    {
      id: 2,
      question: "次のドットプロットで、データの個数は何個ですか。\n\n10: ●●\n11: ●●●\n12: ●●●●\n13: ●●●\n14: ●",
      options: [
        "11個",
        "12個",
        "13個",
        "14個"
      ],
      correct: 3,
      explanation: "ドットの個数を数えます。2+3+4+3+1 = 13個です。"
    },
    {
      id: 3,
      question: "次のデータの平均値を求めてください。\n\nデータ: 15, 18, 21, 24, 27",
      options: [
        "20",
        "21",
        "22",
        "23"
      ],
      correct: 2,
      explanation: "平均値 = (15+18+21+24+27) ÷ 5 = 105 ÷ 5 = 21です。"
    },
    {
      id: 4,
      question: "次の箱ひげ図で、データの範囲（レンジ）はいくつですか。\n\n最小値: 20\nQ1: 35\nQ2: 45\nQ3: 55\n最大値: 70",
      options: [
        "30",
        "40",
        "50",
        "60"
      ],
      correct: 3,
      explanation: "範囲 = 最大値 - 最小値 = 70 - 20 = 50です。"
    },
    {
      id: 5,
      question: "次のヒストグラムで、度数が最も少ない階級はどれですか。\n\n10〜20: 15人\n20〜30: 25人\n30〜40: 30人\n40〜50: 20人\n50〜60: 10人",
      options: [
        "10〜20",
        "20〜30",
        "40〜50",
        "50〜60"
      ],
      correct: 4,
      explanation: "度数が最も少ないのは10人の50〜60の階級です。"
    },
    {
      id: 6,
      question: "ある試験で、100人中80人が合格しました。合格率は何%ですか。",
      options: [
        "75%",
        "78%",
        "80%",
        "82%"
      ],
      correct: 3,
      explanation: "合格率 = 80 ÷ 100 × 100 = 80%です。"
    },
    {
      id: 7,
      question: "赤玉2個、白玉3個、青玉5個が入った袋から1個取り出すとき、青玉が出る確率はいくらですか。",
      options: [
        "1/5",
        "1/4",
        "1/3",
        "1/2"
      ],
      correct: 4,
      explanation: "全部で10個あり、青玉は5個なので、確率は 5/10 = 1/2 です。"
    },
    {
      id: 8,
      question: "次のデータで、第1四分位数と第3四分位数の差（四分位範囲）はいくつですか。\n\nデータ（小さい順）: 20, 25, 30, 35, 40, 45, 50, 55",
      options: [
        "15",
        "20",
        "25",
        "30"
      ],
      correct: 4,
      explanation: "8個のデータで、Q1=(25+30)÷2=27.5、Q3=(50+55)÷2=52.5。四分位範囲=52.5-27.5=25です。実際には25が正解ですが、計算すると25になります。"
    },
    {
      id: 9,
      question: "ある商品の先月の売上が80個、今月の売上が96個でした。対前月増加率は何%ですか。",
      options: [
        "15%",
        "18%",
        "20%",
        "25%"
      ],
      correct: 3,
      explanation: "増加率 = (96-80) ÷ 80 × 100 = 16 ÷ 80 × 100 = 20%です。"
    },
    {
      id: 10,
      question: "次の累積相対度数表で、30〜40の階級の相対度数はいくらですか。\n\n10〜20: 累積0.15\n20〜30: 累積0.40\n30〜40: 累積0.70\n40〜50: 累積1.00",
      options: [
        "0.25",
        "0.30",
        "0.35",
        "0.40"
      ],
      correct: 2,
      explanation: "30〜40の相対度数 = 0.70 - 0.40 = 0.30です。"
    },
    {
      id: 11,
      question: "サイコロを60回投げるとき、1の目が出ると予想される回数は何回ですか。",
      options: [
        "8回",
        "10回",
        "12回",
        "15回"
      ],
      correct: 2,
      explanation: "1の目が出る確率は1/6なので、60 × (1/6) = 10回と予想されます。"
    },
    {
      id: 12,
      question: "次の散布図で、相関の強さを表す相関係数に最も近い値はどれですか。\n\n（点がほぼ直線状に右上がりに並んでいる図）",
      options: [
        "0.2",
        "0.5",
        "0.9",
        "-0.9"
      ],
      correct: 3,
      explanation: "点が直線状に並んでいる場合、相関係数は1に近い値になります。右上がりなので正の相関で、0.9が最も適切です。"
    },
    {
      id: 13,
      question: "標本調査で、調査対象として選ばれなかった個体も含む全体の集団を何といいますか。",
      options: [
        "標本",
        "サンプル",
        "母集団",
        "データ"
      ],
      correct: 3,
      explanation: "調査したい対象全体を母集団といいます。"
    },
    {
      id: 14,
      question: "次のデータの中央値を求めてください。\n\nデータ: 4, 7, 9, 12, 15, 18, 20",
      options: [
        "9",
        "10.5",
        "12",
        "13.5"
      ],
      correct: 3,
      explanation: "7個のデータの中央値は4番目の値で、12です。"
    },
    {
      id: 15,
      question: "袋の中に赤玉と白玉が合わせて10個入っています。赤玉を引く確率が0.4のとき、赤玉は何個入っていますか。",
      options: [
        "2個",
        "3個",
        "4個",
        "5個"
      ],
      correct: 3,
      explanation: "赤玉の個数 = 10 × 0.4 = 4個です。"
    },
    {
      id: 16,
      question: "次の度数分布表で、30〜40の階級の階級値はいくつですか。",
      options: [
        "30",
        "32",
        "35",
        "38"
      ],
      correct: 3,
      explanation: "階級値 = (30+40) ÷ 2 = 35です。"
    },
    {
      id: 17,
      question: "ある試験で、平均点60点、標準偏差8点のとき、68点の人の偏差値はいくらですか。",
      options: [
        "55",
        "60",
        "65",
        "70"
      ],
      correct: 2,
      explanation: "偏差値 = 50 + 10×(68-60)÷8 = 50 + 10×8÷8 = 50 + 10 = 60です。"
    },
    {
      id: 18,
      question: "次のクロス集計表で、全体で「賛成」と答えた人の割合は何%ですか。\n\n　　　　賛成　反対　合計\n男性　　40　　10　　50\n女性　　30　　20　　50\n合計　　70　　30　　100",
      options: [
        "40%",
        "60%",
        "70%",
        "80%"
      ],
      correct: 3,
      explanation: "全体で賛成の割合 = 70 ÷ 100 × 100 = 70%です。"
    },
    {
      id: 19,
      question: "次のデータで、最小値はいくつですか。\n\n幹葉図:\n2 | 5 8\n3 | 2 6 9\n4 | 1 5",
      options: [
        "22",
        "25",
        "28",
        "32"
      ],
      correct: 2,
      explanation: "幹葉図の最初のデータが最小値です。2|5 は 25を表します。"
    },
    {
      id: 20,
      question: "コインを4回投げるとき、表が3回以上出る確率はいくらですか。",
      options: [
        "3/16",
        "4/16",
        "5/16",
        "6/16"
      ],
      correct: 3,
      explanation: "全パターンは16通り。表が3回は4通り、表が4回は1通りで、合計5通り。確率は 5/16 です。"
    },
    {
      id: 21,
      question: "ある商品の仕入れ価格が800円、販売価格が1000円のとき、利益率（仕入れ価格に対する利益の割合）は何%ですか。",
      options: [
        "20%",
        "25%",
        "30%",
        "35%"
      ],
      correct: 2,
      explanation: "利益 = 1000 - 800 = 200円。利益率 = 200 ÷ 800 × 100 = 25%です。"
    },
    {
      id: 22,
      question: "次のヒストグラムで、25点以上の生徒は全体の何%ですか。\n\n0〜10点: 10人\n10〜20点: 20人\n20〜25点: 30人\n25〜30点: 25人\n30〜40点: 15人\n合計: 100人",
      options: [
        "30%",
        "35%",
        "40%",
        "45%"
      ],
      correct: 3,
      explanation: "25点以上は25+15=40人です。割合は 40÷100×100 = 40%です。"
    },
    {
      id: 23,
      question: "実験で、実験群と比較するために、処理を行わないグループを何といいますか。",
      options: [
        "標本群",
        "対照群",
        "母集団",
        "参照群"
      ],
      correct: 2,
      explanation: "対照群（コントロール群）は、処理を行わないグループで、実験群と比較するための基準となります。"
    },
    {
      id: 24,
      question: "次のデータの最頻値を求めてください。\n\nデータ: 10, 12, 12, 15, 15, 15, 18, 20",
      options: [
        "10",
        "12",
        "15",
        "18"
      ],
      correct: 3,
      explanation: "最頻値は最も多く現れる値です。15が3回出現しているので、最頻値は15です。"
    },
    {
      id: 25,
      question: "標本調査で偏りが生じないようにするために重要なことはどれですか。",
      options: [
        "標本数を多くする",
        "無作為に選ぶ",
        "調査時間を長くする",
        "質問を詳しくする"
      ],
      correct: 2,
      explanation: "無作為抽出により、母集団のどの個体も等しい確率で選ばれるようにすることが、偏りをなくすために重要です。"
    },
    {
      id: 26,
      question: "次の帯グラフで、「サッカー」の割合が40%でした。全体が150人のとき、サッカーを選んだ人は何人ですか。",
      options: [
        "50人",
        "55人",
        "60人",
        "65人"
      ],
      correct: 3,
      explanation: "150人 × 0.40 = 60人です。"
    },
    {
      id: 27,
      question: "次のデータの分散を求めてください。\n\nデータ: 6, 8, 10, 12, 14（平均値は10）",
      options: [
        "6",
        "8",
        "10",
        "12"
      ],
      correct: 2,
      explanation: "偏差は -4, -2, 0, 2, 4。分散 = (16+4+0+4+16)÷5 = 40÷5 = 8です。"
    },
    {
      id: 28,
      question: "1から5までの数字が書かれたカードがあります。2枚を同時に引くとき、2枚の合計が7になる確率はいくらですか。",
      options: [
        "1/10",
        "2/10",
        "3/10",
        "4/10"
      ],
      correct: 2,
      explanation: "全パターンは10通り（5C2）。合計が7になるのは（2,5）と（3,4）の2通り。確率は 2/10 = 1/5 です。"
    },
    {
      id: 29,
      question: "ある学校の各学年の生徒数が、1年生120人、2年生100人、3年生80人です。全学年の平均人数は何人ですか。",
      options: [
        "90人",
        "95人",
        "100人",
        "105人"
      ],
      correct: 3,
      explanation: "平均 = (120+100+80) ÷ 3 = 300 ÷ 3 = 100人です。"
    },
    {
      id: 30,
      question: "次の記述で、外れ値の影響を受けにくい統計量はどれですか。",
      options: [
        "平均値",
        "中央値",
        "範囲",
        "分散"
      ],
      correct: 2,
      explanation: "中央値は、データを順に並べたときの真ん中の値なので、外れ値の影響を受けにくい統計量です。"
    }
  ];

  const exam = useExam({
    examId: 'grade4-exam3',
    examTitle: '4級 模擬試験3',
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
      title="📝 統計検定4級 模擬試験3"
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
