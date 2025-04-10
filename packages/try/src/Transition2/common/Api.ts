import { stringify } from 'qs';
import { Loadable } from './Loadable';

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
  const url = `https://api.github.com${path}${queryStrings}`;

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

const dataMap = new Map<string, unknown>();

export function useData<T, P>(cacheKey: string, fetch: (p: P) => Promise<T>, prop: P): T {
  const cachedData = dataMap.get(cacheKey) as Loadable<T> | undefined;

  if (cachedData === undefined) {
    const [loadable, promise] = Loadable.newAndGoPromise(fetch(prop));
    dataMap.set(cacheKey, loadable);
    throw promise;
  }

  return cachedData.getOrThrow();
}

export type IssueType = {
  id: number;
  title: string;
  html_url: string;
  user: {
    id: number;
    login: string;
    html_url: string;
  };
};

export function fetchIssues(page: number) {
  return request<IssueType[]>({
    method: 'GET',
    path: '/repos/facebook/react/issues',
    query: {
      page,
      per_page: 10,
      state: 'all',
    },
  });
}
