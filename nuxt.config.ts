// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['modern-normalize', './assets/styles/main.css'],
  modules: ['@nuxt/icon', '@nuxt/test-utils/module', '@nuxtjs/storybook'],
  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ['vitest/globals'], // TypeScript support for globals
      },
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
        'data-color-scheme': 'auto',
      },
      titleTemplate: '%s - Website name',
      meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    },
  },
  components: [
    {
      path: './components',
      pathPrefix: false,
    },
  ],
  vue: {
    runtimeCompiler: true,
  },
  compatibilityDate: '2024-07-13',
});
