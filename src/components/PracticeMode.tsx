import { useState, useEffect } from 'react';
import { generateQuestions, GeneratedQuestion } from '../utils/geminiClient';
import { ExamLayout, QuestionCard } from './common/ExamLayout';
import { 
  canMakeRequest, 
  recordUsage, 
  getUsageStats,
  LIMITS 
} from '../utils/apiLimiter';

interface PracticeModeProps {
  grade: '3級' | '4級';
  type: 'section' | 'exam';
  section?: string;
  sectionDescription?: string;
  onBack: () => void;
}

export default function PracticeMode({ grade, type, section, sectionDescription, onBack }: PracticeModeProps) {
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<'validation' | 'network' | 'api' | 'timeout' | 'unknown' | 'limit' | 'ratelimit' | null>(null);
  const [questionCount, setQuestionCount] = useState(type === 'exam' ? 30 : 10);
  const [retryCount, setRetryCount] = useState(0);
  const [usageStats, setUsageStats] = useState(getUsageStats());

  useEffect(() => {
    const interval = setInterval(() => {
      setUsageStats(getUsageStats());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setErrorType(null);
    
    try {
      const limitCheck = canMakeRequest();
      if (!limitCheck.allowed) {
        setErrorType('limit');
        throw new Error(limitCheck.reason || '使用制限に達しました。');
      }

      if (questionCount < 1 || questionCount > 50) {
        throw new Error('問題数は1〜50の範囲で指定してください。');
      }

      const generatedQuestions = await generateQuestions({
        grade,
        type,
        section,
        sectionDescription,
        count: questionCount,
      });
      
      if (!generatedQuestions || generatedQuestions.length === 0) {
        throw new Error('問題が生成されませんでした。もう一度お試しください。');
      }
      
      recordUsage();
      setUsageStats(getUsageStats());
      
      setQuestions(generatedQuestions);
      setIsStarted(true);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setShowResult(false);
      setRetryCount(0);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error('問題生成エラー:', err);
      
      let errorMessage = '問題の生成に失敗しました。';
      let errorCategory: typeof errorType = 'unknown';
      
      if (err instanceof Error) {
        errorMessage = err.message;
        
        if (err.message.includes('無効') || err.message.includes('範囲')) {
          errorCategory = 'validation';
        } else if (err.message.includes('レート制限') || err.message.includes('429')) {
          errorCategory = 'ratelimit';
        } else if (err.message.includes('ネットワーク') || err.message.includes('接続')) {
          errorCategory = 'network';
        } else if (err.message.includes('API') || err.message.includes('キー') || err.message.includes('上限')) {
          errorCategory = 'api';
        } else if (err.message.includes('タイムアウト') || err.message.includes('時間')) {
          errorCategory = 'timeout';
        }
      }
      
      setError(errorMessage);
      setErrorType(errorCategory);
      setRetryCount(prev => prev + 1);
    } finally {
      setIsGenerating(false);
    }
  };

  const getErrorSuggestion = (): string => {
    switch (errorType) {
      case 'validation':
        return '入力内容を確認して、もう一度お試しください。';
      case 'ratelimit':
        return 'APIのレート制限に達しました。システムが自動的にリトライを試みましたが、制限を超過しています。数分待ってから再試行してください。';
      case 'network':
        return 'インターネット接続を確認して、もう一度お試しください。';
      case 'api':
        return 'しばらく待ってから再度お試しいただくか、管理者にお問い合わせください。';
      case 'timeout':
        return '問題数を減らして再度お試しいただくか、しばらく待ってから再試行してください。';
      case 'limit':
        return usageStats.today >= LIMITS.DAILY_LIMIT_PER_USER
          ? '明日0時にリセットされます。それまでお待ちください。'
          : '1分間お待ちいただいてから、再度お試しください。';
      default:
        return '時間をおいて再度お試しください。問題が続く場合は、問題数を減らしてみてください。';
    }
  };

  const handleAnswer = (questionId: number, answer: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      alert('すべての問題に回答してください。');
      return;
    }
    setShowResult(true);
    window.scrollTo(0, 0);
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

  const resetPractice = () => {
    setIsStarted(false);
    setQuestions([]);
    setAnswers({});
    setShowResult(false);
    setCurrentQuestionIndex(0);
  };

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
              🤖 AI問題生成 - 練習モード
            </h1>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">選択中の範囲</h2>
              <p className="text-lg"><strong>級:</strong> {grade}</p>
              {type === 'section' ? (
                <>
                  <p className="text-lg"><strong>セクション:</strong> {section}</p>
                  <p className="text-gray-600 mt-2">{sectionDescription}</p>
                </>
              ) : (
                <>
                  <p className="text-lg"><strong>試験形式:</strong> 模擬試験（全範囲）</p>
                  <p className="text-gray-600 mt-2">全セクションからバランスよく出題されます</p>
                </>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                問題数を選択:
              </label>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {type === 'section' ? (
                  <>
                    <option value={5}>5問</option>
                    <option value={10}>10問</option>
                    <option value={15}>15問</option>
                    <option value={20}>20問</option>
                    <option value={30}>30問</option>
                  </>
                ) : (
                  <>
                    <option value={10}>10問（軽めの練習）</option>
                    <option value={20}>20問</option>
                    <option value={30}>30問（本番形式）</option>
                  </>
                )}
              </select>
            </div>

            {error && (
              <div className={`border-2 rounded-lg p-6 mb-6 ${
                errorType === 'ratelimit' 
                  ? 'bg-orange-50 border-orange-300' 
                  : 'bg-red-50 border-red-300'
              }`}>
                <div className="flex items-start">
                  <span className="text-3xl mr-3">
                    {errorType === 'ratelimit' ? '⚠️' : '❌'}
                  </span>
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold mb-2 ${
                      errorType === 'ratelimit' ? 'text-orange-900' : 'text-red-900'
                    }`}>
                      {errorType === 'ratelimit' ? 'レート制限エラー' : 'エラーが発生しました'}
                    </h3>
                    <p className={`mb-3 ${
                      errorType === 'ratelimit' ? 'text-orange-800' : 'text-red-800'
                    }`}>
                      {error}
                    </p>
                    <p className={`text-sm rounded p-3 mb-3 ${
                      errorType === 'ratelimit' 
                        ? 'text-orange-700 bg-orange-100' 
                        : 'text-red-700 bg-red-100'
                    }`}>
                      <strong>💡 対処方法:</strong> {getErrorSuggestion()}
                    </p>
                    {errorType === 'ratelimit' && (
                      <div className="bg-yellow-100 border border-yellow-300 rounded p-3 mb-3">
                        <p className="text-sm text-yellow-800">
                          <strong>📌 注意:</strong> APIは1分あたり最大2回のリクエスト制限があります。
                          短時間に複数回実行すると、自動リトライ後も制限に達する場合があります。
                        </p>
                      </div>
                    )}
                    {retryCount > 0 && (
                      <p className="text-xs text-gray-600">
                        試行回数: {retryCount}回
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-900">📊 本日の使用状況</p>
                  <p className="text-lg font-bold text-blue-700 mt-1">
                    {usageStats.today} / {LIMITS.DAILY_LIMIT_PER_USER} 回
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600">残り</p>
                  <p className="text-2xl font-bold text-green-600">{usageStats.remaining}</p>
                  <p className="text-xs text-gray-600">回</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-blue-300">
                <p className="text-xs text-gray-700">
                  🕐 リセット: 明日0:00 | ⚡ 1分に最大{LIMITS.MINUTE_LIMIT}回まで
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                <strong>⚠️ 注意:</strong> この機能はAIが自動生成する問題です。
                問題の難易度や正確性が実際の試験と異なる場合があります。
                また、生成には10〜30秒程度かかります。
              </p>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || usageStats.remaining === 0}
              className={`w-full font-bold py-4 px-8 rounded-lg transition duration-200 ${
                usageStats.remaining === 0
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed'
              }`}
            >
              {isGenerating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  問題を生成中...
                </span>
              ) : usageStats.remaining === 0 ? (
                '本日の使用制限に達しました'
              ) : (
                '問題を生成して開始'
              )}
            </button>

            <button
              onClick={onBack}
              className="w-full mt-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200"
            >
              ← 戻る
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;
    const passed = percentage >= (grade === '4級' ? 60 : 65);

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              📊 結果
            </h1>
            
            <div className={`p-6 rounded-lg text-center mb-6 ${passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <p className="text-2xl font-semibold">
                {passed ? '合格おめでとうございます！' : '残念、不合格です。もう一度挑戦しましょう！'}
              </p>
              <p className="text-xl mt-2">
                スコア: {score} / {questions.length} 問
              </p>
              <p className="text-3xl font-bold mt-4">
                正答率: {percentage.toFixed(1)}%
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                <strong>💡 ヒント:</strong> この結果は記録されません。
                何度でも挑戦して理解を深めましょう！
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">解答と解説</h2>
            
            <div className="space-y-6">
              {questions.map((q, index) => {
                const userAnswer = answers[q.id];
                const isCorrect = userAnswer === q.correct;
                
                return (
                  <div key={q.id} className={`border-2 rounded-lg p-6 ${isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                    <div className="flex items-center mb-2">
                      <span className={`text-2xl mr-2`}>
                        {isCorrect ? '✅' : '❌'}
                      </span>
                      <h3 className="text-lg font-bold">問 {index + 1}</h3>
                    </div>
                    
                    <p className="text-gray-900 mb-4 whitespace-pre-wrap">{q.question}</p>
                    
                    <div className="space-y-2 mb-4">
                      {q.options.map((option, optIndex) => {
                        const optNum = optIndex + 1;
                        const isUserAnswer = userAnswer === optNum;
                        const isCorrectAnswer = q.correct === optNum;
                        
                        let bgColor = 'bg-gray-100';
                        if (isCorrectAnswer) bgColor = 'bg-green-200';
                        else if (isUserAnswer && !isCorrect) bgColor = 'bg-red-200';
                        
                        return (
                          <div key={optIndex} className={`p-3 rounded ${bgColor}`}>
                            <span className="font-semibold">{optNum}.</span> {option}
                            {isCorrectAnswer && <span className="ml-2 text-green-700 font-bold">✓ 正解</span>}
                            {isUserAnswer && !isCorrect && <span className="ml-2 text-red-700 font-bold">あなたの回答</span>}
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded p-4">
                      <p className="font-semibold text-blue-900 mb-1">📝 解説:</p>
                      <p className="text-gray-700">{q.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4 justify-center mt-8">
              <button
                onClick={resetPractice}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200"
              >
                新しい問題を生成
              </button>
              <button
                onClick={onBack}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200"
              >
                戻る
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <ExamLayout
      title={`🤖 AI問題 - ${grade} ${type === 'exam' ? '模擬試験' : section}`}
      backLink="/"
      bestScore={null}
    >
      <div className="mb-6">
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-700">
            <strong>練習モード:</strong> この結果は記録されません | <strong>問題数:</strong> {questions.length}問
          </p>
        </div>
      </div>

      <QuestionCard
        question={currentQuestion}
        questionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        userAnswer={answers[currentQuestion.id]}
        onAnswer={handleAnswer}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
      />
    </ExamLayout>
  );
}

