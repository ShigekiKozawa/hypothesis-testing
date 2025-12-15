# 3級セクション別問題ファイル一覧

## 作成するファイル（14ファイル、140問）

### Section1: 記述統計とグラフ読解（30問）
1. `src/components/grade3/Section1_GraphReading_1.tsx` - ヒストグラムと箱ひげ図（10問）
2. `src/components/grade3/Section1_GraphReading_2.tsx` - 度数分布表と統計量計算（10問）
3. `src/components/grade3/Section1_GraphReading_3.tsx` - 幹葉図と外れ値（10問）

### Section2: 散布図・相関・単回帰分析（30問）
4. `src/components/grade3/Section2_Correlation_1.tsx` - 散布図と相関係数（10問）
5. `src/components/grade3/Section2_Correlation_2.tsx` - 線形単回帰分析（10問）
6. `src/components/grade3/Section2_Correlation_3.tsx` - データ変換と相関（10問）

### Section3: データの変換と統計量（20問）
7. `src/components/grade3/Section3_Transformation_1.tsx` - 1次変換の影響（10問）
8. `src/components/grade3/Section3_Transformation_2.tsx` - 変動係数と比較（10問）

### Section4: 確率と確率分布（20問）
9. `src/components/grade3/Section4_Probability_1.tsx` - 基本的な確率（10問）
10. `src/components/grade3/Section4_Probability_2.tsx` - 二項分布（10問）

### Section5: 推測統計の基礎（20問）
11. `src/components/grade3/Section5_Inference_1.tsx` - 標本分布と信頼区間（10問）
12. `src/components/grade3/Section5_Inference_2.tsx` - 仮説検定の基礎（10問）

### Section6: クロス集計表・実験計画（20問）
13. `src/components/grade3/Section6_CrossTable_1.tsx` - クロス集計表（10問）
14. `src/components/grade3/Section6_CrossTable_2.tsx` - 標本調査と実験計画（10問）

---

## AI問題生成の手順

各ファイルについて、以下の手順で問題を生成してください：

### 1. アプリケーションを起動
```bash
npm run dev
```

### 2. AI問題生成モードを使用
- ホーム画面の「🤖 AI問題生成 - 練習モード」
- 「📘 3級のセクション」から対応するセクションを選択
- 問題数：10問
- 生成開始

### 3. 生成された問題をコピー
- 問題が生成されたら、ブラウザの開発者ツールを開く
- Consoleで生成された問題データを確認
- または、生成された問題を手動でコピー

### 4. Reactコンポーネントとして保存
- テンプレートファイルを使用
- 問題データを配列として貼り付け
- ファイルを保存

---

## 生成時の注意点

### セクション1: 記述統計とグラフ読解
- **必須**: ヒストグラムまたは箱ひげ図を含める
- 中央値、四分位数、平均値の読み取り
- 複数のグラフの比較

### セクション2: 散布図・相関・単回帰分析
- **必須**: 散布図を含める
- 相関係数の推定
- 回帰式から予測値を計算
- **注意**: 重回帰分析は含めない

### セクション3: データの変換と統計量
- 1次変換（ax+b）の影響
- 偏差値の計算
- 変動係数を用いた比較

### セクション4: 確率と確率分布
- 独立事象、条件付き確率
- 二項分布の基本計算
- **注意**: ベイズの定理は含めない

### セクション5: 推測統計の基礎
- 標本分布、信頼区間の計算
- 仮説検定の結果解釈
- **注意**: t検定・F検定・カイ二乗検定の具体的な手順は含めない
- **注意**: 第一種・第二種の過誤は含めない

### Section6: クロス集計表・実験計画
- クロス集計表の読解
- 標本調査の基本概念
- 実験計画の基礎（無作為化、対応のあるデータ）

---

## 次のステップ

1. この手順書を確認
2. 各ファイルのテンプレートを用意
3. AI問題生成で順次作成
4. App.tsxとHome.tsxにルートを追加

