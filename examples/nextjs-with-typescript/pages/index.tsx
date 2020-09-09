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
