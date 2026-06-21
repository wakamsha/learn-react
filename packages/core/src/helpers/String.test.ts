import { count, isValidEmail } from './String';

describe('string.ts', () => {
  describe(isValidEmail, () => {
    it(`${isValidEmail.name}('taro.yamada@example.com') is valid`, () => {
      expect(isValidEmail('taro.yamada@example.com')).toBeTruthy();
    });

    it(`${isValidEmail.name}('taro_yamada@example.com') is valid`, () => {
      expect(isValidEmail('taro_yamada@email.com')).toBeTruthy();
    });

    it(`${isValidEmail.name}('taro-yamada@example.com') is valid`, () => {
      expect(isValidEmail('taro-yamada@email.com')).toBeTruthy();
    });

    // cSpell:disable
    it(`${isValidEmail.name}('ｔａｒｏ＠ｅｘａｍｐｌｅ．ｃｏｍ') is invalid`, () => {
      expect(isValidEmail('ｔａｒｏ＠ｅｘａｍｐｌｅ．ｃｏｍ')).toBeFalsy();
    });
    // cSpell:enable

    it(`${isValidEmail.name}('taro.example.com') is invalid`, () => {
      expect(isValidEmail('taro.example.com')).toBeFalsy();
    });

    it(`${isValidEmail.name}('taro@example.') is invalid`, () => {
      expect(isValidEmail('taro@example.')).toBeFalsy();
    });

    it(`${isValidEmail.name}('') is invalid`, () => {
      expect(isValidEmail('')).toBeFalsy();
    });
  });

  describe(count, () => {
    it(`${count.name}('hello, world!') === 13`, () => {
      expect(count('hello, world!')).toBe(13);
    });

    it(`${count.name}('Always問題ない') === 10`, () => {
      expect(count('Always問題ない')).toBe(10);
    });

    it(`${count.name}('こんにちは！\nさようなら！') === 13`, () => {
      expect(count('こんにちは！\nさようなら！')).toBe(13);
    });

    it(`${count.name}('🍎は赤い') === 4`, () => {
      expect(count('🍎は赤い')).toBe(4);
    });

    it(`${count.name}('') === 0`, () => {
      expect(count('')).toBe(0);
    });
  });
});
