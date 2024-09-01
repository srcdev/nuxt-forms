// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from '@nuxt/kit';
const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  devtools: { enabled: true },

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
  css: [resolve('./assets/styles/main.css')],

  runtimeConfig: {
    public: {
      validatorLocale: 'en-GB',
    },
  },

  modules: ['@nuxt/icon'],

  components: [
    {
      path: './components',
      pathPrefix: false,
    },
  ],

  compatibilityDate: '2024-07-13',
});
