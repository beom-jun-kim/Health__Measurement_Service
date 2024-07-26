// vite.config.js
import { fileURLToPath, URL } from 'node:url'
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
  server: {
    proxy: {
      '/map-geocode/v2/geocode': {
        target: 'https://naveropenapi.apigw.ntruss.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/map-geocode\/v2\/geocode/, '/map-geocode/v2/geocode')
      },
      '/api/dev': {
        // target: 'http://221.161.177.193',
        target: 'http://192.168.0.41:8080',
        changeOrigin: true,
      },
      '/api/prod': {
        target: 'http://221.161.177.193',
        changeOrigin: true,
      }
    },
  }
})
