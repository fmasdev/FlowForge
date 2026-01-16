import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig({
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    "next/core-web-vitals",         // règles Next.js pour perf et qualité
    "plugin:@typescript-eslint/recommended", // règles TypeScript
    "plugin:prettier/recommended"   // Prettier intégré via ESLint
  ],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    // Ajustements personnalisés
    "prettier/prettier": ["error"], // signale les erreurs de formatage Prettier
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/strict-boolean-expressions": "warn",
  },
  ignorePatterns: [
    ".next/",
    "out/",
    "build/",
    "node_modules/",
    "next-env.d.ts"
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  ...nextVitals,
  ...nextTs,
});

export default eslintConfig;
