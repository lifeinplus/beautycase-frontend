/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
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
