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
