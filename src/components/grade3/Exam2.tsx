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
        question: "次のレシート項目のうち、順序尺度（順序変数）として扱えるものはどれですか。\n\nI. 商品名\nII. 金額\nIII. 顧客満足度（5段階評価）\nIV. 購入日時",
        options: [
            "Iのみ",
            "IIIのみ",
            "IIとIIIのみ",
            "IとIVのみ"
        ],
        correct: 2,
        explanation: "顧客満足度（5段階評価）は順序があるが間隔が等しいとは限らない順序変数です。商品名は名義変数、金額は量的変数、購入日時は時間変数です。"
    },
    {
        id: 2,
        question: "20人のテストの点数データから、平均60点、標準偏差10点でした。全員の点数を1.5倍して20点を加えた場合、新しい平均と標準偏差はいくらになりますか。",
        options: [
            "平均110点、標準偏差15点",
            "平均110点、標準偏差35点",
            "平均90点、標準偏差15点",
            "平均90点、標準偏差10点"
        ],
        correct: 1,
        explanation: "平均: 60×1.5+20=110点。標準偏差: 10×1.5=15点（定数を加えても標準偏差は変わらず、定数倍すると標準偏差も同じ倍率になります）。"
    },
    {
        id: 3,
        question: "次の度数分布表から、中央値が含まれる階級を特定してください。\n\n【50人のテスト結果】\n0~20点: 5人\n20~40点: 10人\n40~60点: 15人\n60~80点: 12人\n80~100点: 8人",
        options: [
            "0~20点",
            "20~40点",
            "40~60点",
            "60~80点"
        ],
        correct: 3,
        explanation: "累積度数を計算すると、5人、15人、30人、42人、50人。中央値は25番目と26番目の平均なので、累積度数が30人となる40~60点の階級に含まれます。"
    },
    {
        id: 4,
        question: "幹葉図（みきはず、ステムアンドリーフプロット）の利点として正しいものはどれですか。",
        options: [
            "個々のデータ値を保持しながら分布を視覚化できる",
            "大規模データに適している",
            "相関関係を示せる",
            "時系列変化を表現できる"
        ],
        correct: 1,
        explanation: "幹葉図は個々のデータ値を保持しながら度数分布を視覚化できる利点があります。"
    },
    {
        id: 5,
        question: "箱ひげ図で「ひげ」の外側にある点は何を表しますか。",
        options: [
            "平均値",
            "中央値",
            "外れ値の可能性",
            "最小値"
        ],
        correct: 3,
        explanation: "箱ひげ図の「ひげ」の外側にある点は外れ値（はずれ値）の可能性がある値を示します。"
    },
    {
        id: 6,
        question: "次の散布図の説明として正しいものはどれですか。\n\n「右下がりの強い直線的な関係が見られる」",
        options: [
            "相関係数は約0.9",
            "相関係数は約-0.9",
            "相関係数は約0",
            "相関がない"
        ],
        correct: 2,
        explanation: "右下がりの強い関係は負の相関を示し、相関係数は-1に近い値（約-0.9）になります。"
    },
    {
        id: 7,
        question: "共分散が負の値を取るとき、2変数の関係はどうですか。",
        options: [
            "正の相関",
            "負の相関",
            "無相関",
            "判断できない"
        ],
        correct: 2,
        explanation: "共分散が負の値を取るときは、負の相関（一方が増えると他方が減る傾向）があります。"
    },
    {
        id: 8,
        question: "次のクロス集計表から、「男性でAを選択した人」の割合（男性全体に対する）を計算してください。\n\n【選択調査】\n　　　　男性　女性\nA選択　30　　20\nB選択　20　　30\n\n男性の合計は50人",
        options: [
            "30%",
            "40%",
            "60%",
            "50%"
        ],
        correct: 3,
        explanation: "男性でAを選択した人は30人、男性全体は50人なので、30/50×100=60%です。"
    },
    {
        id: 9,
        question: "2つの事象A、Bが独立であるための条件はどれですか。",
        options: [
            "P(A∩B)=P(A)+P(B)",
            "P(A∩B)=P(A)×P(B)",
            "P(A∩B)=0",
            "P(A)=P(B)"
        ],
        correct: 2,
        explanation: "2つの事象が独立であるとき、P(A∩B)=P(A)×P(B)が成り立ちます。"
    },
    {
        id: 10,
        question: "サイコロを3回振って、少なくとも1回は6が出る確率はいくらですか（小数第3位を四捨五入）。",
        options: [
            "0.42",
            "0.50",
            "0.58",
            "0.67"
        ],
        correct: 1,
        explanation: "余事象を使います。3回とも6以外の確率は(5/6)³≒0.579。よって1-0.579≒0.42です。"
    },
    {
        id: 11,
        question: "10人から3人を選ぶ組み合わせの総数は何通りですか。",
        options: [
            "30",
            "120",
            "720",
            "1000"
        ],
        correct: 2,
        explanation: "10C3=10×9×8/(3×2×1)=720/6=120通りです。"
    },
    {
        id: 12,
        question: "時系列グラフで「前年同月比」とは何を表しますか。",
        options: [
            "前月との差",
            "1年前の同じ月との比較",
            "年間の合計",
            "累積値"
        ],
        correct: 2,
        explanation: "前年同月比は、1年前の同じ月のデータとの比較を表します。季節変動を考慮した比較ができます。"
    },
    {
        id: 13,
        question: "消費者物価指数（CPI）が2020年を100として2021年に105になった場合、物価は何%上昇しましたか。",
        options: [
            "1.05%",
            "5%",
            "15%",
            "105%"
        ],
        correct: 2,
        explanation: "指数が100から105になったので、(105-100)/100×100=5%上昇です。"
    },
    {
        id: 14,
        question: "複数年にわたる成長率の平均を求める際に適切な方法はどれですか。",
        options: [
            "算術平均",
            "幾何平均（相乗平均）",
            "調和平均",
            "加重平均"
        ],
        correct: 2,
        explanation: "成長率の平均には幾何平均（相乗平均）を使います。複利計算と同じ考え方です。"
    },
    {
        id: 15,
        question: "標本調査における「層化抽出法」の説明として正しいものはどれですか。",
        options: [
            "母集団を層に分けてから各層から抽出する",
            "最初に出会った人から順に抽出する",
            "一定間隔で抽出する",
            "クラスターごとに抽出する"
        ],
        correct: 1,
        explanation: "層化抽出法は、母集団をいくつかの層に分けてから、各層から標本を抽出する方法です。"
    },
    {
        id: 16,
        question: "実験において「対照群」を設ける目的は何ですか。",
        options: [
            "実験を早く終わらせる",
            "費用を削減する",
            "処置の効果を比較するため",
            "データ量を増やすため"
        ],
        correct: 3,
        explanation: "対照群（コントロール群）を設けることで、処置の効果を比較・評価できます。"
    },
    {
        id: 17,
        question: "観察研究と実験の違いとして正しいものはどれですか。",
        options: [
            "観察研究は因果関係を証明できるが実験はできない",
            "実験は研究者が介入するが観察研究は介入しない",
            "観察研究は費用が高い",
            "実験は倫理的問題がない"
        ],
        correct: 2,
        explanation: "実験は研究者が積極的に介入（処置）を行いますが、観察研究は自然な状態を観察するだけで介入しません。"
    },
    {
        id: 18,
        question: "標本平均の分布（標本分布）について、標本サイズが大きくなると分布の形はどうなりますか。",
        options: [
            "一様分布に近づく",
            "正規分布に近づく",
            "指数分布に近づく",
            "変わらない"
        ],
        correct: 2,
        explanation: "中心極限定理により、標本サイズが大きくなると標本平均の分布は正規分布に近づきます。"
    },
    {
        id: 19,
        question: "標本平均の標準誤差を小さくする方法として正しいものはどれですか。",
        options: [
            "標本サイズを大きくする",
            "標本サイズを小さくする",
            "母平均を変える",
            "母分散を変える"
        ],
        correct: 1,
        explanation: "標準誤差=σ/√nなので、標本サイズnを大きくすると標準誤差は小さくなります。"
    },
    {
        id: 20,
        question: "95%信頼区間の意味として最も適切なものはどれですか。",
        options: [
            "母数がこの区間に95%の確率で含まれる",
            "同じ方法で区間を作ると95%が母数を含む",
            "標本平均がこの区間に95%含まれる",
            "データの95%がこの区間に含まれる"
        ],
        correct: 2,
        explanation: "95%信頼区間は、同じ抽出方法を繰り返したとき、作られる区間の95%が母数（母平均など）を含むという意味です。"
    },
    {
        id: 21,
        question: "仮説検定のp値が0.03のとき、有意水準5%では帰無仮説をどうしますか。",
        options: [
            "棄却する",
            "棄却しない",
            "判断できない",
            "有意水準を変更する"
        ],
        correct: 1,
        explanation: "p値(0.03)<有意水準(0.05)なので、帰無仮説を棄却します。"
    },
    {
        id: 22,
        question: "第一種の過誤（αエラー）とは何ですか。",
        options: [
            "帰無仮説が正しいのに棄却してしまう誤り",
            "帰無仮説が誤っているのに棄却しない誤り",
            "標本抽出の誤り",
            "計算の誤り"
        ],
        correct: 1,
        explanation: "第一種の過誤は、帰無仮説が実際には正しいのに、誤って棄却してしまう誤りです。"
    },
    {
        id: 23,
        question: "偏差値の計算式で正しいものはどれですか。（偏差値=50+10×偏差/標準偏差、偏差=得点-平均）",
        options: [
            "50+10×(得点-平均)/標準偏差",
            "50+5×(得点-平均)/標準偏差",
            "100×(得点-平均)/標準偏差",
            "(得点-平均)/標準偏差"
        ],
        correct: 1,
        explanation: "偏差値=50+10×(得点-平均)/標準偏差 です。平均が偏差値50、標準偏差1σが偏差値10に対応します。"
    },
    {
        id: 24,
        question: "変動係数（CV）を用いる目的は何ですか。",
        options: [
            "平均値を比較する",
            "単位や平均値が異なるデータのばらつきを比較する",
            "相関を測る",
            "因果関係を調べる"
        ],
        correct: 2,
        explanation: "変動係数=標準偏差/平均×100(%)で、単位や平均値が異なるデータのばらつき（相対的なばらつき）を比較できます。"
    },
    {
        id: 25,
        question: "シンプソンのパラドックスとは何ですか。",
        options: [
            "平均値と中央値が逆転する現象",
            "全体では傾向があるが部分では逆の傾向が見られる現象",
            "標本が母集団を代表しない現象",
            "外れ値が平均を歪める現象"
        ],
        correct: 2,
        explanation: "シンプソンのパラドックスは、全体では傾向があるのに、データを層別に分けると逆の傾向が見られる現象です。"
    },
    {
        id: 26,
        question: "累積相対度数グラフ（オジーブ）から中央値を求める方法として正しいものはどれですか。",
        options: [
            "累積相対度数0.25に対応する値",
            "累積相対度数0.5に対応する値",
            "累積相対度数0.75に対応する値",
            "累積相対度数1.0に対応する値"
        ],
        correct: 2,
        explanation: "中央値は全体の50%の位置なので、累積相対度数0.5（50%）に対応する値です。"
    },
    {
        id: 27,
        question: "四分位範囲（IQR）の定義として正しいものはどれですか。",
        options: [
            "Q3-Q1",
            "Q4-Q1",
            "最大値-最小値",
            "Q2-Q1"
        ],
        correct: 1,
        explanation: "四分位範囲(IQR)=Q3(第3四分位数)-Q1(第1四分位数)です。"
    },
    {
        id: 28,
        question: "外れ値を検出する際によく使われる基準はどれですか。",
        options: [
            "平均値±標準偏差",
            "平均値±2×標準偏差",
            "Q1-1.5×IQR未満、またはQ3+1.5×IQR超",
            "中央値±標準偏差"
        ],
        correct: 3,
        explanation: "箱ひげ図での外れ値の判定基準は、Q1-1.5×IQR未満、またはQ3+1.5×IQR超の値です。"
    },
    {
        id: 29,
        question: "回帰分析において、残差とは何ですか。",
        options: [
            "予測値と実測値の差",
            "説明変数と目的変数の差",
            "平均値と中央値の差",
            "標準偏差の2乗"
        ],
        correct: 1,
        explanation: "残差=実測値-予測値で、モデルの予測と実際の値との差を表します。"
    },
    {
        id: 30,
        question: "条件付き確率P(B|A)を計算する式として正しいものはどれですか。",
        options: [
            "P(A∩B)/P(A)",
            "P(A∩B)/P(B)",
            "P(A)+P(B)",
            "P(A)×P(B)"
        ],
        correct: 1,
        explanation: "条件付き確率P(B|A)=P(A∩B)/P(A)です。Aが起こった条件下でBが起こる確率を表します。"
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
      grade: '3級' as '3級',
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
                <p className="text-6xl font-bold mb-2">{Math.round(percentage)}点</p>
                <p className="text-2xl mb-4">({score}/30問正解)</p>
                <p className="text-xl font-bold">
                  {passed ? '🎉 合格！' : '📝 不合格'}
                </p>
                <p className="text-sm mt-2">合格ライン: 65点以上</p>
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

