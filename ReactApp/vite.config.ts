import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/cultark-script.js',
        chunkFileNames: 'assets/cultark-script.js',
        assetFileNames: 'assets/cultark-[name].[ext]',
      },
    },
  },
  server: {
    proxy: {
      '/wp-includes': 'http://localhost:8888', // Adjust for your specific needs
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
