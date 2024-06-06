import { Locator, Page, expect } from "@playwright/test";
import sauce from'../saucedemo.json'
import exp from "constants";

export class DetailPage {
  readonly item: Locator;
  readonly optionList: Locator;
  readonly addToCartJacket: Locator
  readonly addToCartJacketR: Locator
  readonly addToCartBackpack: Locator
  readonly addToCartBackpackR: Locator
  readonly Panier: Locator
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
    this.item = page.locator('[data-test="item-0-img-link"]')
    this.optionList = page.locator('[data-test="product-sort-container"]')
    this.addToCartJacket = page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')
    this.addToCartJacketR = page.locator('[data-test="remove-sauce-labs-fleece-jacket"]')
    this.addToCartBackpack = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
    this.addToCartBackpackR = page.locator('[data-test="remove-sauce-labs-backpack"]')
    this.Panier = page.locator('[data-test="shopping-cart-link"]')
  }

  async detailPage() {
    await expect(this.page).toHaveURL(sauce.PRODUCTS_PAGE_URL);
    await expect (this.page.locator('[data-test="title"]')).toHaveText('Products');
    await expect (this.page.locator('[data-test="inventory-list"]')).toBeVisible();
  }

  async sortingHighToLow() {
    await (this.page.selectOption('[data-test="product-sort-container"]', sauce.list_sort))
    await this.page.waitForTimeout(1000)
    await expect(this.optionList).toHaveValue(sauce.list_sort);
  }

  async sortingLowToHigh() {
    await (this.page.selectOption('[data-test="product-sort-container"]', sauce.list_sort_Lh))
    await this.page.waitForTimeout(1000)
    await expect(this.optionList).toHaveValue(sauce.list_sort_Lh);
  }

  async pickItems() {
    await this.addToCartJacket.click();
    await this.addToCartBackpack.click();
    await expect (this.Panier).toHaveText('2');
    await expect (this.addToCartJacketR).toHaveText('Remove');
    await expect (this.addToCartBackpackR).toHaveText('Remove');
    await this.Panier.click();
  }
  async compareLowToHigh() {
    const listToCompare = ['7.99', '9.99', '15.99', '15.99', '29.99', '49.99']
    let PricesToCompare = []
    const prices = await this.page.$$eval('.inventory_item_price', elements =>
      elements.slice(0, 6).map(el => el.textContent.trim().replace('$', ''))
    
    );
    PricesToCompare = prices;
    PricesToCompare.sort((a, b) => parseFloat(a) - parseFloat(b));
    
    expect(PricesToCompare).toEqual(listToCompare);
  }
  async compareHighToLow() {
    const listToCompareHL = ['49.99','29.99','15.99', '15.99','9.99','7.99' ]
    let PricesToCompare = []
    const prices = await this.page.$$eval('.inventory_item_price', elements =>
      elements.slice(0, 6).map(el => el.textContent.trim().replace('$', ''))
    );
    PricesToCompare = prices;
    PricesToCompare.sort((a, b) => parseFloat(b) - parseFloat(a));
    
    expect(PricesToCompare).toEqual(listToCompareHL);
  }

}
