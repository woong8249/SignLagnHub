export default [
  {
    files: ['src/**/*.ts', '*.ts'],
    rules: {
      'import/prefer-default-export': 'off',
      'max-len': ['error', { code: 200 }],
    },
  },
];
