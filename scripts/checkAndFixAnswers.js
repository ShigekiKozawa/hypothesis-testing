/**
 * Audit Grade 3 section questions and fix incorrect `correct` indices
 * when the explanation clearly contains exactly one of the option texts.
 *
 * Heuristics:
 * - Parse each questions block by regex.
 * - Extract options, correct (1-based), and explanation.
 * - If explanation contains exactly one option text literally, and that
 *   option index !== correct, update the index.
 * - Avoid changing when multiple option texts appear or none appear.
 *
 * Limitations:
 * - Regex parsing; assumes code shape similar to generated templates.
 * - Works for both single or double quoted option strings.
 */

import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const TARGET_DIR = path.join(ROOT, 'src', 'components', 'grade3');

/** Find all Section*.tsx files in grade3 directory */
function findSectionFiles() {
  const entries = fs.readdirSync(TARGET_DIR);
  return entries
    .filter((f) => /^Section.*\.tsx$/.test(f))
    .map((f) => path.join(TARGET_DIR, f));
}

/** Extract questions blocks and compute fixes */
function auditFile(filePath) {
  const src = fs.readFileSync(filePath, 'utf8');
  const changes = [];

  // Match blocks: options: [ ... ] ... correct: N ... explanation: "..."
  const questionRegex =
    /options:\s*\[([\s\S]*?)\][\s\S]*?correct:\s*(\d+)[\s\S]*?explanation:\s*(["'`])([\s\S]*?)\3/gm;

  let match;
  while ((match = questionRegex.exec(src)) !== null) {
    const optionsBlock = match[1];
    const currentCorrect = parseInt(match[2], 10);
    const explanation = match[4];

    // Extract option strings from options block
    const optionTexts = [];
    const optionRegex = /(["'`])([\s\S]*?)\1/gm;
    let optMatch;
    while ((optMatch = optionRegex.exec(optionsBlock)) !== null) {
      optionTexts.push(optMatch[2]);
    }
    if (optionTexts.length === 0) continue;

    // Heuristic: which option texts appear literally in the explanation?
    const hits = [];
    optionTexts.forEach((t, idx) => {
      if (!t) return;
      // literal containment (avoid extremely short tokens which may be noisy)
      if (t.length >= 2 && explanation.indexOf(t) !== -1) {
        hits.push(idx + 1); // 1-based index
      }
    });

    if (hits.length === 1) {
      const expected = hits[0];
      if (expected !== currentCorrect) {
        // plan to replace the 'correct: currentCorrect' with new index
        changes.push({
          start: match.index,
          end: questionRegex.lastIndex,
          from: `correct: ${currentCorrect}`,
          to: `correct: ${expected}`,
          currentCorrect,
          expected,
          optionTexts,
          explanation,
        });
      }
    }
  }

  if (changes.length === 0) {
    return { filePath, changed: false, count: 0 };
  }

  // Apply changes from last to first to keep indices valid
  let updated = src;
  for (let i = changes.length - 1; i >= 0; i--) {
    const c = changes[i];
    const segment = updated.slice(c.start, c.end);
    const replaced = segment.replace(c.from, c.to);
    updated = updated.slice(0, c.start) + replaced + updated.slice(c.end);
  }

  fs.writeFileSync(filePath, updated, 'utf8');
  return { filePath, changed: true, count: changes.length };
}

function main() {
  const files = findSectionFiles();
  const results = files.map(auditFile);
  const changed = results.filter((r) => r.changed);

  console.log('Check complete.');
  results.forEach((r) => {
    console.log(`${path.basename(r.filePath)}: ${r.changed ? `fixed ${r.count}` : 'ok'}`);
  });
  console.log(`\nFiles changed: ${changed.length}/${results.length}`);
}

main();


