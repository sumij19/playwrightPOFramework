import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
 import dotenv from 'dotenv';
 import path from 'path';
 dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
 const testDir = defineBddConfig({
    features: 'src/tests/**/*.feature', 
    steps: 'src/tests/**/*.ts',
    outputDir: 'features-gen',
    tags: process.env.TAGS || ''
  })

 const headless = process.env.HEADLESS !== 'false'
 const workers = Number(process.env.WORKERS || 2)

export default defineConfig({

  globalSetup: require.resolve('./global-setup'),
  
  testDir,
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
  ['list'],
  ['html', { open: 'never' }],
]
,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
 timeout:30000,//30 sec per test

 expect:{
  timeout:5000,
 },
 
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    headless,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    navigationTimeout: 30000,
    actionTimeout: 20000, 
  },

  
  /* Configure projects for major browsers */
  projects: [
    // {
    //   name:'setup',
    //   testMatch:/auth\.setup\.ts/,
    // },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        baseURL:"https://www.playwrightautomation.com/",
        storageState:'./.auth/user.json',
       },
       //dependencies:['setup'],
    },

    
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
