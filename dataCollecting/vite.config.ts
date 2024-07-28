import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {

    test: {
      root: 'test',
      reporters: 'verbose',
      coverage: {
        provider: 'v8',
      },
    },
  };
});
