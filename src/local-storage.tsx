const DEFAULT_LOCAL_STORAGE_KEY = 'lang';

export const saveLangSetting = (
  window: any,
  lang: string,
  key?: string
): void => {
  try {
    window.localStorage &&
      window.localStorage.setItem(key || DEFAULT_LOCAL_STORAGE_KEY, lang);
  } catch (err) {
    console.error(err);
  }
};

const detectBrowserLanguage = (navigator: any): string => {
  return (
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage ||
    navigator.browserLanguage
  );
};

export const loadLangSetting = (
  window: any,
  langs: string[],
  key?: string
): string | false => {
  let loadedLang = '';

  try {
    loadedLang =
      (window.localStorage &&
        window.localStorage.getItem(key || DEFAULT_LOCAL_STORAGE_KEY)) ||
      detectBrowserLanguage(window.navigator);
  } catch (err) {
    console.error(err);
  }

  return langs.includes(loadedLang) && loadedLang;
};
