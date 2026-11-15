import { test, expect } from '@playwright/test';

async function answerQuestions(form, answers) {
  for (const [index, value] of answers.entries()) {
    await form.locator('[data-question="' + index + '"] input[value="' + value + '"]').check();
  }
}

test('Le quiz explique les erreurs, autorise un nouvel essai et conserve un module validé', async ({
  page,
}) => {
  await page.goto('modules/options/');
  const form = page.locator('[data-quiz-form]');
  const submit = form.getByRole('button', { name: 'Vérifier mes réponses' });
  const retry = form.getByRole('button', { name: 'Recommencer le quiz' });
  const status = form.locator('[data-quiz-status]');

  await submit.click();
  await expect(status).toContainText('Choisissez une réponse à la question 1');
  await expect(form.locator('input').first()).toBeFocused();
  await answerQuestions(form, [2, 1, 0]);
  await submit.click();
  await expect(status).toContainText('1 / 3');
  await expect(form.locator('[data-explanation]:visible')).toHaveCount(3);
  await expect(form.locator('[data-question="1"] [data-mark="correct"]')).toContainText(
    'Vendre l’action à 50 €',
  );
  await expect(page.locator('[data-progress-count]').first()).toHaveText('0');

  await retry.click();
  await expect(form.locator('input:checked')).toHaveCount(0);
  await expect(form.locator('[data-explanation]:visible')).toHaveCount(0);
  await answerQuestions(form, [2, 0, 0]);
  await submit.click();
  await expect(status).toContainText('2 / 3. Module validé');
  await expect(page.locator('[data-progress-count]').first()).toHaveText('1');
  await expect(page.locator('[role="progressbar"]').first()).toHaveAttribute('aria-valuenow', '17');

  await page.reload();
  await expect(page.locator('[data-progress-count]').first()).toHaveText('1');
  await page.goto('./');
  await expect(page.locator('.module-card[data-module-id="4"]')).toHaveClass(/is-complete/);
  await expect(page.locator('#start-course')).toContainText('Continuer le parcours');
});

test('La recherche ignore les accents et compose ses résultats avec le filtre par module', async ({
  page,
}) => {
  await page.goto('glossaire/');
  const root = page.locator('[data-glossary]');
  const search = root.getByRole('searchbox', { name: 'Rechercher un terme' });
  const select = root.getByRole('combobox', { name: 'Filtrer par module' });
  const initial = await root.locator('[data-entry]').count();
  await search.fill('tHeTa');
  await expect(root.locator('[data-entry]:visible')).toHaveCount(1);
  await root.locator('#theta summary').click();
  await expect(root.locator('#theta .dict-copy')).toContainText('passage du temps');
  await select.selectOption('1');
  await expect(root.locator('[data-glossary-empty]')).toBeVisible();
  await root.getByRole('button', { name: 'Afficher tous les termes' }).click();
  await expect(root.locator('[data-entry]:visible')).toHaveCount(initial);
  await expect(search).toBeFocused();
});

test('Le lien de lecture donne une définition au clavier et ouvre la bonne entrée du dictionnaire', async ({
  page,
}) => {
  await page.goto('modules/contrats-a-terme/');
  const link = page.locator('article a[data-term="marge"]').first();
  await link.focus();
  await expect(page.getByRole('tooltip')).toContainText('garantie');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('tooltip')).toHaveCount(0);
  await link.press('Enter');
  await expect(page).toHaveURL(/\/glossaire\/#marge$/);
  await expect(page.locator('#marge')).toHaveAttribute('open', '');
  await expect(page.locator('#marge .dict-copy')).toBeVisible();
});

test('Un stockage indisponible laisse le quiz et son corrigé utilisables', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      get() {
        throw new DOMException('Stockage désactivé', 'SecurityError');
      },
    });
  });
  await page.goto('modules/options/');
  const form = page.locator('[data-quiz-form]');
  await answerQuestions(form, [2, 0, 1]);
  await form.getByRole('button', { name: 'Vérifier mes réponses' }).click();
  await expect(form.locator('[data-quiz-status]')).toContainText('3 / 3. Module validé pour cette page');
  await expect(form.locator('[data-explanation]:visible')).toHaveCount(3);
  await expect(page.locator('[data-progress-count]').first()).toHaveText('1');
});
