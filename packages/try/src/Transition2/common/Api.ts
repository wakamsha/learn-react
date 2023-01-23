import { stringify } from 'qs';
import { Loadable } from './Loadable';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

function request<REQ extends Record<string, unknown>, RES>({
  method,
  path,
  send,
  query = {},
}: {
  method: Method;
  path: string;
  send?: REQ;
  query?: Record<string, unknown>;
}): Promise<RES> {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const queryStrings = Object.keys(query).length ? `?${stringify(query)}` : '';
  const url = `https://api.github.com${path}${queryStrings}`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      headers,
      method,
      ...(send ? { body: JSON.stringify(send) } : {}),
    })
      .then(response => {
        if (!response.ok) {
          console.error('エラーレスポンス', response);
          reject(response);
        } else {
          response.json().then((data: RES) => {
            resolve(data);
          });
        }
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
}

const dataMap: Map<string, unknown> = new Map();

export function useData<T, P>(cacheKey: string, fetch: (p: P) => Promise<T>, prop: P): T {
  const cachedData = dataMap.get(cacheKey) as Loadable<any> | undefined;

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
  return request<Record<string, unknown>, IssueType[]>({
    method: 'GET',
    path: '/repos/facebook/react/issues',
    query: {
      page,
      per_page: 10,
      state: 'all',
    },
  });
}
