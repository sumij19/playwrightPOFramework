import { chromium, FullConfig } from "@playwright/test";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import globalData from "./config/globalData.json";

dotenv.config();

async function globalsetup(config: FullConfig) {
    let browser;
    
    try {
        // 1. Validate environment variables
        if (!process.env.TEST_PASSWORD) {
            throw new Error(
                "PASSWORD is missing. Please check your .env file."
            );
        }

        // 2. Launch browser
        browser = await chromium.launch({
            headless: false
        });

        const context = await browser.newContext();
        const page = await context.newPage();

        // 3. Navigate to application
        console.log("Navigating to the application...");

        await page.goto(globalData.QA.BASE_GLOBAL_URL, {
            waitUntil: "domcontentloaded",
            timeout: 30000
        });

        // 4. Click Login link
        await page.getByRole("link", {
            name: "Login"
        }).first().click({ timeout: 10000 });

        // 5. Enter username
        await page.getByPlaceholder("student").fill(process.env.TEST_USERNAME!);

        // 6. Enter password
        await page.getByRole("textbox", {
            name: "password"
        }).fill(process.env.TEST_PASSWORD!

        );

        // 7. Click Login button
        await page.getByRole("button", {
            name: "Login",
            exact: true
        }).click();

        // 8. Verify successful login
        await page.getByRole("button", {
            name: "student"
        }).waitFor({
            state: "visible",
            timeout: 15000
        });

        console.log("Login successful.");

        // 9. Create .auth directory if it does not exist
        const authDirectory = path.resolve(".auth");
        fs.mkdirSync(authDirectory, { recursive: true });

        // 10. Save authentication state
        const authFile = path.join(authDirectory, "user.json");

        await context.storageState({
            path: authFile
        });

        console.log("Authentication state saved successfully.");

        // 11. Close context after saving authentication state
        await context.close();

    } catch (error: unknown) {

        console.error("Global setup failed.");

        if (error instanceof Error) {
            console.error("Error message:", error.message);
            console.error("Error details:", error.stack);
        } else {
            console.error("Unknown error:", error);
        }

        // Stop test execution when global setup fails
        throw error;

    } finally {

        // 12. Ensure browser closes even when an error occurs
        if (browser) {
            try {
                await browser.close();
                console.log("Browser closed.");
            } catch (closeError: unknown) {
                console.error(
                    "Failed to close browser:",
                    closeError
                );
            }
        }
    }
}

export default globalsetup;