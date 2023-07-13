/**
 * 実行環境が macOS なら `true` を返します。
 */
export function isMac() {
  return testPlatform(/^Mac/);
}

function testPlatform(re: RegExp) {
  return typeof window !== 'undefined' && window.navigator != null ? re.test(window.navigator.platform) : false;
}
