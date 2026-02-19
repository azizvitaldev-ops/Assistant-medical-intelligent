
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Cela permet d'éviter l'erreur 'process is not defined' dans le navigateur
    'process.env': {
      API_KEY: process.env.API_KEY
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
});
