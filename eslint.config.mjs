import tsParser from '@typescript-eslint/parser'
import globals from 'globals'
import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import nextPlugin from '@next/eslint-plugin-next'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default defineConfig([
  // Base ESLint recommended config.
  js.configs.recommended,

  // Next.js core-web-vitals rules.
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },

  // Accessibility baseline.
  jsxA11y.flatConfigs.recommended,

  // Prettier integration config.
  eslintPluginPrettierRecommended,

  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        // Enable type-aware linting for better TypeScript support.
        project: './tsconfig.json',
      },
    },
    rules: {
      // Prettier integration.
      'prettier/prettier': 'error',

      // TypeScript projects should rely on type-aware checks.
      'no-undef': 'off',

      // Added to eslint:recommended in v10 and too noisy for this codebase.
      'no-useless-assignment': 'off',

      // Enable unused vars with proper configuration.
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // Semicolon rules must match Prettier config (`semi: false`).
      semi: ['error', 'never'],

      // Accessibility rules
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton'],
        },
      ],
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',

    },
  },

  // Global ignores.
  globalIgnores([
    'node_modules/**',
    '.eslintrc.js',
    '.next/**',
    'out/**',
    'build/**',
    'dist/**',
    '.contentlayer/**',
    'public/**',
  ]),
])
