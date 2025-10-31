import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Grade3Section10Set1() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 1,
      question: "ベイズ統計学の特徴は何ですか。",
      options: [
        "頻度論的アプローチのみ",
        "事前知識と観測データを組み合わせる",
        "パラメータは固定値のみ",
        "主観確率を認めない"
      ],
      correct: 2,
      explanation: "ベイズ統計学は、事前分布（事前知識）と尤度（観測データ）を組み合わせて事後分布を求め、主観確率を認めるアプローチです。"
    },
    {
      id: 2,
      question: "事前分布とは何ですか。",
      options: [
        "データ観測後の分布",
        "データ観測前のパラメータに関する信念を表す分布",
        "尤度のこと",
        "事後分布と同じ"
      ],
      correct: 2,
      explanation: "事前分布は、データを観測する前のパラメータに関する信念や知識を確率分布で表現したものです。"
    },
    {
      id: 3,
      question: "事後分布とは何ですか。",
      options: [
        "事前分布と同じ",
        "事前分布と尤度から得られる、データ観測後のパラメータの分布",
        "標本分布",
        "正規分布"
      ],
      correct: 2,
      explanation: "事後分布は、ベイズの定理により事前分布と尤度を組み合わせて得られる、データ観測後のパラメータの分布です。"
    },
    {
      id: 4,
      question: "ベイズ推定の信用区間（credible interval）の解釈は何ですか。",
      options: [
        "頻度論的信頼区間と同じ",
        "パラメータがその区間に含まれる確率",
        "標本平均の区間",
        "有意水準"
      ],
      correct: 2,
      explanation: "ベイズの信用区間は、パラメータが実際にその区間に含まれる確率として直観的に解釈できます（頻度論的信頼区間とは異なる）。"
    },
    {
      id: 5,
      question: "MCMC法（マルコフ連鎖モンテカルロ法）の目的は何ですか。",
      options: [
        "回帰分析",
        "複雑な事後分布からのサンプリング",
        "主成分分析",
        "クラスター分析"
      ],
      correct: 2,
      explanation: "MCMC法は、解析的に求めにくい複雑な事後分布からサンプルを生成し、ベイズ推定を実行する手法です。"
    },
    {
      id: 6,
      question: "機械学習における教師あり学習とは何ですか。",
      options: [
        "ラベルのないデータから学習",
        "入力と正解ラベルのペアから学習",
        "強化学習",
        "クラスタリング"
      ],
      correct: 2,
      explanation: "教師あり学習は、入力データと対応する正解ラベル（教師信号）のペアを用いてモデルを学習させる手法です。"
    },
    {
      id: 7,
      question: "教師なし学習の例はどれですか。",
      options: [
        "分類",
        "回帰",
        "クラスタリング",
        "すべて教師あり"
      ],
      correct: 3,
      explanation: "教師なし学習は、正解ラベルなしでデータの構造やパターンを発見する手法で、クラスタリングや次元削減が代表例です。"
    },
    {
      id: 8,
      question: "過学習（overfitting）とは何ですか。",
      options: [
        "モデルが単純すぎる",
        "訓練データに過度に適合し、未知データへの汎化性能が低い",
        "データが少なすぎる",
        "最適な学習"
      ],
      correct: 2,
      explanation: "過学習は、モデルが訓練データのノイズまで学習してしまい、新しいデータに対する予測性能が低下する現象です。"
    },
    {
      id: 9,
      question: "正則化の目的は何ですか。",
      options: [
        "モデルを複雑にする",
        "過学習を防ぐためにモデルの複雑さにペナルティを課す",
        "訓練誤差を増やす",
        "パラメータを増やす"
      ],
      correct: 2,
      explanation: "正則化は、モデルの複雑さに対してペナルティを課し、過学習を防いで汎化性能を高める手法です。"
    },
    {
      id: 10,
      question: "k分割交差検証とは何ですか。",
      options: [
        "1回だけ学習",
        "データをk個に分割し、k回学習と検証を繰り返す",
        "k個のモデルを同時学習",
        "k回データを収集"
      ],
      correct: 2,
      explanation: "k分割交差検証は、データをk個に分割し、そのうち1つを検証用、残りを訓練用として、k回繰り返してモデルを評価する手法です。"
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

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      alert('すべての問題に回答してください。');
      return;
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

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              📊 結果
            </h1>
            
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-lg px-12 py-8 shadow-xl">
                <p className="text-6xl font-bold mb-2">{score}/{questions.length}</p>
                <p className="text-2xl">正答率: {percentage.toFixed(0)}%</p>
              </div>
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              🎯 3級 - 応用トピック セット1
            </h1>
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">ベイズ統計・機械学習の基礎を学びましょう</p>
          <div className="flex gap-2 text-sm text-gray-500">
            <span className="bg-purple-100 px-3 py-1 rounded-full">セット1/3</span>
            <span>全10問</span>
          </div>
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
                        <span className="text-gray-800 leading-relaxed pt-1">{option}</span>
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
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            ✓ 採点する
          </button>
        </div>
      </div>
    </div>
  );
}

