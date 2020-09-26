import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TransProvider, useI18n } from '../dist/use-mini18n';

const i18n = {
  en: {
    'Hello world': 'Hello world',
    'Hello someone': 'Hello {name1} and {name2}',
  },
  ja: {
    'Hello world': 'こんにちは 世界',
    'Hello someone': 'こんにちは {name1} と {name2}',
  },
};

describe('use-mini18n', () => {
  const App = (): JSX.Element => {
    const { t, lang, langs, changeLang, getText } = useI18n();

    return (
      <div>
        <h1>{t['Hello world']}</h1>
        <h2>
          {getText('Hello someone', { name1: 'TestUser1', name2: 'TestUser2' })}
        </h2>
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

      expect(screen.getByText('Hello world')).toBeInTheDocument();
      expect(
        screen.getByText('Hello TestUser1 and TestUser2')
      ).toBeInTheDocument();
      expect(screen.getByText('Selected lang: en')).toBeInTheDocument();
    });

    test('Not specify defaultLang (ja)', () => {
      const anotherI18n = {
        ja: {
          'Hello world': 'こんにちは 世界',
          'Hello someone': 'こんにちは {name1} と {name2}',
        },
        en: {
          'Hello world': 'Hello world',
          'Hello someone': 'Hello {name1} and {name2}',
        },
      };

      // By default, it will try to refer to languages recorded in localStorage, so disable it
      render(
        <TransProvider i18n={anotherI18n} enableLocalStorage={false}>
          <App />
        </TransProvider>
      );

      expect(screen.getByText('こんにちは 世界')).toBeInTheDocument();
      expect(
        screen.getByText('こんにちは TestUser1 と TestUser2')
      ).toBeInTheDocument();
      expect(screen.getByText('Selected lang: ja')).toBeInTheDocument();
    });

    test('Specify defaultLang (ja)', () => {
      render(
        <TransProvider i18n={i18n} defaultLang="ja">
          <App />
        </TransProvider>
      );

      expect(screen.getByText('こんにちは 世界')).toBeInTheDocument();
      expect(
        screen.getByText('こんにちは TestUser1 と TestUser2')
      ).toBeInTheDocument();
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

      expect(screen.getByText('Hello world')).toBeInTheDocument();
      expect(
        screen.getByText('Hello TestUser1 and TestUser2')
      ).toBeInTheDocument();
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
      expect(
        screen.getByText('こんにちは TestUser1 と TestUser2')
      ).toBeInTheDocument();
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

      expect(screen.getByText('Hello world')).toBeInTheDocument();
      expect(
        screen.getByText('Hello TestUser1 and TestUser2')
      ).toBeInTheDocument();
      expect(screen.getByText('Selected lang: en')).toBeInTheDocument();

      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: 'ja' },
      });

      expect(screen.getByText('こんにちは 世界')).toBeInTheDocument();
      expect(
        screen.getByText('こんにちは TestUser1 と TestUser2')
      ).toBeInTheDocument();
      expect(screen.getByText('Selected lang: ja')).toBeInTheDocument();
    });

    test('Change lang (ja -> en)', () => {
      render(
        <TransProvider i18n={i18n} defaultLang="ja">
          <App />
        </TransProvider>
      );

      expect(screen.getByText('こんにちは 世界')).toBeInTheDocument();
      expect(
        screen.getByText('こんにちは TestUser1 と TestUser2')
      ).toBeInTheDocument();
      expect(screen.getByText('Selected lang: ja')).toBeInTheDocument();

      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: 'en' },
      });

      expect(screen.getByText('Hello world')).toBeInTheDocument();
      expect(
        screen.getByText('Hello TestUser1 and TestUser2')
      ).toBeInTheDocument();
      expect(screen.getByText('Selected lang: en')).toBeInTheDocument();
    });
  });

  describe('Error test', () => {
    test('Invalid i18n', () => {
      expect(() => {
        render(
          <TransProvider i18n={''}>
            <App />
          </TransProvider>
        );
      }).toThrow();
    });

    test('Invalid format i18n', () => {
      const invalidFormatI18n = 'test';
      expect(() => {
        render(
          <TransProvider i18n={invalidFormatI18n}>
            <App />
          </TransProvider>
        );
      }).toThrow();
    });

    test('Invalid format i18n (Array)', () => {
      const array = ['test'];
      expect(() => {
        render(
          <TransProvider i18n={array}>
            <App />
          </TransProvider>
        );
      }).toThrow();
    });

    test('Invalid format i18n (Empty object)', () => {
      const emptyI18n = {};
      expect(() => {
        render(
          <TransProvider i18n={emptyI18n}>
            <App />
          </TransProvider>
        );
      }).toThrow();
    });
  });
});
