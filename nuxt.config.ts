// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from '@nuxt/kit';
const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  devtools: { enabled: true },
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