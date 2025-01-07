import { Page } from '@playwright/test';

const SIGN_IN_URL = 'http://localhost:5173/sign-in';
const EMAIL_LABEL = 'Email';
const PASSWORD_LABEL = 'Password';
const LOGIN_BUTTON_NAME = 'ログイン';

export async function login(page: Page, email: string, password: string) {
  await page.goto(SIGN_IN_URL);
  await page.getByLabel(EMAIL_LABEL).click();
  await page.getByLabel(EMAIL_LABEL).fill(email);
  await page.getByLabel(PASSWORD_LABEL).click();
  await page.getByLabel(PASSWORD_LABEL).fill(password);
  await page.getByRole('button', { name: LOGIN_BUTTON_NAME }).click();
}