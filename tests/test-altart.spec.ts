import { test, expect } from '@playwright/test';
import { HomePage } from '../pomAltArt/homepage.page';
import {LoginPage} from "../pomAltArt/login.page";
import{ArtworkPage} from "../pomAltArt/artwork.page";
import { ReviewPage } from '../pomAltArt/review.page';
import { LogoutPage } from '../pomAltArt/logout.page';
import { time } from 'console';

test.describe("Artwork Tests", () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.login();
  });

test('add artwork', async ({ page }) => {
  const artwork = new ArtworkPage(page);
  await artwork.addArtwork();
  test.slow();
});

test('Add Reviews', async ({ page }) => {
  const review = new ReviewPage(page);
  await review.Review();
  test.slow();
});

test('Logout', async({page})=>{
  const logout = new LogoutPage(page);
  await logout.logout();
  test.slow();
})
})