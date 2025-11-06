const fs = require('fs');
const { glob } = require('glob');

// 全てのセクションファイルを取得
const files = [
  ...glob.sync('src/components/grade3/Section*.tsx'),
  ...glob.sync('src/components/grade4/Section*.tsx')
];

const issues = [];

files.forEach(filepath => {
  const content = fs.readFileSync(filepath, 'utf8');
  
  // questionsの配列部分を抽出
  const questionsMatch = content.match(/const questions = (\[[\s\S]*?\]);/);
  
  if (!questionsMatch) {
    issues.push({
      file: filepath,
      issue: 'questions配列が見つかりません'
    });
    return;
  }
  
  const questionsStr = questionsMatch[1];
  
  // プレースホルダーパターンをチェック
  const placeholderPatterns = [
    /question: ['"`].*問題\d+.*['"`]/,
    /question: ['"`].*に関する問題.*['"`]/,
    /options: \[['"`]選択肢\d/,
    /explanation: ['"`].*基本的な内容.*['"`]/,
    /explanation: ['"`].*の基礎.*['"`]/
  ];
  
  let hasPlaceholder = false;
  placeholderPatterns.forEach(pattern => {
    if (pattern.test(questionsStr)) {
      hasPlaceholder = true;
    }
  });
  
  if (hasPlaceholder) {
    // 具体的な問題をチェック
    const questionMatches = questionsStr.match(/question: ['"`](.*?)['"`]/g);
    if (questionMatches) {
      const firstQuestion = questionMatches[0];
      issues.push({
        file: filepath,
        issue: 'プレースホルダー問題の可能性',
        sample: firstQuestion.substring(0, 100)
      });
    }
  }
});

console.log('🔍 問題チェック結果:\n');

if (issues.length === 0) {
  console.log('✅ 全てのファイルで問題が適切に設定されています！');
} else {
  console.log(`⚠️  ${issues.length}個のファイルに問題の可能性があります:\n`);
  issues.forEach(issue => {
    console.log(`📁 ${issue.file}`);
    console.log(`   ❌ ${issue.issue}`);
    if (issue.sample) {
      console.log(`   📝 サンプル: ${issue.sample}`);
    }
    console.log('');
  });
}

console.log(`\n合計チェックファイル数: ${files.length}`);
