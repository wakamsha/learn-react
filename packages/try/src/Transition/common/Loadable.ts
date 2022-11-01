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

export class Loadable<T> {
  #state: LoadableState<T>;

  constructor(promise: Promise<T>) {
    this.#state = {
      status: 'pending',
      promise: promise.then(
        data => {
          this.#state = {
            data,
            status: 'fulfilled',
          };
          return data;
        },
        error => {
          this.#state = {
            error,
            status: 'rejected',
          };
          throw error;
        },
      ),
    };
  }

  static newAndGoPromise<T>(promise: Promise<T>): [Loadable<T>, Promise<T>] {
    const result = new Loadable(promise);

    if (result.#state.status !== 'pending') {
      throw new Error('Unreachable');
    }

    return [result, result.#state.promise];
  }

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
