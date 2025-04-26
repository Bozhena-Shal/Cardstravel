import baseConfig from '../eslint.config.js'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...baseConfig,

  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.json', 'tsconfig.node.json', 'tsconfig.app.json'],
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // React 17+ не требует импортировать React
      //   'jsx-a11y/anchor-is-valid': 'off',
    },
  },

  {
    ignores: ['dist', 'node_modules', 'coverage', 'eslint.config.js'],
  },

  //   🔹 Специальные настройки для Vite-конфига
  {
    files: ['./vite.config.ts'],
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.json', 'tsconfig.node.json', 'tsconfig.app.json'],
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'], // Правило применяется только к TypeScript-файлам
    rules: {
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '^@ideanick/backend/(?!(.*/)?input$).+$',
              message: 'Импорт из @ideanick/backend разрешен только для файлов input',
            },
          ],
        },
      ],
    },
  },
]
