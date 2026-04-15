import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  optimizeDeps: {
    include: ['gsap', 'react', 'react-dom/client', '@react-three/fiber', '@react-three/drei', 'three'],
    exclude: ['@gsap/react']
  },
  css: {
    postcss: './postcss.config.js'
  }
})
