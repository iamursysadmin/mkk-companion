import path from 'node:path'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

/**
 * Unit / snapshot tests (separate from vite.config.ts so electron plugin
 * does not wipe dist-electron when Vitest loads config).
 */
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '#components': path.resolve(__dirname, 'src/components'),
      '#views': path.resolve(__dirname, 'src/views'),
      '#stores': path.resolve(__dirname, 'src/stores'),
      '#constants': path.resolve(__dirname, 'shared/constants'),
      '#electron': path.resolve(__dirname, 'electron')
    }
  },
  test: {
    name: 'unit',
    environment: 'node',
    include: ['src/**/*.{spec,test}.ts', 'shared/**/*.{spec,test}.ts'],
    exclude: ['e2e/**', 'node_modules/**', 'dist/**', 'dist-electron/**']
  }
})
