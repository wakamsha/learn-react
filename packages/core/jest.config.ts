import type { JestConfigWithTsJest } from 'ts-jest';

export default {
  preset: 'ts-jest/presets/default-esm',
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
} as JestConfigWithTsJest;
