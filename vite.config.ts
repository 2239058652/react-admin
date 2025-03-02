import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 全局变量注入sass
        additionalData: `@use "@/styles/variables.scss";`
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5143,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    // 分包策略
    rollupOptions: {
      output: {
        manualChunks: {}
      }
    },
    chunkSizeWarningLimit: 2000,
    minify: 'terser',
    outDir: 'dist',
    sourcemap: false,
    cssCodeSplit: true,
    terserOptions: {
      compress: {
        drop_debugger: true,
        drop_console: true
      }
    }
  }
})
