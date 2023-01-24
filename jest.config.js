module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'sourc'],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  testMatch: ['<rootDir>/tests/**/*.(test|spec).ts'],
  setupFiles: ['<rootDir>/tests/setupEnvs.ts'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/source/$1',
    '@test/(.*)': '<rootDir>/tests/$1',
    axios: 'axios/dist/node/axios.cjs',
  },
  restoreMocks: true,
};
