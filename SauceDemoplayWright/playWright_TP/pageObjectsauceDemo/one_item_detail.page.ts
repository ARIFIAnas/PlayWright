import { Locator, Page, expect } from "@playwright/test";
import sauce from'../saucedemo.json'
import exp from "constants";

export class OneItemDetailPage {
  readonly title: Locator;
  readonly button: Locator;
  readonly description: Locator;
  readonly tagprice: Locator;
  readonly image: Locator;
  readonly addToCartBike: Locator
  readonly addToCartBikeR: Locator
  readonly Panier: Locator
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.addToCartBike = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
    this.addToCartBikeR = page.locator('[data-test="remove-sauce-labs-bike-light"]')
    this.Panier = page.locator('[data-test="shopping-cart-link"]')
    this.title = page.locator('[data-test="inventory-item-name"]')
    this.button = page.locator('//button[@id="add-to-cart"]')
    this.description = page.locator('[data-test="inventory-item-desc"]')
    this.image = page.locator('[data-test="item-sauce-labs-bike-light-img"]')
    this.tagprice = page.locator('[data-test="inventory-item-price"]')
  }
}
