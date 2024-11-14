// https://nuxt.com/docs/api/configuration/nuxt-config
// import { createResolver } from '@nuxt/kit';
// const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  devtools: { enabled: true },
  // css: [resolve('./assets/styles/main.css')],
  css: ['modern-normalize', './assets/styles/main.css'],
  modules: ['@nuxt/icon'],
  components: [
    {
      path: './components',
      pathPrefix: false,
    },
  ],
  compatibilityDate: '2024-07-13',
});
