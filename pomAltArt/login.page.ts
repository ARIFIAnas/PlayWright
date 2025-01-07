import {Page,expect} from "@playwright/test"
import altart from "../altArt.json"

export class LoginPage {
    readonly page: Page;
    constructor(page: Page) {
      this.page = page;
    }

    async login(){
      await this.page.goto(altart.loginurl);
      await this.page.getByPlaceholder('Enter Email Address').fill(altart.email);
      await this.page.getByPlaceholder('Enter Your Password').fill(altart.password);
      await this.page.getByRole('button', { name: 'Login' }).click();
      await this.page.getByLabel('Rai0n').locator('form').isVisible();
    }
}  