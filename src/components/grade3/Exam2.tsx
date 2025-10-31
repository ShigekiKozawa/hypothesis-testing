import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade3Exam2() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    {
      id: 1,
      question: "重回帰分析で、説明変数間の相関行列の最大固有値が他の固有値に比べて著しく大きい場合、何が疑われますか。",
      options: [
        "外れ値の存在",
        "多重共線性の存在",
        "不均一分散の存在",
        "正規性の欠如"
      ],
      correct: 2,
      explanation: "最大固有値が他より著しく大きい場合、説明変数間に強い線形関係（多重共線性）があることを示します。"
    },
    {
      id: 2,
      question: "次の混同行列で、F1スコアはいくつですか。\n\n          予測陽性  予測陰性\n実際陽性    80       20\n実際陰性    10       90",
      options: ["0.80", "0.84", "0.87", "0.90"],
      correct: 2,
      explanation: "Precision = 80/(80+10) = 80/90 ≈ 0.889、Recall = 80/(80+20) = 80/100 = 0.8。F1 = 2×Precision×Recall/(Precision+Recall) = 2×0.889×0.8/(0.889+0.8) = 1.4224/1.689 ≈ 0.842 ≈ 0.84です。"
    },
    {
      id: 3,
      question: "ポアソン回帰で、説明変数xの係数が0.5のとき、xが1単位増加すると期待カウント数は何倍になりますか。",
      options: ["約1.28倍", "約1.50倍", "約1.65倍", "約2.00倍"],
      correct: 3,
      explanation: "ポアソン回帰ではe^β倍になります。e^0.5 ≈ 1.649 ≈ 1.65倍です。"
    },
    {
      id: 4,
      question: "次の生存時間分析で、ログランク検定のp値が0.02でした。これは何を意味しますか。",
      options: [
        "2つの群の生存曲線に有意差はない",
        "2つの群の生存曲線に有意差がある",
        "生存時間の中央値が0.02である",
        "検出力が0.02である"
      ],
      correct: 2,
      explanation: "p=0.02 < 0.05 なので、2群の生存曲線に統計的に有意な差があると言えます。"
    },
    {
      id: 5,
      question: "階層的クラスター分析で、ウォード法を使用する利点は何ですか。",
      options: [
        "計算が最も速い",
        "クラスター内の分散を最小化する",
        "外れ値に強い",
        "常に等しいサイズのクラスターを作る"
      ],
      correct: 2,
      explanation: "ウォード法は各クラスター内の平方和を最小化し、コンパクトなクラスターを形成します。"
    },
    {
      id: 6,
      question: "尤度比検定で、-2log(Λ)の値が15.2、自由度が5のとき、χ²分布の5%臨界値が11.07とすると、結論は何ですか。",
      options: [
        "帰無仮説を棄却できない",
        "帰無仮説を棄却する",
        "判定不能",
        "モデルは有意でない"
      ],
      correct: 2,
      explanation: "検定統計量15.2 > 臨界値11.07 なので、帰無仮説を棄却します。"
    },
    {
      id: 7,
      question: "次の時系列データで、ACF（自己相関関数）が1次で0.7、2次で0.5、3次で0.3と徐々に減衰している場合、どのモデルが適切ですか。",
      options: [
        "MA(1)モデル",
        "AR(1)モデル",
        "ランダムウォーク",
        "ホワイトノイズ"
      ],
      correct: 2,
      explanation: "ACFが徐々に減衰するパターンはAR（自己回帰）モデルの特徴です。"
    },
    {
      id: 8,
      question: "因子分析で、因子負荷量の2乗和（共通性）が0.3の変数があります。これはどう解釈すべきですか。",
      options: [
        "因子が変数の変動の70%を説明している",
        "因子が変数の変動の30%を説明している",
        "変数が因子を30%説明している",
        "独自性が30%である"
      ],
      correct: 2,
      explanation: "共通性は因子が説明する分散の割合です。0.3は30%を意味します。"
    },
    {
      id: 9,
      question: "ROC曲線のAUC（曲線下面積）が0.5のとき、分類器の性能はどうですか。",
      options: [
        "完璧な分類",
        "良好な分類",
        "ランダム分類と同等",
        "最悪の分類"
      ],
      correct: 3,
      explanation: "AUC=0.5はランダムな分類と同等の性能を示します。AUC=1.0が完璧な分類です。"
    },
    {
      id: 10,
      question: "傾向スコアマッチングの主な目的は何ですか。",
      options: [
        "サンプルサイズを増やす",
        "観察研究で交絡を調整する",
        "外れ値を検出する",
        "多重共線性を解消する"
      ],
      correct: 2,
      explanation: "傾向スコアマッチングは観察研究において、処置群と対照群のバランスを取り、交絡因子の影響を調整する手法です。"
    },
    {
      id: 11,
      question: "次の重回帰モデルで、Durbin-Watson統計量が1.2でした（2に近いほど自己相関なし）。何が疑われますか。",
      options: [
        "多重共線性",
        "正の自己相関",
        "不均一分散",
        "外れ値"
      ],
      correct: 2,
      explanation: "DW統計量が2より小さい（特に1.5未満）場合、正の自己相関が疑われます。"
    },
    {
      id: 12,
      question: "メタアナリシスで、研究間の異質性を評価する指標I²が75%でした。これはどう解釈されますか。",
      options: [
        "異質性が低い",
        "異質性が中程度",
        "異質性が高い",
        "異質性がない"
      ],
      correct: 3,
      explanation: "I² > 75%は高い異質性を示します（25%で低、50%で中、75%で高）。"
    },
    {
      id: 13,
      question: "共分散構造分析（SEM）で、RMSEA（Root Mean Square Error of Approximation）が0.08を超える場合、モデル適合度はどうですか。",
      options: [
        "良好",
        "許容範囲",
        "不良",
        "完璧"
      ],
      correct: 3,
      explanation: "RMSEA ≤ 0.05で良好、0.05-0.08で許容、> 0.08で不良とされます。"
    },
    {
      id: 14,
      question: "Lasso回帰がRidge回帰より優れている点は何ですか。",
      options: [
        "計算が速い",
        "変数選択も同時に行える",
        "多重共線性に弱い",
        "常に決定係数が高い"
      ],
      correct: 2,
      explanation: "Lassoは係数を正確に0にできるため、変数選択の機能を持ちます。Ridgeは係数を小さくしますが0にはしません。"
    },
    {
      id: 15,
      question: "カプランマイヤー曲線で、打ち切りデータが多い場合の影響は何ですか。",
      options: [
        "推定精度が向上する",
        "信頼区間が狭くなる",
        "信頼区間が広くなる",
        "影響はない"
      ],
      correct: 3,
      explanation: "打ち切りデータが多いと、観測されたイベント数が減るため、信頼区間が広くなります。"
    },
    {
      id: 16,
      question: "次のパネルデータ分析で、固定効果モデルと変量効果モデルのどちらを選ぶべきかを判断する検定は何ですか。",
      options: [
        "F検定",
        "Hausman検定",
        "Durbin-Watson検定",
        "Levene検定"
      ],
      correct: 2,
      explanation: "Hausman検定は固定効果モデルと変量効果モデルの選択に使用されます。"
    },
    {
      id: 17,
      question: "マルチレベルモデル（階層線形モデル）が必要となる状況はどれですか。",
      options: [
        "データが単純無作為抽出されている",
        "データが入れ子構造を持っている",
        "説明変数が1つしかない",
        "サンプルサイズが小さい"
      ],
      correct: 2,
      explanation: "生徒が学校に入れ子になっているなど、階層的なデータ構造の場合にマルチレベルモデルを使用します。"
    },
    {
      id: 18,
      question: "次の繰り返し測定ANOVAで、Mauchlyの球面性検定のp値が0.03でした。どうすべきですか。",
      options: [
        "そのまま通常のANOVAを実行する",
        "Greenhouse-Geisser補正を適用する",
        "ノンパラメトリック検定に変更する",
        "分析を中止する"
      ],
      correct: 2,
      explanation: "球面性の仮定が棄却された（p<0.05）場合、Greenhouse-GeisserやHuynh-Feldtの補正を使用します。"
    },
    {
      id: 19,
      question: "構造方程式モデリング（SEM）で、CFI（Comparative Fit Index）が0.92のとき、モデル適合度の評価はどれですか。",
      options: [
        "不良（CFI < 0.90）",
        "許容範囲（CFI ≥ 0.90）",
        "良好（CFI ≥ 0.95）",
        "完璧（CFI = 1.0）"
      ],
      correct: 2,
      explanation: "CFI ≥ 0.90で許容範囲、≥ 0.95で良好とされます。0.92は許容範囲です。"
    },
    {
      id: 20,
      question: "k-means法で最適なクラスター数を決定する方法として適切なのはどれですか。",
      options: [
        "常にk=3を使う",
        "エルボー法やシルエット係数を使う",
        "最大のkを選ぶ",
        "ランダムに選ぶ"
      ],
      correct: 2,
      explanation: "エルボー法（群内平方和の減少具合）やシルエット係数などを用いてクラスター数を決定します。"
    },
    {
      id: 21,
      question: "ベイズ推定で、事後分布∝尤度×事前分布の関係式において、事前分布を無情報事前分布にする理由は何ですか。",
      options: [
        "計算が簡単になる",
        "データに先入観を与えない",
        "推定精度が向上する",
        "サンプルサイズを増やせる"
      ],
      correct: 2,
      explanation: "無情報事前分布は事前の知識や先入観を与えず、データのみから推定するために使用されます。"
    },
    {
      id: 22,
      question: "次の差分の差分法（DID）で、処理群の処理前後の変化が5、対照群の前後の変化が2のとき、処理効果の推定値はいくつですか。",
      options: ["2", "3", "5", "7"],
      correct: 2,
      explanation: "DID推定量 = (処理群の変化) - (対照群の変化) = 5 - 2 = 3です。"
    },
    {
      id: 23,
      question: "ランダムフォレストで、特徴量重要度が高い変数があります。この変数を除いてモデルを再構築すると何が起こりますか。",
      options: [
        "予測精度が向上する",
        "予測精度が低下する可能性が高い",
        "変化しない",
        "計算速度が低下する"
      ],
      correct: 2,
      explanation: "重要度の高い変数は予測に大きく寄与しているため、除くと精度が低下する可能性が高いです。"
    },
    {
      id: 24,
      question: "交互作用項を含む回帰モデルで、主効果が有意でないが交互作用項が有意な場合、どうすべきですか。",
      options: [
        "主効果を除去する",
        "交互作用項を除去する",
        "両方とも残す",
        "分析を中止する"
      ],
      correct: 3,
      explanation: "交互作用項が有意な場合、主効果が有意でなくても両方をモデルに含めるべきです（階層の原則）。"
    },
    {
      id: 25,
      question: "次の二元配置ANOVAで、交互作用が有意でした。主効果の検定結果の解釈はどうすべきですか。",
      options: [
        "交互作用が有意なので主効果は無視する",
        "主効果と交互作用を両方解釈する",
        "交互作用を考慮して主効果を慎重に解釈する",
        "主効果のみ解釈する"
      ],
      correct: 3,
      explanation: "交互作用が有意な場合、主効果の単純な解釈は困難になります。単純主効果の検定などを追加で行います。"
    },
    {
      id: 26,
      question: "MANCOVAの前提条件として正しいものはどれですか。",
      options: [
        "共変量は従属変数と無相関である",
        "共変量と独立変数の間に交互作用がない（回帰の平行性）",
        "共変量は質的変数である",
        "共変量は従属変数より多い"
      ],
      correct: 2,
      explanation: "MANCOVAでは、共変量と独立変数の間に交互作用がない（回帰の平行性）という仮定が重要です。"
    },
    {
      id: 27,
      question: "次の媒介分析で、XからYへの直接効果が0.3、Mを介した間接効果が0.2のとき、総効果はいくつですか。",
      options: ["0.1", "0.2", "0.5", "0.6"],
      correct: 3,
      explanation: "総効果 = 直接効果 + 間接効果 = 0.3 + 0.2 = 0.5です。"
    },
    {
      id: 28,
      question: "GEE（一般化推定方程式）が通常の一般化線形モデルより優れている点は何ですか。",
      options: [
        "計算が速い",
        "相関のあるデータ（縦断データなど）を扱える",
        "サンプルサイズが小さくても使える",
        "常に推定精度が高い"
      ],
      correct: 2,
      explanation: "GEEは繰り返し測定など相関のあるデータに対して、相関構造を考慮した推定ができます。"
    },
    {
      id: 29,
      question: "次の順序ロジスティック回帰で、比例オッズの仮定が満たされない場合、どうすべきですか。",
      options: [
        "通常のロジスティック回帰を使う",
        "多項ロジスティック回帰を検討する",
        "線形回帰を使う",
        "分析を中止する"
      ],
      correct: 2,
      explanation: "比例オッズの仮定が満たされない場合、制約のない多項ロジスティック回帰やpartial proportional odds modelを検討します。"
    },
    {
      id: 30,
      question: "ベイズ情報量基準（BIC）とAICの違いとして正しいものはどれですか。",
      options: [
        "BICはAICより複雑なモデルを好む",
        "BICはサンプルサイズが大きいとき、AICよりパラメータにペナルティを課す",
        "BICはサンプルサイズを考慮しない",
        "BICとAICは常に同じ値になる"
      ],
      correct: 2,
      explanation: "BICはAICよりもサンプルサイズが大きいときにパラメータ数へのペナルティが大きく、よりシンプルなモデルを選択する傾向があります。"
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
    const best = getBestScore('grade3-exam2');
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
      examId: 'grade3-exam2',
      examTitle: '3級 模擬試験2（難）',
      grade: '3級',
      score,
      totalQuestions: questions.length,
      percentage,
      passed: percentage >= 65
    });
    
    const best = getBestScore('grade3-exam2');
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              📊 3級 模擬試験2 結果
            </h1>
            
            <div className="text-center mb-8">
              <div className={`inline-block rounded-lg px-12 py-8 shadow-xl ${
                passed 
                  ? 'bg-gradient-to-br from-orange-500 to-orange-700' 
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
                    あなたのベストスコア: <span className="font-bold text-orange-600">{bestScore.toFixed(1)}%</span>
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={resetExam}
                className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
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
                  isCorrect ? 'border-orange-500' : 'border-red-500'
                }`}>
                  <div className="flex items-start gap-3 mb-4">
                    <span className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                      isCorrect ? 'bg-orange-500' : 'bg-red-500'
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
                    
                    <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg">
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              📝 3級 - 模擬試験2（難）
            </h1>
            <Link
              to="/"
              className="text-orange-600 hover:text-orange-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
            <p className="text-gray-700">
              <strong>制限時間:</strong> 60分 | <strong>問題数:</strong> 30問 | <strong>合格ライン:</strong> 65%以上（20問以上）
            </p>
            <p className="text-gray-700 mt-2">
              <strong>難易度:</strong> ⭐⭐⭐⭐☆ 難しいレベル
            </p>
          </div>
          <p className="text-gray-600">多変量解析・高度な検定・機械学習の基礎を含む高難度試験です。</p>
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
                className="bg-orange-600 h-2 rounded-full transition-all duration-300"
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
                    <span className="inline-block bg-orange-600 text-white px-4 py-2 rounded-lg text-base font-bold">
                      問題 {currentQuestionIndex + 1}
                    </span>
                    {answers[q.id] && (
                      <span className="text-orange-600 font-semibold">✓ 回答済み</span>
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
                            ? 'border-orange-600 bg-orange-50 shadow-md'
                            : 'border-gray-300 bg-white hover:border-orange-400 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${
                            isSelected
                              ? 'bg-orange-600 text-white'
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
              className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              次の問題 →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
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
                    ? 'bg-orange-600 text-white ring-2 ring-orange-400'
                    : answers[q.id]
                    ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
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

