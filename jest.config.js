module.exports = {
  preset: 'ts-jest',
  // transform: {
  //   '^.+\\.tsx?$': 'ts-jest',
  // },
  // transform: {
  //   '^.+\\.jsx?$': 'babel-jest',
  //   '^.+\\.tsx?$': 'ts-jest',
  // },
  transform: {
    '^.+\\.(js|ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json',
    },
  },
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  // moduleDirectories: ['node_modules', 'node_modules/three/src/examples/jsm/'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!three).+\\.js$'],
  moduleNameMapper: {
    'three/examples/jsm/controls/OrbitControls':
      '<rootDir>/node_modules/three/examples/jsm/controls/OrbitControls',
  },
  setupFiles: ['jest-canvas-mock'],
  // testPathIgnorePatterns: [
  //   '<rootDir>//node_modules/',
  //   '<rootDir>/example',
  //   '<rootDir>/build',
  // ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
