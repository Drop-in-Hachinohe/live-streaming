// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
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
    '@nuxtjs/robots'
  ],
  robots: {
    UserAgent: '*',
    Disallow: '/'
  }
})
