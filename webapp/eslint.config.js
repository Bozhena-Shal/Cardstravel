import baseConfig from '../eslint.config.js';

export default [
  ...baseConfig,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json']
      }
    }
  },
  {
    ignores: ['dist', 'node_modules', 'coverage']
  },
  {
    files: ['./vite.config.ts'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json']
      }
    }
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          name: '@cardstravel/backend',
          message: 'Импорт из @cardstravel/backend разрешен только для файлов input',
          allowTypeImports: true
        },
        {
          name: '@cardstravel/backend/input',
          message: 'Этот импорт разрешен'
        }
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: '[object.type=MetaProperty][property.name=env]',
          message: 'Use instead import { env } from "lib/env"'
        }
      ]
    }
  }
];