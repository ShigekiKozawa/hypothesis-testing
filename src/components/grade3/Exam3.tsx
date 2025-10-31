import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade3Exam3() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const questions = [
    {
      id: 1,
      question: "マルコフ連鎖モンテカルロ法（MCMC）でバーンイン期間を設定する主な目的は何ですか。",
      options: [
        "計算速度を上げるため",
        "初期値の影響を除去するため",
        "サンプルサイズを増やすため",
        "精度を下げるため"
      ],
      correct: 2,
      explanation: "バーンイン期間は初期値の影響を受けたサンプルを除去し、定常分布に収束させるために設定します。"
    },
    {
      id: 2,
      question: "次の階層ベイズモデルで、超パラメータが持つ役割として正しいものはどれですか。",
      options: [
        "データを直接生成する",
        "下層のパラメータの事前分布を規定する",
        "尤度関数を決定する",
        "サンプルサイズを決定する"
      ],
      correct: 2,
      explanation: "階層ベイズモデルでは、超パラメータが下層のパラメータの事前分布を規定する階層構造を持ちます。"
    },
    {
      id: 3,
      question: "傾向スコア分析で、逆確率重み付け（IPW）を用いる際、推定の安定性を損なう原因として最も重要なのはどれですか。",
      options: [
        "サンプルサイズが大きすぎる",
        "傾向スコアが0や1に極端に近い",
        "説明変数が多すぎる",
        "アウトカムが連続変数である"
      ],
      correct: 2,
      explanation: "傾向スコアが極端な値（0や1に近い）の場合、重みが極端に大きくなり、推定が不安定になります。"
    },
    {
      id: 4,
      question: "Granger因果性検定で、時系列XがYをGranger因果するとはどういう意味ですか。",
      options: [
        "XがYの真の原因である",
        "Xの過去の情報がYの予測に有用である",
        "XとYの相関が高い",
        "XがYより先に観測される"
      ],
      correct: 2,
      explanation: "Granger因果性は真の因果関係ではなく、Xの過去の値がYの将来の値の予測に統計的に有用であることを示します。"
    },
    {
      id: 5,
      question: "変分ベイズ法がMCMCと比較して持つ利点は何ですか。",
      options: [
        "常に厳密な推定ができる",
        "計算が高速である",
        "サンプリング誤差がない",
        "事前分布が不要である"
      ],
      correct: 2,
      explanation: "変分ベイズ法は最適化ベースの近似手法で、MCMCよりも計算が高速ですが、近似誤差が生じます。"
    },
    {
      id: 6,
      question: "共変量シフト下での予測精度を改善するための手法として、重要度サンプリングで用いる重みはどのように計算されますか。",
      options: [
        "訓練データの密度 / テストデータの密度",
        "テストデータの密度 / 訓練データの密度",
        "訓練データとテストデータの密度の和",
        "訓練データとテストデータの密度の積"
      ],
      correct: 2,
      explanation: "共変量シフト下では、テストデータの密度 / 訓練データの密度 で重みを計算し、訓練データを再重み付けします。"
    },
    {
      id: 7,
      question: "非定常時系列データに対してARIMAモデルを適用する際、階差をとる主な目的は何ですか。",
      options: [
        "データを増やすため",
        "定常性を得るため",
        "相関を強めるため",
        "外れ値を除去するため"
      ],
      correct: 2,
      explanation: "非定常時系列に階差をとることで、トレンドを除去し定常性を得ることができます。"
    },
    {
      id: 8,
      question: "操作変数法で、操作変数Zが満たすべき2つの条件は何ですか。",
      options: [
        "ZとXが相関し、ZとYが独立",
        "ZとXが相関し、Z はアウトカムに直接影響しない（除外制約）",
        "ZとXが独立し、ZとYが相関",
        "ZとXが独立し、ZとYも独立"
      ],
      correct: 2,
      explanation: "操作変数は (1) 説明変数Xと相関し、(2) アウトカムYには説明変数を通じてのみ影響する（除外制約）という2条件を満たす必要があります。"
    },
    {
      id: 9,
      question: "回帰不連続デザイン（RDD）で、処置割り当ての閾値付近のデータのみを用いる理由は何ですか。",
      options: [
        "計算量を減らすため",
        "局所的にランダム化された状況に近似するため",
        "外れ値を除去するため",
        "サンプルサイズを増やすため"
      ],
      correct: 2,
      explanation: "閾値付近では処置の割り当てが準ランダム化されていると仮定でき、因果効果を推定できます。"
    },
    {
      id: 10,
      question: "ニューラルネットワークの過学習を防ぐための正則化手法で、訓練中にランダムにニューロンを無効化する手法の名称は何ですか。",
      options: [
        "Batch Normalization",
        "Dropout",
        "Early Stopping",
        "Gradient Clipping"
      ],
      correct: 2,
      explanation: "Dropoutは訓練中にランダムにニューロンを無効化することで、過学習を防ぐ正則化手法です。"
    },
    {
      id: 11,
      question: "カーネル密度推定で、バンド幅hを大きくすると推定される密度関数はどうなりますか。",
      options: [
        "より滑らかになる",
        "より凹凸が増える",
        "変化しない",
        "必ず正規分布に近づく"
      ],
      correct: 1,
      explanation: "バンド幅を大きくすると推定がより滑らかになりますが、細部の構造が失われます（バイアス増加、分散減少）。"
    },
    {
      id: 12,
      question: "次の共和分検定（Johansen検定）で、2つの時系列が共和分関係にあると判定されました。これは何を意味しますか。",
      options: [
        "2つの時系列は独立である",
        "2つの時系列は長期的な均衡関係を持つ",
        "2つの時系列は同じ値をとる",
        "2つの時系列に因果関係がある"
      ],
      correct: 2,
      explanation: "共和分関係は、個別には非定常な時系列が、線形結合によって定常になる長期均衡関係を意味します。"
    },
    {
      id: 13,
      question: "構造方程式モデリング（SEM）で、モデル識別の条件として、パラメータ数と自由度の関係はどうあるべきですか。",
      options: [
        "パラメータ数 > 観測変数の情報量",
        "パラメータ数 = 観測変数の情報量",
        "パラメータ数 ≤ 観測変数の情報量",
        "制約なし"
      ],
      correct: 3,
      explanation: "モデルを識別するには、推定すべきパラメータ数が観測変数から得られる情報量（分散・共分散の数）以下である必要があります。"
    },
    {
      id: 14,
      question: "ベイズ最適化でガウス過程を用いる主な理由は何ですか。",
      options: [
        "計算が最も速いため",
        "不確実性を定量化しながら探索と活用のバランスをとれるため",
        "必ず最適解が見つかるため",
        "微分可能でなくても使えるため"
      ],
      correct: 2,
      explanation: "ガウス過程は予測の不確実性を定量化でき、獲得関数を通じて探索（exploration）と活用（exploitation）のバランスをとります。"
    },
    {
      id: 15,
      question: "アンサンブル学習でバギング（Bagging）が分散を減少させる仕組みとして正しいものはどれですか。",
      options: [
        "多様なモデルの予測を平均化する",
        "訓練データを増やす",
        "特徴量を選択する",
        "正則化パラメータを調整する"
      ],
      correct: 1,
      explanation: "バギングはブートストラップサンプルで学習した多様なモデルの予測を平均化することで、予測の分散を減少させます。"
    },
    {
      id: 16,
      question: "EM（Expectation-Maximization）アルゴリズムが収束する先は何ですか。",
      options: [
        "大域的最適解",
        "局所的最適解",
        "必ず真のパラメータ",
        "初期値と無関係な一意の解"
      ],
      correct: 2,
      explanation: "EMアルゴリズムは尤度を単調増加させますが、非凸最適化問題のため、局所最適解に収束します。初期値依存性があります。"
    },
    {
      id: 17,
      question: "Lasso回帰でλ（正則化パラメータ）を増やすと係数はどうなりますか。",
      options: [
        "すべての係数が大きくなる",
        "より多くの係数が正確に0になる",
        "すべての係数が等しくなる",
        "係数は変化しない"
      ],
      correct: 2,
      explanation: "Lassoでλを増やすとL1ペナルティが強まり、より多くの係数が正確に0になります（変数選択効果）。"
    },
    {
      id: 18,
      question: "カルマンフィルタで、予測ステップと更新ステップの役割として正しいものはどれですか。",
      options: [
        "予測: 次の時刻の状態を予測、更新: 観測を用いて予測を補正",
        "予測: 観測値を生成、更新: パラメータを推定",
        "予測: ノイズを除去、更新: サンプルを増やす",
        "予測と更新は同じ"
      ],
      correct: 1,
      explanation: "カルマンフィルタは、予測ステップで次時刻の状態を予測し、更新ステップで観測データを用いて予測を補正します。"
    },
    {
      id: 19,
      question: "次の因果推論で、DAG（有向非巡回グラフ）における「バックドア基準」を満たす変数セットの役割は何ですか。",
      options: [
        "媒介変数を特定する",
        "交絡を調整して因果効果を識別可能にする",
        "操作変数を見つける",
        "サンプルサイズを決定する"
      ],
      correct: 2,
      explanation: "バックドア基準を満たす変数セットで条件づけることで、交絡を調整し因果効果を識別できます。"
    },
    {
      id: 20,
      question: "変換モデル（Transformation Model）で、Box-Cox変換のλ=0のとき、変換は何に相当しますか。",
      options: [
        "恒等変換（変換なし）",
        "対数変換",
        "平方根変換",
        "逆数変換"
      ],
      correct: 2,
      explanation: "Box-Cox変換でλ=0は対数変換に相当します（極限として定義）。"
    },
    {
      id: 21,
      question: "分位点回帰（Quantile Regression）が通常の最小二乗法より優れている状況はどれですか。",
      options: [
        "外れ値の影響を受けにくく、分布の異なる部分を調べたいとき",
        "常にすべての状況で優れている",
        "計算が速いとき",
        "正規分布が仮定できるとき"
      ],
      correct: 1,
      explanation: "分位点回帰は外れ値に頑健で、条件付き分布の異なる分位点（中央値、上位下位分位点など）を個別に推定できます。"
    },
    {
      id: 22,
      question: "ディリクレ過程（Dirichlet Process）を混合モデルに用いる利点は何ですか。",
      options: [
        "混合数（クラスター数）を事前に指定する必要がない",
        "計算が最も速い",
        "正規分布のみに適用できる",
        "外れ値が必ず除去される"
      ],
      correct: 1,
      explanation: "ディリクレ過程混合モデルは、ノンパラメトリックベイズ手法として、混合数を事前に固定せず、データから自動的に決定できます。"
    },
    {
      id: 23,
      question: "勾配ブースティングで、学習率（learning rate）を小さくすると何が起こりますか。",
      options: [
        "収束が速くなる",
        "収束が遅くなるが過学習のリスクが減る",
        "精度が必ず悪化する",
        "木の深さが増える"
      ],
      correct: 2,
      explanation: "学習率を小さくすると、各ステップでの更新が小さくなり収束は遅くなりますが、過学習を防ぎ汎化性能が向上することがあります。"
    },
    {
      id: 24,
      question: "Cox比例ハザードモデルで、時間依存共変量を含む場合の解釈として正しいものはどれですか。",
      options: [
        "共変量の効果が時間によって変化しない",
        "共変量の値自体が時間とともに変化する",
        "ハザード比が常に1である",
        "生存時間が一定である"
      ],
      correct: 2,
      explanation: "時間依存共変量は、観察期間中に共変量の値が変化する状況を扱います（例: 時間とともに変わる治療法）。"
    },
    {
      id: 25,
      question: "t-SNEによる次元削減で、パープレキシティ（perplexity）パラメータの役割は何ですか。",
      options: [
        "最終的な次元数を決定する",
        "局所的・大域的な構造のバランスを調整する",
        "計算速度を決定する",
        "データのスケールを正規化する"
      ],
      correct: 2,
      explanation: "パープレキシティは近傍の数を実質的に制御し、局所構造と大域構造のバランスを調整します（通常5〜50）。"
    },
    {
      id: 26,
      question: "次のメンデルのランダム化（Mendelian Randomization）で、遺伝子変異を操作変数として用いる理由は何ですか。",
      options: [
        "遺伝子変異は測定しやすいため",
        "遺伝子変異はランダムに割り当てられ交絡が少ないため",
        "遺伝子変異は必ず疾患の原因であるため",
        "遺伝子変異はサンプルサイズを増やすため"
      ],
      correct: 2,
      explanation: "遺伝子変異は親から子へランダムに伝わるため、観察研究でもランダム化試験に近い因果推論が可能になります。"
    },
    {
      id: 27,
      question: "ベイズファクター（Bayes Factor）が10のとき、これはどのように解釈されますか。",
      options: [
        "モデル1の事後確率が0.1である",
        "モデル1がモデル2より10倍支持される",
        "モデル2がモデル1より10倍支持される",
        "p値が0.1である"
      ],
      correct: 2,
      explanation: "ベイズファクターBF₁₂=10は、データがモデル1をモデル2より10倍支持することを意味します。"
    },
    {
      id: 28,
      question: "強化学習のQ学習で、Q値が表すものは何ですか。",
      options: [
        "ある状態での報酬の期待値",
        "ある状態である行動をとったときの将来の累積報酬の期待値",
        "現在の報酬のみ",
        "状態遷移確率"
      ],
      correct: 2,
      explanation: "Q値Q(s,a)は、状態sで行動aをとったときに得られる将来の累積報酬の期待値を表します。"
    },
    {
      id: 29,
      question: "スパースモデリングで、Elastic Netが LassoとRidgeの両方の特性を持つ理由は何ですか。",
      options: [
        "L1とL2ペナルティを両方含むため",
        "L0ペナルティを使うため",
        "ペナルティを使わないため",
        "L∞ペナルティを使うため"
      ],
      correct: 1,
      explanation: "Elastic NetはL1ペナルティ（Lasso）とL2ペナルティ（Ridge）を組み合わせ、変数選択と正則化の両方の利点を持ちます。"
    },
    {
      id: 30,
      question: "敵対的生成ネットワーク（GAN）で、生成器と識別器の関係として正しいものはどれですか。",
      options: [
        "生成器と識別器は同じネットワークである",
        "生成器が識別器を騙すように学習し、識別器は本物と偽物を区別するように学習する",
        "識別器だけが学習する",
        "生成器だけが学習する"
      ],
      correct: 2,
      explanation: "GANは生成器（Generator）と識別器（Discriminator）が敵対的に学習し合うことで、生成器がリアルなデータを生成できるようになります。"
    }
  ];

  const handleAnswer = (questionId: number, answer: number) => {
    setAnswers(prev => ({...prev, [questionId]: answer}));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct) {
        correct++;
      }
    });
    return correct;
  };

  useEffect(() => {
    const best = getBestScore('grade3-exam3');
    if (best) {
      setBestScore(best.percentage);
    }
  }, []);

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      alert('すべての問題に回答してください。');
      return;
    }
    
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;
    
    saveExamRecord({
      examId: 'grade3-exam3',
      examTitle: '3級 模擬試験3（超難）',
      grade: '3級',
      score,
      totalQuestions: questions.length,
      percentage,
      passed: percentage >= 65
    });
    
    const best = getBestScore('grade3-exam3');
    if (best) {
      setBestScore(best.percentage);
    }
    
    setShowResult(true);
    window.scrollTo(0, 0);
  };

  const resetExam = () => {
    setAnswers({});
    setShowResult(false);
    window.scrollTo(0, 0);
  };

  if (showResult) {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;
    const passed = percentage >= 65;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              📊 3級 模擬試験3 結果
            </h1>
            
            <div className="text-center mb-8">
              <div className={`inline-block rounded-lg px-12 py-8 shadow-xl ${
                passed 
                  ? 'bg-gradient-to-br from-purple-500 to-purple-700' 
                  : 'bg-gradient-to-br from-gray-500 to-gray-700'
              } text-white`}>
                <p className="text-6xl font-bold mb-2">{score}/30</p>
                <p className="text-2xl mb-4">正答率: {percentage.toFixed(1)}%</p>
                <p className="text-xl font-bold">
                  {passed ? '🎉 合格！' : '📝 不合格'}
                </p>
                <p className="text-sm mt-2">合格ライン: 65%以上（20問以上）</p>
              </div>
              {bestScore !== null && (
                <div className="mt-4 text-center">
                  <p className="text-gray-600">
                    あなたのベストスコア: <span className="font-bold text-purple-600">{bestScore.toFixed(1)}%</span>
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={resetExam}
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                もう一度挑戦する
              </button>
              <Link
                to="/"
                className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors text-center"
              >
                トップページに戻る
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📝 解答と解説</h2>
            
            {questions.map((q, index) => {
              const isCorrect = answers[q.id] === q.correct;
              
              return (
                <div key={q.id} className={`bg-white rounded-lg shadow-lg p-6 border-l-4 ${
                  isCorrect ? 'border-purple-500' : 'border-red-500'
                }`}>
                  <div className="flex items-start gap-3 mb-4">
                    <span className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                      isCorrect ? 'bg-purple-500' : 'bg-red-500'
                    }`}>
                      {isCorrect ? '○' : '×'}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800 mb-2">
                        問題{index + 1}
                      </h3>
                      <p className="text-gray-700 whitespace-pre-line mb-3">{q.question}</p>
                    </div>
                  </div>
                  
                  <div className="ml-13 space-y-3">
                    <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">あなたの回答</p>
                      <p className="font-semibold text-gray-800">
                        {answers[q.id] ? `${answers[q.id]}. ${q.options[answers[q.id] - 1]}` : '未回答'}
                      </p>
                    </div>
                    
                    <div className="bg-purple-50 border border-purple-200 p-3 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">正解</p>
                      <p className="font-semibold text-gray-800">
                        {q.correct}. {q.options[q.correct - 1]}
                      </p>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1 font-semibold">📖 解説</p>
                      <p className="text-gray-700 text-sm leading-relaxed">{q.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              📝 3級 - 模擬試験3（超難）
            </h1>
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
            <p className="text-gray-700">
              <strong>制限時間:</strong> 90分 | <strong>問題数:</strong> 30問 | <strong>合格ライン:</strong> 65%以上（20問以上）
            </p>
            <p className="text-gray-700 mt-2">
              <strong>難易度:</strong> ⭐⭐⭐⭐⭐ 超難しいレベル
            </p>
          </div>
          <p className="text-gray-600">ベイズ統計・因果推論・機械学習・最先端手法を含む最高難度試験です。</p>
        </div>

        <div className="space-y-6">
          {questions.map((q, index) => (
            <div key={q.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg text-base font-bold">
                    問題 {index + 1}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 whitespace-pre-line leading-relaxed mb-4">
                  {q.question}
                </h2>
              </div>

              <div className="space-y-3">
                {q.options.map((option, optIndex) => {
                  const optionNum = optIndex + 1;
                  const isSelected = answers[q.id] === optionNum;
                  
                  return (
                    <button
                      key={optIndex}
                      onClick={() => handleAnswer(q.id, optionNum)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all font-medium ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50 shadow-md'
                          : 'border-gray-300 bg-white hover:border-purple-400 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${
                          isSelected
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}>
                          {optionNum}
                        </span>
                        <span className="text-gray-800 leading-relaxed pt-1 whitespace-pre-line">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="w-full bg-pink-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-pink-700 transition-colors shadow-lg"
          >
            ✓ 採点する
          </button>
        </div>
      </div>
    </div>
  );
}

