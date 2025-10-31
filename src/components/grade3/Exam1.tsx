import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade3Exam1() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const questions = [
    {
      id: 1,
      question: "次の回帰分析で、重相関係数R=0.8のとき、決定係数R²はいくつですか。また、これはどのような意味を持ちますか。",
      options: [
        "0.64、説明変数が目的変数の変動の64%を説明する",
        "0.80、説明変数が目的変数の80%を説明する",
        "0.64、目的変数が説明変数の変動の64%を説明する",
        "0.80、相関が80%ある"
      ],
      correct: 1,
      explanation: "決定係数 R² = 0.8² = 0.64。これは説明変数が目的変数の変動の64%を説明していることを意味します。"
    },
    {
      id: 2,
      question: "標準正規分布において、95%信頼区間に対応するz値（両側）はいくつですか。",
      options: ["±1.645", "±1.96", "±2.33", "±2.58"],
      correct: 2,
      explanation: "95%信頼区間の両側z値は ±1.96 です。これは統計学で最も頻繁に使用される値です。"
    },
    {
      id: 3,
      question: "次の一元配置分散分析で、F統計量が3.5、自由度が(3, 36)のとき、有意水準5%の臨界値が2.87だとすると、結論はどれですか。",
      options: [
        "帰無仮説を棄却できない",
        "帰無仮説を棄却する",
        "判定できない",
        "有意水準を変更する必要がある"
      ],
      correct: 2,
      explanation: "F統計量3.5 > 臨界値2.87 なので、帰無仮説（すべての群の平均が等しい）を棄却します。"
    },
    {
      id: 4,
      question: "標本サイズ100、標本平均50、標本標準偏差10のとき、母平均の95%信頼区間はおよそいくつですか。",
      options: [
        "[48.04, 51.96]",
        "[49.02, 50.98]",
        "[49.5, 50.5]",
        "[47.5, 52.5]"
      ],
      correct: 1,
      explanation: "標準誤差 = 10/√100 = 1。信頼区間 = 50 ± 1.96×1 = [48.04, 51.96]です。"
    },
    {
      id: 5,
      question: "相関係数0.7、説明変数の標準偏差10、目的変数の標準偏差15のとき、回帰直線の傾きはいくつですか。",
      options: ["0.467", "0.7", "1.05", "1.5"],
      correct: 3,
      explanation: "傾き = 相関係数 × (目的変数の標準偏差 / 説明変数の標準偏差) = 0.7 × (15/10) = 1.05です。"
    },
    {
      id: 6,
      question: "次の2×2分割表でカイ二乗検定を行います。\n\n       A    B   計\n甲    15   35   50\n乙    25   25   50\n計    40   60  100\n\nカイ二乗統計量はおよそいくつですか。",
      options: ["約3.6", "約4.2", "約5.0", "約6.3"],
      correct: 2,
      explanation: "期待度数を計算し、χ² = Σ(O-E)²/E を計算すると約4.17です。"
    },
    {
      id: 7,
      question: "正規分布N(μ=50, σ=8)において、P(X > 58)はおよそいくつですか。（z=1の上側確率は約0.16）",
      options: ["約0.08", "約0.16", "約0.32", "約0.50"],
      correct: 2,
      explanation: "z = (58-50)/8 = 1。P(Z > 1) ≈ 0.16です。"
    },
    {
      id: 8,
      question: "t分布について正しい説明はどれですか。",
      options: [
        "標本サイズが小さく、母分散が未知のときに使用する",
        "標本サイズが大きく、母分散が既知のときに使用する",
        "常に正規分布と同じ形をしている",
        "自由度が無限大のときz分布より尖っている"
      ],
      correct: 1,
      explanation: "t分布は標本サイズが小さく、母分散が未知の場合に使用します。自由度が大きくなると正規分布に近づきます。"
    },
    {
      id: 9,
      question: "重回帰分析で、説明変数が5つ、サンプルサイズが100、決定係数R²=0.6のとき、調整済みR²はおよそいくつですか。",
      options: ["約0.54", "約0.58", "約0.60", "約0.62"],
      correct: 2,
      explanation: "調整済みR² = 1 - (1-0.6)×(99/94) = 1 - 0.4×1.053 ≈ 0.579です。"
    },
    {
      id: 10,
      question: "次の検定で、p値が0.08でした。有意水準5%で判断すると、どうなりますか。",
      options: [
        "帰無仮説を棄却する",
        "帰無仮説を棄却できない",
        "対立仮説を棄却する",
        "判定不能"
      ],
      correct: 2,
      explanation: "p値0.08 > 有意水準0.05 なので、帰無仮説を棄却できません。"
    },
    {
      id: 11,
      question: "層別サンプリングの利点として最も適切なものはどれですか。",
      options: [
        "コストが最も安い",
        "最も簡単に実施できる",
        "各層の特性を確実に反映できる",
        "母集団の情報が不要"
      ],
      correct: 3,
      explanation: "層別サンプリングは各層から適切にサンプルを抽出することで、各層の特性を確実に反映できます。"
    },
    {
      id: 12,
      question: "2群の平均の差の検定で、等分散性の検定（F検定）を行った結果、p=0.30でした。次にどうすべきですか。",
      options: [
        "Welchのt検定を使用する",
        "通常のStudentのt検定を使用する",
        "Mann-WhitneyのU検定を使用する",
        "検定を中止する"
      ],
      correct: 2,
      explanation: "p=0.30 > 0.05 なので等分散性が仮定できます。通常のStudentのt検定を使用します。"
    },
    {
      id: 13,
      question: "次のデータで、ピアソンの積率相関係数が0.9、スピアマンの順位相関係数が0.6でした。この違いから推測されることは何ですか。",
      options: [
        "データに外れ値や非線形な関係がある可能性",
        "計算ミスがある",
        "サンプルサイズが小さすぎる",
        "相関がない"
      ],
      correct: 1,
      explanation: "ピアソンとスピアマンの相関係数に大きな差がある場合、外れ値や非線形な関係の存在が疑われます。"
    },
    {
      id: 14,
      question: "多重比較でBonferroni法を用いて10回比較を行います。全体の有意水準を0.05とするとき、各比較の有意水準はいくつですか。",
      options: ["0.001", "0.005", "0.01", "0.05"],
      correct: 2,
      explanation: "Bonferroni補正: α/k = 0.05/10 = 0.005です。"
    },
    {
      id: 15,
      question: "次の残差プロットが扇形に広がっている場合、何が疑われますか。",
      options: [
        "多重共線性",
        "不均一分散（heteroscedasticity）",
        "正規性の仮定の違反",
        "外れ値"
      ],
      correct: 2,
      explanation: "残差が予測値に応じて広がる場合、不均一分散（heteroscedasticity）が疑われます。"
    },
    {
      id: 16,
      question: "VIF（分散拡大要因）が10以上の説明変数がある場合、何が問題ですか。",
      options: [
        "相関が弱すぎる",
        "多重共線性が存在する",
        "外れ値がある",
        "サンプルサイズが小さい"
      ],
      correct: 2,
      explanation: "VIF≧10は多重共線性の強い兆候です。説明変数間に強い相関があることを示します。"
    },
    {
      id: 17,
      question: "対応のある2群の比較で、差の分布が正規性を満たさない場合、どの検定を使うべきですか。",
      options: [
        "対応のあるt検定",
        "Wilcoxonの符号付順位和検定",
        "Mann-WhitneyのU検定",
        "F検定"
      ],
      correct: 2,
      explanation: "対応のあるデータで正規性を満たさない場合、Wilcoxonの符号付順位和検定を使用します。"
    },
    {
      id: 18,
      question: "二項分布B(n=100, p=0.5)を正規分布で近似するとき、平均と標準偏差はいくつですか。",
      options: [
        "平均50、標準偏差5",
        "平均50、標準偏差25",
        "平均25、標準偏差5",
        "平均25、標準偏差25"
      ],
      correct: 1,
      explanation: "平均 = np = 50、分散 = np(1-p) = 25、標準偏差 = √25 = 5です。"
    },
    {
      id: 19,
      question: "AICの値が小さいモデルほど良いとされる理由は何ですか。",
      options: [
        "自由度が大きいから",
        "モデルの当てはまりと複雑さのバランスが良いから",
        "サンプルサイズが大きいから",
        "決定係数が大きいから"
      ],
      correct: 2,
      explanation: "AICはモデルの当てはまりの良さとパラメータ数によるペナルティのバランスを評価します。小さいほど良いモデルです。"
    },
    {
      id: 20,
      question: "次の時系列データで自己相関が高い場合、回帰分析の仮定で何が問題になりますか。",
      options: [
        "多重共線性",
        "誤差項の独立性",
        "正規性",
        "線形性"
      ],
      correct: 2,
      explanation: "時系列データで自己相関が高いと、誤差項の独立性の仮定が崩れます。"
    },
    {
      id: 21,
      question: "χ²適合度検定で、観測度数が期待度数に完全に一致する場合、χ²統計量はいくつですか。",
      options: ["0", "1", "自由度に等しい", "無限大"],
      correct: 1,
      explanation: "完全に一致する場合、χ² = Σ(O-E)²/E = 0 です。"
    },
    {
      id: 22,
      question: "ロジスティック回帰で、オッズ比が1の説明変数の係数βはいくつですか。",
      options: ["-1", "0", "1", "e"],
      correct: 2,
      explanation: "オッズ比 = e^β = 1 のとき、β = ln(1) = 0 です。この変数は結果に影響しません。"
    },
    {
      id: 23,
      question: "検出力（power）を高める方法として適切でないものはどれですか。",
      options: [
        "サンプルサイズを大きくする",
        "有意水準αを大きくする",
        "効果量を大きくする",
        "有意水準αを小さくする"
      ],
      correct: 4,
      explanation: "有意水準αを小さくすると検出力は下がります。検出力を高めるにはα を大きくするか、n を増やすか、効果量を大きくします。"
    },
    {
      id: 24,
      question: "次の共分散行列で、変数XとYの相関係数を求めなさい。\n\n     X    Y\nX   9    6\nY   6    4",
      options: ["0.5", "0.67", "0.75", "1.0"],
      correct: 4,
      explanation: "相関係数 = 共分散/(√分散X × √分散Y) = 6/(√9 × √4) = 6/6 = 1.0。完全な正の相関です。"
    },
    {
      id: 25,
      question: "主成分分析で、第1主成分が全分散の60%、第2主成分が30%を説明する場合、累積寄与率はいくつですか。",
      options: ["30%", "60%", "90%", "100%"],
      correct: 3,
      explanation: "累積寄与率 = 60% + 30% = 90%です。"
    },
    {
      id: 26,
      question: "回帰分析で、標準化回帰係数（β）の絶対値が大きいほど、どういう意味ですか。",
      options: [
        "その変数の影響が大きい",
        "その変数の測定単位が大きい",
        "多重共線性がある",
        "外れ値がある"
      ],
      correct: 1,
      explanation: "標準化回帰係数は単位の影響を除いているため、絶対値が大きいほどその変数の影響力が大きいことを示します。"
    },
    {
      id: 27,
      question: "Cox比例ハザードモデルで、ハザード比が0.5の変数があります。これはどういう意味ですか。",
      options: [
        "リスクが2倍になる",
        "リスクが半分になる",
        "リスクが変わらない",
        "生存時間が2倍になる"
      ],
      correct: 2,
      explanation: "ハザード比0.5は、その変数が1単位増加するとイベント発生リスクが半分になることを意味します。"
    },
    {
      id: 28,
      question: "次の正規QQプロットで、点が直線から大きく外れている場合、何が示唆されますか。",
      options: [
        "データが正規分布に従っている",
        "データが正規分布に従っていない",
        "外れ値がない",
        "分散が均一である"
      ],
      correct: 2,
      explanation: "QQプロットで点が直線から外れる場合、データが正規分布に従っていないことを示唆します。"
    },
    {
      id: 29,
      question: "ブートストラップ法の目的として最も適切なものはどれですか。",
      options: [
        "サンプルサイズを増やす",
        "推定量の標準誤差や信頼区間を求める",
        "外れ値を除去する",
        "多重共線性を解消する"
      ],
      correct: 2,
      explanation: "ブートストラップ法はリサンプリングにより、推定量の標準誤差や信頼区間を経験的に求める方法です。"
    },
    {
      id: 30,
      question: "交差検証（クロスバリデーション）の主な目的は何ですか。",
      options: [
        "サンプルサイズを増やす",
        "モデルの汎化性能を評価する",
        "外れ値を検出する",
        "変数選択を行う"
      ],
      correct: 2,
      explanation: "交差検証は、モデルが未知のデータに対してどの程度うまく機能するか（汎化性能）を評価するための手法です。"
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
    const best = getBestScore('grade3-exam1');
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
      examId: 'grade3-exam1',
      examTitle: '3級 模擬試験1（中級）',
      grade: '3級',
      score,
      totalQuestions: questions.length,
      percentage,
      passed: percentage >= 65
    });
    
    const best = getBestScore('grade3-exam1');
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              📊 3級 模擬試験1 結果
            </h1>
            
            <div className="text-center mb-8">
              <div className={`inline-block rounded-lg px-12 py-8 shadow-xl ${
                passed 
                  ? 'bg-gradient-to-br from-blue-500 to-blue-700' 
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
                    あなたのベストスコア: <span className="font-bold text-blue-600">{bestScore.toFixed(1)}%</span>
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={resetExam}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
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
                  isCorrect ? 'border-blue-500' : 'border-red-500'
                }`}>
                  <div className="flex items-start gap-3 mb-4">
                    <span className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                      isCorrect ? 'bg-blue-500' : 'bg-red-500'
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
                    
                    <div className="bg-indigo-50 border border-indigo-200 p-3 rounded-lg">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              📝 3級 - 模擬試験1（中級）
            </h1>
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-gray-700">
              <strong>制限時間:</strong> 60分 | <strong>問題数:</strong> 30問 | <strong>合格ライン:</strong> 65%以上（20問以上）
            </p>
            <p className="text-gray-700 mt-2">
              <strong>難易度:</strong> ⭐⭐⭐☆☆ 中級レベル
            </p>
          </div>
          <p className="text-gray-600">推測統計・回帰分析・検定の基礎を総合的に問う試験です。</p>
        </div>

        <div className="space-y-6">
          {questions.map((q, index) => (
            <div key={q.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-base font-bold">
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
                          ? 'border-blue-600 bg-blue-50 shadow-md'
                          : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white'
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
            className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors shadow-lg"
          >
            ✓ 採点する
          </button>
        </div>
      </div>
    </div>
  );
}
