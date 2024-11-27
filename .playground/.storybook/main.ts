import type { StorybookConfig } from '@storybook-vue/nuxt';
const config: StorybookConfig = {
  stories: ['../../**/*.stories.ts'],
  addons: ['@storybook/addon-links', '@storybook/addon-interactions', '@storybook/addon-essentials'],
  framework: {
    name: '@storybook-vue/nuxt',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};
export default config;
