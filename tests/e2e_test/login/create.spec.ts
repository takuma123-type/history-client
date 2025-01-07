import { test, expect } from '@playwright/test';
import { login } from './login'; 
import exp from 'constants';

const NEW_BUTTON_NAME = '新規作成';
const ROLE_OPTION_SECURITY_ENGINEER = 'セキュリティエンジニア';
const ROLE_OPTION_MORE_THAN_ONE_PERSON = '人以上';
const ROLE_OPTION_TOOL = 'C#';
const ROLE_OPTION_MONGODB = 'MongoDB';
const PERIOD_LABEL = '期間';
const PERIOD_VALUE = '2024年1月~2024年12月';
const COMPANY_NAME_LABEL = '会社名';
const COMPANY_NAME_VALUE = 'E2E株式会社';
const PROJECT_NAME_LABEL = 'プロジェクト名';
const PROJECT_NAME_VALUE = 'E2Eプロジェクト';
const CONTENT_LABEL = '内容';
const CONTENT_VALUE = 'E2E内容';
const OTHER_LABEL = 'その他';
const OTHER_VALUE = 'E2Eその他';
const CREATE_BUTTON_NAME = '作成';
const ALERT_MESSAGE = '履歴が作成されました';

test('test', async ({ page }) => {
  await login(page, 'test111@test.com', 'password');

  await page.getByRole('button', { name: NEW_BUTTON_NAME }).click();
  await page.getByRole('combobox').first().click();
  await page.getByRole('option', { name: ROLE_OPTION_SECURITY_ENGINEER }).click();

  await page.getByRole('combobox').nth(1).click();
  await page.getByRole('option', { name: ROLE_OPTION_MORE_THAN_ONE_PERSON }).click();

  await page.getByRole('combobox').nth(2).click();
  await page.getByRole('option', { name: ROLE_OPTION_TOOL }).click();

  await page.getByRole('combobox').nth(3).click();
  await page.getByRole('option', { name: ROLE_OPTION_MONGODB }).click();

  await page.getByRole('textbox', { name: PERIOD_LABEL }).click();
  await page.getByRole('textbox', { name: PERIOD_LABEL }).fill(PERIOD_VALUE);

  await page.getByRole('textbox', { name: COMPANY_NAME_LABEL }).click();
  await page.getByRole('textbox', { name: COMPANY_NAME_LABEL }).fill(COMPANY_NAME_VALUE);

  await page.getByRole('textbox', { name: PROJECT_NAME_LABEL }).click();
  await page.getByRole('textbox', { name: PROJECT_NAME_LABEL }).fill(PROJECT_NAME_VALUE);

  await page.getByRole('textbox', { name: CONTENT_LABEL }).click();
  await page.getByRole('textbox', { name: CONTENT_LABEL }).fill(CONTENT_VALUE);

  await page.getByRole('textbox', { name: OTHER_LABEL }).click();
  await page.getByRole('textbox', { name: OTHER_LABEL }).fill(OTHER_VALUE);

  await page.getByRole('button', { name: CREATE_BUTTON_NAME }).click();
  

  // alertモーダルを監視
  page.on('dialog', async (dialog) => {
    expect(dialog.message()).toBe(ALERT_MESSAGE); // メッセージを検証
    await dialog.accept(); // OKボタンをクリック
  });

  await page.getByRole('button', { name: CREATE_BUTTON_NAME }).click();
});