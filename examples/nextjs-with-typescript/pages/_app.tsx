import { TransProvider } from 'use-mini18n';
import i18n from '../i18n';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TransProvider i18n={i18n}>
      <Component {...pageProps} />
    </TransProvider>
  );
}
