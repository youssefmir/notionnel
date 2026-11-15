import { expect, test } from '@playwright/test';

test('la barrière haute est touchée dès l’égalité à une clôture', async ({ page }) => {
  await page.goto('modules/options-exotiques/');
  const example = page.locator('#experience-barriere');
  const price = example.getByRole('slider', { name: 'Première clôture du trajet B' });
  const gross = example.locator('[data-knockout-gross]');
  const net = example.locator('[data-knockout-net]');
  const vanilla = example.getByRole('row', { name: /Call classique · net/ });

  await expect(price).toHaveValue('120');
  await expect(gross).toHaveText(/^0\s*€$/);
  await expect(net).toHaveText(/^-4\s*€$/);
  await expect(vanilla.getByRole('cell').last()).toHaveText(/^\+10\s*€$/);

  await price.focus();
  await price.press('ArrowLeft');
  await expect(price).toHaveValue('119');
  await expect(gross).toHaveText(/^14\s*€$/);
  await expect(net).toHaveText(/^\+10\s*€$/);
  await expect(example.getByRole('status').filter({ hasText: 'reste actif' })).toBeVisible();

  await price.press('ArrowRight');
  await expect(example.locator('[data-adjustable]')).toHaveText(/^120\s*€$/);
  await expect(gross).toHaveText(/^0\s*€$/);
  await expect(net).toHaveText(/^-4\s*€$/);
  await expect(vanilla.getByRole('cell').last()).toHaveText(/^\+10\s*€$/);
});

test('les trois observations et les résultats du scénario initial restent lisibles sans script', async ({
  browser,
}, testInfo) => {
  const context = await browser.newContext({
    baseURL: testInfo.project.use.baseURL,
    javaScriptEnabled: false,
  });
  try {
    const page = await context.newPage();
    await page.goto('modules/options-exotiques/');
    const example = page.locator('#experience-barriere');
    await expect(example.getByRole('slider')).toHaveCount(0);
    await expect(example.locator('[data-path-observation]')).toHaveCount(3);
    await expect(example.locator('[data-knockout-net]')).toHaveText(/^-4\s*€$/);
    await expect(example.getByRole('row', { name: /Call classique · brut/ })).toContainText('14');
  } finally {
    await context.close();
  }
});
