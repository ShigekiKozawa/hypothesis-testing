# API セキュリティとエラーハンドリング

## 📋 概要

このドキュメントでは、Gemini API統合における**セキュリティ対策**、**使用量制限**、**バリデーション**、**エラーハンドリング**の実装詳細を説明します。

## 🚦 API使用量制限

### Gemini 2.5 Pro の制限

| 項目 | 制限値 | 説明 |
|------|--------|------|
| RPM | 2回 | 1分あたりのリクエスト数 |
| TPM | 125,000 | 1分あたりのトークン数 |
| RPD | 50回 | 1日あたりのリクエスト数 |

### ユーザー制限

本アプリケーションでは、公平な利用を確保するため、**1人のユーザーにつき1日10回**までの制限を設けています。

```typescript
const DAILY_LIMIT_PER_USER = 10; // 1日あたり10回
const MINUTE_LIMIT = 2;          // 1分あたり2回
```

### 実装の詳細

**使用履歴の管理** (`src/utils/apiLimiter.ts`)
- LocalStorageに使用履歴を保存
- 日付ごとに使用回数をカウント
- 1分間の使用回数も追跡
- 翌日0時に自動リセット

**主な機能:**

1. **`canMakeRequest()`** - リクエスト可否を判定
   ```typescript
   const limitCheck = canMakeRequest();
   if (!limitCheck.allowed) {
     // 制限エラー処理
   }
   ```

2. **`recordUsage()`** - 使用履歴を記録
   ```typescript
   // 問題生成成功後に記録
   recordUsage();
   ```

3. **`getUsageStats()`** - 使用統計を取得
   ```typescript
   const stats = getUsageStats();
   // stats.today: 今日の使用回数
   // stats.remaining: 残り使用可能回数
   ```

### 制限の種類

| 制限タイプ | 条件 | エラーメッセージ | 対処方法 |
|-----------|------|----------------|---------|
| 日次制限 | 10回/日 | 本日の使用制限に達しました | 翌日0時まで待つ |
| 分次制限 | 2回/分 | 1分あたりの制限に達しました | 60秒待つ |

### UI表示

**使用状況の表示:**
```
📊 本日の使用状況
[使用回数] / 10 回
残り [X] 回

🕐 リセット: 明日0:00 | ⚡ 1分に最大2回まで
```

**制限到達時:**
- ボタンが無効化される
- 「本日の使用制限に達しました」と表示
- 詳細なエラーメッセージと対処方法を提示

### 429エラー（レート制限）への対応

**概要:**
Gemini APIから429エラー（Rate Limit Exceeded）が返された場合、システムは自動的にリトライを試みます。

**実装の詳細:**

1. **エラークラス**
   ```typescript
   export class RateLimitError extends Error {
     constructor(message: string, public retryAfter: number) {
       super(message);
       this.name = 'RateLimitError';
     }
   }
   ```

2. **429エラーの検出**
   - エラーメッセージに「429」「rate limit」「too many requests」が含まれる
   - エラーメッセージに「quota exceeded」が含まれる

3. **自動リトライロジック**
   - 最大3回まで自動リトライ
   - 指数バックオフ（1秒 → 2秒 → 4秒）
   - 429エラーの場合は待機時間を延長（60秒〜300秒）
   - リトライ中は進捗をコンソールに表示

4. **ユーザー通知**
   - 429エラー専用のUI表示（オレンジ色の警告）
   - 待機時間の表示
   - レート制限の説明
   - 適切な対処方法の提示

**エラー表示例:**

```
⚠️ レート制限エラー
APIのレート制限に達しました。1分ほど待ってから再試行してください。

💡 対処方法:
APIのレート制限に達しました。システムが自動的にリトライを試みましたが、
制限を超過しています。数分待ってから再試行してください。

📌 注意:
APIは1分あたり最大2回のリクエスト制限があります。
短時間に複数回実行すると、自動リトライ後も制限に達する場合があります。
```

## 🔒 セキュリティ対策

### 1. APIキーの管理

