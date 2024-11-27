import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

  export default defineConfig({
    plugins: [react()],
    server: {
      host: true,
      port: 5173,
      // Pour gérer les appels API vers le backend
      proxy: {
        '/api': {
          target: 'http://backend:8080',
          changeOrigin: true
        }
      }
    }
  })
