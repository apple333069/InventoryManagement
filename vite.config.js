import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'InventoryManagement',
  },
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        {
          axios: [['default', 'axios']],
          lodash: ['_'],
          dompurify: [['default', 'DOMPurify']],
          'js-cookie': [['default', 'Cookies']],
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
      sass: {
        api: 'modern-compiler',
      },
    },
  },
})
