import { test, expect, Page } from '@playwright/test';
import { login } from './login';
import {
  NEW_BUTTON_NAME,
  ROLE_OPTION_SECURITY_ENGINEER,
  ROLE_OPTION_MORE_THAN_ONE_PERSON,
  ROLE_OPTION_TOOL,
  ROLE_OPTION_MONGODB,
  PERIOD_LABEL,
  PERIOD_VALUE,
  COMPANY_NAME_LABEL,
  COMPANY_NAME_VALUE,
  PROJECT_NAME_LABEL,
  PROJECT_NAME_VALUE,
  CONTENT_LABEL,
  CONTENT_VALUE,
  OTHER_LABEL,
  OTHER_VALUE,
  CREATE_BUTTON_NAME,
  ALERT_MESSAGE,
} from './constans';

/**
 * combobox の選択処理を共通化する関数
 * @param {Page} page - Playwright の Page オブジェクト
 * @param {number} nth - combobox のインデックス (0始まり)
 * @param {string} optionName - 選択する option の名称
 * @returns {Promise<void>}
 */
async function selectComboboxOption(page: Page, nth: number, optionName: string): Promise<void> {
  await page.getByRole('combobox').nth(nth).click();
  await page.getByRole('option', { name: optionName }).click();
}

/**
 * textbox の選択と入力処理を共通化する関数
 * @param {Page} page - Playwright の Page オブジェクト
 * @param {string} labelName - textbox のラベル名
 * @param {string} value - 入力する値
 * @returns {Promise<void>}
 */
async function fillTextbox(page: Page, labelName: string, value: string): Promise<void> {
  await page.getByRole('textbox', { name: labelName }).click();
  await page.getByRole('textbox', { name: labelName }).fill(value);
}

/**
 * テストケース
 */
test('経歴書の作成', async ({ page }) => {
  await login(page, 'test111@test.com', 'password');

  await page.getByRole('button', { name: NEW_BUTTON_NAME }).click();
  await selectComboboxOption(page, 0, ROLE_OPTION_SECURITY_ENGINEER);
  await selectComboboxOption(page, 1, ROLE_OPTION_MORE_THAN_ONE_PERSON);
  await selectComboboxOption(page, 2, ROLE_OPTION_TOOL);
  await selectComboboxOption(page, 3, ROLE_OPTION_MONGODB);

  await fillTextbox(page, PERIOD_LABEL, PERIOD_VALUE);
  await fillTextbox(page, COMPANY_NAME_LABEL, COMPANY_NAME_VALUE);
  await fillTextbox(page, PROJECT_NAME_LABEL, PROJECT_NAME_VALUE);
  await fillTextbox(page, CONTENT_LABEL, CONTENT_VALUE);
  await fillTextbox(page, OTHER_LABEL, OTHER_VALUE);

  /**
   * alertモーダルを監視し、メッセージを検証してOKボタンをクリックする
   */
  page.on('dialog', async (dialog) => {
    expect(dialog.message()).toBe(ALERT_MESSAGE);
    await dialog.accept();
  });

  await page.getByRole('button', { name: CREATE_BUTTON_NAME }).click();
});