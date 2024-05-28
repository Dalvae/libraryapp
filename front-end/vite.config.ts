/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: './',
  plugins: [react(), viteTsconfigPaths()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/apiauth': {
        target: process.env.AUTH_SERVICE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apiauth/, ''),
      },
      '/apiinventory': {
        target: process.env.INVENTORY_SERVICE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apiinventory/, ''),
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/testing/setup-tests.ts',
    exclude: ['**/node_modules/**', '**/e2e/**'],
    coverage: {
      include: ['src/**'],
    },
  },
  optimizeDeps: { exclude: ['fsevents'] },
});
