/**
 * Utils
 */
import { createPromise, CancelablePromise } from './promiseUtils';

export const fetchFile = (fileUrl: string) => {
  const { signal, abort: abortFetch } = new AbortController();

  const fetchPromise = createPromise<ArrayBuffer>();

  fetch(fileUrl, { signal })
    .then(response => response.arrayBuffer())
    .then(data => fetchPromise.resolve(data));

  return Promise.resolve([
    fetchPromise.promise,
    (reason: any) => {
      abortFetch();
      abort(fetchPromise, reason);
    },
  ] as const);
};

const abort = (promise: CancelablePromise<any>, reason: any) => {
  promise.reject(reason);
};
