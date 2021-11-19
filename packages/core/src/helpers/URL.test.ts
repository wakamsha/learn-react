import { generatePath } from './URL';

describe('URL.ts', () => {
  describe(generatePath.name, () => {
    test(`${generatePath.name}('/user/:id/:entity', { id: 1, entity: 'posts' }) === '/user/1/posts'`, () => {
      expect(generatePath('/user/:id/:entity', { id: 1, entity: 'posts' })).toEqual('/user/1/posts');
    });
  });
});
