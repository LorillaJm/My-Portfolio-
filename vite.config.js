import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        include: ['@emailjs/browser'],
        force: true
    },
    server: {
        port: 5173,
        host: true,
        hmr: {
            overlay: false
        }
    },
    build: {
        outDir: 'dist',
        sourcemap: true,
        commonjsOptions: {
            include: [/node_modules/],
        },
    },
});
