import { ReactNode } from 'react';
import { QueryProvider } from './QueryProvider';
import { ReduxProvider } from './ReduxProvider';
import { ThemeProvider } from './ThemeProvider';

interface Props {
  children: ReactNode;
}

export const AppProviders = ({ children }: Props) => {
  return (
    <ThemeProvider>
      <ReduxProvider>
        <QueryProvider>{children}</QueryProvider>
      </ReduxProvider>
    </ThemeProvider>
  );
};
