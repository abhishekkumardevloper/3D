import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services.html'),
        design: resolve(__dirname, 'design.html'),
        photography: resolve(__dirname, 'photography.html'),
        art: resolve(__dirname, 'art.html'),
      },
    },
  },
});
