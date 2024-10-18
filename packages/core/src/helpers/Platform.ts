/// <reference types="user-agent-data-types" />

/**
 * 実行環境が macOS なら `true` を返します。
 */
export function isMac() {
  return testPlatform(/^Mac/);
}

function testPlatform(re: RegExp) {
  return re.test(window.navigator.userAgentData?.platform ?? '');
}
