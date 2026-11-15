import { glossary, moduleLabels, normalizeSearch } from '../data/glossary.js';
import { quizzes } from '../data/quizzes.js';

const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/gu,
    (char) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[char],
  );
const icon = (paths) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
const searchIcon = icon('<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>');
const quizIcon = icon(
  '<rect x="4" y="4" width="16" height="17" rx="2"/><path d="M9 4V2h6v2M8 11l2 2 5-5M8 17h8"/>',
);

function renderEntry(entry) {
  return `<details class="dict-entry" data-entry="${entry.slug}" id="${entry.slug}">
    <summary>
      <span class="dict-name">${escapeHtml(entry.term)}</span>
      <span class="dict-category">${escapeHtml(moduleLabels[entry.module])}</span>
      <span class="dict-plus" aria-hidden="true"></span>
    </summary>
    <div class="dict-copy">
      <p>${escapeHtml(entry.definition)}</p>
      <p class="dict-example"><strong>Exemple</strong> ${escapeHtml(entry.example)}</p>
    </div>
  </details>`;
}

export function renderGlossary() {
  const groups = new Map();
  for (const entry of glossary) {
    const letter = normalizeSearch(entry.term)[0].toUpperCase();
    if (!groups.has(letter)) groups.set(letter, []);
    groups.get(letter).push(entry);
  }
  return `<section class="dict" aria-label="Dictionnaire des termes financiers" data-glossary>
    <div class="dict-tools" data-glossary-tools hidden>
      <label class="dict-search">${searchIcon}<span class="learning-sr">Rechercher un terme</span>
        <input type="search" data-glossary-search placeholder="Rechercher un terme, par exemple « prime »" autocomplete="off" spellcheck="false"/>
      </label>
      <label class="dict-filter"><span class="learning-sr">Filtrer par module</span><select data-glossary-filter>
        <option value="">Tous les modules</option>
        ${Object.entries(moduleLabels)
          .map(([id, label]) => `<option value="${id}">${escapeHtml(label)}</option>`)
          .join('')}
      </select></label>
    </div>
    <p class="dict-count" role="status" aria-atomic="true" data-glossary-count>${glossary.length} termes</p>
    <div class="dict-empty" data-glossary-empty hidden>
      <p><strong>Aucun terme trouvé.</strong> Essayez un autre mot ou consultez le glossaire entier.</p>
      <button type="button" class="learn-secondary" data-glossary-reset>Afficher tous les termes</button>
    </div>
    ${Array.from(
      groups,
      ([letter, entries]) => `<section class="dict-group" aria-label="Lettre ${letter}" data-glossary-group>
      <h2 class="dict-letter">${letter}</h2>
      <div class="dict-entries">${entries.map(renderEntry).join('')}</div>
    </section>`,
    ).join('')}
  </section>`;
}

export function renderQuiz(id) {
  const questions = quizzes[id];
  if (!questions) throw new RangeError('Identifiant de quiz inconnu.');
  const scoreNeeded = Math.ceil((questions.length * 2) / 3);
  const questionHtml = questions
    .map(
      (item, index) => `<fieldset class="learn-question" data-question="${index}">
    <legend><span class="learn-question-number">Question ${index + 1}</span>${escapeHtml(item.question)}</legend>
    <div class="learn-options">
      ${item.choices
        .map(
          (choice, choiceIndex) => `<label class="learn-choice" data-choice="${choiceIndex}">
        <input type="radio" name="question-${id}-${index}" value="${choiceIndex}" required/>
        <span class="learn-choice-text">${escapeHtml(choice)}</span>
      </label>`,
        )
        .join('')}
    </div>
    <p class="learn-explanation" data-explanation hidden></p>
  </fieldset>`,
    )
    .join('');
  return `<section class="learn-quiz" aria-labelledby="quiz-title" data-quiz="${id}">
    <div class="learn-quiz-header">
      <span class="learn-quiz-icon">${quizIcon}</span>
      <div><h2 id="quiz-title">Quiz du module</h2>
      <p>${questions.length} questions. ${scoreNeeded} bonnes réponses suffisent pour valider le module.</p></div>
    </div>
    <form data-quiz-form novalidate>
      ${questionHtml}
      <div class="learn-actions">
        <button type="submit" class="learn-submit" data-grade hidden>Vérifier mes réponses <span aria-hidden="true">→</span></button>
        <button type="button" class="learn-secondary" data-retry hidden>Recommencer le quiz</button>
      </div>
      <div class="learn-status" tabindex="-1" data-quiz-status aria-live="polite" aria-atomic="true"></div>
    </form>
    <noscript><details class="learn-fallback"><summary>Consulter le corrigé</summary>
      ${questions.map((item, i) => `<p><strong>${i + 1}. ${escapeHtml(item.choices[item.answer])}</strong> ${escapeHtml(item.explanation)}</p>`).join('')}
    </details><p>L’enregistrement de la progression nécessite JavaScript.</p></noscript>
  </section>`;
}
