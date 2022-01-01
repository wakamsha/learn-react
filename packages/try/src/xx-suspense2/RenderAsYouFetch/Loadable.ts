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
  private state: LoadableState<T>;

  constructor(promise: Promise<T>) {
    this.state = {
      status: 'pending',
      promise: promise.then(
        data => {
          this.state = {
            data,
            status: 'fulfilled',
          };
          return data;
        },
        error => {
          this.state = {
            error,
            status: 'rejected',
          };
          throw error;
        },
      ),
    };
  }

  public getOrThrow() {
    switch (this.state.status) {
      case 'pending':
        throw this.state.promise;
      case 'fulfilled':
        return this.state.data;
      case 'rejected':
        throw this.state.error;
    }
  }
}
