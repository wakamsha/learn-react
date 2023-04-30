// @ts-check
import playwright from 'playwright';

/**
 * 接続先となる catalog の URL.
 */
const baseUrl = 'http://localhost';

/**
 * 接続先となる catalog の ポート番号。
 */
const port = 3010;

/**
 * @typedef {'chromium' | 'webkit'} BrowserType
 * @type {BrowserType[]}
 */
const browserTypes = ['chromium', 'webkit'];

async function exec() {
  const [browserType] = browserTypes;
  const browser = await playwright[browserType].launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('http://localhost:3010');

  const locators = await page.locator('ul[role="tree"] a');
  const count = await locators.count();

  const storyIdList = [];

  for (let i = 0; i < count; i++) {
    const element = await locators.nth(i);
    const href = await element.getAttribute('href');
    storyIdList.push(href?.replace(/\//, ''));
  }

  for (const storyId of storyIdList) {
    await page.goto(`http://localhost:3010/preview.html?storyId=${storyId}`, { waitUntil: 'domcontentloaded' });
    await page.screenshot({
      path: `__screenshots__/${storyId}.png`,
    });
  }

  await browser.close();
}

exec();
