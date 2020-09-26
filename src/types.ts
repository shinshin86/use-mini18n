export interface ContextProps {
  lang: string;
  langs: string[];
  text: any;
  changeLang: (lang: string) => void;
  getText: (key: string, params: any) => string;
}

export interface ResponseInterface {
  t: any;
  lang: string;
  langs: string[];
  changeLang: (lang: string) => void;
  getText: (key: string, params: any) => string;
}
