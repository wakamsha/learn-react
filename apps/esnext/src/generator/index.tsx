import {
  requestGetPlaceholderUsers,
  requestGetRandomUser,
  type PlaceholderUser,
  type RandomUserResponse,
} from './apiClient';

function p(string_: string, delay = 1000): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(string_);
    }, delay);
  });
}

function* gfn(): IterableIterator<Promise<string>> {
  yield p('Async 1', 1000);
  yield p('Async 2', 3000);
  yield p('Async 3', 500);
}

// https://blog.htmlhifive.com/2017/04/05/es6-yield/
function loop<T>(g: IterableIterator<Promise<T>>) {
  const p = g.next();
  if (p.done) return;
  // eslint-disable-next-line @typescript-eslint/no-floating-promises, promise/catch-or-return
  p.value.then((value) => {
    console.info(value);
    loop(g);
  });
}

function* connectRandomUserAPI(): IterableIterator<Promise<RandomUserResponse>> {
  yield requestGetRandomUser();
}

function* connectPlaceholderUsersAPI(): IterableIterator<Promise<PlaceholderUser[]>> {
  yield requestGetPlaceholderUsers();
}

/**
 * generator のデモを実行する。
 */
export function runGenerator() {
  const g = gfn();
  loop<string>(g);
  console.info('Sync 1');

  loop<PlaceholderUser[]>(connectPlaceholderUsersAPI());
  loop<Record<string, unknown>>(connectRandomUserAPI());
}
