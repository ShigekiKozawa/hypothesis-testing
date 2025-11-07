# 統計検定 模擬試験

統計検定3級・4級の試験対策用の模擬試験Webアプリケーションです。

## 機能

- 統計検定3級・4級の模擬試験
- 級ごとに試験を管理・選択可能
- ヒストグラムや散布図などのグラフを含む問題
- 採点機能と詳細な解説
- レスポンシブデザイン対応

## 開発環境のセットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local` ファイルを作成し、Gemini API キーを設定してください：

```bash
cp .env.example .env.local
```

`.env.local` を編集：

```
VITE_GEMINI_API_KEY=your_api_key_here
```

**APIキーの取得方法：**
1. [Google AI Studio](https://aistudio.google.com/) にアクセス
2. 「Get API key」から新しいAPIキーを作成
3. 開発用には `localhost` からの使用を許可する制限付きキーを作成することを推奨

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:5173 にアクセスしてください。

## ビルド

```bash
npm run build
```

## GitHub Pagesへのデプロイ

### GitHub Secrets の設定（初回のみ）

1. GitHubリポジトリの Settings → Secrets and variables → Actions
2. 「New repository secret」をクリック
3. 以下を設定：
   - **Name**: `VITE_GEMINI_API_KEY`
   - **Value**: 本番用のAPIキー（GitHub Pages用に制限されたキー）

### デプロイ

`main` ブランチにプッシュすると、GitHub Actionsが自動的にビルド・デプロイします。

**注意**: 本番用APIキーには必ず以下の制限を設定してください：
- HTTPリファラー制限: `https://yourusername.github.io/*`
- API制限: Generative Language API のみ

## 技術スタック

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Recharts (グラフ表示)
- React Router (ルーティング)

## ディレクトリ構成

```
src/
  ├── components/
  │   ├── grade3/         # 統計検定3級の試験
  │   │   └── Exam1.tsx   # 3級 模擬試験1
  │   └── grade4/         # 統計検定4級の試験
  ├── pages/
  │   └── Home.tsx        # トップページ（級・試験選択）
  ├── App.tsx             # ルーティング設定
  ├── main.tsx            # エントリーポイント
  └── index.css           # グローバルスタイル
```

## 新しい試験の追加方法

### 3級の試験を追加する場合
1. `src/components/grade3/Exam2.tsx` を作成
2. `src/App.tsx` にルートを追加: `<Route path="/grade3/exam2" element={<Grade3Exam2 />} />`
3. `src/pages/Home.tsx` の `grade3Exams` 配列に試験情報を追加

### 4級の試験を追加する場合
1. `src/components/grade4/Exam1.tsx` を作成
2. `src/App.tsx` にルートを追加: `<Route path="/grade4/exam1" element={<Grade4Exam1 />} />`
3. `src/pages/Home.tsx` の `grade4Exams` 配列に試験情報を追加

