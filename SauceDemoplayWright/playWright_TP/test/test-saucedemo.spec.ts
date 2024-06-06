import {test,expect} from "@playwright/test";
import sauce from'../saucedemo.json'
import { HomePage } from "../pageObjectsauceDemo/homepage.page";
import { LoginPage } from "../pageObjectsauceDemo/login.page";
import { DetailPage } from "../pageObjectsauceDemo/detail.page";
import { LogoutPage } from "../pageObjectsauceDemo/logout.page";
import { CartPage } from "../pageObjectsauceDemo/cart.page";
import { CheckoutPage } from "../pageObjectsauceDemo/checkout.page";
import { OverviewPage} from "../pageObjectsauceDemo/overviewcheck.page";
import { CompleteCheckoutPage} from "../pageObjectsauceDemo/checkoutcomplete.page";
import { OneItemDetailPage } from "../pageObjectsauceDemo/one_item_detail.page";



test("Login in SauceDemo website then logout", async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);
  const detail = new DetailPage(page);
  const logout = new LogoutPage(page);

  await home.openSauceDemo();
  await login.login();
  await detail.detailPage();
  await logout.logout();
  await expect(page).toHaveURL(sauce.url);

})

test("Login in SauceDemo website with locked user", async ({ page }) => {
  const home = new HomePage(page);
  const locked = new LoginPage(page);

  await home.openSauceDemo();
  await locked.loginLocked();
  await expect (page).toHaveURL(sauce.url)
})
test("Login then purchase some items", async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);
  const detail = new DetailPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);
  const overview = new OverviewPage(page);
  const finish = new CompleteCheckoutPage(page);

  await home.openSauceDemo();
  await login.login();
  await detail.detailPage();
  await detail.sortingHighToLow();
  await detail.pickItems();
  await expect(page).toHaveURL(sauce.cart_url);
  await cart.cartPage();
  await expect(page).toHaveURL(sauce.checkout_url);
  await checkout.Checkout();
  await expect (page).toHaveURL(sauce.confirm_url);
  await overview.CheckoutOverview();
  await expect (page).toHaveURL(sauce.complete_url);
  await finish.CheckoutComplete();  
})
test("sort High To Low ", async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);
  const detail = new DetailPage(page);
  
  await home.openSauceDemo();
  await login.login();
  await detail.sortingHighToLow();
  await detail.compareHighToLow();
})

test("sort Low To High  ", async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);
  const detail = new DetailPage(page);
  
  await home.openSauceDemo();
  await login.login();
  await detail.sortingLowToHigh()
  await expect(page).toHaveURL(sauce.PRODUCTS_PAGE_URL);
  await detail.compareLowToHigh()
})

test("Exercice 5", async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);
  const detail = new DetailPage(page);
  const oneItem = new OneItemDetailPage(page);
  const cart = new CartPage(page);

  await home.openSauceDemo();
  await login.login();
  await detail.item.click();
  //verify button
  await expect (oneItem.button).toBeVisible()
  //verify title
  await expect (oneItem.title).toHaveText(sauce.itemname);
  //verify description
  await expect (oneItem.description).toHaveText(sauce.desc)
  //verify tagprice
  await expect (oneItem.tagprice).toHaveText(sauce.tagPrice)
  //verify image
  await expect (oneItem.image).toBeVisible()
  //Add item to cart

  await oneItem.button.click();
  await expect (page.locator('//button[@id="remove"]')).toBeVisible();
  await expect (oneItem.Panier).toHaveText('1');
  //go to cart 
  await oneItem.Panier.click()
  //verify there is item in cart 
  await expect (cart.title).toHaveText(sauce.itemname)
  await expect (cart.tagprice).toHaveText(sauce.tagPrice)
  await expect (cart.description).toHaveText(sauce.desc)
  await expect (cart.checkout).toBeVisible();

})