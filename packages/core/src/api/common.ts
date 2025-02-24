import { stringify } from 'qs';

/**
 * Error.
 */
export type Error = {
  /**
   * Each error message which is related to the request.
   */
  conditions: string[];
};

/**
 * Error result.
 */
export type ErrorResult = {
  /**
   * Error code.
   */
  code: number;
  /**
   * Error message.
   */
  message: string;
  /**
   * Errors.
   */
  errors: Error[];
};

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * Request to the server.
 */
export async function request<RES>({
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
  send?: Record<string, unknown>;
  query?: Record<string, unknown>;
  withCredentials: boolean;
}) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const queryStrings = Object.keys(query).length > 0 ? `?${stringify(query)}` : '';

  const url = `https://jsonplaceholder.typicode.com${path}${queryStrings}`;

  const result = await fetch(url, {
    headers,
    method,
    credentials: withCredentials ? 'include' : 'omit',
    ...(send ? { body: JSON.stringify(send) } : {}),
  });

  if (!result.ok) {
    console.info('ここでエラー処理をしてください');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const error = await result.json();
    throw {
      code: result.status,
      ...error,
    };
  }

  return result.json().then((response) => response as RES);
}
