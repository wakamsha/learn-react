/* eslint-disable jsdoc/require-jsdoc */

export type PlaceholderUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type RandomUserResponse = {
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
  results: {
    gender: 'male' | 'female';
    name: {
      title: 'Ms' | 'Mr' | 'Miss' | 'Mrs' | 'Dr' | 'Prof' | 'Rev' | 'PhD';
      first: string;
      last: string;
    };
  }[];
};

async function request<ResponseType>(url: string): Promise<ResponseType> {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const res = await fetch(url, {
    headers,
    method: 'GET',
  });
  if (!res.ok) {
    await res.json().catch((err: unknown) => {
      console.info('ここでエラー処理をしてください');
      throw new Error(err as string);
    });
  }
  return res.json().then((res) => res as ResponseType);
}

/**
 * ユーザーデータをランダムに取得します。
 */
export async function requestGetRandomUser(): Promise<RandomUserResponse> {
  const url = 'https://randomuser.me/api/';
  return request<RandomUserResponse>(url);
}

/**
 * JSON Placeholder からユーザー一覧データを取得します。
 */
export function requestGetPlaceholderUsers(): Promise<PlaceholderUser[]> {
  const url = 'http://jsonplaceholder.typicode.com/users';
  return request<PlaceholderUser[]>(url);
}
