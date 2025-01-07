import {Page,expect} from "@playwright/test"

export class LogoutPage {
    readonly page: Page;
    constructor(page: Page) {
      this.page = page;
    }

    async logout(){
        await this.page.locator('#dropdownDefaultButton').click();
        await this.page.getByRole('button', { name: 'Sign Out' }).click();

    }
}