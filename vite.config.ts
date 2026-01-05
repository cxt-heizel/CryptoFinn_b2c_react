/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from 'vite';
import type { ProxyOptions } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const proxyTarget = env.VITE_API_PROXY_TARGET || 'https://dev-tax.cryptofinn.io';
  const proxyConfig: ProxyOptions = {
    target: proxyTarget,
    changeOrigin: true,
    secure: true,
    cookieDomainRewrite: 'localhost',
  };

  const proxyEntries: Array<{ path: string; bypassHtml?: boolean }> = [
    { path: '/csrf' },
    { path: '/dashboard', bypassHtml: true },
    { path: '/auth' },
    { path: '/exchange' },
    { path: '/funds-source' },
    { path: '/money-source' },
    { path: '/overseas' },
    { path: '/tax' },
    { path: '/user' },
    { path: '/api' },
  ];

  const proxy = proxyEntries.reduce<Record<string, ProxyOptions>>((acc, { path, bypassHtml }) => {
    acc[path] = {
      ...proxyConfig,
      bypass: bypassHtml
        ? (req) => {
            if (req.headers.accept?.includes('text/html')) {
              return '/index.html';
            }
            return undefined;
          }
        : undefined,
    };
    return acc;
  }, {});

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      proxy,
      port: 8081,
    },
    test: {
      projects: [
        {
          extends: true,
          plugins: [
            // The plugin will run tests for the stories defined in your Storybook config
            // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
            storybookTest({
              configDir: path.join(dirname, '.storybook'),
            }),
          ],
          test: {
            name: 'storybook',
            browser: {
              enabled: true,
              headless: true,
              provider: playwright({}),
              instances: [
                {
                  browser: 'chromium',
                },
              ],
            },
            setupFiles: ['.storybook/vitest.setup.ts'],
          },
        },
      ],
    },
  };
});
