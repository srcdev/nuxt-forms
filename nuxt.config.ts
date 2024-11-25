// https://nuxt.com/docs/api/configuration/nuxt-config
// import { createResolver } from '@nuxt/kit';
// const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  devtools: { enabled: true },
  // css: [resolve('./assets/styles/main.css')],
  css: ['modern-normalize', './assets/styles/main.css'],
  modules: ['@nuxt/icon', '@nuxt/test-utils/module', '@nuxtjs/storybook'],
  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ['vitest/globals'], // TypeScript support for globals
      },
    },
  },
  components: [
    {
      path: './components',
      pathPrefix: false,
    },
  ],
  storybook: {
    host: 'http://localhost:6006',
    port: 6006,
  },
  compatibilityDate: '2024-07-13',
});
