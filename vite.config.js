import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 相对路径 base：让同一份 dist 产物能同时部署到
//   - GitHub Pages 子路径 https://andaoai.github.io/company/
//   - GitHub Pages 根域名 https://andaoai.github.io/
// 任何一种部署都能正确解析资源路径，不会 404
export default defineConfig({
  base: './',
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
