export const loacalFileLoader = () => {};

type CancelablePromise = {
  resolve: (value?: {} | PromiseLike<{}> | undefined) => void;
  reject: (reason?: any) => void;
  promise: Promise<any>;
};

export const createPromise = (): CancelablePromise => {
  let resolve: any;
  let reject: any;
  const promise = new Promise((promiseResolve, promiseReject) => {
    resolve = promiseResolve;
    reject = promiseReject;
    promiseResolve();
  });

  return { promise, resolve, reject };
};

export const load = file => {
  const reader = new FileReader();
  const prom = createPromise();
  prom.reject();
};
