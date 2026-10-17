import { Page,Locator } from "@playwright/test";
import globalData from "../../../../config/globalData.json"

export class FormControlsPage {

    page: Page
    radioButtonHeading: Locator
    studentButton: Locator

    constructor(page:Page){
        this.page = page

        this.radioButtonHeading = this.page.getByRole('heading' , {name:'Radio Buttons', exact:true})
        this.studentButton = this.page.getByRole('button', { name: 'student'})
    }

  /** * Navigates to the Radio Buttons section of the practice page. 
   * * * Reads the application base URL from the global configuration and
   ** navigates to the page's radio-button section.
   * 
   * @returns A Promise that resolves when the navigation operation completes. 
   * @throws Rethrows navigation errors after logging diagnostic information. */
    async navigateToRadioButtons():Promise<void>{
      const baseURL = globalData.QA.BASE_GLOBAL_URL;
        try { 
            await this.page.goto(`${baseURL}practice.html#section-radios`);
         } catch (error: unknown) { 
            console.error("Failed to navigate to Radio Buttons page.");
             if (error instanceof Error) { 
                console.error("Error message:", error.message);
             } 
        throw error;
            }
    }
}