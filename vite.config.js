import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(rootDir, './src'),
      '@assets': path.resolve(rootDir, './src/assets'),
      '@components': path.resolve(rootDir, './src/components'),
      '@context': path.resolve(rootDir, './src/context'),
      '@hooks': path.resolve(rootDir, './src/hooks'),
      '@pages': path.resolve(rootDir, './src/pages'),
      '@routes': path.resolve(rootDir, './src/routes'),
      '@services': path.resolve(rootDir, './src/services'),
      '@styles': path.resolve(rootDir, './src/styles'),
      '@utils': path.resolve(rootDir, './src/utils')
    }
  }
});