#### 環境変数による管理（推奨）
```bash
# .env ファイル（gitignoreに追加済み）
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

**使用方法:**
```typescript
const API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || 'fallback_key';
```

#### フォールバックキー
- 開発環境用のフォールバックキーを提供
- 本番環境では必ず環境変数を設定すること

#### セキュリティ上の注意点
⚠️ **クライアントサイドでのAPIキー使用について**
- このアプリはクライアントサイドで動作するため、APIキーはブラウザに露出します
- 本番環境では以下の対策を推奨：
  - サーバーサイドプロキシを使用してAPIキーを隠蔽
  - GCP API制限（HTTPリファラー、IPアドレス制限）を設定
  - 使用量の監視と上限設定

### 2. 入力サニタイゼーション

すべてのユーザー入力とAI応答に対してサニタイゼーションを実施：

```typescript
function sanitizeText(text: string): string {
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // スクリプトタグ除去
    .replace(/<[^>]*>/g, '') // すべてのHTMLタグ除去
    .trim();
}
```

**適用箇所:**
- 問題文
- 選択肢
- 解説

### 3. レート制限

```typescript
const API_TIMEOUT = 60000; // 60秒
const MAX_RETRIES = 3;     // 最大3回リトライ
```

**実装:**
- タイムアウト機能（60秒）
- 指数バックオフによるリトライ（1秒 → 2秒 → 4秒）
- バリデーションエラーはリトライしない

## ✅ バリデーション

### 1. リクエストバリデーション

```typescript
function validateRequest(request: QuestionGenerationRequest): void {
  // 級の検証
  if (!request.grade || (request.grade !== '3級' && request.grade !== '4級')) {
    throw new ValidationError('無効な級です');
  }

  // タイプの検証
  if (!request.type || (request.type !== 'section' && request.type !== 'exam')) {
    throw new ValidationError('無効なタイプです');
  }

  // 問題数の検証
  if (typeof request.count !== 'number' || !Number.isInteger(request.count)) {
    throw new ValidationError('問題数は整数である必要があります');
  }

  if (request.count < MIN_QUESTION_COUNT || request.count > MAX_QUESTION_COUNT) {
    throw new ValidationError(`問題数は${MIN_QUESTION_COUNT}〜${MAX_QUESTION_COUNT}の範囲で指定してください`);
  }

  // セクション必須チェック
  if (request.type === 'section' && !request.section) {
    throw new ValidationError('タイプが"section"の場合、sectionフィールドは必須です');
  }
}
```

**検証項目:**
- ✅ 級: '3級' または '4級'
- ✅ タイプ: 'section' または 'exam'
- ✅ 問題数: 1〜50の整数
- ✅ セクション名: section タイプの場合必須

### 2. レスポンスバリデーション

```typescript
function validateQuestion(question: any, index: number): GeneratedQuestion {
  // 問題IDの検証
  if (typeof question.id !== 'number' || !Number.isInteger(question.id) || question.id < 1) {
    throw new ValidationError(`問題${index + 1}のIDが無効です`);
  }

  // 問題文の検証
  if (typeof question.question !== 'string' || question.question.trim().length === 0) {
    throw new ValidationError(`問題${index + 1}の問題文が無効です`);
  }

  // 選択肢の検証
  if (!Array.isArray(question.options) || question.options.length !== 4) {
    throw new ValidationError(`問題${index + 1}の選択肢は4つである必要があります`);
  }

  for (let i = 0; i < question.options.length; i++) {
    if (typeof question.options[i] !== 'string' || question.options[i].trim().length === 0) {
      throw new ValidationError(`問題${index + 1}の選択肢${i + 1}が無効です`);
    }
  }

  // 正解番号の検証
  if (typeof question.correct !== 'number' || !Number.isInteger(question.correct)) {
    throw new ValidationError(`問題${index + 1}の正解番号が無効です`);
  }

  if (question.correct < 1 || question.correct > 4) {
    throw new ValidationError(`問題${index + 1}の正解番号は1〜4の範囲である必要があります`);
  }

  // 解説の検証
  if (typeof question.explanation !== 'string' || question.explanation.trim().length === 0) {
    throw new ValidationError(`問題${index + 1}の解説が無効です`);
  }

  return {
    id: question.id,
    question: question.question.trim(),
    options: question.options.map((opt: string) => opt.trim()),
    correct: question.correct,
    explanation: question.explanation.trim(),
  };
}
```

**検証項目:**
- ✅ 問題ID: 1以上の整数
- ✅ 問題文: 非空文字列
- ✅ 選択肢: 長さ4の配列、各要素は非空文字列
- ✅ 正解番号: 1〜4の整数
- ✅ 解説: 非空文字列

## 🚨 エラーハンドリング

### 1. カスタムエラークラス

```typescript
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class APIError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'APIError';
  }
}

