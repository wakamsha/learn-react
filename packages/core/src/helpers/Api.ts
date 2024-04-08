import { stringify } from 'qs';

/**
 * エラーの詳細。
 */
export type Error = {
  /**
   * 発生したエラーにおける詳細を説明するメッセージの一覧。
   */
  conditions: string[];
};

/**
 * API 疎通中に発生したエラーの詳細。
 */
export type ErrorResult = {
  /**
   * エラーの種別を分類するためのコード。
   */
  code: number;
  /**
   * エラーの概要を説明するメッセージ文。
   */
  message: string;
  /**
   * 発生したエラーの詳細一覧。
   */
  errors: Error[];
};

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * JSON Placeholder の任意のエンドポイントと REST で疎通します。
 */
export async function request<REQ extends Record<string, unknown>, RES>({
  method,
  path,
  token,
  send,
  query = {},
  withCredentials,
}: {
  method: Method;
  path: string;
  token?: string;
  send?: REQ;
  query?: Record<string, unknown>;
  withCredentials: boolean;
}): Promise<RES> {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const queryStrings = Object.keys(query).length ? `?${stringify(query)}` : '';
  const url = `https://jsonplaceholder.typicode.com${path}${queryStrings}`;

  const response = await fetch(url, {
    headers,
    method,
    credentials: withCredentials ? 'include' : 'omit',
    ...(send ? { body: JSON.stringify(send) } : {}),
  });

  if (!response.ok) {
    // 共通のエラー処理があれば、ここに実装する。
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const error = await response.json();
    throw {
      code: response.status,
      ...error,
    };
  }

  return response.json().then((res) => res as RES);
}
