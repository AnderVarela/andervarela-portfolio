import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import checkFile from 'eslint-plugin-check-file';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'coverage', 'node_modules', '*.config.js'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      jsxA11y.flatConfigs.recommended,
      prettier,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: { react: { version: 'detect' } },
    plugins: { 'check-file': checkFile },
    rules: {
      eqeqeq: ['error', 'always'],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'react/no-multi-comp': 'error',
      'react/self-closing-comp': 'error',
      'react/jsx-no-useless-fragment': 'error',
      'react/prop-types': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'check-file/filename-naming-convention': [
        'error',
        { 'src/components/**/*.{ts,tsx}': 'PASCAL_CASE' },
        { ignoreMiddleExtensions: true },
      ],
    },
  },
);
