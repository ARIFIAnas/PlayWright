import { Page, expect } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
      }
      async openAltArt() {
        //Open altart
        await this.page.goto("https://staging.alt.art/");
        //await expect (this.page.getByRole('heading', { name: 'Alt.Art', exact: true })).toBeVisible();

      }
}