import { Page, expect } from "@playwright/test";
import sauce from'../saucedemo.json'
import exp from "constants";

export class OverviewPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async CheckoutOverview() {

    await expect(this.page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
    await expect(this.page.locator('[data-test="payment-info-label"]')).toHaveText('Payment Information:');
    await expect(this.page.locator('[data-test="shipping-info-label"]')).toHaveText('Shipping Information:');
    await this.page.locator('[data-test="finish"]').click();
}
}
