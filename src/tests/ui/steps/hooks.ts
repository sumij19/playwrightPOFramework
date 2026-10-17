import { createBdd } from 'playwright-bdd';

const { BeforeScenario, AfterScenario } = createBdd();

BeforeScenario(async ({page,$testInfo}) => {
    console.log(`Starting scenario:${$testInfo.title}`)
})

AfterScenario(async ({ page, $testInfo }) => {
  console.log(`Finishing scenario:${$testInfo.title}`)
  if ($testInfo.status !== $testInfo.expectedStatus) {
    await page.screenshot({
      path: `test-results/${$testInfo.title}.png`,
      fullPage: true,
    });
  }
});