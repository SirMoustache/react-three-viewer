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
