import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  define: {
    'process.env': process.env,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@enums': path.resolve(__dirname, 'src/enums'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@interfaces': path.resolve(__dirname, 'src/interfaces'),
    },
  },
});
