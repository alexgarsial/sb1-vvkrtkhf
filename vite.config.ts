import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion'],
          game: ['socket.io-client', 'nanoid']
        }
      }
    },
    // Copy .htaccess during build
    copyPublicDir: true
  },
  publicDir: 'public',
  server: {
    port: 3000,
    host: true
  }
});