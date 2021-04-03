module.exports = {
  root: true,
  // Enable Typescript parsing
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'plugin:prettier/recommended',
  ],
  env: {
    node: true,
  },
};
