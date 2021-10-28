# use-mini18n

[![Build Status](https://travis-ci.org/shinshin86/use-mini18n.svg?branch=master)](https://travis-ci.org/shinshin86/use-mini18n)

![use-mini18n - logo image](./images/logo.png)

<p align="center">
  A <b>simple</b> and <b>minimalistic</b> React hook library for i18n.<br />
  It is simple but not full of features.<br />
  In that case, I would recommend using another library for i18n.
</p>

## Install

```bash
npm insatll use-mini18n
# or
yarn add use-mini18n
```

## Usage

This is an example using [Next.js](https://github.com/vercel/next.js/).

See also [examples](https://github.com/shinshin86/use-mini18n/tree/master/examples).

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
  /*
   * The first language will be set as the default language.
   * However, it is also possible to set the default language by specifying defaultLang.
   */
  en: {
    'Hello Next.js': 'Hello Next.js',
    'Hello someone': 'Hello {name1} and {name2}',
  },
  ja: {
    'Hello Next.js': 'こんにちは Next.js',
    'Hello someone': 'こんにちは {name1} と {name2}',
  },
};

export default i18n;
```

Use `useI18n`.

- `t` refers to text with selected language.
- `lang` returns the currently selected language.
- `langs` returns a list of language information set in `i18n.js`.
- Change to another language using the `changeLang` function.
- Get the text dynamically by passing set parameters and text keys to the `getText` function.

```jsx
// pages/index.jsx
import Layout from '../components/Layout';
import { useI18n } from 'use-mini18n';

const IndexPage = () => {
  const { t, lang, langs, changeLang, getText } = useI18n();

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>{t['Hello Next.js']} 👋</h1>
      <h2>
        {getText('Hello someone', { name1: 'TestUser1', name2: 'TestUser2' })}
      </h2>
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

## Store selected language (localStorage)

`use-mini18n` stores the selected language information in `localStorage`.

![Screen shot of about of store selected language](./images/store-selected-language.png)

### Disable localStorage

It is also possible to disable the use of localStorage by passing an option during initialization.

```jsx
<TransProvider i18n={i18n} enableLocalStorage={false}>
  <App />
</TransProvider>
```

### Specify localStorage key

If you want to specify the key for localStorage, initialize it this way.

```jsx
<TransProvider i18n={i18n} localStorageKey="specifyLocalStorageKey">
  <App />
</TransProvider>
```

## Development

Test

```sh
npm run test
```

Code format

```sh
test run fmt
```

### When trying out a version under development in an example app (Next.js)

You can try out the built library with the sample application under the example directory.
Rewrite the code as shown below.
(The built library is assumed to be stored in `example/dev-lib`)

```diff
diff --git a/examples/nextjs-with-typescript/pages/_app.tsx b/examples/nextjs-with-typescript/pages/_app.tsx
index d07d392..66c97ec 100644
--- a/examples/nextjs-with-typescript/pages/_app.tsx
+++ b/examples/nextjs-with-typescript/pages/_app.tsx
@@ -1,4 +1,4 @@
-import { TransProvider } from 'use-mini18n';
+import { TransProvider } from '../dev-lib/use-mini18n';
 import i18n from '../i18n';
 import type { AppProps } from 'next/app';

diff --git a/examples/nextjs-with-typescript/pages/index.tsx b/examples/nextjs-with-typescript/pages/index.tsx
index a603408..756848f 100644
--- a/examples/nextjs-with-typescript/pages/index.tsx
+++ b/examples/nextjs-with-typescript/pages/index.tsx
@@ -1,5 +1,5 @@
 import Layout from '../components/Layout';
-import { useI18n } from 'use-mini18n';
+import { useI18n } from '../dev-lib/use-mini18n';

 const IndexPage = () => {
   const { t, lang, langs, changeLang, getText } = useI18n();
```

## Licence

[MIT](https://github.com/shinshin86/use-mini18n/blob/master/LICENSE) (except for examples/ directory)

In the example directory, the code Example created with Next.js is stored.
Please refer to the [Next.js page](https://github.com/vercel/next.js) for the Licence here.

## Author

[Yuki Shindo](https://shinshin86.com)
