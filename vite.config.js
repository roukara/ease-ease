import { defineConfig } from "vite";
import htmlMinifier from 'vite-plugin-html-minifier';

export default defineConfig({
  server: {
    host: true
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/js/[name][hash].js',
        chunkFileNames: 'assets/js/[name][hash].js',
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        assetFileNames: ({name}) => {
          if (/\.(jpe?g|png|gif|svg|webp|avif)$/.test(name)) {
            return 'assets/images/[hash][extname]';
          }
          if (/\.(woff2?|fnt)$/.test(name)) {
            return 'assets/fonts/[hash][extname]';
          }
          if (/\.(s?css)$/.test(name)) {
            return 'assets/css/[name][hash][extname]';
          }
          return 'assets/[hash][extname]';
        }
      }
    }
  },
  plugins: [
    htmlMinifier()
  ]
})