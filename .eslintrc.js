module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: [
    '.eslintrc.js',
    'reportWebVitals.ts',
    'craco.config.js',
  ],
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
    'require-yield': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'linebreak-style': 'off',
  }
};
