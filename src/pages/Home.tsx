import { Link } from 'react-router-dom';
import { useState } from 'react';
import PracticeMode from '../components/PracticeMode';

export default function Home() {
  const [showPracticeMode, setShowPracticeMode] = useState(false);
  const [selectedPractice, setSelectedPractice] = useState<{
    grade: '3級' | '4級';
    type: 'section' | 'exam';
    section?: string;
    sectionDescription?: string;
  } | null>(null);
  const grade3Exams = [
    {
      id: 'grade3-exam1',
      title: '第1回模擬試験',
      description: '記述統計・推測統計・検定など3級の全範囲から出題される30問',
      questions: 30,
      time: 60,
      path: '/grade3/exam1',
      available: true
    },
    {
      id: 'grade3-exam2',
      title: '第2回模擬試験',
      description: '確率分布・回帰分析・多変量解析など3級の全範囲から出題される30問',
      questions: 30,
      time: 60,
      path: '/grade3/exam2',
      available: true
    },
    {
      id: 'grade3-exam3',
      title: '第3回模擬試験',
      description: 'データ収集・時系列分析・応用統計など3級の全範囲から出題される30問',
      questions: 30,
      time: 60,
      path: '/grade3/exam3',
      available: true
    }
  ];

  const grade3Sections = [
    {
      id: 'section1',
      title: 'セクション1: 記述統計とグラフ読解',
      description: 'ヒストグラム、箱ひげ図、度数分布表、幹葉図、外れ値'
    },
    {
      id: 'section2',
      title: 'セクション2: 散布図・相関・単回帰分析',
      description: '散布図、相関係数、線形単回帰分析、決定係数、残差'
    },
    {
      id: 'section3',
      title: 'セクション3: データの変換と統計量',
      description: '1次変換、偏差値、標準化、変動係数'
    },
    {
      id: 'section4',
      title: 'セクション4: 確率と確率分布',
      description: '基本的な確率、条件付き確率、二項分布'
    },
    {
      id: 'section5',
      title: 'セクション5: 推測統計の基礎',
      description: '標本分布、信頼区間、仮説検定の基礎'
    },
    {
      id: 'section6',
      title: 'セクション6: クロス集計表・実験計画',
      description: 'クロス集計表、標本調査、実験計画の基礎'
    }
  ];

  const grade4Exams = [
    {
      id: 'grade4-exam1',
      title: '第1回模擬試験',
      description: '度数分布・代表値・散らばりなど4級の全範囲から出題される30問',
      questions: 30,
      time: 60,
      path: '/grade4/exam1',
      available: true
    },
    {
      id: 'grade4-exam2',
      title: '第2回模擬試験',
      description: '確率・標本調査・相関など4級の全範囲から出題される30問',
      questions: 30,
      time: 60,
      path: '/grade4/exam2',
      available: true
    },
    {
      id: 'grade4-exam3',
      title: '第3回模擬試験',
      description: 'グラフ・箱ひげ図・データ分析など4級の全範囲から出題される30問',
      questions: 30,
      time: 60,
      path: '/grade4/exam3',
      available: true
    }
  ];

  const grade4Sections = [
    {
      id: 'section1',
      title: 'セクション1: データの種類とグラフ',
      description: '量的・質的データの識別、グラフの選択',
      sets: [
        { id: 1, path: '/grade4/section1/set1', questions: 10 },
        { id: 2, path: '/grade4/section1/set2', questions: 10 },
        { id: 3, path: '/grade4/section1/set3', questions: 10 }
      ]
    },
    {
      id: 'section2',
      title: 'セクション2: 度数分布表と代表値',
      description: '度数分布表、平均値・中央値・最頻値',
      sets: [
        { id: 1, path: '/grade4/section2/set1', questions: 10 },
        { id: 2, path: '/grade4/section2/set2', questions: 10 },
        { id: 3, path: '/grade4/section2/set3', questions: 10 }
      ]
    },
    {
      id: 'section3',
      title: 'セクション3: 度数分布表の応用',
      description: '累積度数、相対度数、階級値',
      sets: [
        { id: 1, path: '/grade4/section3/set1', questions: 10 },
        { id: 2, path: '/grade4/section3/set2', questions: 10 },
        { id: 3, path: '/grade4/section3/set3', questions: 10 }
      ]
    },
    {
      id: 'section4',
      title: 'セクション4: グラフの読解',
      description: '棒グラフ、円グラフ、折れ線グラフ、ヒストグラム',
      sets: [
        { id: 1, path: '/grade4/section4/set1', questions: 10 },
        { id: 2, path: '/grade4/section4/set2', questions: 10 },
        { id: 3, path: '/grade4/section4/set3', questions: 10 }
      ]
    },
    {
      id: 'section5',
      title: 'セクション5: 確率',
      description: '確率の基本計算、場合の数、独立事象',
      sets: [
        { id: 1, path: '/grade4/section5/set1', questions: 10 },
        { id: 2, path: '/grade4/section5/set2', questions: 10 },
        { id: 3, path: '/grade4/section5/set3', questions: 10 }
      ]
    },
    {
      id: 'section6',
      title: 'セクション6: 散布図と相関',
      description: '散布図の読み取り、相関の理解',
      sets: [
        { id: 1, path: '/grade4/section6/set1', questions: 10 },
        { id: 2, path: '/grade4/section6/set2', questions: 10 },
        { id: 3, path: '/grade4/section6/set3', questions: 10 }
      ]
    },
    {
      id: 'section7',
      title: 'セクション7: 箱ひげ図',
      description: '5数要約、四分位範囲、箱ひげ図の読解',
      sets: [
        { id: 1, path: '/grade4/section7/set1', questions: 10 },
        { id: 2, path: '/grade4/section7/set2', questions: 10 },
        { id: 3, path: '/grade4/section7/set3', questions: 10 }
      ]
    },
    {
      id: 'section8',
      title: 'セクション8: ヒストグラム',
      description: 'ヒストグラムの読解、分布の形状',
      sets: [
        { id: 1, path: '/grade4/section8/set1', questions: 10 },
        { id: 2, path: '/grade4/section8/set2', questions: 10 },
        { id: 3, path: '/grade4/section8/set3', questions: 10 }
      ]
    }
  ];

  const handleStartPractice = (
    grade: '3級' | '4級', 
    type: 'section' | 'exam',
    section?: string, 
    description?: string
  ) => {
    setSelectedPractice({
      grade,
      type,
      section,
      sectionDescription: description,
    });
    setShowPracticeMode(true);
    window.scrollTo(0, 0);
  };

  const handleBackFromPractice = () => {
    setShowPracticeMode(false);
    setSelectedPractice(null);
    window.scrollTo(0, 0);
  };

  const ExamCard = ({ exam }: { exam: typeof grade3Exams[0] }) => {
    return (
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
        <div className="flex gap-4 text-sm text-gray-500 mb-4">
          <span>📝 {exam.questions}問</span>
          <span>⏱️ 約{exam.time}分</span>
        </div>
        {exam.available ? (
          <Link
            to={exam.path}
            onClick={() => window.scrollTo(0, 0)}
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
  };

  if (showPracticeMode && selectedPractice) {
    return (
      <PracticeMode
        grade={selectedPractice.grade}
        type={selectedPractice.type}
        section={selectedPractice.section}
        sectionDescription={selectedPractice.sectionDescription}
        onBack={handleBackFromPractice}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-2">
              🚀 Toppa!
            </h1>
            <p className="text-xl text-gray-700 mb-4 font-semibold">
              統計検定 模擬試験
            </p>
            <p className="text-lg text-gray-600">
              統計検定の試験対策用の模擬試験です。<br />
              実際の試験に近い形式で学習できます。
            </p>
          </div>

          <div className="mb-10 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🤖 AI問題生成 - 練習モード</h2>
            <p className="text-gray-700 mb-4">
              AIが自動で問題を生成します。セクションを選択して、何度でも新しい問題に挑戦できます。<br/>
              <span className="text-sm text-gray-600">※ 結果は記録されません。純粋な練習用です。</span>
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <h3 className="font-bold text-lg mb-3 text-blue-700">📘 3級のセクション</h3>
                <div className="space-y-2">
                  {grade3Sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => handleStartPractice('3級', 'section', section.title, section.description)}
                      className="w-full text-left px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors text-sm"
                    >
                      <div className="font-semibold text-blue-900">{section.title}</div>
                      <div className="text-xs text-gray-600">{section.description}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <h3 className="font-bold text-lg mb-3 text-green-700">📗 4級のセクション</h3>
                <div className="space-y-2">
                  {grade4Sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => handleStartPractice('4級', 'section', section.title, section.description)}
                      className="w-full text-left px-3 py-2 bg-green-50 hover:bg-green-100 rounded border border-green-200 transition-colors text-sm"
                    >
                      <div className="font-semibold text-green-900">{section.title}</div>
                      <div className="text-xs text-gray-600">{section.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="border-t-2 border-purple-300 pt-4">
              <h3 className="font-bold text-lg mb-3 text-purple-700">🎯 模擬試験（全範囲）</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <button
                  onClick={() => handleStartPractice('3級', 'exam')}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-bold transition-all shadow-md hover:shadow-lg"
                >
                  <div className="text-lg">📘 3級 模擬試験</div>
                  <div className="text-xs opacity-90 mt-1">全セクションからバランスよく出題</div>
                </button>
                <button
                  onClick={() => handleStartPractice('4級', 'exam')}
                  className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-bold transition-all shadow-md hover:shadow-lg"
                >
                  <div className="text-lg">📗 4級 模擬試験</div>
                  <div className="text-xs opacity-90 mt-1">全セクションからバランスよく出題</div>
                </button>
              </div>
            </div>
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
                        onClick={() => window.scrollTo(0, 0)}
                        className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-lg text-center hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
                      >
                        <div className="font-bold text-lg mb-1">{set.id}/3</div>
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

          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-3">📌 利用について</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• 各試験は何度でも受験できます</li>
              <li>• すべての問題に回答後、採点と解説を確認できます</li>
              <li>• 3級と4級で難易度と合格ラインが異なります</li>
              <li>• 問題は随時追加予定です</li>
              <li>• AI問題生成モードで練習問題を無限に生成できます</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

