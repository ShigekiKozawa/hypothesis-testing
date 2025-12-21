# LangChain統合設計書：適応的問題生成システム

**最終更新日**: 2025年12月20日

## 📋 目次

1. [概要](#概要)
2. [現状の課題](#現状の課題)
3. [提案するアーキテクチャ](#提案するアーキテクチャ)
4. [技術スタック](#技術スタック)
5. [ローカルストレージによるメモリ管理](#ローカルストレージによるメモリ管理)
6. [LangChainの活用方法](#langchainの活用方法)
7. [実装フェーズ](#実装フェーズ)
8. [ファイル構成](#ファイル構成)

---

## 概要

### 目的

現在のAI問題生成システムを**LangChainエコシステム**に移行し、ユーザーの解答履歴を分析して**苦手なトピックに特化した問題を自動生成**する適応的学習システムを構築します。

### 主要機能

1. **ユーザー解答履歴の追跡**
   - どのセクション・トピックで間違えたか
   - 何回間違えたか
   - 最後に学習した日時

2. **苦手トピックの自動分析**
   - 正答率が低いセクションを特定
   - 繰り返し間違える問題パターンを抽出

3. **適応的問題生成**
   - 苦手なトピックの問題を優先的に生成
   - 難易度調整（正答率に応じて）
   - 類似問題の自動生成

4. **学習進捗の可視化**
   - セクションごとの正答率グラフ
   - 苦手トピックのダッシュボード
   - 学習推奨セクションの提案

---

## 現状の課題

### 1. 問題生成がユーザーに適応していない

- 現状：すべてのユーザーに同じ問題セットを提供
- 課題：ユーザーの習熟度に関係なく、同じ難易度の問題が出題される

### 2. 解答履歴が活用されていない

- 現状：`localStorage`に試験結果が保存されているが、分析されていない
- 課題：どのトピックが苦手かを把握できない

### 3. プロンプト管理が複雑

- 現状：`geminiClient.ts`に1900行以上のプロンプトがハードコード
- 課題：プロンプトの再利用性が低く、メンテナンスが困難

### 4. エラーハンドリングとリトライロジックが不十分

- 現状：単純なリトライロジックのみ
- 課題：APIレート制限や一時的なエラーに対する柔軟な対応ができない

---

## 提案するアーキテクチャ

```
┌─────────────────────────────────────────────────────────────┐
│                        React UI Layer                        │
│  (PracticeMode, ExamLayout, ProgressDashboard)              │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                   LangChain Orchestration                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │PromptTemplate│  │OutputParser  │  │  Chains      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                    User Profile Manager                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  UserProfile (localStorage)                          │   │
│  │  - sectionStats: {sectionId: {correct, total, ...}} │   │
│  │  - weakTopics: [{topic, errorCount, lastAttempt}]   │   │
│  │  - learningHistory: [{date, section, result}]       │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│              Adaptive Question Generator                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  1. Analyze user's weak topics                      │   │
│  │  2. Select priority topics for generation           │   │
│  │  3. Generate questions via LangChain + Gemini       │   │
│  │  4. Validate & format output                        │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                      Gemini API (LLM)                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 技術スタック

### フロントエンド

| 技術 | バージョン | 用途 |
|-----|----------|------|
| **LangChain.js** | `^0.3.x` | LLM統合、プロンプト管理、チェーン構築 |
| **@langchain/google-genai** | `^0.1.x` | Gemini APIとの統合 |
| **Zod** | `^3.x` | 出力バリデーション（Structured Output） |
| **Recharts** | 既存 | 学習進捗の可視化 |
| **React** | 既存 | UI |

### データ管理

| 技術 | 用途 |
|-----|------|
| **LocalStorage** | ユーザープロファイル、解答履歴の永続化 |
| **Zustand** (オプション) | クライアント側の状態管理（userProfile, weakTopics） |

---

## ローカルストレージによるメモリ管理

### データ構造

#### 1. UserProfile

```typescript
interface UserProfile {
  userId: string;  // UUID（初回アクセス時に生成）
  createdAt: string;  // ISO 8601
  lastUpdatedAt: string;
  
  // セクションごとの統計
  sectionStats: {
    [sectionId: string]: {
      totalAttempts: number;
      correctCount: number;
      incorrectCount: number;
      lastAttemptDate: string;
      averageTime: number;  // 秒
    };
  };
  
  // 苦手トピック（正答率が低い）
  weakTopics: Array<{
    topicId: string;
    topicName: string;
    sectionId: string;
    errorCount: number;
    lastErrorDate: string;
    priority: number;  // 1-10（10が最優先）
  }>;
  
  // 学習履歴（直近100件）
  learningHistory: Array<{
    date: string;
    sectionId: string;
    sectionName: string;
    score: number;  // 正答率（0-1）
    timeSpent: number;  // 秒
  }>;
}
```

#### 2. QuestionAttempt（各問題の解答記録）

```typescript
interface QuestionAttempt {
  attemptId: string;  // UUID
  userId: string;
  questionId: number;
  sectionId: string;
  topicId: string;
  userAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
  attemptDate: string;
  timeSpent: number;  // 秒
}
```

### LocalStorageのキー構造

```
localStorage:
  - 'user_profile': JSON.stringify(UserProfile)
  - 'question_attempts': JSON.stringify(QuestionAttempt[])  // 直近1000件
  - 'exam_results': 既存のデータ（後方互換性のため保持）
```

### データ永続化の流れ

```
1. ユーザーが問題に解答
   ↓
2. QuestionAttemptを作成してlocalStorageに保存
   ↓
3. UserProfileを更新（sectionStats, weakTopicsを再計算）
   ↓
4. localStorageに保存
```

---

## LangChainの活用方法

### 1. プロンプトテンプレート管理

現在の課題：`geminiClient.ts`に1900行のプロンプトがハードコード

**LangChainによる改善**：

```typescript
// src/langchain/templates/grade3QuestionTemplate.ts
import { PromptTemplate } from '@langchain/core/prompts';

export const grade3QuestionTemplate = PromptTemplate.fromTemplate(`
# 役割定義
あなたは日本統計学会が主催する「統計検定」の問題作成を20年以上担当している専門家です。

# 作成する問題の条件
- 対象級: {grade}
- 出題範囲: {section}
- 問題数: {count}問

# ユーザーの苦手トピック（優先して出題）
{weakTopics}

# 出題内容の詳細指定
{sectionDescription}

# 問題形式の制約
{formatConstraints}

# JSON出力形式
{formatInstructions}
`);
```

**利点**：
- プロンプトの再利用性が向上
- 変数の差し込みが明確
- テストが容易

### 2. Structured Output（構造化出力）

現在の課題：JSONパースエラー、バリデーションの不備

**LangChainによる改善**：

```typescript
// src/langchain/schemas/questionSchema.ts
import { z } from 'zod';

export const questionSchema = z.object({
  id: z.number().int().min(1),
  question: z.string().min(10),
  options: z.array(z.string()).length(4),
  correct: z.number().int().min(1).max(4),
  explanation: z.string().min(20),
  chartType: z.enum(['scatter', 'line', 'bar', 'histogram', 'boxplot']).optional(),
  chartData: z.array(z.object({
    x: z.number(),
    y: z.number(),
  })).optional(),
  // ...その他のフィールド
});

export type Question = z.infer<typeof questionSchema>;

export const questionsArraySchema = z.array(questionSchema);
```

```typescript
// src/langchain/chains/questionGenerationChain.ts
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { StructuredOutputParser } from '@langchain/core/output_parsers';

const model = new ChatGoogleGenerativeAI({
  modelName: 'gemini-2.0-flash-exp',
  temperature: 0.7,
});

const parser = StructuredOutputParser.fromZodSchema(questionsArraySchema);

const chain = grade3QuestionTemplate.pipe(model).pipe(parser);

// 使用例
const result = await chain.invoke({
  grade: '3級',
  section: 'セクション1',
  count: 10,
  weakTopics: JSON.stringify(userWeakTopics),
  sectionDescription: '...',
  formatConstraints: '...',
  formatInstructions: parser.getFormatInstructions(),
});
```

**利点**：
- Zodスキーマによる厳密なバリデーション
- 型安全性の向上
- パースエラーの自動ハンドリング

### 3. チェーンによる複雑な処理の分割

**例：適応的問題生成チェーン**

```typescript
// src/langchain/chains/adaptiveQuestionChain.ts

// ステップ1: ユーザープロファイル分析
const analyzeUserChain = PromptTemplate.fromTemplate(`
ユーザーの学習履歴:
{learningHistory}

セクション統計:
{sectionStats}

苦手なトピックを3つ選び、優先度をつけてください。
`).pipe(model).pipe(new JsonOutputParser());

// ステップ2: トピック選択
const selectTopicsChain = RunnableSequence.from([
  analyzeUserChain,
  new RunnableLambda({
    func: (analysis) => {
      // 分析結果から優先トピックを抽出
      return {
        priorityTopics: analysis.weakTopics.slice(0, 3),
      };
    },
  }),
]);

// ステップ3: 問題生成
const generateQuestionsChain = RunnableSequence.from([
  selectTopicsChain,
  grade3QuestionTemplate,
  model,
  StructuredOutputParser.fromZodSchema(questionsArraySchema),
]);
```

**利点**：
- 処理の流れが明確
- 各ステップを個別にテスト可能
- エラーハンドリングをステップごとに設定可能

### 4. リトライとエラーハンドリング

現在の課題：単純なリトライロジック、APIエラーへの対応が不十分

**LangChainによる改善**：

```typescript
// src/langchain/utils/retryConfig.ts
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

const modelWithRetry = new ChatGoogleGenerativeAI({
  modelName: 'gemini-2.0-flash-exp',
  temperature: 0.7,
  maxRetries: 3,
  timeout: 180000,  // 3分
  // Exponential backoff
  maxConcurrency: 1,
});
```

LangChainは以下を自動でハンドリング：
- APIレート制限（429エラー）
- 一時的なネットワークエラー（500エラー）
- タイムアウト
- Exponential backoff

---

## 実装フェーズ

### Phase 1: 基盤整備（Week 1）

**目標**: LangChain導入とローカルストレージ設計

#### タスク

1. **依存関係のインストール**
   ```bash
   npm install langchain @langchain/google-genai @langchain/core zod
   ```

2. **ローカルストレージユーティリティの実装**
   - `src/utils/userProfile.ts`
   - `src/utils/questionAttemptLogger.ts`

3. **Zodスキーマの定義**
   - `src/langchain/schemas/questionSchema.ts`
   - `src/langchain/schemas/userProfileSchema.ts`

4. **既存データの移行**
   - `localStorage`の`exam_results`から`UserProfile`を生成

**成果物**:
- ユーザープロファイルの永続化機能
- 解答履歴の追跡機能

### Phase 2: LangChain統合（Week 2-3）

**目標**: プロンプト管理とチェーン構築

#### タスク

1. **プロンプトテンプレートの分割**
   - `src/langchain/templates/grade3QuestionTemplate.ts`
   - `src/langchain/templates/grade4QuestionTemplate.ts`

2. **Structured Output Parserの実装**
   - `src/langchain/parsers/questionParser.ts`

3. **基本チェーンの構築**
   - `src/langchain/chains/questionGenerationChain.ts`

4. **既存の`geminiClient.ts`をLangChainに置き換え**
   - `generateQuestions()`関数を段階的にリファクタリング

**成果物**:
- LangChain統合された問題生成システム
- 旧`geminiClient.ts`のロジックが完全に移行

### Phase 3: 適応的問題生成（Week 4-5）

**目標**: ユーザーの苦手トピックに基づく問題生成

#### タスク

1. **苦手トピック分析ロジックの実装**
   - `src/services/weakTopicAnalyzer.ts`
   - 正答率が60%未満のセクションを「苦手」と判定
   - 直近の解答履歴を重視（exponential decay）

2. **適応的問題生成チェーンの構築**
   - `src/langchain/chains/adaptiveQuestionChain.ts`
   - ユーザーの苦手トピックをプロンプトに組み込む

3. **UIの更新**
   - 「苦手克服モード」ボタンの追加
   - 生成される問題がユーザーの苦手トピックに特化

**成果物**:
- 苦手トピックに特化した問題生成機能
- ユーザーごとにカスタマイズされた学習体験

### Phase 4: 学習進捗の可視化（Week 6）

**目標**: ダッシュボード実装

#### タスク

1. **学習進捗ダッシュボードの作成**
   - `src/pages/ProgressDashboard.tsx`
   - セクションごとの正答率グラフ（Recharts）
   - 苦手トピック一覧
   - 学習推奨セクションの表示

2. **ナビゲーションの追加**
   - トップページに「学習進捗」リンクを追加

**成果物**:
- ユーザーの学習状況を可視化するダッシュボード

### Phase 5: テストと最適化（Week 7）

**目標**: 品質保証とパフォーマンス最適化

#### タスク

1. **ユニットテストの作成**
   - プロンプトテンプレートのテスト
   - パーサーのテスト
   - ユーザープロファイル更新ロジックのテスト

2. **パフォーマンス最適化**
   - LocalStorageのサイズ制限対策（古いデータの削除）
   - チェーンのキャッシング

3. **エラーハンドリングの強化**
   - ネットワークエラー時のフォールバック
   - ユーザーフレンドリーなエラーメッセージ

**成果物**:
- 本番環境に対応した堅牢なシステム

---

## ファイル構成

```
src/
├── langchain/
│   ├── chains/
│   │   ├── questionGenerationChain.ts      # 基本的な問題生成チェーン
│   │   ├── adaptiveQuestionChain.ts        # 適応的問題生成チェーン
│   │   └── index.ts
│   ├── templates/
│   │   ├── grade3QuestionTemplate.ts       # 3級プロンプトテンプレート
│   │   ├── grade4QuestionTemplate.ts       # 4級プロンプトテンプレート
│   │   └── index.ts
│   ├── schemas/
│   │   ├── questionSchema.ts               # 問題のZodスキーマ
│   │   ├── userProfileSchema.ts            # ユーザープロファイルのスキーマ
│   │   └── index.ts
│   ├── parsers/
│   │   ├── questionParser.ts               # Structured Output Parser
│   │   └── index.ts
│   └── utils/
│       ├── retryConfig.ts                  # リトライ設定
│       └── index.ts
├── services/
│   ├── weakTopicAnalyzer.ts                # 苦手トピック分析
│   ├── userProfileManager.ts               # ユーザープロファイル管理
│   └── questionAttemptLogger.ts            # 解答記録
├── pages/
│   ├── Home.tsx
│   ├── ProgressDashboard.tsx               # 学習進捗ダッシュボード（新規）
│   └── ...
├── components/
│   ├── common/
│   │   ├── ExamLayout.tsx
│   │   └── Charts.tsx
│   ├── ProgressChart.tsx                   # 進捗グラフコンポーネント（新規）
│   ├── WeakTopicCard.tsx                   # 苦手トピックカード（新規）
│   └── ...
└── utils/
    ├── userProfile.ts                      # LocalStorage操作（新規）
    ├── questionAttemptLogger.ts            # 解答ログ記録（新規）
    ├── geminiClient.ts                     # 既存（段階的に廃止）
    └── ...
```

---

## 期待される効果

### 1. ユーザー体験の向上

- **個別最適化**: ユーザーの習熟度に合わせた問題が出題される
- **効率的な学習**: 苦手なトピックに集中できる
- **進捗の可視化**: 学習状況が一目で分かる

### 2. 開発生産性の向上

- **プロンプト管理の簡素化**: テンプレート化により再利用性が向上
- **型安全性**: Zodスキーマによる厳密なバリデーション
- **テスタビリティ**: チェーンごとにテスト可能

### 3. システムの堅牢性

- **エラーハンドリング**: LangChainの自動リトライ機能
- **スケーラビリティ**: チェーンの追加が容易

---

## リスクと対策

### リスク1: LocalStorageのサイズ制限

- **リスク**: LocalStorageは5-10MBまで（ブラウザによる）
- **対策**: 
  - 解答履歴は直近1000件のみ保持
  - 古いデータは定期的に削除（6ヶ月以上前）
  - 圧縮（LZ-stringなど）を検討

### リスク2: LangChainのバンドルサイズ増加

- **リスク**: LangChain.jsは大きなライブラリ（~500KB）
- **対策**:
  - 必要なモジュールのみインポート（tree shaking）
  - Code splitting（React.lazy）
  - Viteのビルド最適化

### リスク3: Gemini APIのレート制限

- **リスク**: 無料枠では1分あたり15リクエスト
- **対策**:
  - LangChainの`maxConcurrency: 1`設定
  - キューイングシステムの実装
  - ユーザーへの待機時間表示

---

## 次のアクション

1. **Phase 1の開始**: LocalStorageユーティリティの実装
2. **依存関係のインストール**: LangChain.jsのセットアップ
3. **既存コードの分析**: `geminiClient.ts`の段階的リファクタリング計画

---

**最終更新**: 2025年12月20日  
**設計者**: 統計検定Toppa!開発チーム

