# 統計検定 模擬試験 開発ガイド

## 📁 プロジェクト構造

```
src/
├── components/
│   ├── grade3/           # 統計検定3級の問題
│   │   ├── Exam1.tsx     # 総合模擬試験
│   │   └── Section*.tsx  # セクション別問題（今後追加）
│   └── grade4/           # 統計検定4級の問題
│       ├── Exam1.tsx     # 総合模擬試験
│       ├── Section1_RepresentativeValues_1.tsx  # セクション1 セット1
│       ├── Section1_RepresentativeValues_2.tsx  # セクション1 セット2
│       ├── Section1_RepresentativeValues_3.tsx  # セクション1 セット3
│       ├── Section2_Dispersion_1.tsx            # セクション2 セット1
│       ├── Section2_Dispersion_2.tsx            # セクション2 セット2
│       └── Section2_Dispersion_3.tsx            # セクション2 セット3
├── pages/
│   └── Home.tsx          # トップページ
└── App.tsx               # ルーティング設定
```

## ✅ 現在の完成状況

### 統計検定4級
- **セクション1: データの代表値** - 3セット × 10問 = 30問 ✅
- **セクション2: データの散らばり** - 3セット × 10問 = 30問 ✅
- **合計**: 60問

### 統計検定3級
- **模擬試験1** - 10問 ✅

## 🔧 新しいセクションの追加方法

### ステップ1: 問題セットファイルの作成

新しいセクションを追加する場合、以下のパターンでファイルを作成します：

```typescript
// src/components/grade4/Section3_YourTopic_1.tsx

import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Grade4Section3Set1() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 1,
      question: "問題文をここに記載",
      options: ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
      correct: 1, // 正解の選択肢番号（1-4）
      explanation: "解説をここに記載"
    },
    // ... 10問分追加
  ];

  // 以下のコードは既存のセクションファイルからコピー
  // ...
}
```

### ステップ2: ルーティングの追加

`src/App.tsx` にインポートとルートを追加：

```typescript
// インポート
import Grade4Section3Set1 from './components/grade4/Section3_YourTopic_1';
import Grade4Section3Set2 from './components/grade4/Section3_YourTopic_2';
import Grade4Section3Set3 from './components/grade4/Section3_YourTopic_3';

// Routes内に追加
<Route path="/grade4/section3/set1" element={<Grade4Section3Set1 />} />
<Route path="/grade4/section3/set2" element={<Grade4Section3Set2 />} />
<Route path="/grade4/section3/set3" element={<Grade4Section3Set3 />} />
```

### ステップ3: ホームページの更新

`src/pages/Home.tsx` の `grade4Sections` 配列に追加：

```typescript
const grade4Sections = [
  // 既存のセクション...
  {
    id: 'section3',
    title: 'セクション3: あなたのトピック',
    description: '説明文',
    sets: [
      { id: 1, path: '/grade4/section3/set1', questions: 10 },
      { id: 2, path: '/grade4/section3/set2', questions: 10 },
      { id: 3, path: '/grade4/section3/set3', questions: 10 }
    ]
  }
];
```

## 📋 推奨される4級のセクション構成

1. ✅ **データの代表値** - 平均値、中央値、最頻値
2. ✅ **データの散らばり** - 範囲、四分位範囲
3. ⏳ **度数分布表** - 度数、階級、相対度数
4. ⏳ **グラフの読み取り** - 棒グラフ、円グラフ、折れ線グラフ
5. ⏳ **箱ひげ図** - 読み取り、作成方法
6. ⏳ **母集団と標本** - 標本調査、全数調査
7. ⏳ **確率の基礎** - 基本的な確率計算
8. ⏳ **クロス集計表** - 2変数のデータ分析
9. ⏳ **相対度数と累積度数** - 度数分布の応用
10. ⏳ **データの収集方法** - 無作為抽出、調査方法

## 📈 推奨される3級のセクション構成

1. ⏳ **標準偏差と分散** - データの散らばりの定量化
2. ⏳ **散布図と相関** - 2変数の関係性
3. ⏳ **回帰分析** - 回帰直線、決定係数
4. ⏳ **確率分布** - 正規分布、二項分布
5. ⏳ **標本分布** - 標本平均の分布
6. ⏳ **推定と信頼区間** - 点推定、区間推定
7. ⏳ **仮説検定の基礎** - 帰無仮説、対立仮説、p値
8. ⏳ **クロス集計と独立性** - カイ二乗検定
9. ⏳ **データの標準化** - 標準化、偏差値
10. ⏳ **統計的推測の応用** - 実践問題

## 🎨 グラフを含む問題の作成方法

Rechartsライブラリを使用してグラフを表示できます：

```typescript
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const barData = [
  { subject: '国語', score: 75 },
  { subject: '数学', score: 82 }
];

// 問題オブジェクトに追加
{
  id: 1,
  question: "グラフを見て答えなさい",
  type: "bar" as const,
  data: barData,
  options: [...],
  correct: 1,
  explanation: "..."
}

// JSX内で表示
{q.type === 'bar' && q.data && (
  <ResponsiveContainer width="100%" height={250}>
    <BarChart data={q.data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="subject" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="score" fill="#10b981" />
    </BarChart>
  </ResponsiveContainer>
)}
```

## 🚀 デプロイ

GitHub Pagesへのデプロイは自動化されています：

1. `main` ブランチにプッシュ
2. GitHub Actionsが自動的にビルド＆デプロイ
3. https://shigekikozawa.github.io/hypothesis-testing/ で公開

## 💡 ベストプラクティス

### 問題作成
- 各問題は独立して理解できる内容にする
- 解説は丁寧に、式や計算過程を含める
- 選択肢は明確に区別できるようにする
- 引っかけ問題は避け、理解度を測る問題にする

### コード
- ファイル名は統一されたパターンに従う
- 既存のコンポーネントをテンプレートとして使用
- コメントは不要（ユーザールールに従う）

### UI/UX
- セット番号（セット1/3など）を明示
- 進捗状況を視覚的に表示
- モバイル対応を考慮したレイアウト

## 📝 今後の拡張予定

1. セクション3以降の問題セット作成（4級）
2. 3級のセクション別問題セット作成
3. 解説にさらに詳細な図解を追加
4. 学習履歴の保存機能
5. 問題のランダム出題機能
6. タイマー機能の追加

## 🔗 参考リンク

- [統計検定公式サイト](https://www.toukei-kentei.jp/)
- [React Router Documentation](https://reactrouter.com/)
- [Recharts Documentation](https://recharts.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

