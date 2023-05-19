/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/src/**/*.test.+(ts|tsx|js)'],
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/lib/"],
};