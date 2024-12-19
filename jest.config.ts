/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
require('dotenv').config();
import type { Config } from 'jest';
import { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}]
  },
  moduleNameMapper: {
    '^@api(.*)$': '<rootDir>/src/utils/burger-api.ts'
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'node'
};

export default config;
