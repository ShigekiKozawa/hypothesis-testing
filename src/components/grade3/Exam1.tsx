import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Grade3Exam1() {
  const questions: Question[] = [
    {
      id: 1,
      question: "次のデータの標準偏差を求めてください。\n\nデータ: 2, 4, 6, 8, 10（平均値は6、分散は8）",
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
      id: 2,
      question: "2つのグループA, Bの平均と標準偏差は以下の通りです。どちらが散らばりが大きいですか。\n\nA: 平均50、標準偏差10\nB: 平均100、標準偏差15",
      options: [
        "Aの方が大きい",
        "Bの方が大きい",
        "同じ",
        "変動係数で比較する必要がある"
      ],
      correct: 4,
      explanation: "平均が異なる場合、標準偏差だけでは散らばりを比較できません。変動係数（標準偏差÷平均）で比較する必要があります。"
    },
    {
      id: 3,
      question: "次の散布図で、相関係数が最も大きいのはどれですか。",
      options: [
        "点が右上がりの直線状に並んでいる",
        "点が右下がりの直線状に並んでいる",
        "点がランダムに散らばっている",
        "点が曲線状に並んでいる"
      ],
      correct: 1,
      explanation: "相関係数は-1から1の値を取り、1に近いほど強い正の相関です。右上がりの直線状が最も大きい正の相関係数を持ちます。"
    },
    {
      id: 4,
      question: "ある変数xとyの間に y = 2x + 3 という回帰式が得られました。x=5のとき、yの予測値はいくらですか。",
      options: [
        "10",
        "11",
        "12",
        "13"
      ],
      correct: 4,
      explanation: "y = 2×5 + 3 = 10 + 3 = 13です。"
    },
    {
      id: 5,
      question: "相関係数r=0.9のとき、決定係数（寄与率）はいくらですか。",
      options: [
        "0.81",
        "0.85",
        "0.90",
        "0.95"
      ],
      correct: 1,
      explanation: "決定係数 = r² = 0.9² = 0.81です。これは、yの変動の81%がxで説明できることを意味します。"
    },
    {
      id: 6,
      question: "標本平均の期待値は何に等しいですか。",
      options: [
        "標本分散",
        "母平均",
        "母分散",
        "標本数"
      ],
      correct: 2,
      explanation: "標本平均の期待値は母平均に等しくなります。これを不偏性といいます。"
    },
    {
      id: 7,
      question: "母集団の分散がσ²、標本サイズがnのとき、標本平均の分散はいくらですか。",
      options: [
        "σ²",
        "σ²/n",
        "σ/√n",
        "nσ²"
      ],
      correct: 2,
      explanation: "標本平均の分散 = σ²/n です。標本サイズが大きくなると、標本平均のばらつきは小さくなります。"
    },
    {
      id: 8,
      question: "95%信頼区間とは何を意味しますか。",
      options: [
        "母集団の95%がこの区間に含まれる",
        "標本の95%がこの区間に含まれる",
        "同じ方法で何度も標本抽出したとき、その95%で真の値がこの区間に含まれる",
        "誤差が5%以下である"
      ],
      correct: 3,
      explanation: "95%信頼区間は、同じ方法で何度も標本抽出して区間推定を行ったとき、その95%の区間に真の母数が含まれることを意味します。"
    },
    {
      id: 9,
      question: "仮説検定で、「差がない」という仮説を何といいますか。",
      options: [
        "対立仮説",
        "帰無仮説",
        "有意仮説",
        "検定仮説"
      ],
      correct: 2,
      explanation: "帰無仮説（H0）は、「差がない」「効果がない」という仮説で、これを棄却することを目的とします。"
    },
    {
      id: 10,
      question: "有意水準5%で検定を行い、p値が0.03でした。この結果をどう解釈しますか。",
      options: [
        "帰無仮説を棄却できない",
        "帰無仮説を棄却する",
        "対立仮説を棄却する",
        "判断できない"
      ],
      correct: 2,
      explanation: "p値0.03 < 有意水準0.05なので、帰無仮説を棄却します。つまり、統計的に有意な差があると判断します。"
    },
    {
      id: 11,
      question: "次のデータの変動係数を求めてください。\n\n平均: 50、標準偏差: 10",
      options: [
        "0.1",
        "0.2",
        "0.5",
        "5"
      ],
      correct: 2,
      explanation: "変動係数 = 標準偏差 ÷ 平均 = 10 ÷ 50 = 0.2です。"
    },
    {
      id: 12,
      question: "2つの変数の間に強い正の相関があります。このとき、一方が原因で他方が結果であると言えますか。",
      options: [
        "必ず言える",
        "言えない場合がある",
        "絶対に言えない",
        "相関係数が0.9以上なら言える"
      ],
      correct: 2,
      explanation: "相関関係があっても因果関係があるとは限りません。第三の変数が両方に影響している可能性（疑似相関）もあります。"
    },
    {
      id: 13,
      question: "正規分布において、平均±1標準偏差の範囲に含まれるデータの割合は約何%ですか。",
      options: [
        "50%",
        "68%",
        "95%",
        "99%"
      ],
      correct: 2,
      explanation: "正規分布では、平均±1標準偏差の範囲に約68%のデータが含まれます。"
    },
    {
      id: 14,
      question: "標本サイズを4倍にすると、標本平均の標準誤差はどうなりますか。",
      options: [
        "4倍になる",
        "2倍になる",
        "1/2になる",
        "1/4になる"
      ],
      correct: 3,
      explanation: "標準誤差 = σ/√n なので、nを4倍にすると √4 = 2で割ることになり、標準誤差は1/2になります。"
    },
    {
      id: 15,
      question: "第一種の過誤（タイプIエラー）とは何ですか。",
      options: [
        "帰無仮説が正しいのに棄却してしまう誤り",
        "帰無仮説が誤っているのに棄却しない誤り",
        "標本サイズが小さすぎる誤り",
        "計算間違い"
      ],
      correct: 1,
      explanation: "第一種の過誤は、帰無仮説が真であるのに棄却してしまう誤りです。有意水準αがこの確率を表します。"
    },
    {
      id: 16,
      question: "ある試験の得点が平均60点、標準偏差10点の正規分布に従うとき、70点以上の人の割合は約何%ですか。",
      options: [
        "16%",
        "32%",
        "50%",
        "84%"
      ],
      correct: 1,
      explanation: "70点は平均+1標準偏差です。正規分布では平均+1標準偏差以上は約16%です。"
    },
    {
      id: 17,
      question: "回帰分析で、残差とは何を表しますか。",
      options: [
        "予測値と実測値の差",
        "xとyの相関",
        "回帰係数",
        "決定係数"
      ],
      correct: 1,
      explanation: "残差 = 実測値 - 予測値 です。残差が小さいほど、回帰式が実際のデータをよく説明しています。"
    },
    {
      id: 18,
      question: "無作為化（ランダム化）の目的は何ですか。",
      options: [
        "標本サイズを大きくする",
        "交絡因子の影響を減らす",
        "費用を削減する",
        "調査時間を短縮する"
      ],
      correct: 2,
      explanation: "無作為化により、観測していない交絡因子が実験群と対照群に均等に配分され、その影響を減らすことができます。"
    },
    {
      id: 19,
      question: "標本から母平均を推定するとき、不偏分散を使う理由は何ですか。",
      options: [
        "計算が簡単",
        "標本分散は母分散を過小評価するため",
        "標本分散は母分散を過大評価するため",
        "常に正の値になるため"
      ],
      correct: 2,
      explanation: "標本分散（nで割る）は母分散を過小評価する傾向があるため、不偏分散（n-1で割る）を使います。"
    },
    {
      id: 20,
      question: "2つの変数x, yの共分散が正のとき、相関はどうですか。",
      options: [
        "正の相関",
        "負の相関",
        "相関なし",
        "判断できない"
      ],
      correct: 1,
      explanation: "共分散が正のとき、相関係数も正となり、正の相関があります。"
    },
    {
      id: 21,
      question: "中心極限定理によると、標本サイズが大きくなると標本平均の分布はどうなりますか。",
      options: [
        "一様分布に近づく",
        "正規分布に近づく",
        "二項分布に近づく",
        "指数分布に近づく"
      ],
      correct: 2,
      explanation: "中心極限定理により、元の分布によらず、標本サイズが大きくなると標本平均の分布は正規分布に近づきます。"
    },
    {
      id: 22,
      question: "クロス集計表でカイ二乗検定を行う目的は何ですか。",
      options: [
        "平均値の差を検定する",
        "2つの変数の独立性を検定する",
        "分散の差を検定する",
        "相関係数を検定する"
      ],
      correct: 2,
      explanation: "カイ二乗検定は、クロス集計表で2つのカテゴリカル変数が独立かどうかを検定します。"
    },
    {
      id: 23,
      question: "信頼区間の幅を狭くするにはどうすればよいですか。",
      options: [
        "標本サイズを大きくする",
        "標本サイズを小さくする",
        "信頼係数を大きくする",
        "平均値を変える"
      ],
      correct: 1,
      explanation: "標本サイズを大きくすると、標準誤差が小さくなり、信頼区間の幅が狭くなります。"
    },
    {
      id: 24,
      question: "偏相関係数とは何ですか。",
      options: [
        "2変数間の相関",
        "他の変数の影響を除いた2変数間の相関",
        "3変数以上の相関",
        "負の相関"
      ],
      correct: 2,
      explanation: "偏相関係数は、第三の変数の影響を取り除いた後の2変数間の純粋な相関を表します。"
    },
    {
      id: 25,
      question: "検出力（power）とは何ですか。",
      options: [
        "帰無仮説が正しいのに棄却する確率",
        "帰無仮説が誤っているときに正しく棄却する確率",
        "標本サイズ",
        "有意水準"
      ],
      correct: 2,
      explanation: "検出力（1-β）は、帰無仮説が実際に誤っているときに、それを正しく棄却できる確率です。"
    },
    {
      id: 26,
      question: "時系列データで、前年同月比を計算する目的は何ですか。",
      options: [
        "季節変動の影響を考慮する",
        "長期トレンドを見る",
        "誤差を修正する",
        "データを平滑化する"
      ],
      correct: 1,
      explanation: "前年同月比は、季節変動の影響を考慮しながら変化を見るために使われます。"
    },
    {
      id: 27,
      question: "2群の平均値の差を検定するとき、最も適切な検定法はどれですか。",
      options: [
        "カイ二乗検定",
        "t検定",
        "F検定",
        "相関係数の検定"
      ],
      correct: 2,
      explanation: "2群の平均値の差を検定するには、t検定が適切です。"
    },
    {
      id: 28,
      question: "実験計画で、被験者をランダムに2つのグループに分けて処理する方法を何といいますか。",
      options: [
        "観察研究",
        "完全無作為化法",
        "乱塊法",
        "要因計画"
      ],
      correct: 2,
      explanation: "完全無作為化法は、被験者をランダムに処理群に割り当てる最も基本的な実験計画法です。"
    },
    {
      id: 29,
      question: "多重比較を行うとき、何が問題になりますか。",
      options: [
        "計算が複雑になる",
        "第一種の過誤が増える",
        "検出力が高くなりすぎる",
        "標本サイズが必要になる"
      ],
      correct: 2,
      explanation: "複数の検定を繰り返すと、偶然有意になる確率（第一種の過誤）が増えます。これを調整する必要があります。"
    },
    {
      id: 30,
      question: "正規分布において、平均±2標準偏差の範囲に含まれるデータの割合は約何%ですか。",
      options: [
        "68%",
        "90%",
        "95%",
        "99%"
      ],
      correct: 3,
      explanation: "正規分布では、平均±2標準偏差の範囲に約95%のデータが含まれます。"
    }
  ];

  const exam = useExam({
    examId: 'grade3-exam1',
    examTitle: '3級 模擬試験1',
    grade: '3級',
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
      title="📝 統計検定3級 模擬試験1"
      backLink="/"
      bestScore={exam.bestScore}
    >
      <div className="mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-700">
            <strong>試験時間:</strong> 60分 | <strong>問題数:</strong> 30問 | <strong>合格ライン:</strong> 65点以上
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
