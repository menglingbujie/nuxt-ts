module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  router: {
    middleware:["route-ct"],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: 'blue' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios',
    '~/plugins/i18n'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'nuxt-i18n',
    // NUXT_ENV inject in process.env auto
    ['nuxt-env',{
      keys:[
        "SOURCE",
      ]
    }]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  ** Not only use baseURL all stores
  ** eg: account api use account host, list api use list host
  */
  axios: {
    // baseURL:process.env.NUXT_API_URL
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    additionalExtensions:['ts'],
    // extend(config, ctx) {
    // }
  },
  i18n: {
    locales: [
      { code: 'en', name: "English", iso: "en-US"},
      { code: 'zh-CN', name: "简体中文", iso: "zh-ZH"}
    ],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: "en",
      messages: {
        en: require("./locales/en.json"),
        "zh-CN": require("./locales/zh-CN.json")
      }
    },
    detectBrowserLanguage:{
      useCookie:true,
      cookieKey:"mylang",
      fallbackLocale: "en",
      alwaysRedirect: true,
    }
  },
  server:{
    host:"127.0.0.1",
    port:"3001"
  }
}
