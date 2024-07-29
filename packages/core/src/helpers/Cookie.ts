type Cookie = {
  cname: string;
  cvalue: string;
  domain?: string;
  expireAt?: Date;
};

/**
 * Cookie に任意の値を保存します。
 * 指定したキーが既に存在する場合は、新しい値で上書きします。
 */
export function setCookie({ cname, cvalue, expireAt, domain = '.wakamsha.net' }: Cookie) {
  const segments: Record<string, string> = {};
  segments[cname] = cvalue;
  segments.path = '/';

  if (domain) {
    segments.domain =
      window.location.hostname === 'localhost' || window.location.hostname.includes('192.168.')
        ? window.location.hostname
        : domain;
  }

  if (window.location.protocol === 'https:') {
    segments.secure = '';
  }

  if (expireAt) {
    segments.expires = expireAt.toUTCString();
  }

  document.cookie = Object.keys(segments)
    .map((key) => (segments[key] === '' ? `${key}=` : `${key}=${segments[key]}`))
    .join('; ');
}

/**
 * Cookie から任意の値を取得します。
 *
 * @param cname - 取得したい値のキー
 */
export function getCookie(cname: string): string | undefined {
  const sensor = `${cname}=`;
  const segments = document.cookie.split(';');

  for (const segment of segments) {
    let pair = segment;
    while (pair.startsWith(' ')) {
      pair = pair.slice(1);
    }
    if (pair.startsWith(sensor)) {
      return pair.slice(sensor.length, pair.length);
    }
  }
  return undefined;
}

/**
 * Cookie から任意の値を削除します。
 *
 * @param cname - 削除したい値のキー
 */
export function destroyCookie(cname: string) {
  setCookie({ cname, cvalue: '', expireAt: new Date(0) });
}
