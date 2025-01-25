import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error vite-plugin-vuetify is not typed
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/eslint',
  ],
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg',
        },
        // wait for https://github.com/vuetifyjs/vuetify/issues/20882
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap',
        },
      ],
    },
  },
  build: {
    transpile: ['vuetify'],
  },
  compatibilityDate: '2024-11-01',
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    // https://vitejs.cn/vite5-cn/config/shared-options.html#define
    define: { __BUILDING_TIME__: JSON.stringify(new Date().toISOString()), __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true' },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  i18n: {
    locales: [
      { code: 'en', language: 'en-US', file: 'en.ts' },
      { code: 'zhHans', language: 'zh-CN', file: 'zhHans.ts' },
    ],
    defaultLocale: 'en',
  },
})
