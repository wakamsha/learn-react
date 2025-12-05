// oxlint-disable valid-title
import { nonNull } from './Type';

describe('Type.ts', () => {
  describe(nonNull.name, () => {
    test(`['🍎', undefined, '🍊', null, '🍇'].filter(nonNull) === ['🍎', '🍊', '🍇']`, () => {
      expect(['🍎', undefined, '🍊', null, '🍇'].filter(nonNull)).toEqual(['🍎', '🍊', '🍇']);
    });
  });
});
