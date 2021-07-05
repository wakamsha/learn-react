import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsxInject: `import React from 'react';`,
  },
  resolve: {
    alias: {
      '@learn-react/core': resolve(__dirname, '../core/src'),
    },
  },
});
