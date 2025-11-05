import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade3Exam1() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    {
        id: 1,
        question: "次のデータのうち、量的変数はどれですか。\n\nI. 血液型（A型、B型、O型、AB型）\nII. 身長（cm）\nIII. 体重（kg）\nIV. 好きな色",
        options: [
            "IとIIのみ",
            "IIとIIIのみ",
            "I、II、IIIのみ",
            "すべて"
        ],
        correct: 2,
        explanation: "量的変数は数値として計算可能なデータです。身長と体重は量的変数、血液型と好きな色は質的変数です。"
    },
    {
        id: 2,
        question: "次のデータの中央値を求めてください。\n\nデータ: 12, 15, 18, 20, 25, 30, 35",
        options: [
            "18",
            "20",
            "22.5",
            "25"
        ],
        correct: 2,
        explanation: "7個のデータなので、中央値は4番目の値で20です。"
    },
    {
        id: 3,
        question: "ある店舗の月別売上の推移を示すのに最も適したグラフはどれですか。",
        options: [
            "円グラフ",
            "棒グラフ",
            "折れ線グラフ",
            "箱ひげ図"
        ],
        correct: 3,
        explanation: "時系列データの推移を示すには折れ線グラフが最適です。"
    },
    {
        id: 4,
        question: "次のデータから平均値を計算してください。\n\nデータ: 10, 15, 20, 25, 30",
        options: [
            "18",
            "20",
            "22",
            "25"
        ],
        correct: 2,
        explanation: "平均値 = (10+15+20+25+30)/5 = 100/5 = 20です。"
    },
    {
        id: 5,
        question: "次のデータの範囲（レンジ）はいくらですか。\n\nデータ: 5, 12, 18, 24, 30",
        options: [
            "18",
            "24",
            "25",
            "30"
        ],
        correct: 3,
        explanation: "範囲 = 最大値 - 最小値 = 30 - 5 = 25です。"
    },
    {
        id: 6,
        question: "次のヒストグラムの説明として正しいものはどれですか。\n\n階級幅が等しいヒストグラムの場合について考えます。",
        options: [
            "棒の高さは累積度数を表す",
            "棒の面積は相対度数を表す",
            "横軸の順序は変更できる",
            "棒と棒の間に隙間がある"
        ],
        correct: 2,
        explanation: "ヒストグラムでは、棒の面積が相対度数を表します。階級幅が等しい場合、棒の高さも度数に比例します。"
    },
    {
        id: 7,
        question: "箱ひげ図で箱の中の線が表すものは何ですか。",
        options: [
            "平均値",
            "中央値",
            "最頻値",
            "標準偏差"
        ],
        correct: 2,
        explanation: "箱ひげ図の箱の中の線は中央値（第2四分位数）を表します。"
    },
    {
        id: 8,
        question: "次の散布図から読み取れる相関はどれですか。\n\n右上がりの点の分布が見られる場合",
        options: [
            "正の相関",
            "負の相関",
            "無相関",
            "判断できない"
        ],
        correct: 1,
        explanation: "右上がりの散布図は正の相関を示します。一方の変数が増えると他方も増える傾向があります。"
    },
    {
        id: 9,
        question: "相関係数の取りうる値の範囲はどれですか。",
        options: [
            "-1以上1以下",
            "0以上1以下",
            "0以上",
            "すべての実数"
        ],
        correct: 1,
        explanation: "相関係数は-1から1の範囲の値を取ります。-1は完全な負の相関、1は完全な正の相関を示します。"
    },
    {
        id: 10,
        question: "次のクロス集計表から、「Aを選んだ」人数は何人ですか。\n\n【好み調査】\n　　　　男性　女性　計\nA選択　30　　20　　？\nB選択　20　　30　　50\n計　　　50　　50　　100",
        options: [
            "30",
            "40",
            "50",
            "100"
        ],
        correct: 3,
        explanation: "A選択の合計は、男性30人+女性20人=50人です。"
    },
    {
        id: 11,
        question: "サイコロを1回振って3の倍数が出る確率はいくらですか。",
        options: [
            "1/6",
            "1/3",
            "1/2",
            "2/3"
        ],
        correct: 2,
        explanation: "3の倍数は3と6の2通り、全体は6通りなので、2/6=1/3です。"
    },
    {
        id: 12,
        question: "次のデータの第1四分位数（Q1）を求めてください。\n\nデータ（昇順）: 10, 15, 20, 25, 30, 35, 40, 45, 50",
        options: [
            "15",
            "17.5",
            "20",
            "22.5"
        ],
        correct: 3,
        explanation: "9個のデータの下位4つ（10,15,20,25）の中央値がQ1で、(15+20)/2ではなく、下位25%点なので20です。（簡易的な計算方法）"
    },
    {
        id: 13,
        question: "偏差値が50のとき、その得点は平均値に対してどのような位置にありますか。",
        options: [
            "平均値より高い",
            "平均値と同じ",
            "平均値より低い",
            "判断できない"
        ],
        correct: 2,
        explanation: "偏差値50は平均値に対応します。偏差値が50より大きければ平均より上、小さければ平均より下です。"
    },
    {
        id: 14,
        question: "標準偏差が大きいデータの特徴はどれですか。",
        options: [
            "データのばらつきが小さい",
            "データのばらつきが大きい",
            "平均値が大きい",
            "中央値が大きい"
        ],
        correct: 2,
        explanation: "標準偏差はデータのばらつきを表す指標で、値が大きいほどばらつきが大きいことを示します。"
    },
    {
        id: 15,
        question: "次のデータで外れ値（はずれ値）はどれですか。\n\nデータ: 10, 12, 15, 18, 20, 100",
        options: [
            "10",
            "20",
            "100",
            "外れ値はない"
        ],
        correct: 3,
        explanation: "100は他のデータと比べて極端に大きいため、外れ値と考えられます。"
    },
    {
        id: 16,
        question: "外れ値が平均値に与える影響について正しいものはどれですか。",
        options: [
            "外れ値は平均値に影響しない",
            "外れ値は平均値を大きく変化させることがある",
            "外れ値は中央値を大きく変化させる",
            "外れ値は最頻値に影響する"
        ],
        correct: 2,
        explanation: "外れ値は平均値を大きく変化させる可能性があります。中央値は外れ値の影響を受けにくいです。"
    },
    {
        id: 17,
        question: "コインを2回投げて、1回目も2回目も表が出る確率はいくらですか。",
        options: [
            "1/2",
            "1/3",
            "1/4",
            "1/8"
        ],
        correct: 3,
        explanation: "1回目が表の確率は1/2、2回目も表の確率は1/2。独立なので(1/2)×(1/2)=1/4です。"
    },
    {
        id: 18,
        question: "52枚のトランプから1枚引いたとき、スペードまたはハートが出る確率はいくらですか。",
        options: [
            "1/4",
            "1/2",
            "3/4",
            "13/52"
        ],
        correct: 2,
        explanation: "スペードは13枚、ハートは13枚で合計26枚。26/52=1/2です。"
    },
    {
        id: 19,
        question: "ある商品の価格が2020年を基準（100）として、2021年に110になりました。価格は何%上昇しましたか。",
        options: [
            "5%",
            "10%",
            "15%",
            "20%"
        ],
        correct: 2,
        explanation: "指数が100から110になったので、(110-100)/100×100=10%上昇です。"
    },
    {
        id: 20,
        question: "母集団とは何ですか。",
        options: [
            "調査の対象となる全体の集合",
            "調査で実際に抽出された一部",
            "サンプルの平均値",
            "データの種類"
        ],
        correct: 1,
        explanation: "母集団は調査の対象となる全体の集合です。そこから一部を抽出したものが標本（サンプル）です。"
    },
    {
        id: 21,
        question: "無作為抽出の目的として最も適切なものはどれですか。",
        options: [
            "調査を簡単にするため",
            "偏りのない標本を得るため",
            "費用を削減するため",
            "時間を短縮するため"
        ],
        correct: 2,
        explanation: "無作為抽出の主な目的は、偏りのない代表的な標本を得ることです。"
    },
    {
        id: 22,
        question: "次のデータの最頻値（モード）を求めてください。\n\nデータ: 5, 7, 7, 8, 9, 9, 9, 10",
        options: [
            "7",
            "8",
            "9",
            "10"
        ],
        correct: 3,
        explanation: "最頻値は最も頻繁に現れる値で、9が3回出現しているので9です。"
    },
    {
        id: 23,
        question: "分散が0のデータはどのような特徴を持ちますか。",
        options: [
            "すべての値が異なる",
            "すべての値が同じ",
            "平均値が0",
            "中央値が0"
        ],
        correct: 2,
        explanation: "分散が0ということは、すべてのデータが同じ値であることを意味します。"
    },
    {
        id: 24,
        question: "ヒストグラムから読み取れないものはどれですか。",
        options: [
            "データの分布の形",
            "データの個々の値",
            "中央値が含まれる階級",
            "度数"
        ],
        correct: 2,
        explanation: "ヒストグラムは度数分布を示しますが、個々のデータの正確な値は読み取れません。"
    },
    {
        id: 25,
        question: "相関関係があっても因果関係があるとは限らない例として適切なものはどれですか。",
        options: [
            "身長と体重",
            "気温とアイスクリームの売上",
            "アイスクリームの売上と水難事故（夏という共通要因）",
            "勉強時間と成績"
        ],
        correct: 3,
        explanation: "アイスクリームの売上と水難事故には相関がありますが、直接の因果関係はありません。夏という共通の要因（交絡因子）があります。"
    },
    {
        id: 26,
        question: "赤玉4個、白玉6個の袋から玉を1個取り出すとき、白玉が出る確率はいくらですか。",
        options: [
            "2/5",
            "3/5",
            "4/10",
            "1/2"
        ],
        correct: 2,
        explanation: "白玉は6個、全体は10個なので、6/10=3/5です。"
    },
    {
        id: 27,
        question: "時系列グラフから読み取れる情報として適切でないものはどれですか。",
        options: [
            "データの推移",
            "季節変動",
            "データ間の相関",
            "トレンド"
        ],
        correct: 3,
        explanation: "単一の時系列グラフからは、異なるデータ間の相関は読み取れません。散布図が必要です。"
    },
    {
        id: 28,
        question: "標本平均は母平均の推定値として使われます。標本サイズが大きくなると、標本平均の精度はどうなりますか。",
        options: [
            "悪くなる",
            "変わらない",
            "良くなる",
            "判断できない"
        ],
        correct: 3,
        explanation: "標本サイズが大きくなると、標本平均の標準誤差が小さくなり、推定の精度が向上します。"
    },
    {
        id: 29,
        question: "信頼区間の幅を狭くするためにはどうすればよいですか。",
        options: [
            "標本サイズを大きくする",
            "標本サイズを小さくする",
            "信頼度を上げる",
            "平均値を変える"
        ],
        correct: 1,
        explanation: "標本サイズを大きくすると標準誤差が小さくなり、信頼区間の幅が狭くなります。"
    },
    {
        id: 30,
        question: "仮説検定において、帰無仮説を棄却するとはどういう意味ですか。",
        options: [
            "帰無仮説が正しいと判断する",
            "帰無仮説が正しくないと判断する",
            "対立仮説が正しくないと判断する",
            "判断を保留する"
        ],
        correct: 2,
        explanation: "帰無仮説を棄却するということは、データから見て帰無仮説が正しくない（対立仮説が正しい可能性が高い）と判断することです。"
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
      grade: '3級' as '3級',
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
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
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
                    <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-base font-bold">
                      問題 {currentQuestionIndex + 1}
                    </span>
                    {answers[q.id] && (
                      <span className="text-blue-600 font-semibold">✓ 回答済み</span>
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
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              次の問題 →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
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
                    ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                    : answers[q.id]
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
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
