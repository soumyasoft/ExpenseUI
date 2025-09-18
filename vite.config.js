import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    fs: {
      strict: false,
    },
    proxy: {
      '/api': {
        target: 'https://expenseapi-odu8.onrender.com',
        changeOrigin: true,
        secure: true,
        // Optionally rewrite the paths:
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
})