/**
 * Absolute imports
 */
import URI from 'urijs';

export const isFile = (file: unknown): file is File => file instanceof File;

export const getFileExtension = (file: File) => {
  const { name } = file;

  if (!name) {
    return undefined;
  }

  const fileNameParts = name.split('.');

  if (fileNameParts.length < 2) {
    return undefined;
  }

  return fileNameParts.pop();
};

export const getExtension = (file: File | string) => {
  if (isFile(file)) {
    return getFileExtension(file);
  }

  if (typeof file === 'string') {
    return URI(file)
      .suffix()
      .toLowerCase();
  }

  throw new Error('Failed to get File Extension');
};

export const getFileParseResultType = (extension: string) => {
  const extensionParseResultType = {
    zip: 'arraybuffer',
    stl: 'arraybuffer',
    obj: 'arraybuffer',
    png: 'blob',
    jpg: 'blob',
    jpeg: 'blob',
  };

  return extensionParseResultType[extension] || 'string';
};

export const arrayBufferToNumber = (buffer: ArrayBuffer) => {
  const bytes = new Uint8Array(buffer);
  const dv = new DataView(bytes.buffer);
  return dv.getUint16(0, true);
};

export const arrayBufferToString = (buffer: ArrayBuffer) => {
  // const nufferAsNumber = arrayBufferToNumber(buf);
  // return String.fromCharCode.apply(null, nufferAsNumber);
  // const bytes = new Uint16Array(buffer);
  // return String.fromCharCode.apply(null, bytes as any);
  const encoding = 'utf8';
  return Buffer.from(buffer).toString(encoding);
};

// function str2ab(str: any) {
//   var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
//   var bufView = new Uint16Array(buf);
//   for (var i = 0, strLen = str.length; i < strLen; i++) {
//     bufView[i] = str.charCodeAt(i);
//   }
//   return buf;
// }
