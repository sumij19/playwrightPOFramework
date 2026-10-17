import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";
import {FormControlsPage} from "../pages/formControlsPage"

const {Given,When,Then} = createBdd()

Given('the user navigates to the radio buttons section', async ({page}) => {

  const formControlsPage = new FormControlsPage(page)
  await formControlsPage.navigateToRadioButtons()
  await expect(formControlsPage.studentButton).toBeVisible({timeout:3000})
  
});

Then('the radio buttons heading should be visible', async ({page}) => {

  await expect(new FormControlsPage(page).radioButtonHeading).toBeVisible()
  
});