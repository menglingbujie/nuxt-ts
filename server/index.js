const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const geoip = require("geoip-lite");
require('dotenv').config();

const app = new Koa()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'
function getClientIP(req){
  let ip = req.headers['x-forwarded-for'] || req.ip||req.connection.remoteAddress||req.socket.remoteAddress||req.connection.socket.remoteAddress||"";
  return ip && ip.split(",")[0]||"";
}

const KEY_CTCODE ="emh_ctcode";
const KEY_LANG ="emh_lang";
const KEY_SOURCE ="emh_source";
// 存储推广链接号码
function actStoreFxSource(cookies, source) {
  const oldSource = cookies.get(KEY_SOURCE) || "";
  if (!oldSource && source) {
    // 保存30天
    cookies.set(KEY_SOURCE, source, { httpOnly: false, path: "/", expires: new Date(Date.now() + 5 * 60 * 1000) });
  }
}
function getGeoLang(ct) {
  let lang = ct;
  switch (ct) {
    case "cn": {
      lang = "zh-cn"
    } break;
    case "us": {
      lang = "en-us";
    } break;
  }
  return lang;
}
async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)
  const {
    host = process.env.NUXT_ENV_HOST || '127.0.0.1',
    port = process.env.NUXT_ENV_PORT || 3001
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  app.use((ctx) => {
    // 存储当前国家code
    const ip = getClientIP(ctx.req);
    const geo = geoip.lookup(ip);
    const geoCountry = (geo && geo.country) || nuxt.options.i18n.defaultCountry || "";
    const geoCT = geoCountry && geoCountry.toLowerCase();
    const geoLang = getGeoLang(geoCT); // 获取geoip国家相关语言
    let ctcode = ctx.cookies.get(KEY_CTCODE)||"";
    let cookieLang = ctx.cookies.get(KEY_LANG)||"";
    // 如果没有设置国家代码则初始化
    if (!ctcode) {
      geoCT && ctx.cookies.set(KEY_CTCODE, geoCT, { httpOnly: false });
      ctcode = geoCT;
    }
    if (!cookieLang) {
      cookieLang = geoLang;
    }

    // 此处保存上下文变量用于后续默认url下语言选择
    ctx.geoLang = geoLang;
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash

    // 处理url里带ct字段指定的国家，优先处理
    const _urlct = ctx.request.query.ct || "";
    if (_urlct && (_urlct != ctcode)) {
      ctx.cookies.set(KEY_CTCODE, _urlct.toLowerCase(), { httpOnly: false });
    }
    /**
     * 全局存储推广链接渠道号（市场需求，之前只有s，ss，sss，invite，source五中推广方式）
     * 统一修改为无论什么url，只要带着fx_source就视为推广链接，存储source
     * #1 url里存在source并且与cookie的source不一致则更新source
     * at 20190801 by menglj
     * 修改#1需求
     * #2 修改为source在有效期间内不一样也不更新，自动30天过期后再存储，
     * 保护第一个IB的推广效益，期限为30天（有可能用户不第一时间注册，又点了另一个推广链接导致关联错误）
     * 注册成功后也不删除，可以继续关联注册第二个账号（江涌涛需求）
     * at 20191126 by menglj
     */
    const source = ctx.request.query.fx_source || "";
    if (source) {
      actStoreFxSource(ctx.cookies, source);
    }
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
