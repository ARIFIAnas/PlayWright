import { Locator, Page, expect } from "@playwright/test";
import sauce from'../saucedemo.json'
import exp from "constants";

export class CartPage {
  readonly title: Locator;
  readonly button: Locator;
  readonly description: Locator;
  readonly tagprice: Locator;
  readonly image: Locator;
  readonly checkout: Locator
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="inventory-item-name"]')
    this.button = page.locator('//button[@id="add-to-cart"]')
    this.description = page.locator('[data-test="inventory-item-desc"]')
    this.image = page.locator('[data-test="item-sauce-labs-bike-light-img"]')
    this.tagprice = page.locator('[data-test="inventory-item-price"]')
    this.checkout = page.locator('[data-test="checkout"]')
  }

  async cartPage() {

    await expect(this.page.locator('[data-test="title"]')).toHaveText('Your Cart');
    await expect(this.page.getByText('$49.99')).toBeVisible();
    await expect(this.page.getByText('$29.99')).toBeVisible();
    await expect(this.page.locator('[data-test="item-5-title-link"]')).toHaveText('Sauce Labs Fleece Jacket')
    await expect(this.page.locator('[data-test="item-4-title-link"]')).toHaveText('Sauce Labs Backpack')
    await (this.checkout).click();

}
}
