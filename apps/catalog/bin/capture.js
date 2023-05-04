// @ts-check
import { exec } from 'child_process';
import playwright from 'playwright';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import config from '../capture.config.js';

/**
 * 接続先となる catalog の URL.
 */
const baseUrl = 'http://localhost';

/**
 * 接続先となる catalog の ポート番号。
 */
const port = 3010;

/**
 * @typedef {'chromium' | 'webkit' | 'firefox'} BrowserType
 * @type {BrowserType[]}
 */
const browserTypes = ['chromium', 'webkit', 'firefox'];

const { browsers, withServer } = await yargs(hideBin(process.argv))
  .option('browsers', {
    alias: 'b',
    type: 'array',
    choices: browserTypes,
    default: ['chromium'],
  })
  .option('withServer', {
    type: 'boolean',
    default: false,
  })
  .parseAsync();

async function main() {
  const serverProcesses = [];

  if (withServer) {
    for (let i = 0; i < browsers.length; i++) {
      serverProcesses.push(exec(`pnpm start --port ${port + i}`));
    }
    // catalog が起動するまで待つ。
    await wait(10);
  }

  const storyIdList = await getStoryIdList(`${baseUrl}:${port}`, 'ul[role="tree"] a').then((list) =>
    list.filter((storyId) => !config.ignoreStoryIdList.includes(storyId)),
  );

  console.info({ Browsers: browserTypes, Found: `${storyIdList.length} stories` });

  await Promise.all(
    browserTypes.map((browserType) =>
      captureScreenshotsPerBrowser({
        browserType,
        storyIdList,
      }),
    ),
  );

  serverProcesses.forEach((process) => {
    process.kill();
  });
}

/**
 * 指定のブラウザで対象となる全ての story のスクリーンショットを撮影します。
 *
 * @typedef {object} CaptureScreenshotsProps
 * @property {BrowserType} browserType
 * @property {string[]} storyIdList
 *
 * @param {CaptureScreenshotsProps} props
 */
async function captureScreenshotsPerBrowser({ browserType, storyIdList }) {
  const browserIndex = browserTypes.findIndex((b) => b === browserType);
  const browser = await playwright[browserType].launch({ headless: true });
  const page = await browser.newPage();

  for (const storyId of storyIdList) {
    await captureScreenshot({
      storyId,
      browserType,
      page,
      url: `${baseUrl}:${port + browserIndex}/preview.html`,
    });
  }

  browser.close();
}

/**
 * 指定した story のスクリーンショットを撮影します。
 *
 * @typedef {object} CaptureScreenshotProps
 * @property {string} storyId キャプチャする story の ID
 * @property {string} url
 * @property {BrowserType} browserType
 * @property {playwright.Page} page ブラウザのタブに相当する
 *
 * @param {CaptureScreenshotProps} props
 */
async function captureScreenshot({ storyId, url, browserType, page }) {
  await page.goto(`${url}?storyId=${storyId}`, { waitUntil: 'load' });
  const path = `__screenshots__/${browserType}/${storyId}.png`;

  await page.screenshot({
    path,
    fullPage: true,
  });

  console.info(`📸 ${path}`);
}

/**
 * キャプチャ対象となる story の ID 一覧を取得します。
 *
 * @remarks
 * story の ID は、 catalog のナビゲーションリンクの `href` 値から抽出します。
 *
 * @param {string} url
 * @param {string} selector catalog のナビゲーションを参照できるセレクター。
 *
 * @returns storyId の配列
 */
async function getStoryIdList(url, selector) {
  const [browserType] = browserTypes;
  const browser = await playwright[browserType].launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url);

  const locators = await page.locator(selector);
  const count = await locators.count();

  const storyIdList = [];

  for (let i = 0; i < count; i++) {
    const element = await locators.nth(i);
    const href = await element.getAttribute('href');

    if (href === null) {
      continue;
    }

    storyIdList.push(href?.replace(/\//, ''));
  }

  browser.close();

  return storyIdList;
}

/**
 * 指定の時間（秒）だけ待ちます。
 *
 * @param {number} sec 秒
 */
function wait(sec) {
  return new Promise((result) => {
    setTimeout(() => {
      result(undefined);
    }, sec * 1000);
  });
}

main();
