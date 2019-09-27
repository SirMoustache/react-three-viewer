import * as THREE from 'three';

/**
 * Utils
 */
import { createPromise, CancelablePromise } from './promiseUtils';
import { getFileParseResultType, getExtension } from './fileUtils';

export const fetchFile = (fileUrl: string) => {
  const fetchPromise = createPromise<string | ArrayBuffer | null>();
  const extension = getExtension(fileUrl);

  const responseType =
    getFileParseResultType(extension) === 'arraybuffer'
      ? 'arraybuffer'
      : 'text';

  const loader = new THREE.FileLoader();
  loader.setResponseType(responseType);

  const loadRequest = loader.load(
    fileUrl,
    data => {
      // const fileObject = new FileObject(fileUrl, data);
      fetchPromise.resolve(data);
    },
    () => {},
    error => {
      fetchPromise.reject(error);
    },
  );

  return Promise.resolve([
    fetchPromise,
    (reason: any) => abort(loadRequest, fetchPromise, reason),
  ] as const);
};

const abort = (reader: any, promise: CancelablePromise<any>, reason: any) => {
  reader.abort();
  promise.reject(reason);
};

export default class UrlLoader {
  constructor() {
    this.loader = null;
    this.loaderPromise = null;
    this.request = null;
  }

  /**
   * @method
   * @param {string} url URL to file
   * @returns {Promise<ArrayBuffer>} returns Promise with ArrayBuffer of loaded file
   */
  load(fileUrl) {
    const extension = fileUtils.getFileExtension(fileUrl);
    const responseType =
      fileUtils.getFileParseResultType(extension) === 'arraybuffer'
        ? 'arraybuffer'
        : 'text';
    this.loader = new THREE.FileLoader();
    this.loader.setResponseType(responseType);

    this.loaderPromise = promiseUtils.createPromise();

    this.request = this.loader.load(
      fileUrl,
      data => {
        const fileObject = new FileObject(fileUrl, data);
        this.loaderPromise.resolve(fileObject);
      },
      () => {},
      error => {
        this.loaderPromise.reject(error);
      },
    );
    return this.loaderPromise.promise;
  }

  abort(reason) {
    if (this.request) {
      this.request.abort();
      this.request = null;
    }
    if (this.loader) {
      this.request = null;
    }
    if (this.loaderPromise) {
      this.loaderPromise.reject(reason);
      this.loaderPromise = null;
    }
  }
}
