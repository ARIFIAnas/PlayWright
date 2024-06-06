import { Page, expect } from "@playwright/test";
import sauce from'../saucedemo.json'
import exp from "constants";

export class CheckoutPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async Checkout() {
    
    await this.page.locator('[data-test="firstName"]').fill(sauce.username);
    await this.page.locator('[data-test="lastName"]').fill(sauce.password);
    await this.page.locator('[data-test="postalCode"]').fill(sauce.zcode);
    await this.page.locator('[data-test="continue"]').click();
}
}
