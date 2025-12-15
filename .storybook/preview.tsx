// .storybook/preview.ts
import type { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '../src/app/providers/ThemeProvider';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
