/// <reference types="user-agent-data-types" />

/**
 * 実行環境が macOS なら `true` を返します。
 */
export function isMac() {
  return testPlatform(/^Mac/);
}

function testPlatform(re: RegExp) {
  // userAgentData は 2024年10月時点で Chromium にのみ実装されているため、
  // それ以外の実行環境では引き続き userAgent を使用します。
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  return re.test(window.navigator.userAgentData?.platform ?? window.navigator.platform);
}
