import { Page, expect } from "@playwright/test";
import sauce from'../saucedemo.json'

export class LoginPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async login() {
    await this.page.locator('[data-test="username"]').fill(sauce.username);
    await this.page.locator('[data-test="password"]').fill(sauce.password);
    await this.page.locator('[data-test="login-button"]').click();
  }

  async loginLocked() {
    await this.page.locator('[data-test="username"]').fill(sauce.locked_username);
    await this.page.locator('[data-test="password"]').fill(sauce.password);
    await this.page.locator('[data-test="login-button"]').click();
    await expect (this.page.locator('[data-test="error"]')).toHaveText(sauce.error_msg)
    await expect(this.page.locator('svg').first()).toBeVisible();
  }
}
