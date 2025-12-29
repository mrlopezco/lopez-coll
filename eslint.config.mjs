import { defineConfig, globalIgnores } from 'eslint/config'
import tsParser from '@typescript-eslint/parser'
import globals from 'globals'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
  // Base ESLint recommended config
  js.configs.recommended,
  
  // Apply TypeScript ESLint configs
  ...compat.extends(
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ),
  
  // Apply accessibility and Prettier configs
  ...compat.extends('plugin:jsx-a11y/recommended'),
  ...compat.extends('plugin:prettier/recommended'), // Must be last to override formatting rules
  
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.amd,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        // project: './tsconfig.json', // Commented out to avoid parsing issues
        // tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      // Prettier integration - must be enabled
      'prettier/prettier': 'error',
      
      // React rules
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      'react/prop-types': 'off', // TypeScript handles prop validation
      'react/no-unescaped-entities': 'off',
      
      // TypeScript rules
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': 'off', // Can be enabled if desired
      
      // Semicolon rules - must match Prettier config (semi: false)
      'semi': ['error', 'never'],
      
      // Accessibility rules
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton'],
        },
      ],
    },
  },
  // Global ignores - must be at the end
  globalIgnores(['**/node_modules', '**/.eslintrc.js', '.next', 'out', 'build', 'dist']),
])
