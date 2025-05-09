import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  // Базовые настройки
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    ignores: ['node_modules', 'dist'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    }
  },

  // Плагины
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: pluginReact
    }
  },

  // Настройки React
  {
    settings: {
      react: {
        version: 'detect'
      }
    }
  },

  // Рекомендуемые конфиги
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs['flat/recommended'],

  // Правила
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      curly: ['error', 'all'],
      'no-irregular-whitespace': ['error', { skipTemplates: true, skipStrings: true }],
      'no-console': ['error', { allow: ['info', 'error', 'warn'] }]
    }
  }
];