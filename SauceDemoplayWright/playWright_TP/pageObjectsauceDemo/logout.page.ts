import { Page, expect } from "@playwright/test";
import sauce from'../saucedemo.json'

export class LogoutPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async logout() {
    await this.page.getByRole('button', { name: 'Open Menu' }).click();
    await this.page.locator('[data-test="logout-sidebar-link"]').click()
  }
}
