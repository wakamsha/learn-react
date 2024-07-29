import { stringify } from 'qs';
import { type CreateUserRequest, type CreateUserResponse, type User } from './model';

export type Error = {
  conditions: string[];
};

export type ErrorResult = {
  code: number;
  message: string;
  errors: Error[];
};

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

async function request<REQ extends Record<string, unknown>, RES>({
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

export async function requestGetUsers(): Promise<User[]> {
  return request<Record<string, unknown>, User[]>({
    method: 'GET',
    path: '/users',

    withCredentials: false,
  });
}

export async function requestGetUser({ path }: { path: string }): Promise<User> {
  return request<Record<string, unknown>, User>({
    method: 'GET',
    path: `/users/${path}`,

    withCredentials: false,
  });
}

export async function requestPostUser({ send }: { send: CreateUserRequest }): Promise<CreateUserResponse> {
  return request<CreateUserRequest, CreateUserResponse>({
    method: 'POST',
    path: '/users',

    send,
    withCredentials: false,
  });
}
