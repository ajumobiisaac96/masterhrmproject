import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Use absolute base path
  build: {
    outDir: 'dist'
  },
  assetsInclude: ['**/*.JPG']
});
