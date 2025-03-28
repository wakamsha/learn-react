import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [reactRouter()],
  server: {
    port: 3011,
    open: true,
  },
  build: {
    outDir: 'build/client',
  },
});
