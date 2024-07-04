export default [
  {
    files: ['src/**/*.ts', 'test/**/*.ts', '*.ts'],
    rules: {
      'max-len': ['error', { code: 200 }],
      'import/prefer-default-export': 'off',
    },
  },
];
