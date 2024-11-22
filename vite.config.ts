import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  base: '/react-minesweeper/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
