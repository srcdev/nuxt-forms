import type { StorybookConfig } from '@nuxtjs/storybook';

// https://storybook.js.org/docs/configure
const config: StorybookConfig = {
  // Required
  framework: '@storybook-vue/nuxt',
  stories: ['../../**/*.mdx', '../../**/stories/*.stories.@(js|jsx|mjs|ts|tsx)'],
  // Optional
  addons: ['@storybook/addon-essentials'],
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
};

export default config;
