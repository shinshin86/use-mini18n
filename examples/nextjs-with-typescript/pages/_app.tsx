import { TransProvider } from 'use-mini18n';
import i18n from '../i18n';

export default function MyApp({ Component, pageProps }: any) {
  return (
    <TransProvider i18n={i18n}>
      <Component {...pageProps} />
    </TransProvider>
  );
}
