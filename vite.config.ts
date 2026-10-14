import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? '/dungongen/' : '/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: ['d20-dungeon.local', 'localhost', '127.0.0.1']
  }
});
