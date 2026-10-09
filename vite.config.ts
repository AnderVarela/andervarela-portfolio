import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

const sourceDirectory = fileURLToPath(new URL('./src', import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': sourceDirectory },
  },
  css: {
    modules: { localsConvention: 'camelCaseOnly' },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setupTests.ts'],
    css: { modules: { classNameStrategy: 'non-scoped' } },
  },
});
