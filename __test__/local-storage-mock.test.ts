import { getLocalStorageMock } from './local-storage-mock';

describe('local-strorage-mock', () => {
  test('constructor', () => {
    const window = getLocalStorageMock();
    expect(window.localStorage.length).toBe(0);
    expect(window.localStorage.store).toEqual({});
  });

  describe('function of key', () => {
    test('Set some items', () => {
      const window = getLocalStorageMock();
      expect(window.localStorage.key(0)).toBe(null);

      window.localStorage.setItem('testkey', 'testvalue');
      expect(window.localStorage.key(0)).toBe('testkey');
      expect(window.localStorage.key(1)).toBe(null);

      window.localStorage.setItem('testkey2', 'testvalue2');
      expect(window.localStorage.key(0)).toBe('testkey');
      expect(window.localStorage.key(1)).toBe('testkey2');
    });

    test('Non argument', () => {
      expect(() => {
        const window = getLocalStorageMock();
        window.localStorage.key();
      }).toThrowError(
        "Uncaught TypeError: Failed to execute 'key' on 'Storage': 1 argument required, but only 0 present."
      );
    });
  });

  describe('function of getItem', () => {
    test('Get item', () => {
      const window = getLocalStorageMock();
      window.localStorage.setItem('testkey', 'testvalue');
      expect(window.localStorage.getItem('testkey')).toBe('testvalue');
    });

    test('Non-existent key', () => {
      const window = getLocalStorageMock();
      window.localStorage.setItem('testkey', 'testvalue');
      expect(window.localStorage.getItem('testkey2')).toBe(null);
    });

    test('Non argument', () => {
      const window = getLocalStorageMock();
      expect(window.localStorage.getItem()).toBe(null);
    });
  });

  describe('function of setItem', () => {
    test('Set some items', () => {
      const window = getLocalStorageMock();
      window.localStorage.setItem('testkey', 'testvalue');
      expect(window.localStorage.length).toBe(1);
      expect(window.localStorage.getItem('testkey')).toBe('testvalue');

      window.localStorage.setItem('testkey2', 'testvalue2');
      expect(window.localStorage.length).toBe(2);
      expect(window.localStorage.getItem('testkey2')).toBe('testvalue2');
    });

    test('Overwrite with the same key', () => {
      const window = getLocalStorageMock();
      window.localStorage.setItem('testkey', 'testvalue');
      expect(window.localStorage.length).toBe(1);
      window.localStorage.setItem('testkey', 'testvalue2');
      expect(window.localStorage.length).toBe(1);
      expect(window.localStorage.getItem('testkey')).toBe('testvalue2');
    });

    test('Overwrite with the same key2', () => {
      const window = getLocalStorageMock();
      window.localStorage.setItem('testkey', 'testvalue');
      expect(window.localStorage.length).toBe(1);
      window.localStorage.setItem('testkey', '');
      expect(window.localStorage.length).toBe(1);
      expect(window.localStorage.getItem('testkey')).toBe('');
    });

    test('Not specify key', () => {
      const window = getLocalStorageMock();
      window.localStorage.setItem('', 'testvalue');
      expect(window.localStorage.length).toBe(0);
    });

    test('Non argument', () => {
      expect(() => {
        const window = getLocalStorageMock();
        window.localStorage.setItem();
      }).toThrowError(
        "Uncaught TypeError: Failed to execute 'setItem' on 'Storage': 2 arguments required, but only 0 present."
      );
    });
  });

  describe('function of removeItem', () => {
    test('Remove item', () => {
      const window = getLocalStorageMock();

      window.localStorage.setItem('testkey', 'testvalue');
      expect(window.localStorage.getItem('testkey')).toBe('testvalue');
      expect(window.localStorage.length).toBe(1);

      expect(window.localStorage.removeItem('testkey')).toBeUndefined();
      expect(window.localStorage.getItem('testkey')).toBe(null);
      expect(window.localStorage.length).toBe(0);
    });

    test('Not specify key', () => {
      const window = getLocalStorageMock();

      window.localStorage.setItem('testkey', 'testvalue');
      expect(window.localStorage.getItem('testkey')).toBe('testvalue');
      expect(window.localStorage.length).toBe(1);

      expect(window.localStorage.removeItem('testkey2')).toBeUndefined();
      expect(window.localStorage.getItem('testkey')).toBe('testvalue');
      expect(window.localStorage.length).toBe(1);
    });

    test('Already deleted key', () => {
      const window = getLocalStorageMock();

      window.localStorage.setItem('testkey', 'testvalue');
      expect(window.localStorage.getItem('testkey')).toBe('testvalue');
      expect(window.localStorage.length).toBe(1);

      expect(window.localStorage.removeItem('testkey')).toBeUndefined();
      expect(window.localStorage.getItem('testkey')).toBe(null);
      expect(window.localStorage.length).toBe(0);

      expect(window.localStorage.removeItem('testkey')).toBeUndefined();
    });

    test('Non argument', () => {
      const window = getLocalStorageMock();

      window.localStorage.setItem('testkey', 'testvalue');
      expect(window.localStorage.getItem('testkey')).toBe('testvalue');
      expect(window.localStorage.length).toBe(1);

      expect(() => {
        window.localStorage.removeItem().toBeUndefined();
      }).toThrowError(
        "Uncaught TypeError: Failed to execute 'removeItem' on 'Storage': 1 argument required, but only 0 present."
      );
    });
  });

  describe('function of clear', () => {
    test('Clear items', () => {
      const window = getLocalStorageMock();

      window.localStorage.setItem('testkey', 'testvalue');
      expect(window.localStorage.getItem('testkey')).toBe('testvalue');
      expect(window.localStorage.length).toBe(1);

      expect(window.localStorage.clear()).toBeUndefined();
      expect(window.localStorage.getItem('testkey')).toBe(null);
      expect(window.localStorage.length).toBe(0);
    });
  });
});
