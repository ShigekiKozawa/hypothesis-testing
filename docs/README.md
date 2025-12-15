# ドキュメント一覧

この `docs/` ディレクトリには本リポジトリに関する仕様書・ガイド・ルールを整理して格納しています。
日々の開発・試験追加・AI問題生成の中で必要なドキュメントを以下のように分類しています。

## 1. プロジェクトルール
- `docs/PROJECT_RULES.md`：Grade 3 問題生成で絶対に外せない禁止項目・チャートポリシー・検証フローをまとめている中央ルールブック。

## 2. AI問題生成
- `docs/HOW_TO_GENERATE_QUESTIONS.md`：Gemini プロンプトの構成と確認ポイントを記載。最新のプロジェクトルールへのリンク付きで、試験の生成フローを手順化。

## 3. 開発者向けガイド
- `docs/DEVELOPMENT_GUIDE.md`：依存関係・開発サーバー・ビルドなど基本的な開発フロー。
- `docs/REFACTORING_GUIDE.md`：コンポーネント追加・テスト・リファクタリングの際に守るべきベストプラクティス。

## 4. 参考資料
- `docs/API_SECURITY.md`：Gemini API キーの取り扱いとセキュリティ留意点。
- `docs/GRADE3_EXAM_REFERENCE.md` / `docs/GRADE4_EXAM_REFERENCE.md`：級別の出題範囲や構成、知っておくべき基礎情報。
- `docs/GRADE3_SECTION_FILES.md` / `docs/GRADE3_NEW_SECTIONS.md`：Grade 3 のセクションごとの実ファイル・新設セクションを記載。

## 5. ルールの補足
- `.cursor/rules/ai-question-rules.mdc`：AI問題生成における禁止トピック・図表の扱いなど、Gemini へのプロンプトにも参照させる運用ルール。

## 6. 運用メモ
- 変更を加えた際は `scripts/checkAndFixAnswers.js` による `correct`/`explanation` の整合性チェックと、ルール文書の更新を忘れずに実行してください。

