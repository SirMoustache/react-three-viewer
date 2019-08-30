/**
 * Utils
 */
import { createPromise } from './promiseUtils';

export const fetchFile = (fileUrl: string) => {
  const fetchPromise = createPromise<ArrayBuffer>();
  fetch(fileUrl)
    .then(response => response.arrayBuffer())
    .then(data => fetchPromise.resolve(data));

  return Promise.resolve([fetchPromise]);
};
