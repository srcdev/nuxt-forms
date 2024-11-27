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
