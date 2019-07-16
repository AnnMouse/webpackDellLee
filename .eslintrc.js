module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
  ],
  parser:"babel-eslint",
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    document:false,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/prefer-stateless-function":0,
    "react/jsx-filename-extension":0
  },
};
