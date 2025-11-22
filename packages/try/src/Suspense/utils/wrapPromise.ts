import { type ErrorResult } from '@learn-react/core/src/api/common';

type Status = 'pending' | 'fulfilled' | 'rejected';

export function wrapPromise<T>(promise: Promise<T>) {
  let status: Status = 'pending';
  let result: T;
  let error: ErrorResult | undefined;

  const suspender = promise.then(
    (r: T) => {
      status = 'fulfilled';
      result = r;
    },
    // oxlint-disable-next-line catch-error-name
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
