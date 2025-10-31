import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getExamRecords, clearAllRecords, getBestScore, type ExamRecord } from '../utils/localStorage';

export default function Home() {
  const [examRecords, setExamRecords] = useState<ExamRecord[]>([]);
  const grade3Exams = [
    {
      id: 'grade3-exam1',
      title: '模擬試験1（中級）',
      description: '推測統計・回帰分析・検定の基礎を総合的に問う30問の試験',
      questions: 30,
      time: 60,
      path: '/grade3/exam1',
      difficulty: '⭐⭐⭐☆☆',
      available: true
    },
    {
      id: 'grade3-exam2',
      title: '模擬試験2（難）',
      description: '多変量解析・高度な検定・機械学習の基礎を含む30問の試験',
      questions: 30,
      time: 60,
      path: '/grade3/exam2',
      difficulty: '⭐⭐⭐⭐☆',
      available: true
    },
    {
      id: 'grade3-exam3',
      title: '模擬試験3（超難）',
      description: 'ベイズ統計・因果推論・機械学習・最先端手法を含む30問の試験',
      questions: 30,
      time: 60,
      path: '/grade3/exam3',
      difficulty: '⭐⭐⭐⭐⭐',
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
    },
    {
      id: 'section2',
      title: 'セクション2: 確率分布',
      description: '離散型・連続型確率分布、正規分布、二項分布',
      sets: [
        { id: 1, path: '/grade3/section2/set1', questions: 10 },
        { id: 2, path: '/grade3/section2/set2', questions: 10 },
        { id: 3, path: '/grade3/section2/set3', questions: 10 }
      ]
    },
    {
      id: 'section3',
      title: 'セクション3: 推測統計の基礎',
      description: '点推定、区間推定、仮説検定の基本',
      sets: [
        { id: 1, path: '/grade3/section3/set1', questions: 10 },
        { id: 2, path: '/grade3/section3/set2', questions: 10 },
        { id: 3, path: '/grade3/section3/set3', questions: 10 }
      ]
    },
    {
      id: 'section4',
      title: 'セクション4: 回帰分析',
      description: '単回帰・重回帰分析、最小二乗法、決定係数',
      sets: [
        { id: 1, path: '/grade3/section4/set1', questions: 10 },
        { id: 2, path: '/grade3/section4/set2', questions: 10 },
        { id: 3, path: '/grade3/section4/set3', questions: 10 }
      ]
    },
    {
      id: 'section5',
      title: 'セクション5: 実験計画法・分散分析',
      description: '一元配置・二元配置分散分析、実験計画法',
      sets: [
        { id: 1, path: '/grade3/section5/set1', questions: 10 },
        { id: 2, path: '/grade3/section5/set2', questions: 10 },
        { id: 3, path: '/grade3/section5/set3', questions: 10 }
      ]
    },
    {
      id: 'section6',
      title: 'セクション6: データ収集・調査法',
      description: '標本抽出法、調査デザイン、バイアス',
      sets: [
        { id: 1, path: '/grade3/section6/set1', questions: 10 },
        { id: 2, path: '/grade3/section6/set2', questions: 10 },
        { id: 3, path: '/grade3/section6/set3', questions: 10 }
      ]
    },
    {
      id: 'section7',
      title: 'セクション7: 時系列分析',
      description: 'トレンド、季節変動、ARIMA、自己相関',
      sets: [
        { id: 1, path: '/grade3/section7/set1', questions: 10 },
        { id: 2, path: '/grade3/section7/set2', questions: 10 },
        { id: 3, path: '/grade3/section7/set3', questions: 10 }
      ]
    },
    {
      id: 'section8',
      title: 'セクション8: 多変量解析',
      description: '主成分分析、因子分析、クラスター分析',
      sets: [
        { id: 1, path: '/grade3/section8/set1', questions: 10 },
        { id: 2, path: '/grade3/section8/set2', questions: 10 },
        { id: 3, path: '/grade3/section8/set3', questions: 10 }
      ]
    },
    {
      id: 'section9',
      title: 'セクション9: 統計的検定の応用',
      description: 'カイ二乗検定、ノンパラメトリック検定、生存時間解析',
      sets: [
        { id: 1, path: '/grade3/section9/set1', questions: 10 },
        { id: 2, path: '/grade3/section9/set2', questions: 10 },
        { id: 3, path: '/grade3/section9/set3', questions: 10 }
      ]
    },
    {
      id: 'section10',
      title: 'セクション10: 応用トピック',
      description: 'ベイズ統計、機械学習の基礎、モデル評価',
      sets: [
        { id: 1, path: '/grade3/section10/set1', questions: 10 },
        { id: 2, path: '/grade3/section10/set2', questions: 10 },
        { id: 3, path: '/grade3/section10/set3', questions: 10 }
      ]
    }
  ];

  const grade4Exams = [
    {
      id: 'grade4-exam1',
      title: '模擬試験1（中級）',
      description: '代表値・散らばり・確率の応用問題を中心とした30問の試験',
      questions: 30,
      time: 60,
      path: '/grade4/exam1',
      difficulty: '⭐⭐⭐☆☆',
      available: true
    },
    {
      id: 'grade4-exam2',
      title: '模擬試験2（難）',
      description: '応用的な統計計算と推測統計の理解を問う30問の試験',
      questions: 30,
      time: 60,
      path: '/grade4/exam2',
      difficulty: '⭐⭐⭐⭐☆',
      available: true
    },
    {
      id: 'grade4-exam3',
      title: '模擬試験3（超難）',
      description: '推測統計・多変量解析・高度な検定手法まで含む30問の試験',
      questions: 30,
      time: 60,
      path: '/grade4/exam3',
      difficulty: '⭐⭐⭐⭐⭐',
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

  useEffect(() => {
    const loadRecords = () => {
      setExamRecords(getExamRecords());
    };
    
    loadRecords();
    
    window.addEventListener('focus', loadRecords);
    
    return () => {
      window.removeEventListener('focus', loadRecords);
    };
  }, []);

  const handleClearRecords = () => {
    if (window.confirm('すべての受験履歴を削除しますか？この操作は取り消せません。')) {
      clearAllRecords();
      setExamRecords([]);
    }
  };

  const getSectionBestScore = (path: string): { score: number; total: number } | null => {
    const match = path.match(/\/(grade\d)\/section(\d+)\/set(\d+)/);
    if (!match) return null;
    
    const [, grade, section, set] = match;
    const records = getExamRecords();
    
    const matchingRecords = records.filter(r => 
      r.examId.startsWith(`${grade}-section${section}_`) && 
      r.examId.endsWith(`_${set}`)
    );
    
    if (matchingRecords.length === 0) return null;
    
    const bestRecord = matchingRecords.reduce((best, current) => 
      current.percentage > best.percentage ? current : best
    );
    
    return { score: bestRecord.score, total: bestRecord.totalQuestions };
  };

  const ExamCard = ({ exam }: { exam: typeof grade3Exams[0] }) => {
    const bestScoreRecord = getBestScore(exam.id);
    
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
          {'difficulty' in exam && <span>🔥 {exam.difficulty}</span>}
        </div>
        {bestScoreRecord !== null && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-gray-700">
              <strong>🏆 最高スコア:</strong> <span className="text-lg font-bold text-yellow-600">{Math.round(bestScoreRecord.percentage)}点</span>
              <span className="text-xs text-gray-600 ml-2">({bestScoreRecord.score}/{bestScoreRecord.totalQuestions})</span>
            </p>
          </div>
        )}
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
  };

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
                    {section.sets.map((set) => {
                      const bestScore = getSectionBestScore(set.path);
                      return (
                        <Link
                          key={set.id}
                          to={set.path}
                          className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-lg text-center hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
                        >
                          <div className="font-bold text-lg mb-1">セット{set.id}</div>
                          <div className="text-xs opacity-90">{set.questions}問</div>
                          {bestScore !== null && (
                            <div className="text-xs mt-2 bg-yellow-400 text-gray-900 rounded px-2 py-1 font-bold">
                              🏆 {bestScore.score}/{bestScore.total}
                            </div>
                          )}
                        </Link>
                      );
                    })}
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
                    {section.sets.map((set) => {
                      const bestScore = getSectionBestScore(set.path);
                      return (
                        <Link
                          key={set.id}
                          to={set.path}
                          className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-lg text-center hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
                        >
                          <div className="font-bold text-lg mb-1">セット{set.id}</div>
                          <div className="text-xs opacity-90">{set.questions}問</div>
                          {bestScore !== null && (
                            <div className="text-xs mt-2 bg-yellow-400 text-gray-900 rounded px-2 py-1 font-bold">
                              🏆 {bestScore.score}/{bestScore.total}
                            </div>
                          )}
                        </Link>
                      );
                    })}
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
              <li>• <strong>受験履歴はブラウザのローカルストレージに保存されます</strong>（ブラウザのキャッシュをクリアすると削除されます）</li>
            </ul>
          </div>

          {examRecords.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">📊 受験履歴</h3>
                <button
                  onClick={handleClearRecords}
                  className="text-sm text-red-600 hover:text-red-800 font-semibold"
                >
                  履歴を削除
                </button>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-sm text-gray-700">
                <strong>💾 データ保存について:</strong> 受験履歴はブラウザのローカルストレージに保存されます。ブラウザのキャッシュクリアやプライベートモードでは保存されません。データは最大100件まで保存され、それ以上は古いものから自動削除されます。
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {examRecords.map((record, index) => (
                  <div
                    key={index}
                    className={`border-2 rounded-lg p-4 ${
                      record.passed
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            record.grade === '3級'
                              ? 'bg-blue-600 text-white'
                              : 'bg-green-600 text-white'
                          }`}>
                            {record.grade}
                          </span>
                          <span className="font-bold text-gray-800">{record.examTitle}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(record.date).toLocaleString('ja-JP', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${
                          record.passed ? 'text-green-600' : 'text-gray-600'
                        }`}>
                          {record.score}/{record.totalQuestions}
                        </div>
                        <div className={`text-sm font-semibold ${
                          record.passed ? 'text-green-600' : 'text-gray-600'
                        }`}>
                          {record.percentage.toFixed(1)}%
                        </div>
                        <div className="text-xs mt-1">
                          {record.passed ? '✅ 合格' : '❌ 不合格'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

