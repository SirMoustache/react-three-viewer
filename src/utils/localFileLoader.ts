/**
 * Utils
 */
import { createPromise, CancelablePromise } from './promiseUtils';

export const loadFile = (
  file: File,
): Promise<
  [CancelablePromise<string | ArrayBuffer | null>, ((reason: any) => void)]
> => {
  const reader = new FileReader();
  const readerPromise = createPromise<string | ArrayBuffer | null>();

  reader.addEventListener('error', () => {
    //= new Error(`Error while reading File ${file.name}`)
    const error =
      reader.error || new Error(`Error while reading File ${file.name}`);
    readerPromise.reject(error);
  });

  reader.addEventListener(
    'load',
    () => {
      const data = reader.result;
      // const fileObject = new FileObject(file, data);
      readerPromise.resolve(data);
    },
    false,
  );

  //reader.readAsText(file);
  reader.readAsArrayBuffer(file);

  return Promise.resolve([
    readerPromise,
    (reason: any) => abort(reader, readerPromise, reason),
  ]);
};

const abort = (
  reader: FileReader,
  promise: CancelablePromise<any>,
  reason: any,
) => {
  reader.abort();
  promise.reject(reason);
};
