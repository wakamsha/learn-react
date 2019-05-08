import { CreateUserRequest, CreateUserResponse, User } from './model';

async function request<REQ extends {}, RES>(
  method: 'GET' | 'POST',
  path: string,
  {
    send,
  }: {
    send?: REQ;
  },
): Promise<RES> {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const url = `https://jsonplaceholder.typicode.com${path}`;
  const res = await fetch(url, {
    headers,
    method,
    ...(send ? { body: JSON.stringify(send) } : {}),
  });
  if (!res.ok) {
    console.log('ここでエラー処理をしてください');
    throw new Error(res.statusText);
  }
  return await res.json();
}

export async function requestGetUsers(): Promise<User[]> {
  return request<{}, User[]>('GET', '/users', {});
}

export async function requestGetUser({ path }: { path: string }): Promise<User> {
  return request<{}, User>('GET', `/users/${path}`, {});
}

export async function requestPostUser({ send }: { send: CreateUserRequest }): Promise<CreateUserResponse> {
  return request<CreateUserRequest, CreateUserResponse>('POST', '/users', {
    send,
  });
}
