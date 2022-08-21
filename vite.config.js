import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

function _resolve(dir) {
  return path.resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': _resolve('src')
    }
  },
  server: {
    port: 7777,
    open: true,
    http: true,
    proxy: {
      "/api": {
        target: "http://doc.996.mba:8086",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
