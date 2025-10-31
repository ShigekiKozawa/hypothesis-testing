import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Grade4Section8Set3() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    {
      id: 1,
      question: "テストの点数のヒストグラムが左に山がある形（左に偏っている）場合、どのような意味ですか。",
      options: [
        "多くの生徒が高得点を取った",
        "多くの生徒が低得点だった",
        "得点が均等に分布している",
        "外れ値が多い"
      ],
      correct: 2,
      explanation: "左に山がある（左に偏っている）場合、多くのデータが低い値の側に集まっており、多くの生徒が低得点だったことを示します。"
    },
    {
      id: 2,
      question: "ヒストグラムと度数分布表の関係として、正しいものはどれですか。",
      options: [
        "全く関係がない",
        "ヒストグラムは度数分布表を視覚化したもの",
        "度数分布表はヒストグラムより正確である",
        "どちらか一方しか使えない"
      ],
      correct: 2,
      explanation: "ヒストグラムは度数分布表のデータをグラフ化（視覚化）したものです。同じ情報を異なる形式で表現しています。"
    },
    {
      id: 3,
      question: "ヒストグラムで、階級の境界の値はどのように扱いますか。",
      options: [
        "常に右側の階級に含める",
        "常に左側の階級に含める",
        "どちらでもよいが、一貫性が必要",
        "両方の階級に含める"
      ],
      correct: 3,
      explanation: "階級の境界値をどちらに含めるかは、一貫したルールで扱う必要があります。一般的には「以上、未満」または「より大きい、以下」のように明確に定義します。"
    },
    {
      id: 4,
      question: "ヒストグラムから平均値を正確に求めることはできますか。",
      options: [
        "正確に求められる",
        "おおよその値は推定できるが正確には求められない",
        "全く求められない",
        "中央値なら正確に求められる"
      ],
      correct: 2,
      explanation: "ヒストグラムは階級ごとにデータをまとめているため、個々の値がわかりません。階級値を使って平均値を推定することはできますが、正確な値は求められません。"
    },
    {
      id: 5,
      question: "データが0から100まで分布している場合、階級幅10でヒストグラムを作ると、いくつの階級ができますか。",
      options: ["9つ", "10つ", "11つ", "12つ"],
      correct: 2,
      explanation: "0-10, 10-20, 20-30, ..., 90-100 のように、100÷10 = 10個の階級ができます。"
    },
    {
      id: 6,
      question: "相対度数ヒストグラムとは何ですか。",
      options: [
        "度数の代わりに相対度数を縦軸にしたヒストグラム",
        "2つのデータを比較するヒストグラム",
        "時間の変化を示すヒストグラム",
        "階級幅が異なるヒストグラム"
      ],
      correct: 1,
      explanation: "相対度数ヒストグラムは、縦軸に度数の代わりに相対度数（全体に対する割合）を用いたヒストグラムです。データ数が異なる2つの分布を比較する際に便利です。"
    },
    {
      id: 7,
      question: "ヒストグラムで、すべての棒の高さがほぼ同じ場合、データの分布について何が言えますか。",
      options: [
        "データが一点に集中している",
        "データがほぼ均等に分布している",
        "データが二極化している",
        "外れ値が多い"
      ],
      correct: 2,
      explanation: "すべての階級の度数がほぼ同じということは、データがどの範囲にもほぼ均等に分布していることを示します（一様分布）。"
    },
    {
      id: 8,
      question: "ヒストグラムを作成する際、階級の数が少なすぎる場合と多すぎる場合の共通の問題は何ですか。",
      options: [
        "グラフが作れない",
        "データの分布の特徴が把握しにくくなる",
        "計算が複雑になる",
        "問題はない"
      ],
      correct: 2,
      explanation: "階級が少なすぎると詳細がわからず、多すぎると全体の傾向がわからなくなります。どちらもデータの分布の特徴を把握しにくくなります。"
    },
    {
      id: 9,
      question: "ヒストグラムとドットプロット（点グラフ）の違いは何ですか。",
      options: [
        "ヒストグラムは階級ごとにまとめるが、ドットプロットは個々の値を表示する",
        "ヒストグラムの方が常に正確である",
        "違いはない",
        "ドットプロットの方が作りやすい"
      ],
      correct: 1,
      explanation: "ヒストグラムは連続データを階級にまとめて表示しますが、ドットプロットは個々のデータを点で表示します。データ数が少ない場合はドットプロットが適しています。"
    },
    {
      id: 10,
      question: "ヒストグラムを使ってデータ分析をする際の注意点として、最も適切なものはどれですか。",
      options: [
        "階級の設定によって見え方が変わることを理解する",
        "必ず10個の階級を作る",
        "平均値だけを見れば十分である",
        "グラフの色を変えれば分析は不要"
      ],
      correct: 1,
      explanation: "ヒストグラムは階級の幅や数によって見え方が大きく変わるため、適切な階級設定が重要です。複数の設定を試して分布の特徴を把握することが大切です。"
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              📊 結果
            </h1>
            
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-br from-green-500 to-green-700 text-white rounded-lg px-12 py-8 shadow-xl">
                <p className="text-6xl font-bold mb-2">{score}/{questions.length}</p>
                <p className="text-2xl">正答率: {percentage.toFixed(0)}%</p>
              </div>
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
              📊 4級 - ヒストグラム セット3
            </h1>
            <Link
              to="/"
              className="text-green-600 hover:text-green-800 font-semibold"
            >
              ← トップに戻る
            </Link>
          </div>
          <p className="text-gray-600 mb-2">ヒストグラムの読み方とデータ分布の理解を深めましょう</p>
          <div className="flex gap-2 text-sm text-gray-500">
            <span className="bg-green-100 px-3 py-1 rounded-full">セット3/3</span>
            <span>全10問</span>
          </div>
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