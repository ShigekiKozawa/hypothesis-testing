import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Grade3Exam3() {
  const questions: Question[] = [
    {
      id: 1,
      question: "次のシナリオで、量的変数と質的変数の識別が最も難しいものはどれですか。",
      options: [
        "郵便番号（数字だが計算に意味がない）",
        "年齢（連続値）",
        "性別（男女）",
        "血圧（mmHg）"
      ],
      correct: 1,
      explanation: "郵便番号は数字で表されますが、計算に意味がないため質的変数（名義変数）です。数字だからといって必ずしも量的変数とは限りません。"
    },
    {
      id: 2,
      question: "2つのクラスの平均点と標準偏差が次の通りです。\n\nA組（30人）: 平均60点、標準偏差8点\nB組（20人）: 平均70点、標準偏差6点\n\n全体（50人）の平均点を計算してください。",
      options: [
        "64点",
        "65点",
        "66点",
        "67点"
      ],
      correct: 1,
      explanation: "全体平均=(30×60+20×70)/50=(1800+1400)/50=3200/50=64点（加重平均）"
    },
    {
      id: 3,
      question: "度数分布表から平均値を推定する際、各階級の代表値として何を使いますか。",
      options: [
        "階級の最小値",
        "階級の最大値",
        "階級値（階級の中央値）",
        "階級の範囲"
      ],
      correct: 3,
      explanation: "度数分布表から平均値を推定する際は、各階級の中央の値（階級値）を使います。"
    },
    {
      id: 4,
      question: "次のヒストグラムの特徴から、平均値と中央値の大小関係を推定してください。\n\n「右に裾が長い分布（右に歪んだ分布）」",
      options: [
        "平均値<中央値",
        "平均値=中央値",
        "平均値>中央値",
        "判断できない"
      ],
      correct: 3,
      explanation: "右に裾が長い分布では、極端に大きい値に引っ張られて平均値>中央値となります。"
    },
    {
      id: 5,
      question: "箱ひげ図で箱の長さ（IQR）が短いことは何を意味しますか。",
      options: [
        "データのばらつきが大きい",
        "データのばらつきが小さい",
        "平均値が小さい",
        "外れ値が多い"
      ],
      correct: 2,
      explanation: "箱の長さ（IQR=Q3-Q1）が短いほど、データの中央50%のばらつきが小さいことを示します。"
    },
    {
      id: 6,
      question: "2変数X、Yの散布図で「曲線的な関係」が見られる場合、ピアソンの相関係数はどうなりますか。",
      options: [
        "1に近い",
        "0に近い",
        "-1に近い",
        "予測不可能"
      ],
      correct: 2,
      explanation: "ピアソンの相関係数は直線的な関係の強さを測るため、曲線的な関係では0に近くなることがあります。"
    },
    {
      id: 7,
      question: "相関係数が0.9の2変数に対して、両方の変数を標準化（平均0、標準偏差1に変換）した場合、相関係数はどうなりますか。",
      options: [
        "0になる",
        "0.9のまま",
        "1になる",
        "計算できない"
      ],
      correct: 2,
      explanation: "標準化しても相関係数は変わりません。相関係数は元々標準化された共分散だからです。"
    },
    {
      id: 8,
      question: "クロス集計表で「行パーセント」と「列パーセント」の違いを説明してください。次のうち正しいものはどれですか。",
      options: [
        "行パーセントは行の合計を100%とした割合、列パーセントは列の合計を100%とした割合",
        "どちらも全体を100%とする",
        "どちらも行の合計を100%とする",
        "違いはない"
      ],
      correct: 1,
      explanation: "行パーセントは各行の合計を100%として計算、列パーセントは各列の合計を100%として計算します。目的に応じて使い分けます。"
    },
    {
      id: 9,
      question: "ベイズの定理を用いる場面として最も適切なものはどれですか。",
      options: [
        "平均値の推定",
        "事後確率の計算",
        "分散の検定",
        "相関の計算"
      ],
      correct: 2,
      explanation: "ベイズの定理は、事前確率と尤度から事後確率を計算するために使います。"
    },
    {
      id: 10,
      question: "離散型確率分布と連続型確率分布の違いとして正しいものはどれですか。",
      options: [
        "離散型は確率そのものを定義できるが、連続型は確率密度を定義する",
        "離散型は正規分布、連続型は二項分布",
        "離散型は平均がない",
        "違いはない"
      ],
      correct: 1,
      explanation: "離散型は各値に確率を定義できますが、連続型は特定の値の確率は0で、区間の確率のみ定義できます（確率密度関数）。"
    },
    {
      id: 11,
      question: "正規分布の再生性とは何ですか。",
      options: [
        "正規分布の和は正規分布になる",
        "正規分布の積は正規分布になる",
        "正規分布の商は正規分布になる",
        "正規分布の対数は正規分布になる"
      ],
      correct: 1,
      explanation: "独立な正規分布に従う確率変数の和（線形結合）も正規分布に従います。これを正規分布の再生性といいます。"
    },
    {
      id: 12,
      question: "信頼区間の幅を広げると、何が起こりますか。",
      options: [
        "信頼度が上がる",
        "信頼度が下がる",
        "信頼度は変わらない",
        "標本サイズが増える"
      ],
      correct: 1,
      explanation: "信頼区間を広げると、真の値がその区間に含まれる確率（信頼度）が上がります。95%→99%にすると区間は広がります。"
    },
    {
      id: 13,
      question: "片側検定と両側検定を使い分ける基準として最も適切なものはどれですか。",
      options: [
        "標本サイズ",
        "研究仮説の方向性",
        "有意水準",
        "データの分布"
      ],
      correct: 2,
      explanation: "効果の方向性（増加/減少）が明確に予測される場合は片側検定、そうでない場合は両側検定を使います。"
    },
    {
      id: 14,
      question: "Welchのt検定が通常のt検定（Studentのt検定）より好まれる状況はどれですか。",
      options: [
        "標本サイズが等しい",
        "2群の分散が等しい",
        "2群の分散が異なる",
        "標本サイズが大きい"
      ],
      correct: 3,
      explanation: "Welchのt検定は等分散性を仮定しないため、2群の分散が異なる場合に使います。"
    },
    {
      id: 15,
      question: "分散分析（ANOVA）で帰無仮説が棄却された場合、次に何を行いますか。",
      options: [
        "終了する",
        "多重比較（事後検定）を行う",
        "t検定をやり直す",
        "相関分析を行う"
      ],
      correct: 2,
      explanation: "ANOVAで有意差が出た場合、どの群間に差があるかを特定するために多重比較（Tukeyの方法など）を行います。"
    },
    {
      id: 16,
      question: "決定係数R²が0.64のとき、相関係数rの絶対値はいくらですか。",
      options: [
        "0.4",
        "0.64",
        "0.8",
        "1.28"
      ],
      correct: 3,
      explanation: "R² = r² なので、r = ±√(R²) = ±√0.64 = ±0.8 です。符号は散布図から判断します。"
    },
    {
      id: 17,
      question: "回帰分析で説明変数を増やすと、決定係数R²はどうなりますか。",
      options: [
        "必ず増加する",
        "必ず減少する",
        "変わらない",
        "場合による"
      ],
      correct: 1,
      explanation: "説明変数を増やすとR²は必ず増加します（または変わらない）。これを防ぐために自由度調整済み決定係数を使います。"
    },
    {
      id: 18,
      question: "系統抽出法（systematic sampling）の説明として正しいものはどれですか。",
      options: [
        "完全にランダムに抽出する",
        "層に分けて抽出する",
        "一定間隔で抽出する",
        "集落ごとに抽出する"
      ],
      correct: 3,
      explanation: "系統抽出法は、最初をランダムに選び、その後k番目ごとに抽出する方法です。"
    },
    {
      id: 19,
      question: "二重盲検法（double-blind）とは何ですか。",
      options: [
        "2回測定する",
        "被験者と評価者の両方が処理内容を知らない",
        "2つの対照群を設ける",
        "2つの実験群を設ける"
      ],
      correct: 2,
      explanation: "二重盲検法は、被験者も評価者（研究者）も誰が実験群か対照群かを知らない方法で、バイアスを防ぎます。"
    },
    {
      id: 20,
      question: "傾向スコアマッチング（propensity score matching）の目的は何ですか。",
      options: [
        "標本サイズを増やす",
        "観察研究で群間の背景因子を調整する",
        "測定誤差を減らす",
        "検出力を上げる"
      ],
      correct: 2,
      explanation: "傾向スコアマッチングは、無作為化できない観察研究で、背景因子が似た個体同士をマッチングして比較する方法です。"
    },
    {
      id: 21,
      question: "赤池情報量規準（AIC）が小さいモデルほど何が良いですか。",
      options: [
        "複雑さと当てはまりのバランスが良い",
        "複雑なほど良い",
        "単純なほど良い",
        "標本サイズが大きい"
      ],
      correct: 1,
      explanation: "AICはモデルの複雑さ（パラメータ数）と当てはまりの良さのバランスを評価し、小さいほど良いモデルとされます。"
    },
    {
      id: 22,
      question: "対数正規分布に従う変数に対数変換を施すと、何分布になりますか。",
      options: [
        "正規分布",
        "指数分布",
        "一様分布",
        "ポアソン分布"
      ],
      correct: 1,
      explanation: "対数正規分布の定義により、変数Xの対数log(X)は正規分布に従います。"
    },
    {
      id: 23,
      question: "自己相関とは何ですか。",
      options: [
        "2つの異なる変数間の相関",
        "時系列データで異なる時点の値同士の相関",
        "標本内の相関",
        "母集団の相関"
      ],
      correct: 2,
      explanation: "自己相関は、時系列データで異なる時点（ラグ）における値同士の相関のことです。"
    },
    {
      id: 24,
      question: "マン・ホイットニーのU検定は何のための検定ですか。",
      options: [
        "2群の平均値の差（パラメトリック）",
        "2群の中央値の差（ノンパラメトリック）",
        "相関係数",
        "分散の等質性"
      ],
      correct: 2,
      explanation: "マン・ホイットニーのU検定は、2群の分布（中央値）の差を、分布を仮定せずに（ノンパラメトリックに）検定します。"
    },
    {
      id: 25,
      question: "交互作用（interaction）とは何ですか。",
      options: [
        "2つの要因の主効果",
        "ある要因の効果が他の要因の水準によって変わること",
        "2つの要因の和",
        "2つの要因の積"
      ],
      correct: 2,
      explanation: "交互作用は、ある要因Aの効果が、もう一つの要因Bの水準によって変わる現象です。"
    },
    {
      id: 26,
      question: "移動平均法の目的として最も適切なものはどれですか。",
      options: [
        "外れ値を検出する",
        "データを平滑化してトレンドを見やすくする",
        "相関を強める",
        "分散を大きくする"
      ],
      correct: 2,
      explanation: "移動平均法は、時系列データを平滑化し、短期的な変動を除いて長期的なトレンドを見やすくします。"
    },
    {
      id: 27,
      question: "クロスバリデーション（交差検証）の目的は何ですか。",
      options: [
        "標本サイズを増やす",
        "モデルの汎化性能を評価する",
        "有意水準を決める",
        "データを可視化する"
      ],
      correct: 2,
      explanation: "クロスバリデーションは、データを訓練用と検証用に分けてモデルの汎化性能（未知データへの適用力）を評価します。"
    },
    {
      id: 28,
      question: "コクランのQ検定は何のための検定ですか。",
      options: [
        "対応のある3群以上の2値データの検定",
        "対応のない2群の平均値の差",
        "相関係数の検定",
        "分散の等質性の検定"
      ],
      correct: 1,
      explanation: "コクランのQ検定は、対応のある3群以上の2値データ（成功/失敗など）の差を検定するノンパラメトリック検定です。"
    },
    {
      id: 29,
      question: "ロジスティック回帰分析で目的変数として使えるのはどれですか。",
      options: [
        "連続値",
        "2値データ（成功/失敗）",
        "順序データのみ",
        "名義データのみ"
      ],
      correct: 2,
      explanation: "ロジスティック回帰は、目的変数が2値データ（0/1、成功/失敗など）の場合に使う回帰分析です。"
    },
    {
      id: 30,
      question: "シンプソンのパラドックスとは何ですか。",
      options: [
        "標本サイズが大きいと有意差が出やすい",
        "部分データでは傾向が逆転する現象",
        "相関係数が0.5を超えない",
        "分散が大きくなる"
      ],
      correct: 2,
      explanation: "シンプソンのパラドックスは、全体で見た傾向と部分（層別）で見た傾向が逆転する現象です。交絡因子の影響で起こります。"
    }
  ];

  const exam = useExam({
    examId: 'grade3-exam3',
    examTitle: '統計検定3級 第3回模擬試験',
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
      title="📝 統計検定3級 模擬試験3"
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
