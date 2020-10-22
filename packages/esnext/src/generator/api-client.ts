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
    await res.json().catch(err => {
      console.info('ここでエラー処理をしてください');
      throw new Error(err);
    });
  }
  return res.json().then(res => res);
}

export async function requestGetRandomUser(): Promise<any> {
  const url = 'https://randomuser.me/api/';
  return request<any>(url).then(res => res.results);
}

export function requestGetPlaceholderUsers(): Promise<PlaceholderUser[]> {
  const url = 'http://jsonplaceholder.typicode.com/users';
  return request<PlaceholderUser[]>(url);
}
