import React, { useState, useEffect, useContext, createContext } from 'react';
import { ContextProps, ResponseInterface } from './types';

const Context = createContext({} as ContextProps);

const detectBrowserLanguage = (navigator: any): string => {
  return (
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage ||
    navigator.browserLanguage
  );
};

const loadLangSetting = (window: any, langs: string[]): string | false => {
  let loadedLang = '';

  try {
    loadedLang =
      (window.localStorage && window.localStorage.getItem('lang')) ||
      detectBrowserLanguage(window.navigator);
  } catch (err) {
    console.error(err);
  }

  return langs.includes(loadedLang) && loadedLang;
};

const saveLoadSetting = (lang: string, window: any): void => {
  try {
    window.localStorage && window.localStorage.setItem('lang', lang);
  } catch (err) {
    console.error(err);
  }
};

export const TransProvider: React.FC<{
  i18n: any;
  defaultLang?: string;
  children: any;
}> = ({ i18n, defaultLang, children }) => {
  if (!i18n) {
    throw new Error('Resources of i18n are Required.');
  }

  const DEFAULT_LANG = Object.keys(i18n)[0];

  const langs: string[] = Object.keys(i18n);

  const [lang, setLang] = useState(
    defaultLang && langs.includes(defaultLang) ? defaultLang : DEFAULT_LANG
  );
  const [text, setText] = useState<any>(i18n[lang]);

  const changeLang = (lang: string): void => {
    saveLoadSetting(lang, window);
    setLang(lang);
    setText(i18n[lang]);
  };

  useEffect(() => {
    const initLang =
      defaultLang && langs.includes(defaultLang)
        ? defaultLang
        : loadLangSetting(window, langs) || DEFAULT_LANG;
    changeLang(initLang);
  }, []);

  return (
    <Context.Provider
      value={{
        lang,
        langs,
        text,
        changeLang,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useI18n = (): ResponseInterface => {
  const { text: t, lang, langs, changeLang } = useContext(Context);
  return { t, lang, langs, changeLang };
};
