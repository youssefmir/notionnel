import { defineConfig } from '@playwright/test';

const port = Number(process.env.PREVIEW_PORT || 4321);
const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');
const baseURL = 'http://127.0.0.1:' + port + base + '/';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  workers: process.env.CI ? 2 : 3,
  retries: process.env.CI ? 1 : 0,
  forbidOnly: !!process.env.CI,
  reporter: 'list',
  use: {
    baseURL,
    browserName: 'chromium',
    colorScheme: 'light',
    viewport: { width: 1440, height: 1000 },
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : {},
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port ' + port,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    env: { ASTRO_TELEMETRY_DISABLED: '1' },
  },
});
