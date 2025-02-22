import { stringify } from 'qs';
import { type User } from './model';

export type Error = {
  conditions: string[];
};

export type ErrorResult = {
  code: number;
  message: string;
  errors: Error[];
};

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

function request<RES>({
  method,
  path,
  send,
  query = {},
}: {
  method: Method;
  path: string;
  send?: Record<string, unknown>;
  query?: Record<string, unknown>;
}): Promise<RES> {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const queryStrings = Object.keys(query).length > 0 ? `?${stringify(query)}` : '';
  const url = `https://jsonplaceholder.typicode.com${path}${queryStrings}`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      headers,
      method,
      ...(send ? { body: JSON.stringify(send) } : {}),
    })
      .then((response) => {
        if (!response.ok) {
          console.error('エラーレスポンス', response);
          reject(response);
        } else {
          response
            .json()
            .then((data: RES) => {
              resolve(data);
            })
            .catch((error: unknown) => {
              console.error(error);
              reject(error);
            });
        }
      })
      .catch((error: unknown) => {
        console.error(error);
        reject(error);
      });
  });
}

export async function requestGetUser({ path }: { path: string }): Promise<User> {
  return request<User>({
    method: 'GET',
    path: `/users/${path}`,
  });
}
