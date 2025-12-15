import { useCallback, useState } from 'react';

export const useToggle = (initial = false): [boolean, () => void, (value: boolean) => void] => {
  const [value, setValue] = useState(initial);

  const toggle = useCallback(() => setValue((prev) => !prev), []);
  const set = useCallback((next: boolean) => setValue(next), []);

  return [value, toggle, set];
};
