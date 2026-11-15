import test from 'node:test';
import assert from 'node:assert/strict';
import { glossary, matchesTerm } from '../src/data/glossary.js';
import { quizzes, gradeQuiz } from '../src/data/quizzes.js';
import { renderGlossary, renderQuiz } from '../src/lib/learning-view.js';

test('La recherche accepte les accents, les synonymes et plusieurs mots', () => {
  const theta = glossary.find((entry) => entry.slug === 'theta');
  assert.ok(matchesTerm(theta, 'THETA'));
  assert.ok(matchesTerm(theta, '  Thêta   jour  '));
  assert.ok(!matchesTerm(theta, 'thêta boulanger'));
  assert.ok(
    matchesTerm(
      glossary.find((entry) => entry.slug === 'prix-exercice'),
      'strike',
    ),
  );
  assert.equal(new Set(glossary.map((term) => term.slug)).size, glossary.length);
  for (const term of glossary) assert.ok(renderGlossary().includes(`id="${term.slug}"`));
});

test('Chaque module peut être validé et une seule bonne réponse ne suffit pas', () => {
  for (const [id, questions] of Object.entries(quizzes)) {
    const answers = questions.map((q) => q.answer);
    const wrong = questions.map((q) => (q.answer + 1) % q.choices.length);
    assert.equal(gradeQuiz(id, answers).passed, true);
    assert.equal(gradeQuiz(id, [wrong[0], ...answers.slice(1)]).passed, true);
    const review = gradeQuiz(id, [answers[0], ...wrong.slice(1)]);
    assert.equal(review.score, 1);
    assert.equal(review.passed, false);
    assert.ok(renderQuiz(id).includes('Consulter le corrigé'));
  }
  assert.throws(() => gradeQuiz(1, [1, 0]), RangeError);
  assert.throws(() => gradeQuiz(1, [1, null, 2]), RangeError);
});
