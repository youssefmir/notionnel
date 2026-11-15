import { test, expect } from '@playwright/test';

async function setSlider(page, name, value) {
  const slider = page.getByRole('slider', { name });
  await slider.focus();
  await slider.press('Home');
  const minimum = Number(await slider.getAttribute('min'));
  for (let n = minimum; n < value; n++) await slider.press('ArrowRight');
}

const amount = (value) => new RegExp('^' + String(value).replace('+', '\\+') + '\\s*€$');

test('la courbe et le résultat suivent les quatre positions et les réglages du contrat', async ({ page }) => {
  await page.goto('simulateur/');
  const result = page.locator('[data-value="outcome"]');
  await expect(result).toHaveText(amount('+12'));
  const graph = page.locator('[data-sim-plot]');
  await expect(graph.locator('.recharts-line-curve')).toBeVisible();
  const initialLine = await graph.locator('.recharts-line-curve').getAttribute('d');

  await page.locator('.sim-segment').getByText('Vendeur', { exact: true }).click();
  await expect(result).toHaveText(amount('-12'));
  await expect(page.locator('[data-value="maxLoss"]')).toHaveText('Sans plafond');
  await expect(graph.locator('.recharts-line-curve')).not.toHaveAttribute('d', initialLine);

  await page.locator('.sim-segment').getByText('Put · vendre', { exact: true }).click();
  await expect(result).toHaveText(amount('+8'));
  await page.locator('.sim-segment').getByText('Acheteur', { exact: true }).click();
  await expect(result).toHaveText(amount('-8'));

  await setSlider(page, 'Prix d’exercice', 20);
  await setSlider(page, 'Prime par action', 3);
  await setSlider(page, 'Cours final de l’action', 10);
  await expect(result).toHaveText(amount('+7'));
  await expect(page.locator('[data-value="equilibrium"]')).toHaveText(amount(17));
  await page.getByText('Consulter les valeurs de la courbe').click();
  const selectedRow = page.getByRole('row').filter({ hasText: '(choisi)' });
  await expect(selectedRow.getByRole('cell').first()).toHaveText(amount(10));
  await expect(selectedRow.getByRole('cell').last()).toHaveText(amount('+7'));

  await page.getByRole('button', { name: 'Réinitialiser' }).click();
  await expect(result).toHaveText(amount('+12'));
  await expect(page.getByRole('slider', { name: 'Prix d’exercice' })).toHaveValue('100');
  await expect(page.getByLabel('Call · acheter', { exact: true })).toBeChecked();
});

test('sur mobile les commandes restent accessibles et la courbe tient dans la page', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto('simulateur/');
  const lab = page.locator('[data-simulator]');
  await expect(lab.getByRole('slider', { name: 'Prime par action' })).toBeEnabled();
  await page.locator('.sim-segment').getByText('Vendeur', { exact: true }).click();
  await expect(lab.locator('[data-value="outcome"]')).toHaveText(amount('-12'));
  const plot = lab.locator('.recharts-surface').first();
  await plot.scrollIntoViewIfNeeded();
  await expect(plot).toBeVisible();
  const box = await plot.boundingBox();
  expect(box.width).toBeGreaterThan(150);
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(360);
});

test('l’exemple et ses données restent lisibles sans JavaScript', async ({ browser }, testInfo) => {
  const context = await browser.newContext({
    baseURL: testInfo.project.use.baseURL,
    javaScriptEnabled: false,
  });
  try {
    const page = await context.newPage();
    await page.goto('simulateur/');
    await expect(page.locator('.sim-static')).toBeVisible();
    await expect(page.getByRole('slider', { name: 'Prime par action' })).toBeDisabled();
    await expect(page.locator('[data-value="outcome"]')).toHaveText(amount('+12'));
    await page.getByText('Consulter les valeurs de la courbe').click();
    await expect(page.getByRole('row').filter({ hasText: '(choisi)' })).toBeVisible();
  } finally {
    await context.close();
  }
});
