import { test, expect } from '@playwright/test';

test('le parcours est lisible et le thème choisi persiste en changeant de leçon', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('./');
  await expect(page.locator('.module-card')).toHaveCount(6);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Les dérivés');
  await page.getByRole('button', { name: 'Activer le mode sombre' }).click();
  await page.getByRole('link', { name: 'Commencer le parcours' }).click();
  await expect(page.getByRole('heading', { name: 'Les actifs et les sous-jacents' })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('article blockquote.analogy')).toBeVisible();
  await expect(page.locator('.module-nav[aria-current="page"]')).toHaveText(/sous-jacents/);
  const jump = page.locator('.in-page a').last();
  await jump.click();
  await expect(page).toHaveURL(/#quiz$/);
  expect(errors).toEqual([]);
});

test('sur téléphone, le menu au clavier permet d’ouvrir une leçon et de revenir au contenu', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('./');
  await page.getByRole('button', { name: 'Ouvrir le menu' }).click();
  await expect(page.locator('#mobile-close')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.locator('#mobile-open')).toBeFocused();
  await page.locator('#mobile-open').click();
  await page.locator('.module-nav').filter({ hasText: 'Les options' }).click();
  await expect(page.getByRole('heading', { name: 'Les options d’achat et de vente' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('la lecture du parcours ne charge pas le moteur de graphiques', async ({ page }) => {
  const scripts = [];
  page.on('request', (r) => {
    if (r.resourceType() === 'script') scripts.push(r.url());
  });
  await page.goto('./');
  await page.locator('#start-course').click();
  expect(scripts.filter((src) => src.includes('/simulateur.'))).toEqual([]);
});
