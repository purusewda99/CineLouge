/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testMatch: [
    "**/tests/**/*.[jt]s?(x)", 
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
};