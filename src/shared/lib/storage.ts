const isBrowser = typeof window !== 'undefined';

export const storage = {
  get: (key: string) => {
    if (!isBrowser) return null;
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  },
  set: (key: string, value: unknown) => {
    if (!isBrowser) return;
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key: string) => {
    if (!isBrowser) return;
    localStorage.removeItem(key);
  },
};
