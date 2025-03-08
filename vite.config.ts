import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  esbuild: {
    jsx: 'automatic'
  }
});
