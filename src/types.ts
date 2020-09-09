export interface ContextProps {
  lang: string;
  langs: string[];
  text: any;
  changeLang: (lang: string) => void;
}

export interface ResponseInterface {
  t: any;
  lang: string;
  langs: string[];
  changeLang: (lang: string) => void;
}
