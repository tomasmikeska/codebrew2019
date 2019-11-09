module.exports = {
  env: {
    'jest/globals': true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'jest'],
  parser: '@typescript-eslint/parser',
  rules: {
    'no-console': 'off',
    'class-methods-use-this': 'off', // in our services we use this quite a lot...
    '@typescript-eslint/no-parameter-properties': 'off', // kotlin like constructors
    'no-useless-constructor': 'off', // in typescript we can use empty private constructor or constructor with parameter properties
    'no-empty-function': 'off', // same as no-useless-contructor
    'max-len': ['error', { code: 120 }],
    '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        // testing libraries are in dev dependencies
        devDependencies: ['**/*.test.js', '**/*.spec.js', '**/*.test.ts', '**/*.spec.ts'],
      },
    ],
  },
  overrides: [
    {
      files: ['**/_test/*.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};
