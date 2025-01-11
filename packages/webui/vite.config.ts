import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3051 
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['@emotion/react','@emotion/styled', 'framer-motion'],
    },
  },
})
