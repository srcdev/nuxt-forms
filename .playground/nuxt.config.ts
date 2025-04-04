// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    https: false,
  },
  extends: ['..'],
  css: ['modern-normalize', './assets/styles/main.css'],
  modules: ['@nuxt/icon', '@nuxt/test-utils/module'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      titleTemplate: '%s - Website name',
      meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in',
    },
  },
  components: [
    {
      path: './components',
      pathPrefix: false,
    },
  ],
});
