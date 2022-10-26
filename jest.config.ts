import { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

const config: Config = {
  passWithNoTests: true,
  preset: 'ts-jest',
  rootDir: './',
  testRegex: '.(spec|test).(ts|tsx)$',
  testEnvironment: 'node', // "jsdom" for react
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
  transform: {
    '^.+.(png|svg|jpg|gif|webp)$': 'jest-transform-stub',
  },
};

export default config;
