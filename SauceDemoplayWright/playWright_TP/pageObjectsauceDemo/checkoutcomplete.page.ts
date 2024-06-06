import { Page, expect } from "@playwright/test";
import sauce from'../saucedemo.json'
import exp from "constants";

export class CompleteCheckoutPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async CheckoutComplete() {
    await expect(this.page.locator('[data-test="title"]')).toHaveText('Checkout: Complete!');
    await expect(this.page.locator('[data-test="pony-express"]')).toBeVisible();
    await expect(this.page.locator('[data-test="back-to-products"]')).toBeVisible();
    await expect(this.page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
}
}
