import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade4Exam1() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    {
      id: 1,
      question: "次のデータの平均値と中央値の差はいくつですか。\nデータ: 2, 4, 6, 8, 20",
      options: ["0", "2", "4", "6"],
      correct: 2,
      explanation: "平均値 = (2+4+6+8+20)÷5 = 8、中央値 = 6。差は 8 - 6 = 2です。外れ値の影響で平均値が中央値より大きくなります。"
    },
    {
      id: 2,
      question: "あるクラス30人の数学の平均点が70点でした。そのクラスから80点以上の5人を除いた25人の平均点が65点のとき、80点以上の5人の平均点は何点ですか。",
      options: ["85点", "90点", "95点", "100点"],
      correct: 2,
      explanation: "全体の合計 = 70×30 = 2100点。25人の合計 = 65×25 = 1625点。5人の合計 = 2100 - 1625 = 475点。5人の平均 = 475÷5 = 95点です。"
    },
    {
      id: 3,
      question: "次のデータで、範囲が最頻値の2倍になっているものはどれですか。",
      options: [
        "2, 4, 4, 6, 8",
        "3, 5, 5, 9, 13",
        "4, 6, 6, 10, 16",
        "5, 7, 7, 11, 19"
      ],
      correct: 3,
      explanation: "選択肢3では、最頻値=6、範囲=16-4=12。12は6の2倍です。"
    },
    {
      id: 4,
      question: "ある工場で不良品の発生率が3%です。1000個の製品を作ったとき、期待される不良品の個数は何個ですか。",
      options: ["20個", "30個", "40個", "50個"],
      correct: 2,
      explanation: "期待値 = 1000 × 0.03 = 30個です。"
    },
    {
      id: 5,
      question: "次のヒストグラムで、階級値15の階級の相対度数が0.25です。全体の度数が80のとき、この階級の度数はいくつですか。",
      options: ["15", "20", "25", "30"],
      correct: 2,
      explanation: "度数 = 相対度数 × 全体の度数 = 0.25 × 80 = 20です。"
    },
    {
      id: 6,
      question: "2つのサイコロを投げて、出た目の積が偶数になる確率はいくつですか。",
      options: ["1/2", "2/3", "3/4", "5/6"],
      correct: 3,
      explanation: "積が奇数になるのは両方とも奇数の場合のみ。(3/6)×(3/6) = 1/4。よって偶数の確率は 1 - 1/4 = 3/4です。"
    },
    {
      id: 7,
      question: "次のデータで、第1四分位数Q1と第3四分位数Q3の平均値はいくつですか。\nデータ: 10, 15, 20, 25, 30, 35, 40, 45, 50",
      options: ["25", "27.5", "30", "32.5"],
      correct: 3,
      explanation: "Q1=20、Q3=40。平均 = (20+40)÷2 = 30です。"
    },
    {
      id: 8,
      question: "ある試験で、得点が正規分布に近いと仮定します。平均点60点、標準偏差10点のとき、50点〜70点の範囲に入る受験者の割合は約何%ですか。",
      options: ["50%", "68%", "95%", "99.7%"],
      correct: 2,
      explanation: "正規分布では平均±1標準偏差の範囲に約68%が含まれます。60±10 = 50〜70点です。"
    },
    {
      id: 9,
      question: "あるデータの四分位範囲が20、第1四分位数が30のとき、第3四分位数はいくつですか。",
      options: ["40", "45", "50", "55"],
      correct: 3,
      explanation: "四分位範囲 = Q3 - Q1。よって Q3 = Q1 + 四分位範囲 = 30 + 20 = 50です。"
    },
    {
      id: 10,
      question: "10本のくじの中に当たりが3本あります。2本同時に引くとき、少なくとも1本当たる確率はいくつですか。",
      options: ["7/15", "8/15", "11/15", "13/15"],
      correct: 2,
      explanation: "余事象で考えます。2本とも外れる確率 = C(7,2)/C(10,2) = 21/45 = 7/15。少なくとも1本当たる確率 = 1 - 7/15 = 8/15です。"
    },
    {
      id: 11,
      question: "次のデータで、分散が最も大きいのはどれですか。",
      options: [
        "5, 5, 5, 5, 5",
        "4, 5, 5, 5, 6",
        "3, 4, 5, 6, 7",
        "1, 3, 5, 7, 9"
      ],
      correct: 4,
      explanation: "分散はデータの散らばり具合を示します。選択肢4が最も散らばっているため、分散が最大です。分散 = ((1-5)²+(3-5)²+(5-5)²+(7-5)²+(9-5)²)÷5 = (16+4+0+4+16)÷5 = 8です。"
    },
    {
      id: 12,
      question: "ある店の1週間の売上の平均が50万円、標準偏差が10万円でした。ある日の売上が70万円のとき、この日の売上の標準化得点（偏差値の基礎）はいくつですか。",
      options: ["1", "2", "3", "4"],
      correct: 2,
      explanation: "標準化得点 = (実測値 - 平均) ÷ 標準偏差 = (70 - 50) ÷ 10 = 2です。"
    },
    {
      id: 13,
      question: "累積相対度数が0.6となる階級の階級値が50です。このとき、データ全体の何%が50未満ですか。",
      options: ["40%", "50%", "60%", "70%"],
      correct: 3,
      explanation: "累積相対度数0.6は、その階級までの累積が60%であることを意味します。階級値50の階級までで60%なので、約60%が50以下（または未満）です。"
    },
    {
      id: 14,
      question: "袋の中に赤玉5個、青玉3個、白玉2個が入っています。1個取り出して色を確認した後戻さずに、もう1個取り出します。2個とも赤玉である確率はいくつですか。",
      options: ["1/4", "2/9", "1/3", "5/9"],
      correct: 2,
      explanation: "1個目が赤: 5/10。2個目も赤（戻さない）: 4/9。確率 = (5/10) × (4/9) = 20/90 = 2/9です。"
    },
    {
      id: 15,
      question: "次のデータの標準偏差はいくつですか。\nデータ: 0, 2, 4, 6, 8",
      options: ["約2.8", "約3.2", "約6.4", "8"],
      correct: 1,
      explanation: "平均=4。分散=((0-4)²+(2-4)²+(4-4)²+(6-4)²+(8-4)²)÷5 = (16+4+0+4+16)÷5 = 8。標準偏差=√8 ≈ 2.83です。"
    },
    {
      id: 16,
      question: "ある学校の生徒500人の身長データで、箱ひげ図を作成したところ、最小値150cm、Q1=160cm、中央値=165cm、Q3=170cm、最大値185cmでした。身長160cm未満の生徒は約何人ですか。",
      options: ["75人", "100人", "125人", "150人"],
      correct: 3,
      explanation: "Q1=160cmは下位25%の位置です。160cm未満は約25%なので、500 × 0.25 = 125人です。"
    },
    {
      id: 17,
      question: "相関係数が-0.8の2つの変数の関係として最も適切なものはどれですか。",
      options: [
        "強い正の相関がある",
        "弱い正の相関がある",
        "相関がない",
        "強い負の相関がある"
      ],
      correct: 4,
      explanation: "相関係数が-0.8は、強い負の相関を示します。一方が増えると他方が減る傾向が強いです。"
    },
    {
      id: 18,
      question: "次のデータで、外れ値の判定基準（Q1 - 1.5×IQR または Q3 + 1.5×IQR）に基づいて外れ値と判定されるのはどれですか。\nデータ: 5, 8, 10, 12, 14, 16, 18, 35",
      options: ["5", "18", "35", "外れ値なし"],
      correct: 3,
      explanation: "Q1=9、Q3=17、IQR=8。下限=9-1.5×8=-3、上限=17+1.5×8=29。35は上限29を超えるため外れ値です。"
    },
    {
      id: 19,
      question: "あるテストの得点分布が左に偏っている（負の歪度）とき、平均・中央値・最頻値の大小関係として正しいのはどれですか。",
      options: [
        "平均 < 中央値 < 最頻値",
        "中央値 < 平均 < 最頻値",
        "最頻値 < 中央値 < 平均",
        "最頻値 < 平均 < 中央値"
      ],
      correct: 1,
      explanation: "左に偏った分布（負の歪度）では、平均が最も小さく、最頻値が最も大きくなります。平均 < 中央値 < 最頻値です。"
    },
    {
      id: 20,
      question: "2つの異なるデータセットA, Bの平均がそれぞれ50, 60です。AとBを合わせた全体の平均が54のとき、Aのデータ数とBのデータ数の比はいくつですか。",
      options: ["1:2", "2:3", "3:2", "2:1"],
      correct: 3,
      explanation: "A=n₁個、B=n₂個とすると、(50n₁+60n₂)/(n₁+n₂)=54。整理すると50n₁+60n₂=54n₁+54n₂、6n₂=4n₁、n₁:n₂=6:4=3:2です。"
    },
    {
      id: 21,
      question: "ある製品の長さが平均100mm、標準偏差2mmで製造されています。長さが96mm以下または104mm以上の製品は不良品とします。正規分布を仮定すると、不良品率は約何%ですか。",
      options: ["約1%", "約2.5%", "約5%", "約10%"],
      correct: 3,
      explanation: "96mmと104mmは平均から±2標準偏差。正規分布で平均±2標準偏差内に約95%が含まれるため、外側は約5%です。"
    },
    {
      id: 22,
      question: "次のデータの変動係数（標準偏差÷平均×100%）が最も大きいのはどれですか。",
      options: [
        "平均10、標準偏差2",
        "平均20、標準偏差3",
        "平均50、標準偏差8",
        "平均100、標準偏差15"
      ],
      correct: 1,
      explanation: "変動係数: 1=20%, 2=15%, 3=16%, 4=15%。選択肢1が最大です。変動係数は相対的なばらつきを示します。"
    },
    {
      id: 23,
      question: "あるアンケート調査で、標本サイズを4倍にすると、標準誤差は何倍になりますか。",
      options: ["4倍", "2倍", "1/2倍", "1/4倍"],
      correct: 3,
      explanation: "標準誤差は標本サイズの平方根に反比例します。標本サイズが4倍になると、標準誤差は1/√4 = 1/2倍になります。"
    },
    {
      id: 24,
      question: "次の散布図の相関係数として最も適切な値はどれですか。\n(説明: 右上がりで点が直線に近く並んでいる)",
      options: ["0.2", "0.5", "0.9", "-0.9"],
      correct: 3,
      explanation: "右上がりで直線に近い散布は強い正の相関を示すため、0.9が最も適切です。"
    },
    {
      id: 25,
      question: "あるクラスの数学と英語の得点の共分散が50、数学の標準偏差が10、英語の標準偏差が8のとき、相関係数はいくつですか。",
      options: ["0.5", "0.625", "0.725", "0.8"],
      correct: 2,
      explanation: "相関係数 = 共分散 ÷ (標準偏差₁ × 標準偏差₂) = 50 ÷ (10 × 8) = 50 ÷ 80 = 0.625です。"
    },
    {
      id: 26,
      question: "無作為抽出の利点として最も適切なものはどれですか。",
      options: [
        "調査コストが安い",
        "調査が簡単にできる",
        "標本が母集団を代表しやすい",
        "すべてのデータを調べられる"
      ],
      correct: 3,
      explanation: "無作為抽出の最大の利点は、バイアスを避けて標本が母集団を代表しやすくなることです。"
    },
    {
      id: 27,
      question: "次のヒストグラムで、階級幅が異なる場合、比較すべき量はどれですか。",
      options: ["度数", "相対度数", "累積度数", "度数密度（度数÷階級幅）"],
      correct: 4,
      explanation: "階級幅が異なる場合、度数密度を比較する必要があります。度数をそのまま比較すると誤った解釈になります。"
    },
    {
      id: 28,
      question: "あるデータの分散が25のとき、すべてのデータを2倍にした新しいデータの分散はいくつですか。",
      options: ["25", "50", "100", "625"],
      correct: 3,
      explanation: "データを定数倍すると、分散はその定数の2乗倍になります。2²×25 = 100です。"
    },
    {
      id: 29,
      question: "層化抽出法の説明として正しいものはどれですか。",
      options: [
        "母集団全体から無作為に抽出する",
        "母集団をグループに分けて各グループから無作為抽出する",
        "調査しやすい対象だけを選ぶ",
        "初めに選んだ対象から次の対象を紹介してもらう"
      ],
      correct: 2,
      explanation: "層化抽出法は母集団を性質の異なる層（グループ）に分け、各層から無作為に抽出する方法です。"
    },
    {
      id: 30,
      question: "信頼区間95%の意味として最も適切なものはどれですか。",
      options: [
        "真の値が95%の確率でこの区間に入る",
        "同じ方法で100回調査すると約95回はこの区間に真の値が含まれる",
        "標本の95%がこの区間に入る",
        "誤差が5%以下である"
      ],
      correct: 2,
      explanation: "信頼区間95%とは、同じ方法で繰り返し調査した場合、約95%の区間に真の値（母数）が含まれることを意味します。"
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
    const best = getBestScore('grade4-exam1');
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
    
    const recordData = {
      examId: 'grade4-exam1',
      examTitle: '4級 模擬試験1（中級）',
      grade: '4級',
      score,
      totalQuestions: questions.length,
      percentage,
      passed: percentage >= 60
    };
    
    console.log('[Grade4Exam1] Saving record:', recordData);
    saveExamRecord(recordData);
    
    const best = getBestScore('grade4-exam1');
    console.log('[Grade4Exam1] Best score after save:', best);
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              📊 4級 模擬試験1 結果
            </h1>
            
            <div className="text-center mb-8">
              <div className={`inline-block rounded-lg px-12 py-8 shadow-xl ${
                passed 
                  ? 'bg-gradient-to-br from-green-500 to-green-700' 
                  : 'bg-gradient-to-br from-gray-500 to-gray-700'
              } text-white`}>
                <p className="text-6xl font-bold mb-2">{score}/30</p>
                <p className="text-2xl mb-4">正答率: {percentage.toFixed(1)}%</p>
                <p className="text-xl font-bold">
                  {passed ? '🎉 合格！' : '📝 不合格'}
                </p>
                <p className="text-sm mt-2">合格ライン: 60%以上（18問以上）</p>
              </div>
              {bestScore !== null && (
                <div className="mt-4 text-center">
                  <p className="text-gray-600">
                    あなたのベストスコア: <span className="font-bold text-green-600">{bestScore.toFixed(1)}%</span>
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={resetExam}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
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
                  isCorrect ? 'border-green-500' : 'border-red-500'
                }`}>
                  <div className="flex items-start gap-3 mb-4">
                    <span className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                      isCorrect ? 'bg-green-500' : 'bg-red-500'
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
                    
                    <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              📝 4級 - 模擬試験1（中級）
            </h1>
            <Link
              to="/"
              className="text-green-600 hover:text-green-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <p className="text-gray-700">
              <strong>制限時間:</strong> 60分 | <strong>問題数:</strong> 30問 | <strong>合格ライン:</strong> 60%以上（18問以上）
            </p>
            <p className="text-gray-700 mt-2">
              <strong>難易度:</strong> ⭐⭐⭐☆☆ 中級レベル
            </p>
          </div>
          <p className="text-gray-600">代表値・散らばり・確率の応用問題を中心とした総合試験です。</p>
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
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
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
                    <span className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-base font-bold">
                      問題 {currentQuestionIndex + 1}
                    </span>
                    {answers[q.id] && (
                      <span className="text-green-600 font-semibold">✓ 回答済み</span>
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
                            ? 'border-green-600 bg-green-50 shadow-md'
                            : 'border-gray-300 bg-white hover:border-green-400 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${
                            isSelected
                              ? 'bg-green-600 text-white'
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
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
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
                    ? 'bg-green-600 text-white ring-2 ring-green-400'
                    : answers[q.id]
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
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
