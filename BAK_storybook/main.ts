import type { StorybookConfig } from '@storybook-vue/nuxt';
const config: StorybookConfig = {
  stories: ['../**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-interactions', '@storybook/addon-essentials'],
  framework: {
    // name: '@storybook-vue/nuxt',
    name: '@storybook-vue/nuxt',
    options: {},
  },
  // framework: '@storybook-vue/nuxt',

  docs: {
    autodocs: 'tag',
  },
  // @ts-ignore
  vite: {
    // plugins: [],
    // fix below is not needed
    /*optimizeDeps: {
      include: ['storybook > @storybook/core > jsdoc-type-pratt-parser'],
    },*/
  },
};
export default config;
