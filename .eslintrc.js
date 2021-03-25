const path = require('path')
const fs = require('fs')

module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'graphql/template-strings': [
      'error',
      {
        env: 'relay',
        schemaString: fs.readFileSync(
          path.resolve(__dirname, './schema.graphql'),
          { encoding: 'utf-8', flag: 'r' }
        ),
        tagName: 'graphql',
      },
    ],
  },
  plugins: ['react', 'graphql'],
}