export class TimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TimeoutError';
  }
}
```

**エラータイプ:**
- `ValidationError`: 入力値またはレスポンスの検証エラー
- `APIError`: API呼び出しエラー（ステータスコード付き）
- `TimeoutError`: タイムアウトエラー

### 2. エラー分類と対処

| エラータイプ | 検出方法 | ユーザーへのメッセージ | 対処方法 |
|------------|---------|---------------------|---------|
| Validation | 入力値チェック | 「無効な○○です」 | 入力を修正 |
| Network | 'network'または'fetch'を含む | 「ネットワークエラー」 | 接続確認 |
| API Key | 'API key'を含む | 「APIキーが無効」 | 設定確認 |
| Quota | 'quota'を含む | 「使用量上限到達」 | 待機 |
| Timeout | タイムアウト検出 | 「処理に時間がかかりすぎ」 | 問題数削減 |
| Unknown | その他 | 「問題の生成に失敗」 | 再試行 |

### 3. リトライロジック

```typescript
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  retries: number = MAX_RETRIES,
  delay: number = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) {
      throw error;
    }

    // ValidationErrorはリトライしない
    if (error instanceof ValidationError) {
      throw error;
    }

    console.warn(`リトライします... 残り${retries}回 (${delay}ms待機)`);
    await new Promise(resolve => setTimeout(resolve, delay));
    return retryWithBackoff(fn, retries - 1, delay * 2); // 指数バックオフ
  }
}
```

**リトライ戦略:**
- 最大3回リトライ
- 指数バックオフ: 1秒 → 2秒 → 4秒
- ValidationErrorは即座に失敗（リトライ不要）

### 4. タイムアウト処理

```typescript
async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  let timeoutHandle: number | undefined;
  
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutHandle = window.setTimeout(() => {
      reject(new TimeoutError(`処理が${timeoutMs / 1000}秒でタイムアウトしました`));
    }, timeoutMs);
  });

  try {
    const result = await Promise.race([promise, timeoutPromise]);
    if (timeoutHandle !== undefined) {
      window.clearTimeout(timeoutHandle);
    }
    return result;
  } catch (error) {
    if (timeoutHandle !== undefined) {
      window.clearTimeout(timeoutHandle);
    }
    throw error;
  }
}
```

## 📊 エラーハンドリングフロー

```
リクエスト受信
    ↓
入力バリデーション
    ├─ エラー → ValidationError → ユーザーに通知
    └─ OK
        ↓
    API呼び出し（タイムアウト60秒）
        ├─ タイムアウト → TimeoutError → リトライまたは通知
        ├─ ネットワークエラー → APIError → リトライ（最大3回）
        ├─ APIエラー → APIError → エラーメッセージ解析 → 適切な通知
        └─ 成功
            ↓
        レスポンス検証
            ├─ JSON抽出失敗 → ValidationError → リトライ
            ├─ パース失敗 → ValidationError → リトライ
            ├─ 問題バリデーション失敗 → ValidationError → リトライ
            └─ 成功
                ↓
            サニタイゼーション
                ↓
            ユーザーに返却
```

## 🎯 ベストプラクティス

### 1. ユーザーへのフィードバック

```typescript
// PracticeMode.tsx での実装例
const getErrorSuggestion = (): string => {
  switch (errorType) {
    case 'validation':
      return '入力内容を確認して、もう一度お試しください。';
    case 'network':
      return 'インターネット接続を確認して、もう一度お試しください。';
    case 'api':
      return 'しばらく待ってから再度お試しいただくか、管理者にお問い合わせください。';
    case 'timeout':
      return '問題数を減らして再度お試しいただくか、しばらく待ってから再試行してください。';
    default:
      return '時間をおいて再度お試しください。問題が続く場合は、問題数を減らしてみてください。';
  }
};
```

### 2. ロギング

```typescript
// エラー発生時は必ずコンソールにログ出力
console.error('問題生成エラー:', error);
console.error('JSONパースエラー:', parseError);
console.warn(`リトライします... 残り${retries}回`);
```

### 3. ユーザー体験の向上

- ローディング表示（スピナーアニメーション）
- 詳細なエラーメッセージと対処方法の提示
- リトライ回数の表示
- 自動リトライによる透過的なエラー処理

## 🔧 環境変数の設定方法

### 開発環境

1. プロジェクトルートに`.env`ファイルを作成
2. 以下の内容を記載:
```bash
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

### 本番環境

1. ホスティングプラットフォームの環境変数設定画面から設定
2. 変数名: `VITE_GEMINI_API_KEY`
3. 値: 本番用APIキー

**Vercel の例:**
```bash
vercel env add VITE_GEMINI_API_KEY production
```

**Netlify の例:**
Site settings → Environment variables → Add variable

## 📝 まとめ

### セキュリティ
- ✅ APIキーの環境変数化
- ✅ 入力サニタイゼーション
- ✅ レート制限とタイムアウト

### バリデーション
- ✅ 入力値の厳密な検証
- ✅ AIレスポンスの詳細な検証
- ✅ 型安全性の確保

### エラーハンドリング
- ✅ カスタムエラークラス
- ✅ エラー分類と適切な通知
- ✅ 自動リトライ機能
- ✅ ユーザーフレンドリーなメッセージ

これらの実装により、堅牢でセキュアなAI問題生成機能が実現されています。

