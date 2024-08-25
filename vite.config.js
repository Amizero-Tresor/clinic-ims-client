// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcssImport from 'postcss-import';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [postcssImport()],
    },
  },
});