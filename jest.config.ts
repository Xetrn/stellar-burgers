import type { Config } from 'jest';

const config: Config = {
  moduleNameMapper: {
    '^@slices$': '<rootDir>/src/services/slices',
    '^@pages$': '<rootDir>/src/pages',
    '^@components$': '<rootDir>/src/components',
    '^@ui$': '<rootDir>/src/components/ui',
    '^@ui-pages$': '<rootDir>/src/components/ui/pages',
    '^@utils-types$': '<rootDir>/src/utils/types',
    '^@api$': '<rootDir>/src/utils/burger-api.ts',
    '^@selectors$': '<rootDir>/src/services/selectors'
  },
  testEnvironment: 'jsdom'
};

export default config;
