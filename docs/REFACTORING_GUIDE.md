# コンポーネント共通化ガイド

## 概要

全60個のセクションコンポーネントで重複していたコードを、カスタムフックと共通UIコンポーネントとして抽出し、コードの再利用性とメンテナンス性を向上させました。

## 📁 新しいファイル構成

```
src/
├── hooks/
│   └── useExam.ts              # 試験のロジックを管理するカスタムフック
├── components/
│   └── common/
│       └── ExamLayout.tsx      # 共通UIコンポーネント
└── components/
    ├── grade3/
    │   └── Section*.tsx        # 簡潔になったコンポーネント
    └── grade4/
        └── Section*.tsx        # 簡潔になったコンポーネント
```

## 🎯 共通化された機能

### 1. カスタムフック `useExam`

**場所**: `src/hooks/useExam.ts`

**提供する機能**:
- 状態管理（answers, showResult, currentQuestionIndex, bestScore）
- 回答処理（handleAnswer）
- スコア計算（calculateScore）
- 提出処理（handleSubmit）
- リセット処理（resetExam）
- ナビゲーション（handleNext, handlePrevious）
- ベストスコアの読み込み

**使用方法**:
```typescript
const {
  answers,
  showResult,
  currentQuestionIndex,
  bestScore,
  handleAnswer,
  calculateScore,
  handleSubmit,
  resetExam,
  handleNext,
  handlePrevious,
} = useExam({
  examId: 'grade4-section1_set1',
  examTitle: '4級 Section1 セット1',
  grade: '4級',
  questions,
});
```

### 2. 共通UIコンポーネント

**場所**: `src/components/common/ExamLayout.tsx`

**提供するコンポーネント**:

#### `ExamLayout`
- 試験画面の基本レイアウト
- ヘッダー、タイトル、ベストスコア表示
- 戻るボタン

#### `ResultScreen`
- 結果画面のレイアウト
- スコア表示
- 合格/不合格判定
- 詳細な解答と解説
- リセットボタン

#### `QuestionCard`
- 問題カード
- 選択肢
- ナビゲーションボタン
- 進捗インジケーター

## 📝 変換前後の比較

### 変換前（約200行）

```typescript
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveExamRecord, getBestScore } from '../../utils/localStorage';

export default function Grade4Section1Set1() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const questions = [ /* ... */ ];

  useEffect(() => {
    const best = getBestScore('grade4-section1_set1');
    if (best) {
      setBestScore(best.percentage);
    }
  }, []);

  const handleAnswer = (questionId: number, answer: number) => {
    // ...
  };

  const calculateScore = () => {
    // ...
  };

  const handleSubmit = () => {
    // ... 長い処理
  };

  const resetExam = () => {
    // ...
  };

  // ... 約150行のJSX
}
```

### 変換後（約70行）

```typescript
import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function Grade4Section1Set1() {
  const questions: Question[] = [ /* ... */ ];

  const {
    answers,
    showResult,
    currentQuestionIndex,
    bestScore,
    handleAnswer,
    calculateScore,
    handleSubmit,
    resetExam,
    handleNext,
    handlePrevious,
  } = useExam({
    examId: 'grade4-section1_set1',
    examTitle: '4級 Section1 セット1',
    grade: '4級',
    questions,
  });

  if (showResult) {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;

    return (
      <ResultScreen
        score={score}
        totalQuestions={questions.length}
        percentage={percentage}
        questions={questions}
        answers={answers}
        onReset={resetExam}
        backLink="/grade4"
      />
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <ExamLayout
      title="📊 4級 Section1 セット1"
      backLink="/grade4"
      bestScore={bestScore}
    >
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
```

## 🚀 マイグレーション手順

### オプション1: 手動でサンプルを確認

1. サンプルファイルを確認:
   ```bash
   cat src/components/grade4/Section1_RepresentativeValues_1_new.tsx
   ```

2. 動作を確認して、気に入ったら既存ファイルに適用

### オプション2: 自動マイグレーション

1. マイグレーションスクリプトを実行:
   ```bash
   python3 migrate_to_common.py
   ```

2. ビルドして確認:
   ```bash
   npm run build
   ```

3. 動作確認後、バックアップファイルを削除:
   ```bash
   find src/components -name "*.tsx.bak" -delete
   ```

## ✨ メリット

1. **コードの削減**: 各ファイルが約200行→70行に（65%削減）
2. **保守性向上**: ロジックが1箇所に集約され、修正が容易
3. **一貫性**: 全てのセクションで同じUI/UX
4. **型安全性**: TypeScriptの型定義により、エラーを防止
5. **テスト容易性**: フックとコンポーネントを個別にテスト可能

## 📊 統計

- **変換前**: 約12,000行（60ファイル × 200行）
- **変換後**: 約4,200行（60ファイル × 70行）
- **削減**: 約7,800行（65%削減）

## 🔧 カスタマイズ

### 新しいセクションを追加する場合

```typescript
import { useExam, Question } from '../../hooks/useExam';
import { ExamLayout, ResultScreen, QuestionCard } from '../common/ExamLayout';

export default function NewSection() {
  const questions: Question[] = [
    {
      id: 1,
      question: "問題文",
      options: ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
      correct: 1,
      explanation: "解説"
    },
    // ... more questions
  ];

  const exam = useExam({
    examId: 'unique-exam-id',
    examTitle: '表示するタイトル',
    grade: '3級', // または '4級'
    questions,
  });

  // 標準的なパターンに従う
  if (exam.showResult) {
    return <ResultScreen {...exam} backLink="/grade3" />;
  }

  return (
    <ExamLayout title="タイトル" backLink="/grade3" bestScore={exam.bestScore}>
      <QuestionCard
        question={questions[exam.currentQuestionIndex]}
        questionIndex={exam.currentQuestionIndex}
        totalQuestions={questions.length}
        userAnswer={exam.answers[questions[exam.currentQuestionIndex].id]}
        onAnswer={exam.handleAnswer}
        onPrevious={exam.handlePrevious}
        onNext={exam.handleNext}
        onSubmit={exam.handleSubmit}
      />
    </ExamLayout>
  );
}
```

## 📚 参考

- React Hooks: https://react.dev/reference/react
- Custom Hooks: https://react.dev/learn/reusing-logic-with-custom-hooks
- TypeScript: https://www.typescriptlang.org/

