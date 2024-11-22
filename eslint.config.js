import js from '@eslint/js';
import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

const stylisticCustom = stylistic.configs.customize({
  indent: 2,
  quotes: 'single',
  semi: true,
  jsx: true,
  arrowParens: true,
});

export default tseslint.config(
  { ignores: ['dist', 'node_modules', '**/*.d.ts'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, stylisticCustom],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      '@stylistic': stylistic,
      'react': react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,
      "array-callback-return": "error",
      "no-console": "warn",
      "no-duplicate-imports": "error",
      "no-lonely-if": "error",
      "no-magic-numbers": [
        "warn",
        {
          ignore: [0, 1],
        },
      ],
      "no-use-before-define": "error",
      "no-useless-assignment": "error",
      "no-var": "error",
      "prefer-const": "error",
      "sort-imports": [
        "error",
        {
          allowSeparatedGroups: true,
          ignoreCase: true,
        },
      ],
      "@stylistic/function-call-spacing": "error",
      "@stylistic/function-call-argument-newline": [
        "error",
        "consistent",
      ],
      "@stylistic/function-paren-newline": [
        "error",
        "consistent",
      ],
      "@stylistic/jsx-pascal-case": "error",
      "@stylistic/jsx-props-no-multi-spaces": "error",
      "@stylistic/jsx-self-closing-comp": "error",
      "@stylistic/multiline-comment-style": "error",
      "@stylistic/newline-per-chained-call": "error",
      "@stylistic/no-extra-semi": "error",
      "@stylistic/switch-colon-spacing": "error",
      "react/react-in-jsx-scope": "off",
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
    settings: {
      react: {
        version: "detect",
      }
    }
  },
);
