import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TransProvider, useI18n } from '../dist/use-mini18n';

const i18n = {
  en: {
    'hello world': 'hello world',
  },
  ja: {
    'hello world': 'こんにちは 世界',
  },
};

describe('use-mini18n', () => {
  const App = (): JSX.Element => {
    const { t, lang, langs, changeLang } = useI18n();

    return (
      <div>
        <h1>{t['hello world']}</h1>
        <p>Selected lang: {lang}</p>
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
      </div>
    );
  };

  describe('defaultLang test', () => {
    test('Not specify defaultLang (en)', () => {
      render(
        <TransProvider i18n={i18n}>
          <App />
        </TransProvider>
      );

      expect(screen.getByText('hello world')).toBeInTheDocument();
      expect(screen.getByText('Selected lang: en')).toBeInTheDocument();
    });

    test('Not specify defaultLang (ja)', () => {
      const anotherI18n = {
        ja: {
          'hello world': 'こんにちは 世界',
        },
        en: {
          'hello world': 'hello world',
        },
      };

      // By default, it will try to refer to languages recorded in localStorage, so disable it
      render(
        <TransProvider i18n={anotherI18n} enableLocalStorage={false}>
          <App />
        </TransProvider>
      );

      expect(screen.getByText('こんにちは 世界')).toBeInTheDocument();
      expect(screen.getByText('Selected lang: ja')).toBeInTheDocument();
    });

    test('Specify defaultLang (ja)', () => {
      render(
        <TransProvider i18n={i18n} defaultLang="ja">
          <App />
        </TransProvider>
      );

      expect(screen.getByText('こんにちは 世界')).toBeInTheDocument();
      expect(screen.getByText('Selected lang: ja')).toBeInTheDocument();
    });

    test('Set defaultLang in nested components (en)', () => {
      render(
        <TransProvider i18n={i18n} defaultLang="ja">
          <TransProvider i18n={i18n} defaultLang="en">
            <App />
          </TransProvider>
        </TransProvider>
      );

      expect(screen.getByText('hello world')).toBeInTheDocument();
      expect(screen.getByText('Selected lang: en')).toBeInTheDocument();
    });

    test('Set defaultLang in nested components (ja)', () => {
      render(
        <TransProvider i18n={i18n} defaultLang="en">
          <TransProvider i18n={i18n} defaultLang="ja">
            <App />
          </TransProvider>
        </TransProvider>
      );

      expect(screen.getByText('こんにちは 世界')).toBeInTheDocument();
      expect(screen.getByText('Selected lang: ja')).toBeInTheDocument();
    });
  });

  describe('function of changeLang test', () => {
    test('Change lang (en -> ja)', () => {
      // By default, it will try to refer to languages recorded in localStorage, so disable it
      render(
        <TransProvider i18n={i18n} enableLocalStorage={false}>
          <App />
        </TransProvider>
      );

      expect(screen.getByText('hello world')).toBeInTheDocument();
      expect(screen.getByText('Selected lang: en')).toBeInTheDocument();

      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: 'ja' },
      });

      expect(screen.getByText('こんにちは 世界')).toBeInTheDocument();
      expect(screen.getByText('Selected lang: ja')).toBeInTheDocument();
    });

    test('Change lang (ja -> en)', () => {
      render(
        <TransProvider i18n={i18n} defaultLang="ja">
          <App />
        </TransProvider>
      );

      expect(screen.getByText('こんにちは 世界')).toBeInTheDocument();
      expect(screen.getByText('Selected lang: ja')).toBeInTheDocument();

      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: 'en' },
      });

      expect(screen.getByText('hello world')).toBeInTheDocument();
      expect(screen.getByText('Selected lang: en')).toBeInTheDocument();
    });
  });

  describe('error test', () => {
    test('Invalid i18n', () => {
      expect(() => {
        render(
          <TransProvider i18n={''}>
            <App />
          </TransProvider>
        );
      }).toThrow();
    });
  });
});
