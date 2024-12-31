export const routes = {
  Home: {
    Path: '/',
    To: '/',
  },
  About: {
    Path: '/about',
    To: '/about',
  },
  Beatles: {
    To: '/beatles',
    // ネストされたページを表示するためには、`*` を含める。
    // これにより `/beatles/john-lennon` などの URL にもマッチする。
    Path: '/beatles/*',
  },
  Zeppelin: {
    To: '/zeppelin',
    Path: '/zeppelin/*',
  },
} as const;
