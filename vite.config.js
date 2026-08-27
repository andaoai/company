import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages 子路径部署：base: '/<repo-name>/'
// 对于 andaoai.github.io 根域名部署：base: '/'
export default defineConfig({
  base: '/',
  plugins: [vue()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
  server: {
    port: 5173,
    host: true,
  },
})
