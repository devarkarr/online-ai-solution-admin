import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      "@/client-store": path.resolve(__dirname, "src/store/client"),
      "@/server-store": path.resolve(__dirname, "src/store/server/features"),
      "@": path.resolve(__dirname, "src"),
    }
  }
})
