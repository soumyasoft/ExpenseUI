import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  // Development configuration
  const devConfig = {
    plugins: [react(), tailwindcss()],
    server: {
      host: '0.0.0.0',
      fs: {
        strict: false,
      },
      proxy: {
        '/api': {
          target: env.VITE_LOCAL_API_URL,
        },
      },
    },
  }

  // Production configuration
  const prodConfig = {
    plugins: [react(), tailwindcss()],
    server: {
      host: '0.0.0.0',
      fs: {
        strict: false,
      },
      proxy: {
        '/api': {
          target: env.VITE_SERVER_API_URL,
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }

  return env.VITE_ENV === 'development' ? devConfig : prodConfig
})