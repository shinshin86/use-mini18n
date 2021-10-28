export const saveLangSetting = (
  window: any,
  lang: string,
  key: string
): void => {
  try {
    window.localStorage && window.localStorage.setItem(key, lang);
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
      (window.localStorage && window.localStorage.getItem(key)) ||
      detectBrowserLanguage(window.navigator);
  } catch (err) {
    console.error(err);
  }

  return langs.includes(loadedLang) && loadedLang;
};
