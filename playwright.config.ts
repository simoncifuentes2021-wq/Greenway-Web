import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: process.env.GREENWAY_TEST_BASE_URL ?? 'http://localhost:3000',
    browserName: 'chromium',
    colorScheme: 'light',
  },
  reporter: 'line',
});
