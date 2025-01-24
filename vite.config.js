import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.JPG'], // Add this line
  base: '/', // Leave as '/' unless deploying to a subdirectory
  build: {
    outDir: 'build'
  }
});
