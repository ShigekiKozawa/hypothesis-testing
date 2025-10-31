import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade4Exam2() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    {
      id: 1,
      question: "次のデータで、外れ値を除いた後の平均値と、元のデータの平均値の差はいくつですか。（外れ値の判定基準: Q1-1.5×IQR未満、Q3+1.5×IQR超）\nデータ: 5, 7, 8, 9, 10, 11, 12, 13, 15, 40",
      options: ["2.0", "2.5", "3.0", "3.5"],
      correct: 3,
      explanation: "Q1=7.5、Q3=12.5、IQR=5。下限=7.5-7.5=-0、上限=12.5+7.5=20。40は外れ値。元の平均=13、外れ値除去後の平均=10。差=3.0です。"
    },
    {
      id: 2,
      question: "ある工場で製品の重さを測定したところ、平均500g、標準偏差20gでした。規格範囲を平均±2.5標準偏差とするとき、規格外れとなる製品の重さの範囲はどれですか。",
      options: [
        "450g未満または550g超",
        "460g未満または540g超",
        "440g未満または560g超",
        "430g未満または570g超"
      ],
      correct: 1,
      explanation: "平均±2.5標準偏差 = 500±2.5×20 = 500±50 = 450〜550g。規格外れは450g未満または550g超です。"
    },
    {
      id: 3,
      question: "2つのグループA, Bの身長データがあります。A: 平均165cm、標準偏差8cm。B: 平均175cm、標準偏差10cm。変動係数が小さいのはどちらですか。",
      options: [
        "グループA",
        "グループB",
        "同じ",
        "判定できない"
      ],
      correct: 1,
      explanation: "変動係数 A=8/165≈0.0485、B=10/175≈0.0571。Aの方が小さく、相対的なばらつきが小さいです。"
    },
    {
      id: 4,
      question: "次の散布図で、外れ値を除いた場合に相関係数が最も変化するのはどれですか。\n（説明: 選択肢1は直線状に点が並び1点だけ離れている）",
      options: [
        "全体は強い正の相関、1点だけ大きく離れている",
        "全体的に散らばっており相関がない",
        "すべての点が直線上にある",
        "緩やかな負の相関がある"
      ],
      correct: 1,
      explanation: "外れ値が1点だけ大きく離れている場合、その点を除くと相関係数が大きく変わる可能性があります。"
    },
    {
      id: 5,
      question: "3つのサイコロを同時に投げたとき、出た目の和が10になる場合の数はいくつですか。",
      options: ["24通り", "25通り", "27通り", "30通り"],
      correct: 3,
      explanation: "組み合わせを数えると、(1,3,6)、(1,4,5)、(2,2,6)、(2,3,5)、(2,4,4)、(3,3,4)の6パターン。順列を考えると合計27通りです。"
    },
    {
      id: 6,
      question: "あるテストの得点が正規分布に従い、平均70点、標準偏差10点です。上位16%に入るための最低得点は約何点ですか。",
      options: ["75点", "80点", "85点", "90点"],
      correct: 2,
      explanation: "正規分布で上位16%は平均+1標準偏差付近です。70 + 10 = 80点が境界です。"
    },
    {
      id: 7,
      question: "次のデータで、歪度（わいど）が正（右に裾が長い）なのはどれですか。",
      options: [
        "平均=中央値=最頻値",
        "平均 > 中央値 > 最頻値",
        "平均 < 中央値 < 最頻値",
        "最頻値 > 平均 > 中央値"
      ],
      correct: 2,
      explanation: "正の歪度（右に偏った分布）では、平均 > 中央値 > 最頻値となります。"
    },
    {
      id: 8,
      question: "相関係数0.6の2変数について、一方の変数の標準化得点が2のとき、他方の変数の標準化得点の期待値はいくつですか。",
      options: ["0.6", "1.2", "1.8", "2.4"],
      correct: 2,
      explanation: "回帰直線の傾きは相関係数に等しい（標準化変数の場合）。予測値 = 0.6 × 2 = 1.2です。"
    },
    {
      id: 9,
      question: "標本サイズ100の調査で、標本平均が50、標準偏差が10でした。95%信頼区間の幅（上限-下限）はおよそいくつですか。（z値1.96を使用）",
      options: ["約2", "約4", "約8", "約16"],
      correct: 2,
      explanation: "標準誤差 = 10/√100 = 1。信頼区間 = ±1.96×1 = ±1.96。幅 = 1.96×2 ≈ 4です。"
    },
    {
      id: 10,
      question: "次のクロス集計表で、カイ二乗検定を行うとき、期待度数が最も小さいセルの値はいくつですか。\n\n       合格  不合格  計\nA群    30    10    40\nB群    20    20    40\n計     50    30    80",
      options: ["10", "12", "15", "20"],
      correct: 3,
      explanation: "B群×不合格の期待度数 = (40×30)/80 = 15が最小です。"
    },
    {
      id: 11,
      question: "ある試験の合格率が60%です。10人が受験したとき、ちょうど6人合格する確率はいくつですか。（二項分布、10C6 = 210）",
      options: ["約0.15", "約0.21", "約0.25", "約0.30"],
      correct: 3,
      explanation: "確率 = 10C6 × (0.6)^6 × (0.4)^4 = 210 × 0.04666... × 0.0256 ≈ 0.251です。"
    },
    {
      id: 12,
      question: "2つの独立な変数X, Yの分散がそれぞれ9, 16のとき、Z = X + Yの分散はいくつですか。",
      options: ["5", "12.5", "25", "144"],
      correct: 3,
      explanation: "独立な変数の和の分散は、各変数の分散の和です。Var(Z) = 9 + 16 = 25です。"
    },
    {
      id: 13,
      question: "あるデータの標準偏差が5です。すべてのデータを3倍して10を加えた新しいデータの標準偏差はいくつですか。",
      options: ["5", "15", "25", "45"],
      correct: 2,
      explanation: "データに定数を加えても標準偏差は変わりません。定数倍すると標準偏差も同じ倍率になります。5 × 3 = 15です。"
    },
    {
      id: 14,
      question: "袋の中に赤玉4個、青玉6個が入っています。玉を1個ずつ3回取り出す（戻さない）とき、3個とも異なる色にならない確率はいくつですか。",
      options: ["1", "3/5", "2/5", "0"],
      correct: 1,
      explanation: "色は赤と青の2色しかないため、3個取り出すと必ず同じ色が2個以上含まれます。よって確率は1です。"
    },
    {
      id: 15,
      question: "次のボックスプロットで、外れ値が存在するための条件として正しいものはどれですか。",
      options: [
        "最大値 > Q3 + 1.5×IQR",
        "最大値 > Q3 + 2×IQR",
        "最大値 > 平均 + 2×標準偏差",
        "最大値 > 中央値 + 3×標準偏差"
      ],
      correct: 1,
      explanation: "外れ値の判定基準は Q3 + 1.5×IQR（上側）または Q1 - 1.5×IQR（下側）です。"
    },
    {
      id: 16,
      question: "回帰直線 y = 2x + 3 で、xの平均が5のとき、yの平均はいくつですか。",
      options: ["7", "10", "13", "15"],
      correct: 3,
      explanation: "回帰直線は平均点を通ります。y = 2×5 + 3 = 13です。"
    },
    {
      id: 17,
      question: "ヒストグラムで、階級幅10の階級の度数が40、階級幅5の階級の度数が30のとき、度数密度の比（前者:後者）はいくつですか。",
      options: ["1:1.5", "2:3", "4:6", "40:30"],
      correct: 2,
      explanation: "度数密度: 前者=40/10=4、後者=30/5=6。比は 4:6 = 2:3です。"
    },
    {
      id: 18,
      question: "あるアンケートで、回答者を年齢層別に分けて各層から無作為抽出しました。このサンプリング方法の名称はどれですか。",
      options: [
        "単純無作為抽出",
        "層化抽出",
        "系統抽出",
        "多段抽出"
      ],
      correct: 2,
      explanation: "母集団を層に分けて各層から抽出する方法を層化抽出（層別抽出）と言います。"
    },
    {
      id: 19,
      question: "2つのグループの平均値の差を検定したところ、p値が0.03でした。有意水準5%で判断すると、結論はどれですか。",
      options: [
        "差がないとは言えない",
        "差があると言える",
        "差がないと言える",
        "判断できない"
      ],
      correct: 2,
      explanation: "p値0.03 < 有意水準0.05 なので、帰無仮説（差がない）を棄却します。つまり、差があると言えます。"
    },
    {
      id: 20,
      question: "次のデータで、中央絶対偏差（MAD: 中央値からの偏差の絶対値の中央値）はいくつですか。\nデータ: 1, 3, 5, 7, 9",
      options: ["2", "2.5", "3", "4"],
      correct: 1,
      explanation: "中央値=5。偏差の絶対値: 4,2,0,2,4。その中央値=2です。"
    },
    {
      id: 21,
      question: "コインを10回投げたとき、表が7回以上出る確率はおよそいくつですか。（二項分布）",
      options: ["約0.05", "約0.11", "約0.17", "約0.25"],
      correct: 3,
      explanation: "P(X≥7) = P(7)+P(8)+P(9)+P(10) = (10C7+10C8+10C9+10C10)×(1/2)^10 = (120+45+10+1)/1024 = 176/1024 ≈ 0.172です。"
    },
    {
      id: 22,
      question: "あるデータの平均が100、標準偏差が15のとき、データ値130の偏差値（平均50、標準偏差10に標準化）はいくつですか。",
      options: ["60", "65", "70", "75"],
      correct: 3,
      explanation: "標準化得点 = (130-100)/15 = 2。偏差値 = 50 + 10×2 = 70です。"
    },
    {
      id: 23,
      question: "次の累積度数折れ線グラフで、中央値が含まれる階級はどれですか。\n階級: 0-10(累積20人), 10-20(累積50人), 20-30(累積80人), 30-40(累積100人)",
      options: ["0-10", "10-20", "20-30", "30-40"],
      correct: 2,
      explanation: "全体100人の中央値は50番目と51番目の平均。累積50人は10-20の階級の上限なので、中央値はこの階級に含まれます。"
    },
    {
      id: 24,
      question: "相関係数が0.8の2変数について、決定係数R²はいくつですか。",
      options: ["0.4", "0.64", "0.8", "0.9"],
      correct: 2,
      explanation: "決定係数 R² = (相関係数)² = 0.8² = 0.64です。これは説明される分散の割合を示します。"
    },
    {
      id: 25,
      question: "標本サイズを4倍にしたとき、95%信頼区間の幅は何倍になりますか。",
      options: ["4倍", "2倍", "1/2倍", "1/4倍"],
      correct: 3,
      explanation: "信頼区間の幅は標準誤差に比例し、標準誤差は√nに反比例します。nが4倍になると幅は1/2倍になります。"
    },
    {
      id: 26,
      question: "あるテストで、得点分布が平均60点、標準偏差20点でした。偏差値60以上の人は全体の約何%ですか。",
      options: ["約16%", "約32%", "約50%", "約84%"],
      correct: 1,
      explanation: "偏差値60は平均+1標準偏差に相当します。正規分布で上位約16%です。"
    },
    {
      id: 27,
      question: "次のデータで、ローレンツ曲線の下側の面積が0.35のとき、ジニ係数はいくつですか。",
      options: ["0.15", "0.30", "0.35", "0.70"],
      correct: 2,
      explanation: "ジニ係数 = 1 - 2×（ローレンツ曲線下の面積）= 1 - 2×0.35 = 0.30です。"
    },
    {
      id: 28,
      question: "トランプ52枚から2枚引いたとき、異なるスートである確率はいくつですか。",
      options: ["約0.59", "約0.65", "約0.71", "約0.76"],
      correct: 4,
      explanation: "1枚目は任意、2枚目は異なるスート39/51。確率 = 39/51 ≈ 0.765です。"
    },
    {
      id: 29,
      question: "第1種の過誤（α）と第2種の過誤（β）の説明として正しいものはどれですか。",
      options: [
        "αは正しい帰無仮説を棄却する誤り、βは誤った帰無仮説を採択する誤り",
        "αは誤った帰無仮説を採択する誤り、βは正しい帰無仮説を棄却する誤り",
        "αとβは同じ意味",
        "αは標本誤差、βは測定誤差"
      ],
      correct: 1,
      explanation: "第1種の過誤（α）: 帰無仮説が真なのに棄却してしまう誤り。第2種の過誤（β）: 帰無仮説が偽なのに採択してしまう誤り。"
    },
    {
      id: 30,
      question: "次のデータで、調和平均はいくつですか。\nデータ: 2, 3, 6",
      options: ["2", "3", "3.5", "4"],
      correct: 2,
      explanation: "調和平均 = n / (1/x₁ + 1/x₂ + ... + 1/xₙ) = 3 / (1/2 + 1/3 + 1/6) = 3 / 1 = 3です。"
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
    const best = getBestScore('grade4-exam2');
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
      examId: 'grade4-exam2',
      examTitle: '4級 模擬試験2（難）',
      grade: '4級',
      score,
      totalQuestions: questions.length,
      percentage,
      passed: percentage >= 60
    });
    
    const best = getBestScore('grade4-exam2');
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              📊 4級 模擬試験2 結果
            </h1>
            
            <div className="text-center mb-8">
              <div className={`inline-block rounded-lg px-12 py-8 shadow-xl ${
                passed 
                  ? 'bg-gradient-to-br from-orange-500 to-orange-700' 
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              📝 4級 - 模擬試験2（難）
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
              <strong>制限時間:</strong> 60分 | <strong>問題数:</strong> 30問 | <strong>合格ライン:</strong> 60%以上（18問以上）
            </p>
            <p className="text-gray-700 mt-2">
              <strong>難易度:</strong> ⭐⭐⭐⭐☆ 難しいレベル
            </p>
          </div>
          <p className="text-gray-600">応用的な統計計算と推測統計の理解を問う高難度試験です。</p>
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

