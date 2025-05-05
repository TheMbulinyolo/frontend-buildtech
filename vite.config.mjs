import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import Inspect from 'vite-plugin-inspect';

export default defineConfig({
  plugins: [
    react(),
    Inspect(),
    visualizer({
      filename: './dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  server: process.env.NODE_ENV === 'development' ? {
    port: 3000, 
  } : undefined,
  preview: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 4173,
    host: '0.0.0.0',
    allowedHosts: ['moderntechnologyofbuild.onrender.com'],
  },
});