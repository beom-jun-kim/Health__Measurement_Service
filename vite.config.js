// vite.config.js
import { fileURLToPath, URL } from 'node:url'
import process from 'node:process'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    'process.env': process.env
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api/dev': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
      '/api/prod': {
        target: 'http://221.161.177.193',
        changeOrigin: true
      }
    }
  }
})
