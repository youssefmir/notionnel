import { glossary, matchesTerm } from '../data/glossary.js';
import { quizzes, gradeQuiz } from '../data/quizzes.js';

export const PROGRESS_KEY = 'atelier-des-derives:progress:v1';
const knownIds = Object.keys(quizzes).map(Number);
const bySlug = new Map(glossary.map((entry) => [entry.slug, entry]));
const sessionCompleted = new Set();

function parseCompleted(raw) {
  try {
    const ids = JSON.parse(raw);
    return Array.isArray(ids) ? ids.filter((id) => knownIds.includes(id)) : [];
  } catch {
    return [];
  }
}

function storedCompleted() {
  try {
    return parseCompleted(window.localStorage.getItem(PROGRESS_KEY));
  } catch {
    return [];
  }
}

export function getCompleted() {
  return [...new Set([...storedCompleted(), ...sessionCompleted])].sort((a, b) => a - b);
}

function syncProgress() {
  const completed = getCompleted();
  const percent = Math.round((completed.length / knownIds.length) * 100);
  for (const meter of document.querySelectorAll('[data-progress-bar]')) {
    meter.style.width = percent + '%';
    (meter.closest('[role="progressbar"]') ?? meter).setAttribute('aria-valuenow', String(percent));
  }
  for (const count of document.querySelectorAll('[data-progress-count]'))
    count.textContent = String(completed.length);
  for (const label of document.querySelectorAll('[data-progress-percent]'))
    label.textContent = percent + ' %';
  for (const item of document.querySelectorAll('[data-module-id]')) {
    item.classList.toggle('is-complete', completed.includes(Number(item.dataset.moduleId)));
  }
  for (const mark of document.querySelectorAll('[data-completion-mark]')) {
    mark.hidden = !completed.includes(Number(mark.dataset.completionMark));
  }
  document.dispatchEvent(new CustomEvent('atelier:progress', { detail: { completed } }));
}

function completeModule(id) {
  sessionCompleted.add(id);
  let saved = true;
  try {
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(getCompleted()));
  } catch {
    saved = false;
  }
  syncProgress();
  return saved;
}

function initQuiz(root) {
  const id = Number(root.dataset.quiz);
  const questions = quizzes[id];
  const form = root.querySelector('[data-quiz-form]');
  const submit = form.querySelector('[data-grade]');
  const retry = form.querySelector('[data-retry]');
  const status = form.querySelector('[data-quiz-status]');
  const blocks = [...form.querySelectorAll('[data-question]')];
  submit.hidden = false;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (submit.hidden) return;
    const missing = blocks.find((block) => !block.querySelector('input:checked'));
    if (missing) {
      const number = Number(missing.dataset.question) + 1;
      status.textContent = 'Choisissez une réponse à la question ' + number + ' pour obtenir le corrigé.';
      status.dataset.state = 'error';
      missing.querySelector('input').focus();
      return;
    }
    const answers = blocks.map((block) => Number(block.querySelector('input:checked').value));
    const result = gradeQuiz(id, answers);
    blocks.forEach((block, index) => {
      const item = questions[index];
      for (const label of block.querySelectorAll('[data-choice]')) {
        const choice = Number(label.dataset.choice);
        const input = label.querySelector('input');
        input.disabled = true;
        if (choice === item.answer || choice === answers[index]) {
          const correct = choice === item.answer;
          label.dataset.mark = correct ? 'correct' : 'incorrect';
          const mark = document.createElement('small');
          mark.className = 'learn-mark';
          mark.textContent = correct ? 'Bonne réponse' : 'Votre réponse';
          label.append(mark);
        }
      }
      const explanation = block.querySelector('[data-explanation]');
      explanation.textContent = (result.correct[index] ? 'Exact. ' : 'Correction. ') + item.explanation;
      explanation.hidden = false;
    });
    submit.hidden = true;
    retry.hidden = false;
    const score = `${result.score} / ${result.total}. `;
    if (result.passed) {
      const saved = completeModule(id);
      status.textContent =
        score +
        (saved
          ? 'Module validé. Votre progression est enregistrée dans ce navigateur.'
          : 'Module validé pour cette page. Le navigateur a refusé d’enregistrer votre progression.');
      status.dataset.state = 'success';
    } else {
      status.textContent = score + 'Relisez les explications, puis réessayez.';
      status.dataset.state = 'review';
    }
    status.focus({ preventScroll: true });
  });

  retry.addEventListener('click', () => {
    form.reset();
    for (const input of form.querySelectorAll('input')) input.disabled = false;
    for (const label of form.querySelectorAll('[data-mark]')) delete label.dataset.mark;
    for (const mark of form.querySelectorAll('.learn-mark')) mark.remove();
    for (const node of form.querySelectorAll('[data-explanation]')) {
      node.hidden = true;
      node.textContent = '';
    }
    status.textContent = '';
    delete status.dataset.state;
    submit.hidden = false;
    retry.hidden = true;
    blocks[0].querySelector('input').focus();
  });
}

