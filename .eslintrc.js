module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'import/no-unresolved': 'off',
    'no-undef': 'off',
    'no-console': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
