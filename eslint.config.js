import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

// Конвертируем recommended конфиги в flat-формат
const reactRecommended = {
  plugins: {
    react: reactPlugin
  },
  rules: reactPlugin.configs.flat.recommended.rules // Исправлено
};

export default [
  // Базовый JS конфиг
  js.configs.recommended,

  // TypeScript конфиг
  ...tsPlugin.configs.recommended,
  ...tsPlugin.configs.stylistic,

  // React конфиг
  {
    files: ['**/*.{jsx,tsx}'],
    ...reactRecommended
  },

  // Основные настройки
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    ignores: ['**/node_modules/**', '**/dist/**', '**/*.d.ts'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parser: tsParser, // Исправлено
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json' // Убедись, что этот файл существует
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin, // Исправлено
      react: reactPlugin,
      prettier: prettierPlugin,
      import: importPlugin
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json'
        }
      }
    },
    rules: {
      'no-console': ['error', { allow: ['info', 'error', 'warn'] }],
      'no-irregular-whitespace': ['error', { skipTemplates: true, skipStrings: true }],
      'curly': ['error', 'all'],

      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/prop-types': 'off',

      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',

      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: false
          },
          'newlines-between': 'always'
        }
      ],

      'prettier/prettier': 'error'
    }
  }
];
