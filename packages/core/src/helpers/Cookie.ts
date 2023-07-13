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
  const segments: { [key: string]: string } = {};
  segments[cname] = cvalue;
  segments.path = '/';

  if (domain) {
    segments.domain =
      window.location.hostname === 'localhost' || /192\.168\./.test(window.location.hostname)
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
export function getCookie(cname: string): string | void {
  const sensor = `${cname}=`;
  const segments = document.cookie.split(';');

  for (let i = 0; i < segments.length; i++) {
    let pair = segments[i];
    while (pair[0] === ' ') {
      pair = pair.substring(1);
    }
    if (pair.indexOf(sensor) === 0) {
      return pair.substring(sensor.length, pair.length);
    }
  }
}

/**
 * Cookie から任意の値を削除します。
 *
 * @param cname - 削除したい値のキー
 */
export function destroyCookie(cname: string) {
  setCookie({ cname, cvalue: '', expireAt: new Date(0) });
}
