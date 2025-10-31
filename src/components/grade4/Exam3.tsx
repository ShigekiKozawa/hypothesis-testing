import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade4Exam3() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    {
      id: 1,
      question: "次の3つのデータセットA, B, Cの中で、変動係数が最も大きいのはどれですか。\nA: 平均50、標準偏差10\nB: 平均100、標準偏差15\nC: 平均200、標準偏差35",
      options: ["A", "B", "C", "すべて同じ"],
      correct: 1,
      explanation: "変動係数: A=10/50=0.20、B=15/100=0.15、C=35/200=0.175。Aが最大で、相対的なばらつきが最も大きいです。"
    },
    {
      id: 2,
      question: "あるクラスの数学と英語の得点について、共分散が72、数学の分散が144、英語の分散が100です。相関係数はいくつですか。",
      options: ["0.6", "0.72", "0.8", "0.9"],
      correct: 1,
      explanation: "相関係数 = 共分散 / (√分散₁ × √分散₂) = 72 / (√144 × √100) = 72 / (12 × 10) = 72/120 = 0.6です。"
    },
    {
      id: 3,
      question: "正規分布N(μ=100, σ=15)に従う母集団から、サイズ25の標本を抽出したとき、標本平均の標準偏差（標準誤差）はいくつですか。",
      options: ["0.6", "3", "5", "15"],
      correct: 2,
      explanation: "標準誤差 = σ/√n = 15/√25 = 15/5 = 3です。"
    },
    {
      id: 4,
      question: "次のクロス集計表について、カイ二乗統計量を計算せよ。\n\n       A    B   計\n甲    20   10   30\n乙    10   20   30\n計    30   30   60\n\n期待度数はすべて15です。",
      options: ["約2.7", "約5.3", "約6.7", "約8.0"],
      correct: 3,
      explanation: "χ² = Σ(観測度数-期待度数)²/期待度数 = (20-15)²/15 + (10-15)²/15 + (10-15)²/15 + (20-15)²/15 = 25/15×4 = 100/15 ≈ 6.67です。"
    },
    {
      id: 5,
      question: "二項分布B(n=20, p=0.3)の平均と標準偏差はいくつですか。",
      options: [
        "平均6、標準偏差約2.05",
        "平均6、標準偏差約4.2",
        "平均10、標準偏差約2.05",
        "平均10、標準偏差約4.2"
      ],
      correct: 1,
      explanation: "平均 = np = 20×0.3 = 6。分散 = np(1-p) = 20×0.3×0.7 = 4.2。標準偏差 = √4.2 ≈ 2.05です。"
    },
    {
      id: 6,
      question: "母集団の分散が未知で、サンプルサイズ16、標本平均50、標本標準偏差8のとき、母平均の95%信頼区間はおよそいくつですか。（t値を2.13とする）",
      options: [
        "約[45.7, 54.3]",
        "約[46.0, 54.0]",
        "約[46.5, 53.5]",
        "約[47.0, 53.0]"
      ],
      correct: 1,
      explanation: "標準誤差 = 8/√16 = 2。信頼区間 = 50 ± 2.13×2 = 50 ± 4.26 ≈ [45.74, 54.26]です。"
    },
    {
      id: 7,
      question: "次の回帰分析の結果で、残差平方和が100、総平方和が400のとき、決定係数R²はいくつですか。",
      options: ["0.25", "0.50", "0.75", "1.00"],
      correct: 3,
      explanation: "決定係数 R² = 1 - (残差平方和/総平方和) = 1 - 100/400 = 1 - 0.25 = 0.75です。"
    },
    {
      id: 8,
      question: "3つの独立な正規分布変数X~N(10,4), Y~N(20,9), Z~N(30,16)について、W = X + Y - Zの平均と分散はいくつですか。",
      options: [
        "平均0、分散29",
        "平均0、分散7",
        "平均10、分散29",
        "平均10、分散7"
      ],
      correct: 1,
      explanation: "平均 = 10+20-30 = 0。独立なので分散の和: 4+9+16 = 29です。"
    },
    {
      id: 9,
      question: "確率変数Xが一様分布U(0, 10)に従うとき、P(3 < X < 7)はいくつですか。",
      options: ["0.3", "0.4", "0.5", "0.6"],
      correct: 2,
      explanation: "一様分布の確率密度は1/(10-0)=0.1。P(3<X<7) = 0.1×(7-3) = 0.4です。"
    },
    {
      id: 10,
      question: "次のデータで、スピアマンの順位相関係数を計算するとき、順位の差の2乗和Σd²が6でした。データ数n=5のとき、順位相関係数はいくつですか。",
      options: ["0.3", "0.5", "0.7", "0.9"],
      correct: 3,
      explanation: "ρ = 1 - (6Σd²)/(n(n²-1)) = 1 - (6×6)/(5×24) = 1 - 36/120 = 1 - 0.3 = 0.7です。"
    },
    {
      id: 11,
      question: "ポアソン分布Po(λ=3)で、P(X=0)の値はいくつですか。（e^(-3)≈0.0498）",
      options: ["約0.05", "約0.15", "約0.25", "約0.33"],
      correct: 1,
      explanation: "P(X=0) = (e^(-3) × 3^0) / 0! = e^(-3) ≈ 0.0498です。"
    },
    {
      id: 12,
      question: "次の分割表で、オッズ比を計算せよ。\n\n         病気あり  病気なし\n曝露あり    40       10\n曝露なし    10       40",
      options: ["4", "8", "12", "16"],
      correct: 4,
      explanation: "オッズ比 = (40×40)/(10×10) = 1600/100 = 16です。"
    },
    {
      id: 13,
      question: "正規分布の歪度と尖度の値として正しいものはどれですか。",
      options: [
        "歪度0、尖度0",
        "歪度1、尖度3",
        "歪度0、尖度3",
        "歪度1、尖度0"
      ],
      correct: 3,
      explanation: "正規分布は対称なので歪度=0。尖度=3（過剰尖度=0）です。"
    },
    {
      id: 14,
      question: "検定力が0.8、第1種の過誤の確率αが0.05のとき、第2種の過誤の確率βはいくつですか。",
      options: ["0.05", "0.15", "0.20", "0.75"],
      correct: 3,
      explanation: "検定力 = 1 - β。よって β = 1 - 0.8 = 0.2です。"
    },
    {
      id: 15,
      question: "次の時系列データで、3期移動平均の2期目の値はいくつですか。\nデータ: 10, 14, 18, 22, 26",
      options: ["12", "14", "16", "18"],
      correct: 2,
      explanation: "2期目の3期移動平均 = (10+14+18)/3 = 42/3 = 14です。"
    },
    {
      id: 16,
      question: "母比率の検定で、帰無仮説p=0.5、標本サイズ100、標本比率0.6のとき、検定統計量zはいくつですか。",
      options: ["1", "2", "3", "4"],
      correct: 2,
      explanation: "z = (標本比率-母比率)/√(p(1-p)/n) = (0.6-0.5)/√(0.5×0.5/100) = 0.1/0.05 = 2です。"
    },
    {
      id: 17,
      question: "指数分布Exp(λ=0.5)の平均と分散はいくつですか。",
      options: [
        "平均0.5、分散0.25",
        "平均2、分散4",
        "平均2、分散2",
        "平均0.5、分散0.5"
      ],
      correct: 2,
      explanation: "指数分布の平均 = 1/λ = 1/0.5 = 2、分散 = 1/λ² = 1/0.25 = 4です。"
    },
    {
      id: 18,
      question: "サンプルサイズ設計で、効果量d=0.5、検出力0.8、有意水準0.05のとき、必要なサンプルサイズは1群あたり約何人ですか。（標準的な表を参照）",
      options: ["約32人", "約64人", "約128人", "約256人"],
      correct: 2,
      explanation: "効果量0.5（中程度）、検出力0.8、α=0.05のとき、1群あたり約64人が必要です。"
    },
    {
      id: 19,
      question: "次の相関行列で、偏相関係数r₁₂.₃（変数3を制御した変数1と2の相関）を計算するための公式に必要な値はどれですか。\nr₁₂=0.6, r₁₃=0.4, r₂₃=0.5",
      options: [
        "r₁₂のみ",
        "r₁₂とr₁₃",
        "r₁₂、r₁₃、r₂₃すべて",
        "計算不可能"
      ],
      correct: 3,
      explanation: "偏相関係数の公式: r₁₂.₃ = (r₁₂ - r₁₃r₂₃) / √((1-r₁₃²)(1-r₂₃²))。すべての相関係数が必要です。"
    },
    {
      id: 20,
      question: "ベータ分布Beta(α=2, β=2)の平均はいくつですか。",
      options: ["0.25", "0.5", "0.75", "1"],
      correct: 2,
      explanation: "ベータ分布の平均 = α/(α+β) = 2/(2+2) = 0.5です。"
    },
    {
      id: 21,
      question: "次のANOVA表で、F統計量はいくつですか。\n\n要因  平方和  自由度  平均平方\n群間   300     2      150\n群内   600    27      22.22",
      options: ["約4.7", "約5.7", "約6.7", "約7.7"],
      correct: 3,
      explanation: "F = 群間平均平方/群内平均平方 = 150/22.22 ≈ 6.75です。"
    },
    {
      id: 22,
      question: "重回帰分析で、説明変数が3つ、サンプルサイズ50、決定係数R²=0.6のとき、調整済みR²はおよそいくつですか。",
      options: ["約0.55", "約0.57", "約0.59", "約0.60"],
      correct: 2,
      explanation: "調整済みR² = 1 - (1-R²)×(n-1)/(n-k-1) = 1 - 0.4×49/46 ≈ 1 - 0.426 ≈ 0.574です。"
    },
    {
      id: 23,
      question: "コーエンのdで効果量を測定したところ、d=0.8でした。これは何と評価されますか。",
      options: ["小さい効果", "中程度の効果", "大きい効果", "非常に大きい効果"],
      correct: 3,
      explanation: "コーエンの基準: d=0.2（小）、0.5（中）、0.8（大）。よって大きい効果です。"
    },
    {
      id: 24,
      question: "ロジスティック回帰で、オッズ比が2.0の説明変数の係数（β）はいくつですか。（ln(2)≈0.693）",
      options: ["約0.35", "約0.69", "約1.00", "約2.00"],
      correct: 2,
      explanation: "オッズ比 = e^β。β = ln(オッズ比) = ln(2) ≈ 0.693です。"
    },
    {
      id: 25,
      question: "多重比較法でボンフェローニ補正を行います。比較回数が10回、全体の有意水準を0.05とするとき、各検定の有意水準はいくつですか。",
      options: ["0.001", "0.005", "0.01", "0.05"],
      correct: 2,
      explanation: "ボンフェローニ補正: α/k = 0.05/10 = 0.005です。"
    },
    {
      id: 26,
      question: "中心極限定理により、サンプルサイズが十分大きい（n≧30程度）とき、標本平均の分布はどうなりますか。",
      options: [
        "母集団分布と同じになる",
        "一様分布に近づく",
        "正規分布に近づく",
        "指数分布に近づく"
      ],
      correct: 3,
      explanation: "中心極限定理: サンプルサイズが大きいとき、標本平均の分布は正規分布に近づきます。"
    },
    {
      id: 27,
      question: "マクネマー検定が適用される場面はどれですか。",
      options: [
        "2つの独立なグループの比率の比較",
        "対応のある2つのグループの比率の比較",
        "3つ以上のグループの平均の比較",
        "連続変数間の相関の検定"
      ],
      correct: 2,
      explanation: "マクネマー検定は対応のある2値データの変化を検定する方法です。"
    },
    {
      id: 28,
      question: "次の生存時間データで、ハザード比が2.0の意味として正しいものはどれですか。",
      options: [
        "生存時間が2倍になる",
        "生存確率が2倍になる",
        "死亡リスクが2倍になる",
        "生存期間の中央値が2倍になる"
      ],
      correct: 3,
      explanation: "ハザード比2.0は、単位時間あたりのイベント（死亡など）発生リスクが2倍であることを意味します。"
    },
    {
      id: 29,
      question: "クラスカル・ウォリス検定は何を検定するためのノンパラメトリック検定ですか。",
      options: [
        "2群の中央値の差",
        "3群以上の中央値の差",
        "2群の分散の差",
        "相関係数の有意性"
      ],
      correct: 2,
      explanation: "クラスカル・ウォリス検定は、3群以上の中央値（または分布）の差を検定するノンパラメトリック検定です。"
    },
    {
      id: 30,
      question: "次の混合行列（2×2分割表）で、精度（Accuracy）はいくつですか。\n\n          予測陽性  予測陰性\n実際陽性    70       30\n実際陰性    20       80",
      options: ["0.60", "0.70", "0.75", "0.80"],
      correct: 3,
      explanation: "精度 = (TP+TN)/(TP+FP+FN+TN) = (70+80)/(70+20+30+80) = 150/200 = 0.75です。"
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
    const best = getBestScore('grade4-exam3');
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
      examId: 'grade4-exam3',
      examTitle: '4級 模擬試験3（超難）',
      grade: '4級' as '4級',
      score,
      totalQuestions: questions.length,
      percentage,
      passed: percentage >= 60
    });
    
    const best = getBestScore('grade4-exam3');
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
    const passed = percentage >= 60;

    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-purple-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              📊 4級 模擬試験3 結果
            </h1>
            
            <div className="text-center mb-8">
              <div className={`inline-block rounded-lg px-12 py-8 shadow-xl ${
                passed 
                  ? 'bg-gradient-to-br from-purple-500 to-purple-700' 
                  : 'bg-gradient-to-br from-gray-500 to-gray-700'
              } text-white`}>
                <p className="text-6xl font-bold mb-2">{Math.round(percentage)}点</p>
                <p className="text-2xl mb-4">({score}/30問正解)</p>
                <p className="text-xl font-bold">
                  {passed ? '🎉 合格！' : '📝 不合格'}
                </p>
                <p className="text-sm mt-2">合格ライン: 60点以上</p>
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              📝 4級 - 模擬試験3（超難）
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
              <strong>制限時間:</strong> 60分 | <strong>問題数:</strong> 30問 | <strong>合格ライン:</strong> 60%以上（18問以上）
            </p>
            <p className="text-gray-700 mt-2">
              <strong>難易度:</strong> ⭐⭐⭐⭐⭐ 超難しいレベル
            </p>
          </div>
          <p className="text-gray-600">推測統計・多変量解析・高度な検定手法まで含む最高難度試験です。</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="text-lg font-bold text-gray-700">
              問題 {currentQuestionIndex + 1} / {questions.length}
            </div>
            <div className="text-sm text-gray-500">
              回答済み: {Object.keys(answers).length} / {questions.length}
            </div>
          </div>

          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {(() => {
            const q = questions[currentQuestionIndex];
            return (
              <div>
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg text-base font-bold">
                      問題 {currentQuestionIndex + 1}
                    </span>
                    {answers[q.id] && (
                      <span className="text-purple-600 font-semibold">✓ 回答済み</span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 whitespace-pre-line leading-relaxed mb-6">
                    {q.question}
                  </h2>
                </div>

                <div className="space-y-3 mb-8">
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
            );
          })()}
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
            disabled={currentQuestionIndex === 0}
            className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← 前の問題
          </button>
          {currentQuestionIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
              className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              次の問題 →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              ✓ 採点する
            </button>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-sm font-bold text-gray-700 mb-3">問題ナビゲーション</h3>
          <div className="grid grid-cols-10 gap-2">
            {questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`aspect-square rounded-lg font-bold text-sm transition-all ${
                  currentQuestionIndex === index
                    ? 'bg-purple-600 text-white ring-2 ring-purple-400'
                    : answers[q.id]
                    ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

