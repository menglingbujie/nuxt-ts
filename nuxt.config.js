module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  router: {
    // middleware:"~/middleware/auth",
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
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
    'nuxt-i18n'
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
    extend(config, ctx) {
    }
  },
  i18n: {
    locales: [
      { code: 'en', name: "English" },
      { code: 'zh-CN', name: "简体中文" }
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
      cookieKey:"mylang"
    }
  },
  /**
   * 暴露给客户端用的环境变量
   */
  env:{
    apiHost: process.env.NUXT_API_URL
  }
}
