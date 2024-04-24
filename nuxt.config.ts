// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  components: [
    // { path: '~/components/elements' },
    { path: '~/components/layouts' },
    '~/components',
  ],
  css: ['~/assets/styles/global.scss'],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width',
      htmlAttrs: {
        lang: 'ja',
      },
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' }
      ],
    },
  },
  runtimeConfig: {
    notion: {
      token: process.env.NOTION_TOKEN,
      databaseId: process.env.NOTION_DATABASE_ID,
    }
  },
  modules: [
    '@nuxtjs/robots', '@nuxtjs/i18n',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  robots: {
    UserAgent: '*',
    Disallow: '/'
  },
  i18n: {
    locales: [
      { code: 'ja', iso: 'ja-JP', file: 'ja.json' },
      // { code: 'en', iso: 'en-US', file: 'en.json' },
    ],
    defaultLocale: 'ja',
    langDir: 'locales/',
    strategy: 'no_prefix',
    lazy: true,
    compilation: {
      strictMessage: false,
    },
  },
})
