import { saveLangSetting, loadLangSetting } from '../dist/local-storage';
import { getLocalStorageMock } from 'local-storage-mock';

describe('local-storage', () => {
  describe('saveLangSetting', () => {
    test('Default key', () => {
      const window = {
        localStorage: getLocalStorageMock(),
      };

      saveLangSetting(window, 'en');
      expect(window.localStorage.getItem('lang')).toBe('en');

      saveLangSetting(window, 'ja');
      expect(window.localStorage.getItem('lang')).toBe('ja');
    });

    test('Specify key', () => {
      const window = {
        localStorage: getLocalStorageMock(),
      };

      saveLangSetting(window, 'en', 'testkey');
      expect(window.localStorage.getItem('testkey')).toBe('en');

      saveLangSetting(window, 'ja', 'testkey');
      expect(window.localStorage.getItem('testkey')).toBe('ja');
    });
  });

  describe('loadLangSetting', () => {
    test('Default key', () => {
      const window = {
        localStorage: getLocalStorageMock(),
      };
      const langs = ['en', 'ja'];

      saveLangSetting(window, 'en');
      expect(loadLangSetting(window, langs)).toBe('en');

      saveLangSetting(window, 'ja');
      expect(loadLangSetting(window, langs)).toBe('ja');
    });

    test('Specify key', () => {
      const window = {
        localStorage: getLocalStorageMock(),
      };
      const langs = ['en', 'ja'];

      saveLangSetting(window, 'en', 'testkey');
      expect(loadLangSetting(window, langs, 'testkey')).toBe('en');

      saveLangSetting(window, 'ja', 'testkey');
      expect(loadLangSetting(window, langs, 'testkey')).toBe('ja');
    });
  });
});
