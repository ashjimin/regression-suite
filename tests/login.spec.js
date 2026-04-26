const { test, expect } = require('@playwright/test');

test.describe('Login Smoke Tests', () => {

  test('Positive: Successful login with valid credentials', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    await expect(page.locator('.flash.success')).toContainText('You logged into a secure area!');
  });

  test('Positive: Login and logout', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    await expect(page.locator('.flash.success')).toContainText('You logged into a secure area!');
    await page.click('a[href="/logout"]');
    await expect(page.locator('.flash.success')).toContainText('You logged out of the secure area!');
  });

  test('Negative: Invalid password', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'wrongpassword');
    await page.click('button[type="submit"]');
    await expect(page.locator('.flash.error')).toContainText('Your password is invalid!');
  });

  test('Negative: Invalid username', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.fill('#username', 'wronguser');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    await expect(page.locator('.flash.error')).toContainText('Your username is invalid!');
  });

});