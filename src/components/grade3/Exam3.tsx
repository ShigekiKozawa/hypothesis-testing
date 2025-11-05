import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade3Exam3() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
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
            "平均値の計算",
            "事前確率と尤度から事後確率を求める",
            "分散の計算",
            "相関係数の計算"
        ],
        correct: 2,
        explanation: "ベイズの定理は、事前確率P(A)と尤度P(B|A)から事後確率P(A|B)を計算する際に使います。"
    },
    {
        id: 10,
        question: "10本のくじの中に当たりが3本あります。2本同時に引いたとき、2本とも当たる確率はいくらですか。",
        options: [
            "1/15",
            "1/10",
            "3/45",
            "9/100"
        ],
        correct: 1,
        explanation: "2本とも当たる組み合わせは3C2=3通り、全体は10C2=45通り。確率=3/45=1/15です。"
    },
    {
        id: 11,
        question: "期待値E(X)=100、分散V(X)=25の確率変数Xに対して、Y=2X+10とするとき、E(Y)とV(Y)はいくらですか。",
        options: [
            "E(Y)=210、V(Y)=100",
            "E(Y)=210、V(Y)=60",
            "E(Y)=110、V(Y)=100",
            "E(Y)=200、V(Y)=50"
        ],
        correct: 1,
        explanation: "E(Y)=2E(X)+10=2×100+10=210。V(Y)=4V(X)=4×25=100（定数項は分散に影響せず、2倍すると分散は4倍）。"
    },
    {
        id: 12,
        question: "時系列データで「季節調整」を行う目的は何ですか。",
        options: [
            "データを増やす",
            "季節変動を除いて基調的な動きを見る",
            "データを減らす",
            "相関を高める"
        ],
        correct: 2,
        explanation: "季節調整は、季節変動の影響を除去して、データの基調的な動き（トレンド）を明確にするために行います。"
    },
    {
        id: 13,
        question: "ラスパイレス指数とパーシェ指数の違いとして正しいものはどれですか。",
        options: [
            "基準時点のウェイトか比較時点のウェイトかの違い",
            "計算方法が全く異なる",
            "ラスパイレスは平均、パーシェは中央値",
            "違いはない"
        ],
        correct: 1,
        explanation: "ラスパイレス指数は基準時点のウェイトを使い、パーシェ指数は比較時点のウェイトを使います。消費者物価指数ではラスパイレス方式が使われます。"
    },
    {
        id: 14,
        question: "系統抽出法（等間隔抽出法）の説明として正しいものはどれですか。",
        options: [
            "ランダムに抽出する",
            "名簿から一定間隔で抽出する",
            "層に分けて抽出する",
            "クラスターごと抽出する"
        ],
        correct: 2,
        explanation: "系統抽出法は、名簿に一定の間隔（例えば10人ごと）で標本を抽出する方法です。"
    },
    {
        id: 15,
        question: "二重盲検法（ダブルブラインド）を用いる目的は何ですか。",
        options: [
            "実験を早く終わらせる",
            "被験者と実験者の両方がバイアスの影響を受けないようにする",
            "費用を削減する",
            "サンプルサイズを増やす"
        ],
        correct: 2,
        explanation: "二重盲検法は、被験者も実験者も処置内容を知らない状態で実験を行い、バイアスを排除します。"
    },
    {
        id: 16,
        question: "交絡因子（confounding factor）とは何ですか。",
        options: [
            "目的変数",
            "説明変数",
            "結果と原因の両方に影響を与える第三の変数",
            "誤差"
        ],
        correct: 3,
        explanation: "交絡因子は、目的変数と説明変数の両方に影響を与える第三の変数で、因果関係の解釈を困難にします。"
    },
    {
        id: 17,
        question: "中心極限定理の内容として正しいものはどれですか。",
        options: [
            "母集団が正規分布でなくても、標本サイズが大きければ標本平均の分布は正規分布に近づく",
            "すべてのデータは正規分布に従う",
            "標本サイズが小さいほど良い",
            "母平均と標本平均は常に等しい"
        ],
        correct: 1,
        explanation: "中心極限定理により、母集団の分布に関わらず、標本サイズが十分大きければ標本平均の分布は正規分布に近づきます。"
    },
    {
        id: 18,
        question: "標本分散を計算する際に、n-1で割る理由（不偏推定量）として正しいものはどれですか。",
        options: [
            "計算しやすいから",
            "母分散の不偏推定量にするため",
            "データを増やすため",
            "標準偏差を小さくするため"
        ],
        correct: 2,
        explanation: "nで割ると母分散を過小評価するため、n-1で割ることで不偏推定量（期待値が母分散と等しい）になります。"
    },
    {
        id: 19,
        question: "信頼度を95%から99%に上げた場合、信頼区間の幅はどうなりますか。",
        options: [
            "狭くなる",
            "広くなる",
            "変わらない",
            "計算できない"
        ],
        correct: 2,
        explanation: "信頼度を上げると、より広い範囲をカバーする必要があるため、信頼区間の幅は広くなります。"
    },
    {
        id: 20,
        question: "仮説検定における有意水準αの意味として正しいものはどれですか。",
        options: [
            "帰無仮説が正しいときに誤って棄却する確率の上限",
            "帰無仮説が正しい確率",
            "p値のこと",
            "標本サイズ"
        ],
        correct: 1,
        explanation: "有意水準αは、帰無仮説が実際に正しいときに、誤って棄却してしまう確率（第一種の過誤）の上限です。"
    },
    {
        id: 21,
        question: "第二種の過誤（βエラー）を減らす方法として適切なものはどれですか。",
        options: [
            "有意水準を上げる",
            "標本サイズを大きくする",
            "有意水準を下げる",
            "何もしない"
        ],
        correct: 2,
        explanation: "標本サイズを大きくすることで検出力が上がり、第二種の過誤（本当は帰無仮説が誤っているのに棄却しない誤り）を減らせます。"
    },
    {
        id: 22,
        question: "偏差の合計Σ(x-x̄)は必ずいくつになりますか。",
        options: [
            "-1",
            "0",
            "1",
            "データによる"
        ],
        correct: 2,
        explanation: "平均値の性質により、偏差の合計Σ(x-x̄)は必ず0になります。これは平均値の定義から導かれます。"
    },
    {
        id: 23,
        question: "2つのグループの分散が等しいかどうかを検定する際に用いる検定は何ですか。",
        options: [
            "t検定",
            "カイ二乗検定",
            "F検定",
            "z検定"
        ],
        correct: 3,
        explanation: "2つの分散が等しいかどうかを検定するにはF検定を用います（ただし3級範囲を超える可能性あり）。"
    },
    {
        id: 24,
        question: "スピアマンの順位相関係数を用いる場面として適切なものはどれですか。",
        options: [
            "直線的な関係を測る",
            "単調な関係を測る（順序データに適用）",
            "因果関係を証明する",
            "平均値を比較する"
        ],
        correct: 2,
        explanation: "スピアマンの順位相関係数は、順序データや単調な関係（必ずしも直線的でない）に適用できます。"
    },
    {
        id: 25,
        question: "回帰直線y=a+bxにおいて、傾きbが負のとき、xとyの相関係数の符号はどうなりますか。",
        options: [
            "正",
            "負",
            "0",
            "判断できない"
        ],
        correct: 2,
        explanation: "回帰直線の傾きと相関係数は同じ符号を持ちます。傾きが負なら相関係数も負です。"
    },
    {
        id: 26,
        question: "決定係数R²が1に近いとき、回帰モデルについて何が言えますか。",
        options: [
            "モデルの当てはまりが悪い",
            "モデルの当てはまりが良い",
            "相関がない",
            "因果関係がある"
        ],
        correct: 2,
        explanation: "決定係数R²は0から1の値を取り、1に近いほどモデルの当てはまりが良いことを示します。"
    },
    {
        id: 27,
        question: "累積相対度数が0.25に対応する値を何と呼びますか。",
        options: [
            "第1四分位数（Q1）",
            "第2四分位数（Q2）",
            "第3四分位数（Q3）",
            "最小値"
        ],
        correct: 1,
        explanation: "累積相対度数0.25（25%点）が第1四分位数（Q1）です。同様に0.5がQ2（中央値）、0.75がQ3です。"
    },
    {
        id: 28,
        question: "外れ値を含むデータの要約統計量として、平均値より中央値が適している理由は何ですか。",
        options: [
            "中央値の方が計算が簡単",
            "中央値は外れ値の影響を受けにくい",
            "中央値の方が大きい",
            "理由はない"
        ],
        correct: 2,
        explanation: "中央値は順序に基づく統計量なので、極端な値（外れ値）の影響を受けにくいです。平均値は外れ値に大きく影響されます。"
    },
    {
        id: 29,
        question: "A市とB市の人口構成が異なる場合、死亡率を比較する際に適切な方法はどれですか。",
        options: [
            "粗死亡率をそのまま比較",
            "年齢調整死亡率を用いる",
            "比較しない",
            "平均値を比較"
        ],
        correct: 2,
        explanation: "人口構成が異なる場合、年齢調整死亡率を用いることで公平な比較ができます（標準化）。"
    },
    {
        id: 30,
        question: "統計的に有意（p<0.05）であっても、実質的に意味がない場合があります。この状況が起こる理由として最も適切なものはどれですか。",
        options: [
            "サンプルサイズが小さすぎる",
            "サンプルサイズが非常に大きく、些細な差でも有意になる",
            "計算ミス",
            "有意水準が間違っている"
        ],
        correct: 2,
        explanation: "サンプルサイズが非常に大きいと、実質的には意味のない小さな差でも統計的に有意になることがあります。統計的有意性と実質的重要性は異なります。"
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
      grade: '3級' as '3級',
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
              <strong>制限時間:</strong> 60分 | <strong>問題数:</strong> 30問 | <strong>合格ライン:</strong> 65%以上（20問以上）
            </p>
            <p className="text-gray-700 mt-2">
              <strong>難易度:</strong> ⭐⭐⭐⭐⭐ 超難しいレベル
            </p>
          </div>
          <p className="text-gray-600">ベイズ統計・因果推論・機械学習・最先端手法を含む最高難度試験です。</p>
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
              className="flex-1 bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
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

