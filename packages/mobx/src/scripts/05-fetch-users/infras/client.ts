import { User } from './model';

async function request<RES>(method: 'GET' | 'POST', path: string): Promise<RES> {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const url = `http://jsonplaceholder.typicode.com${path}`;
  const res = await fetch(url, {
    headers,
    method,
  });
  if (!res.ok) {
    await res.json().catch(err => {
      console.log('ここでエラー処理をしてください');
      throw new Error(err);
    });
  }
  return await res.json();
}

export async function requestGetUsers(): Promise<User[]> {
  return request<User[]>('GET', '/users');
}
