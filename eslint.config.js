import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import typescriptEslint from 'typescript-eslint'

export default typescriptEslint.config(
  {
    ignores: [
      '**/*.d.ts',
      '**/coverage',
      '**/dist',
      '**/dist-electron',
      '**/release',
      '**/node_modules',
      '**/.pnpm-store',
      '**/test-results',
      '**/playwright-report'
    ]
  },
  {
    extends: [
      eslint.configs.recommended,
      ...typescriptEslint.configs.recommended
    ],
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn'
    }
  },
  {
    extends: [
      eslint.configs.recommended,
      ...typescriptEslint.configs.recommended,
      ...eslintPluginVue.configs['flat/recommended']
    ],
    files: ['src/**/*.{ts,vue}', 'shared/**/*.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        parser: typescriptEslint.parser
      }
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn'
    }
  },
  eslintConfigPrettier
)
