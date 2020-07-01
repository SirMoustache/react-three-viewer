export type CancelablePromise<T> = {
  resolve: (value: T | PromiseLike<T> | undefined) => void;
  reject: (reason: any) => void;
  promise: Promise<T>;
};

export const createPromise = <T>(): CancelablePromise<T> => {
  let resolve: any;
  let reject: any;

  const promise = new Promise<T>((promiseResolve, promiseReject) => {
    resolve = promiseResolve;
    reject = promiseReject;
  });

  return { promise, resolve, reject };
};
