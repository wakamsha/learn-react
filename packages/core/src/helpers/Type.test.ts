import { nonNull } from './Type';

describe('type.ts', () => {
  describe(nonNull, () => {
    it(`['🍎', undefined, '🍊', null, '🍇'].filter(nonNull) === ['🍎', '🍊', '🍇']`, () => {
      expect(['🍎', undefined, '🍊', null, '🍇'].filter(nonNull)).toStrictEqual(['🍎', '🍊', '🍇']);
    });
  });
});
