import { Page } from '@playwright/test';

/**
 * サインインページのURL
 * @constant
 */
const SIGN_IN_URL = 'http://localhost:5173/sign-in';

/**
 * メールアドレス入力欄のラベル
 * @constant
 */
const EMAIL_LABEL = 'Email';

/**
 * パスワード入力欄のラベル
 * @constant
 */
const PASSWORD_LABEL = 'Password';

/**
 * ログインボタンの名称
 * @constant
 */
const LOGIN_BUTTON_NAME = 'ログイン';

/**
 * ログイン処理を行う関数
 * @param {Page} page - Playwright の Page オブジェクト
 * @param {string} email - ログインに使用するメールアドレス
 * @param {string} password - ログインに使用するパスワード
 * @returns {Promise<void>}
 */
export async function login(page: Page, email: string, password: string): Promise<void> {
  await page.goto(SIGN_IN_URL);
  await page.getByLabel(EMAIL_LABEL).click();
  await page.getByLabel(EMAIL_LABEL).fill(email);
  await page.getByLabel(PASSWORD_LABEL).click();
  await page.getByLabel(PASSWORD_LABEL).fill(password);
  await page.getByRole('button', { name: LOGIN_BUTTON_NAME }).click();
}