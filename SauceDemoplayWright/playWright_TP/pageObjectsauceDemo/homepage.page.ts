import { Page, expect } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
      }
      async openSauceDemo() {
        //Open saucedemo
        await this.page.goto("https://www.saucedemo.com/");
        await expect (this.page.getByText('Swag Labs')).toBeVisible();
      }
}