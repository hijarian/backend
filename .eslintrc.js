module.exports = {
  root: true,
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2018,
  },
  overrides: [
    {
      files: ["**/*.ts"],
      // Enable Typescript parsing
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
        'plugin:prettier/recommended',
      ]
    },
    {
      files: ["**/*.json"],
      "extends": ["plugin:json/recommended"]
    }
  ],
  env: {
    node: true,
  },
};
