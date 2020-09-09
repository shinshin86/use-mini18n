import React, { useState, useEffect, useContext, createContext } from 'react';
import { ContextProps, ResponseInterface } from './types';
const DEFAULT_LANG = 'en';

const Context = createContext({} as ContextProps);

const detectBrowserLanguage = (navigator: any): string => {
  return (
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage ||
    navigator.browserLanguage
  );
};

const loadLangSetting = (window: any, langs: string[]): string => {
  const loadedLang =
    window.localStorage.getItem('lang') ||
    detectBrowserLanguage(window.navigator);

  const lang = langs.includes(loadedLang) ? loadedLang : DEFAULT_LANG;
  return lang;
};

const saveLoadSetting = (lang: string, window: any): void => {
  window.localStorage.setItem('lang', lang);
};

export const TransProvider: React.FC<{
  i18n: any;
  defaultLang?: string;
  children: any;
}> = ({ i18n, defaultLang, children }) => {
  if (!i18n) {
    throw new Error('Resources of i18n are Required.');
  }

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
    changeLang(loadLangSetting(window, langs));
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
