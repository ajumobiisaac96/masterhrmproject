import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Leave as '/' unless deploying to a subdirectory
  build: {
    outDir: 'dist'
  },
  assetsInclude: ['**/*.JPG']
});
