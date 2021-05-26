import { stringify } from 'qs';

export type Error = {
  conditions: string[];
};

export type ErrorResult = {
  code: number;
  message: string;
  errors: Error[];
};

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export async function request<REQ extends {}, RES>({
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
  query?: any;
  withCredentials: boolean;
}): Promise<RES> {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const queryStrings = Object.keys(query).length ? `?${stringify(query)}` : '';
  const url = `https://jsonplaceholder.typicode.com${path}${queryStrings}`;
  const res = await fetch(url, {
    headers,
    method,
    credentials: withCredentials ? 'include' : 'omit',
    ...(send ? { body: JSON.stringify(send) } : {}),
  });
  if (!res.ok) {
    console.info('ここでエラー処理をしてください');
    const error = await res.json();
    throw {
      code: res.status,
      ...error,
    };
  }
  return res.json();
}
