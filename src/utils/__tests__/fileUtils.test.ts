import { isFile, getFileExtension } from '../fileUtils';

describe('isFile', () => {
  it('should return true if provided value is an instance of File', () => {
    const file = new File([], 'my_file.pdf');
    expect(isFile(file)).toBe(true);
  });

  it('should return false if provided value is not an instance of File', () => {
    const file = 'my_file.pdf';
    expect(isFile(file)).toBe(false);
  });
});

describe('getFileExtension', () => {
  it('should return file extention from File name', () => {
    const file = new File([], 'my_file.pdf');
    expect(getFileExtension(file)).toBe('pdf');
  });

  it('should return undefined if file name dont have Extension', () => {
    const file = new File([], 'my_file');
    expect(getFileExtension(file)).toBe(undefined);
  });
});

// describe('getExtension', () => {
//   it('should return file extention from File name', () => {
//     const file = new File([], 'my_file.pdf');
//     expect(getExtension(file)).toBe('pdf');
//   });

//   it('should return undefined if file name dont have Extension', () => {
//     const file = new File([], 'my_file');
//     expect(getExtension(file)).toBe(undefined);
//   });
// });
