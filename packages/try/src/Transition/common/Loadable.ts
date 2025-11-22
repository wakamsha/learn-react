type LoadableState<T> =
  | {
      status: 'pending';
      promise: Promise<T>;
    }
  | {
      status: 'fulfilled';
      data: T;
    }
  | {
      status: 'rejected';
      error: unknown;
    };

/**
 * `Loadable` は、非同期で取得するデータを同期的に参照できるようにする
 * Promise のラッパークラスです。
 *
 * 当クラスは、Suspense for Data Fetching 用途で使用します。
 *
 * @param promise - 取得するデータの Promise オブジェクト
 *
 * @typeParam T - 非同期で取得するデータの型
 */
export class Loadable<T> {
  #state: LoadableState<T>;

  constructor(promise: Promise<T>) {
    this.#state = {
      status: 'pending',
      promise: promise.then(
        (data) => {
          this.#state = {
            data,
            status: 'fulfilled',
          };
          return data;
        },
        (error: unknown) => {
          this.#state = {
            error,
            status: 'rejected',
          };
          throw error;
        },
      ),
    };
  }

  /**
   * `new Loadable` の代わりに使用することで
   * `Loadable` の内部に生成された Promise も一緒に取得します。
   *
   * @param promise - 取得するデータの Promise オブジェクト
   *
   * @returns       Loadable インスタンスとその内部の Promise オブジェクト。
   */
  static newAndGoPromise<T>(promise: Promise<T>): [Loadable<T>, Promise<T>] {
    const result = new Loadable(promise);

    if (result.#state.status !== 'pending') {
      throw new Error('Unreachable');
    }

    return [result, result.#state.promise];
  }

  /**
   * データが取得済みならそのデータを返し、
   * 取得に失敗した場合は、そのエラーを投げます。
   * データ未取得（Promise が未解決）の場合は、その Promise を投げます。
   */
  getOrThrow() {
    switch (this.#state.status) {
      case 'pending':
        throw this.#state.promise;
      case 'fulfilled':
        return this.#state.data;
      case 'rejected':
        throw this.#state.error;
    }
  }
}
