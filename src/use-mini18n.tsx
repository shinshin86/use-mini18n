import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from 'react';
import { ContextProps, ResponseInterface } from './types';
import { saveLangSetting, loadLangSetting } from './local-storage';

const Context = createContext({} as ContextProps);

export const TransProvider: React.FC<{
  i18n: any;
  defaultLang?: string;
  enableLocalStorage?: boolean;
  localStorageKey?: string;
  children: any;
}> = ({
  i18n,
  defaultLang: specifiedDefaultLang,
  enableLocalStorage = true,
  localStorageKey,
  children,
}) => {
  if (!i18n) {
    throw new Error('Resources of i18n are Required.');
  }

  if (
    typeof i18n !== 'object' ||
    !Object.keys(i18n)[0] ||
    Array.isArray(i18n)
  ) {
    throw new Error(
      'i18n file is not valid. See here for more information on the format: https://github.com/shinshin86/use-mini18n#usage'
    );
  }

  const DEFAULT_LANG = Object.keys(i18n)[0];

  const langs: string[] = Object.keys(i18n);

  const [lang, setLang] = useState(
    specifiedDefaultLang && langs.includes(specifiedDefaultLang)
      ? specifiedDefaultLang
      : DEFAULT_LANG
  );
  const [text, setText] = useState<any>(i18n[lang]);

  const changeLang = (lang: string): void => {
    if (enableLocalStorage) {
      saveLangSetting(window, lang, localStorageKey);
    }

    setLang(lang);
    setText(i18n[lang]);
  };

  const getText = useCallback(
    (key: string, params: any): string => {
      let t: string = text[key];
      if (!t) throw new Error('use-mini18n error: Not found key');

      for (const k of Object.keys(params)) {
        const r = `{${k}}`;
        t = t.replace(r, params[k]);
      }

      return t;
    },
    [text]
  );

  useEffect(() => {
    const defaultLang =
      (enableLocalStorage && loadLangSetting(window, langs, localStorageKey)) ||
      DEFAULT_LANG;

    const initLang =
      specifiedDefaultLang && langs.includes(specifiedDefaultLang)
        ? specifiedDefaultLang
        : defaultLang;

    changeLang(initLang);
  }, []);

  return (
    <Context.Provider
      value={{
        lang,
        langs,
        text,
        changeLang,
        getText,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useI18n = (): ResponseInterface => {
  const { text: t, lang, langs, changeLang, getText } = useContext(Context);
  return { t, lang, langs, changeLang, getText };
};
