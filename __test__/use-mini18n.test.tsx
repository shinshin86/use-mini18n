import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { TransProvider, useI18n } from '../dist/use-mini18n';

const i18n = {
  en: {
    'hello world': 'hello world',
  },
  ja: {
    'hello world': 'こんにちは 世界',
  },
};

const App = (): JSX.Element => {
  const { t, lang } = useI18n();

  return (
    <div>
      <p>{t['hello world']}</p>
      <p>Selected lang: {lang}</p>
    </div>
  );
};

describe('use-mini18n', () => {
  test('test', () => {
    render(
      <TransProvider i18n={i18n}>
        <App />
      </TransProvider>
    );

    screen.debug();
  });
});
