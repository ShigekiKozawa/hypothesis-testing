import { Link } from 'react-router-dom';

export default function Home() {
  const grade3Exams = [
    {
      id: 'grade3-1',
      title: '模擬試験1',
      description: '基礎的な統計の概念や記述統計に関する10問の試験',
      questions: 10,
      time: 20,
      path: '/grade3/exam1',
      available: true
    }
  ];

  const grade3Sections = [
    {
      id: 'section1',
      title: 'セクション1: 記述統計の基礎',
      description: '平均値、分散、標準偏差、相関係数',
      sets: [
        { id: 1, path: '/grade3/section1/set1', questions: 10 },
        { id: 2, path: '/grade3/section1/set2', questions: 10 },
        { id: 3, path: '/grade3/section1/set3', questions: 10 }
      ]
    }
  ];

  const grade4Exams = [
    {
      id: 'grade4-1',
      title: '模擬試験1',
      description: '中学卒業レベルの統計知識を確認する基礎問題',
      questions: 10,
      time: 20,
      path: '/grade4/exam1',
      available: true
    }
  ];

  const grade4Sections = [
    {
      id: 'section1',
      title: 'セクション1: データの代表値',
      description: '平均値、中央値、最頻値の理解',
      sets: [
        { id: 1, path: '/grade4/section1/set1', questions: 10 },
        { id: 2, path: '/grade4/section1/set2', questions: 10 },
        { id: 3, path: '/grade4/section1/set3', questions: 10 }
      ]
    },
    {
      id: 'section2',
      title: 'セクション2: データの散らばり',
      description: '範囲、四分位範囲の理解',
      sets: [
        { id: 1, path: '/grade4/section2/set1', questions: 10 },
        { id: 2, path: '/grade4/section2/set2', questions: 10 },
        { id: 3, path: '/grade4/section2/set3', questions: 10 }
      ]
    },
    {
      id: 'section3',
      title: 'セクション3: 度数分布表',
      description: '度数分布表の読み取りと作成',
      sets: [
        { id: 1, path: '/grade4/section3/set1', questions: 10 },
        { id: 2, path: '/grade4/section3/set2', questions: 10 },
        { id: 3, path: '/grade4/section3/set3', questions: 10 }
      ]
    },
    {
      id: 'section4',
      title: 'セクション4: グラフの読み取り',
      description: '棒グラフ、円グラフ、折れ線グラフの理解',
      sets: [
        { id: 1, path: '/grade4/section4/set1', questions: 10 },
        { id: 2, path: '/grade4/section4/set2', questions: 10 },
        { id: 3, path: '/grade4/section4/set3', questions: 10 }
      ]
    },
    {
      id: 'section5',
      title: 'セクション5: 確率の基礎',
      description: '確率の基本的な考え方',
      sets: [
        { id: 1, path: '/grade4/section5/set1', questions: 10 },
        { id: 2, path: '/grade4/section5/set2', questions: 10 },
        { id: 3, path: '/grade4/section5/set3', questions: 10 }
      ]
    },
    {
      id: 'section6',
      title: 'セクション6: 相関と散布図',
      description: '2つの変数の関係性の理解',
      sets: [
        { id: 1, path: '/grade4/section6/set1', questions: 10 },
        { id: 2, path: '/grade4/section6/set2', questions: 10 },
        { id: 3, path: '/grade4/section6/set3', questions: 10 }
      ]
    },
    {
      id: 'section7',
      title: 'セクション7: 箱ひげ図',
      description: '四分位数と箱ひげ図の読み方',
      sets: [
        { id: 1, path: '/grade4/section7/set1', questions: 10 },
        { id: 2, path: '/grade4/section7/set2', questions: 10 },
        { id: 3, path: '/grade4/section7/set3', questions: 10 }
      ]
    },
    {
      id: 'section8',
      title: 'セクション8: ヒストグラム',
      description: 'ヒストグラムとデータ分布',
      sets: [
        { id: 1, path: '/grade4/section8/set1', questions: 10 },
        { id: 2, path: '/grade4/section8/set2', questions: 10 },
        { id: 3, path: '/grade4/section8/set3', questions: 10 }
      ]
    },
    {
      id: 'section9',
      title: 'セクション9: 標本と母集団',
      description: '標本調査と全数調査の理解',
      sets: [
        { id: 1, path: '/grade4/section9/set1', questions: 10 },
        { id: 2, path: '/grade4/section9/set2', questions: 10 },
        { id: 3, path: '/grade4/section9/set3', questions: 10 }
      ]
    },
    {
      id: 'section10',
      title: 'セクション10: データの収集方法',
      description: '様々なデータ収集方法',
      sets: [
        { id: 1, path: '/grade4/section10/set1', questions: 10 },
        { id: 2, path: '/grade4/section10/set2', questions: 10 },
        { id: 3, path: '/grade4/section10/set3', questions: 10 }
      ]
    }
  ];

  const ExamCard = ({ exam }: { exam: typeof grade3Exams[0] }) => (
    <div
      className={`bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg p-6 border-2 transition-all ${
        exam.available
          ? 'border-blue-200 hover:shadow-xl hover:scale-105'
          : 'border-gray-200 opacity-60'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800">
          {exam.title}
        </h3>
        {exam.available && (
          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            利用可能
          </span>
        )}
      </div>
      <p className="text-gray-600 mb-4">{exam.description}</p>
      <div className="flex gap-4 text-sm text-gray-500 mb-6">
        <span>📝 {exam.questions}問</span>
        <span>⏱️ 約{exam.time}分</span>
      </div>
      {exam.available ? (
        <Link
          to={exam.path}
          className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          試験を開始
        </Link>
      ) : (
        <button
          disabled
          className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-semibold cursor-not-allowed"
        >
          準備中
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              📊 統計検定 模擬試験
            </h1>
            <p className="text-lg text-gray-600">
              統計検定の試験対策用の模擬試験です。<br />
              実際の試験に近い形式で学習できます。
            </p>
          </div>

          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg font-bold text-lg">
                3級
              </div>
              <h2 className="text-2xl font-bold text-gray-800">統計検定3級</h2>
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-4">📝 模擬試験（総合問題）</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {grade3Exams.map((exam) => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-4">📚 セクション別問題</h3>
            <div className="space-y-4 mb-4">
              {grade3Sections.map((section) => (
                <div key={section.id} className="bg-white rounded-lg border-2 border-green-200 p-5">
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{section.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{section.description}</p>
                  <div className="grid grid-cols-3 gap-3">
                    {section.sets.map((set) => (
                      <Link
                        key={set.id}
                        to={set.path}
                        className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-lg text-center hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
                      >
                        <div className="font-bold text-lg mb-1">セット{set.id}</div>
                        <div className="text-xs opacity-90">{set.questions}問</div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700">
              <strong>本試験:</strong> 60分・30問 | <strong>合格ライン:</strong> 65点以上
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg font-bold text-lg">
                4級
              </div>
              <h2 className="text-2xl font-bold text-gray-800">統計検定4級</h2>
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-4">📝 模擬試験（総合問題）</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {grade4Exams.map((exam) => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-4">📚 セクション別問題</h3>
            <div className="space-y-4 mb-4">
              {grade4Sections.map((section) => (
                <div key={section.id} className="bg-white rounded-lg border-2 border-green-200 p-5">
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{section.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{section.description}</p>
                  <div className="grid grid-cols-3 gap-3">
                    {section.sets.map((set) => (
                      <Link
                        key={set.id}
                        to={set.path}
                        className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-lg text-center hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
                      >
                        <div className="font-bold text-lg mb-1">セット{set.id}</div>
                        <div className="text-xs opacity-90">{set.questions}問</div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-gray-700">
              <strong>本試験:</strong> 60分・30問 | <strong>合格ライン:</strong> 60点以上
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">📌 利用について</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• 各試験は何度でも受験できます</li>
              <li>• すべての問題に回答後、採点と解説を確認できます</li>
              <li>• 3級と4級で難易度と合格ラインが異なります</li>
              <li>• 問題は随時追加予定です</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

