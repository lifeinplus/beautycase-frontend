/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@/app': path.resolve(__dirname, './src/app'),
            '@/features': path.resolve(__dirname, './src/features'),
            '@/lib': path.resolve(__dirname, './src/lib'),
            '@/shared': path.resolve(__dirname, './src/shared'),
            '@/tests': path.resolve(__dirname, './src/tests'),
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/tests/setup.ts',
        coverage: {
            exclude: [
                '**/*/index.{js,ts}',
                '**/*/index.{jsx,tsx}',
                '**/*.config.{js,ts}',
                'dist/**',
                'src/app/hooks.ts',
                'src/main.tsx',
            ],
        },
    },
})
