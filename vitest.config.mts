import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    environment: 'nuxt', // Use the Nuxt environment for tests
    globals: true, // Allows using describe, test, expect without imports
  },
});
