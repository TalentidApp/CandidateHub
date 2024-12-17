import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port:  3000, // Use the environment variable PORT or default to 3000
    host: '0.0.0.0', // Bind to all network interfaces
  },
  build: {
    outDir: 'dist', // Specify the build output folder (default is 'dist')
  },
});


