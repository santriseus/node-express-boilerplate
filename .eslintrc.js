module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true,
    'mocha': true,
  },
  'extends': [
    'google',
  ],
  'parserOptions': {
    'ecmaVersion': 12,
  },
  'rules': {
    'max-len': [2, 150, 4],
    'require-jsdoc': 0,
  },
  'globals': {
    'assert': 'readonly',
    'expect': 'readonly',
    'should': 'readonly',
  },
};
