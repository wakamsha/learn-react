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

type Status = 'pending' | 'fulfilled' | 'rejected';

function wrapPromise<T>(promise: Promise<T>) {
  let status: Status = 'pending';
  let result: T;
  let error: ErrorResult | undefined;

  const suspender = promise.then(
    (r: T) => {
      status = 'fulfilled';
      result = r;
    },
    (error_: unknown) => {
      status = 'rejected';
      error = error_ as ErrorResult;
    },
  );

  const read = () => {
    if (status === 'pending') {
      throw suspender;
    } else if (status === 'rejected') {
      throw { result, error };
    } else {
      return { result, error };
    }
  };

  return { read };
}

type User = {
  id: number;
  name: string;
  username?: string;
  email?: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone?: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  job?: string;
};

export function fetchUser(userId = 1) {
  const promise = request<User>({
    method: 'GET',
    path: `/users/${userId}`,
  });

  return wrapPromise<User>(promise);
}
