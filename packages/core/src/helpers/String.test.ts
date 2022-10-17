import { count, isValidEmail } from './String';

describe('String.ts', () => {
  describe(isValidEmail.name, () => {
    test(`${isValidEmail.name}('taro.yamada@example.com') is valid`, () => {
      expect(isValidEmail('taro.yamada@example.com')).toBeTruthy();
    });

    test(`${isValidEmail.name}('taro_yamada@example.com') is valid`, () => {
      expect(isValidEmail('taro_yamada@email.com')).toBeTruthy();
    });

    test(`${isValidEmail.name}('taro-yamada@example.com') is valid`, () => {
      expect(isValidEmail('taro-yamada@email.com')).toBeTruthy();
    });

    // cSpell:disable
    test(`${isValidEmail.name}('ｔａｒｏ＠ｅｘａｍｐｌｅ．ｃｏｍ') is invalid`, () => {
      expect(isValidEmail('ｔａｒｏ＠ｅｘａｍｐｌｅ．ｃｏｍ')).toBeFalsy();
    });
    // cSpell:enable

    test(`${isValidEmail.name}('taro.example.com') is invalid`, () => {
      expect(isValidEmail('taro.example.com')).toBeFalsy();
    });

    test(`${isValidEmail.name}('taro@example.') is invalid`, () => {
      expect(isValidEmail('taro@example.')).toBeFalsy();
    });

    test(`${isValidEmail.name}('') is invalid`, () => {
      expect(isValidEmail('')).toBeFalsy();
    });
  });

  describe(count.name, () => {
    test(`${count.name}('hello, world!') === 13`, () => {
      expect(count('hello, world!')).toEqual(13);
    });

    test(`${count.name}('LegalForceキャビネ') === 14`, () => {
      expect(count('LegalForceキャビネ')).toEqual(14);
    });

    test(`${count.name}('こんにちは！\nさようなら！') === 13`, () => {
      expect(count('こんにちは！\nさようなら！')).toEqual(13);
    });

    test(`${count.name}('🍎は赤い') === 4`, () => {
      expect(count('🍎は赤い')).toEqual(4);
    });

    test(`${count.name}('') === 0`, () => {
      expect(count('')).toEqual(0);
    });
  });
});
