const webpack = require("webpack");
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
require('dotenv').config();
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    link: [
      { rel: 'icon', type: 'image/x-icon', href: `${process.env.CDN_RESOURCE}/favicon.ico?v=0.0.2` }
    ],
    script: [
      { src: `${process.env.CDN_RESOURCE}/js/iconfont.js?v=0.0.8` },
			{ src: `${process.env.CDN_RESOURCE}/js/emsdk.js?v=1.0.0`}
    ]
  },
  router: {
    middleware: []
  },
  /*
  ** Customize the progress-bar color
  */
  // loading: { color: '#4e78ff' },
  loading:"@/components/LoadingGlobal.vue",
  /*
  ** Plugins to load before mounting the App
  */
 plugins: [
    '@/plugins/i18n',
    '@/plugins/iview',
    '@/plugins/axios'
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
    //'@nuxtjs/dotenv',
    //'nuxt-i18n',
    '@/modules/nuxt-i18n-override',
    ['nuxt-env', { // dev时NUXT_ENV_此类变量会自动注入env，否则需要这里暴露需要的环境变量
      keys: [
        'NUXT_ENV_ACCOUNT_URL',
        'NUXT_ENV_FOREX_URL',
        'NUXT_ENV_PROTOCOL',
        'CDN_RESOURCE',
        'CDN_DIST'
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
    proxyHeaders:false,
  },
  /*
  ** Build configuration
  */
  build: {
    devtools: process.env.NODE_ENV === 'development',
    extractCSS: true,
    //extractCSS: process.env.NODE_ENV === 'production',
    // optimization: {
    //   splitChunks: {
    //     cacheGroups: {
    //       styles: {
    //         name: 'styles',
    //         test: /\.(css|vue)$/,
    //         chunks: 'all',
    //         enforce: true
    //       }
    //     }
    //   }
    // },
    /*
    ** You can extend webpack config here
    */
    extend(config, { isDev, isClient}) {
      if (isDev) {
        config.devtool = isClient ? 'eval-source-map' : 'inline-source-map'
      }

      const CDN_DIST = process.env.CDN_DIST;

      if (!isDev && CDN_DIST) {
        config.output.publicPath = CDN_DIST;
      }
    },
    plugins:[
      new webpack.ProvidePlugin({
        '$':"jquery",
        '_':"lodash"
      }),
      new ExtractCssChunks({
        ignoreOrder: true,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [ExtractCssChunks.loader, 'css-loader'],
        },
      ],
    },
  },
  vue: {
    config: {
      productionTip: process.env.NODE_ENV === 'production',
      devtools: process.env.NODE_ENV === 'development',
    }
  },
  i18n:{
    strategy: 'prefix_also_default',
    defaultCountry: "us",
    defaultLocale: 'en-us',
    locales: [
      { code: 'en-us', name: "English", iso:"en-US"},
      { code: 'zh-cn', name: "简体中文", iso:"zh-CN"}
    ],
    vueI18n: {
      fallbackLocale: "en-us",
      messages: {
        "en-us": require("./locales/en.json"),
        "zh-cn": require("./locales/zh-CN.json")
      }
    },
    detectBrowserLanguage:false,
  },
  server:{
    host:"127.0.0.1",
    port:"3001",
  },
  telemetry: false
}
