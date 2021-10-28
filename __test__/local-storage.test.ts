import { saveLangSetting, loadLangSetting } from '../dist/local-storage';
import { getLocalStorageMock } from 'local-storage-mock';

describe('local-storage', () => {
  describe('saveLangSetting', () => {
    test('When given a key that exists', () => {
      const window = {
        localStorage: getLocalStorageMock(),
      };

      saveLangSetting(window, 'en', 'testkey');
      expect(window.localStorage.getItem('testkey')).toBe('en');

      saveLangSetting(window, 'ja', 'testkey');
      expect(window.localStorage.getItem('testkey')).toBe('ja');
    });

    test('When a non-existent key is given', () => {
      const window = {
        localStorage: getLocalStorageMock(),
      };

      saveLangSetting(window, 'en', 'testkey');
      expect(window.localStorage.getItem('testkey2')).toBeNull();
    });
  });

  describe('loadLangSetting', () => {
    test('When given a key that exists', () => {
      const window = {
        localStorage: getLocalStorageMock(),
      };
      const langs = ['en', 'ja'];

      saveLangSetting(window, 'en', 'testkey');
      expect(loadLangSetting(window, langs, 'testkey')).toBe('en');

      saveLangSetting(window, 'ja', 'testkey');
      expect(loadLangSetting(window, langs, 'testkey')).toBe('ja');
    });

    test('When a non-existent key is given', () => {
      const window = {
        localStorage: getLocalStorageMock(),
      };
      const langs = ['en', 'ja'];

      saveLangSetting(window, 'en', 'testkey');
      expect(loadLangSetting(window, langs, 'testkey2')).toBeFalsy();

      saveLangSetting(window, 'ja', 'testkey');
      expect(loadLangSetting(window, langs, 'testkey2')).toBeFalsy();
    });
  });
});