function initGlossary(root) {
  const input = root.querySelector('[data-glossary-search]');
  const select = root.querySelector('[data-glossary-filter]');
  const count = root.querySelector('[data-glossary-count]');
  const empty = root.querySelector('[data-glossary-empty]');
  const cards = [...root.querySelectorAll('[data-entry]')];
  const groups = [...root.querySelectorAll('[data-glossary-group]')];
  root.querySelector('[data-glossary-tools]').hidden = false;

  function filter() {
    let matches = 0;
    for (const card of cards) {
      const entry = bySlug.get(card.dataset.entry);
      const visible =
        (!select.value || Number(select.value) === entry.module) && matchesTerm(entry, input.value);
      card.hidden = !visible;
      if (visible) matches += 1;
    }
    for (const group of groups) group.hidden = !group.querySelector('[data-entry]:not([hidden])');
    count.textContent = matches + (matches > 1 ? ' termes' : ' terme');
    empty.hidden = matches > 0;
  }

  function reset() {
    input.value = '';
    select.value = '';
    filter();
  }

  function revealHash() {
    const target = document.getElementById(window.location.hash.slice(1));
    if (!target || !root.contains(target) || !target.matches('[data-entry]')) return;
    if (target.hidden) reset();
    target.open = true;
    target.scrollIntoView({ block: 'start' });
  }
  input.addEventListener('input', filter);
  select.addEventListener('change', filter);
  root.querySelector('[data-glossary-reset]').addEventListener('click', () => {
    reset();
    input.focus();
  });
  window.addEventListener('hashchange', revealHash);
  filter();
  revealHash();
}

function initTermPreviews() {
  const links = [...document.querySelectorAll('a[data-term]')].filter((link) =>
    bySlug.has(link.dataset.term),
  );
  if (!links.length) return;
  const tip = document.createElement('div');
  tip.id = 'learning-term-tip';
  tip.className = 'learning-term-tip';
  tip.setAttribute('role', 'tooltip');
  tip.hidden = true;
  document.body.append(tip);
  let active;
  let timer;
  function hide() {
    clearTimeout(timer);
    active?.removeAttribute('aria-describedby');
    active = undefined;
    tip.hidden = true;
  }
  function position() {
    if (!active) return;
    const box = active.getBoundingClientRect();
    const width = tip.offsetWidth;
    const height = tip.offsetHeight;
    const left = Math.max(12, Math.min(box.left, window.innerWidth - width - 12));
    const below = box.bottom + 6;
    const top = below + height <= window.innerHeight - 12 ? below : Math.max(12, box.top - height - 6);
    tip.style.left = left + 'px';
    tip.style.top = top + 'px';
  }
  function show(link) {
    hide();
    active = link;
    const entry = bySlug.get(link.dataset.term);
    const title = document.createElement('strong');
    title.textContent = entry.term;
    tip.replaceChildren(title, document.createTextNode(entry.definition));
    tip.hidden = false;
    active.setAttribute('aria-describedby', tip.id);
    position();
  }
  function scheduleHide() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (!active?.matches(':focus, :hover') && !tip.matches(':hover')) hide();
    }, 160);
  }
  for (const link of links) {
    link.addEventListener('pointerenter', (event) => {
      if (event.pointerType !== 'touch') show(link);
    });
    link.addEventListener('pointerleave', scheduleHide);
    link.addEventListener('focus', () => show(link));
    link.addEventListener('blur', scheduleHide);
  }
  tip.addEventListener('pointerenter', () => clearTimeout(timer));
  tip.addEventListener('pointerleave', scheduleHide);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') hide();
  });
  window.addEventListener('resize', position);
  window.addEventListener('scroll', position, { capture: true, passive: true });
}

if (typeof document !== 'undefined') {
  const init = () => {
    document.querySelectorAll('[data-quiz]').forEach(initQuiz);
    document.querySelectorAll('[data-glossary]').forEach(initGlossary);
    initTermPreviews();
    syncProgress();
    window.addEventListener('pageshow', syncProgress);
    window.addEventListener('storage', (event) => {
      if (event.key !== PROGRESS_KEY && event.key !== null) return;
      if (event.newValue === null) {
        sessionCompleted.clear();
      } else {
        // Two tabs can validate different modules before seeing the other tab's write.
        const stored = storedCompleted();
        if ([...sessionCompleted].some((id) => !stored.includes(id))) {
          try {
            window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(getCompleted()));
          } catch {
            /* The current page still retains its results. */
          }
        }
      }
      syncProgress();
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
}
