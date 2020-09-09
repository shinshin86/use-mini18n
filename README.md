# use-mini18n

A simple and minimalistic React hook library for i18n.
It is simple but not full of features.
In that case, I would recommend using another library for i18n.



## Install

```bash
npm insatll shinshin86/use-mini18n
# or
yarn add shinshin86/use-mini18n
```



## Usage

This is an example using [Next.js](https://github.com/vercel/next.js/).

```jsx
// pages/_app.jsx
import { TransProvider } from 'use-mini18n';
import i18n from '../i18n';

export default function MyApp({ Component, pageProps }) {
  return (
    <TransProvider i18n={i18n}>
      <Component {...pageProps} />
    </TransProvider>
  );
}
```



This sets the language information required for `i18n.js`.

```js
// i18n.js
const i18n = {
  en: {
    "Hello Next.js": "Hello Next.js"
  },
  ja: {
    "Hello Next.js": "こんにちは Next.js"
  }
};
  
export default i18n;
```



Use `useI18n`.

* `t` refers to text with selected language.
* `lang` returns the currently selected language.
* `langs` returns a list of language information set in `i18n.js`.
* Change to another language using the `changeLang` function.

```jsx
// pages/index.jsx
import Layout from '../components/Layout';
import { useI18n } from 'use-mini18n';

const IndexPage = () => {
  const { t, lang, langs, changeLang } = useI18n();

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>{t['Hello Next.js']} 👋</h1>
      <p>Selected Language: {lang}</p>
      <select
        name="lang"
        onChange={({ target }) => changeLang(target.value)}
        value={lang}
      >
        {langs.map((l, i) => (
          <option value={l} key={i}>
            {l}
          </option>
        ))}
      </select>
    </Layout>
  );
};

export default IndexPage;

```



## Store selected language

`use-mini18n` stores the selected language information in `localStorage`.

![Screen shot of about of store selected language](./images/store-selected-language.png)