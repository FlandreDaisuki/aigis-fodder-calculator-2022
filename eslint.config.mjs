import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [{
  ignores: ['**/dist/', '**/node_modules/'],
}, ...compat.extends('eslint:recommended', 'plugin:vue/vue3-recommended'), {
  languageOptions: {
    globals: {
      ...globals.node,
    },

    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  rules: {
    'array-bracket-newline': ['error', 'consistent'],
    'arrow-parens': 'error',
    'arrow-spacing': 'error',
    'block-spacing': 'error',

    'brace-style': ['error', '1tbs', {
      allowSingleLine: true,
    }],

    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': 'error',
    indent: ['error', 2],
    'key-spacing': 'error',
    'keyword-spacing': 'error',
    'max-len': 'off',
    'no-console': 'off',
    'no-multi-spaces': 'error',

    'no-multiple-empty-lines': ['error', {
      max: 2,
      maxEOF: 0,
    }],

    'object-curly-spacing': ['error', 'always'],
    quotes: ['error', 'single'],
    'quote-props': ['error', 'as-needed'],
    semi: ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],
    'space-infix-ops': 'error',
    'template-curly-spacing': 'error',
  },
}];
