// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

// web/eslint.config.mjs

import { defineConfig } from 'eslint/config';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import path from 'path';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';

const __dirname = path.resolve();

export default defineConfig({
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      files: ['src/**/*.ts', 'src/**/*.tsx'],
      tsconfigRootDir: __dirname,
      project: './tsconfig.json',
      ecmaVersion: 2021,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: {
      window: 'readonly',
      document: 'readonly',
      process: 'readonly',
      console: 'readonly',
    },
  },
  plugins: {
    '@typescript-eslint': tsPlugin,
    react: reactPlugin,
  },
  rules: {
    ...reactRecommended.rules,
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'react/prop-types': 'off',
    '@typescript-eslint/strict-boolean-expressions': [
      'warn',
      {
        allowNullableBoolean: true,
        allowNullableString: true,
        allowNullableNumber: false,
        allowAny: true,
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
});
