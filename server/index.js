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
// �洢�ƹ����Ӻ���
function actStoreFxSource(cookies, source) {
  const oldSource = cookies.get(KEY_SOURCE) || "";
  if (!oldSource && source) {
    // ����30��
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
    // �洢��ǰ����code
    const ip = getClientIP(ctx.req);
    const geo = geoip.lookup(ip);
    const geoCountry = (geo && geo.country) || nuxt.options.i18n.defaultCountry || "";
    const geoCT = geoCountry && geoCountry.toLowerCase();
    const geoLang = getGeoLang(geoCT); // ��ȡgeoip�����������
    let ctcode = ctx.cookies.get(KEY_CTCODE)||"";
    let cookieLang = ctx.cookies.get(KEY_LANG)||"";
    // ���û�����ù��Ҵ������ʼ��
    if (!ctcode) {
      geoCT && ctx.cookies.set(KEY_CTCODE, geoCT, { httpOnly: false });
      ctcode = geoCT;
    }
    if (!cookieLang) {
      cookieLang = geoLang;
    }

    // �˴����������ı������ں���Ĭ��url������ѡ��
    ctx.geoLang = geoLang;
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash

    // ����url���ct�ֶ�ָ���Ĺ��ң����ȴ���
    const _urlct = ctx.request.query.ct || "";
    if (_urlct && (_urlct != ctcode)) {
      ctx.cookies.set(KEY_CTCODE, _urlct.toLowerCase(), { httpOnly: false });
    }
    /**
     * ȫ�ִ洢�ƹ����������ţ��г�����֮ǰֻ��s��ss��sss��invite��source�����ƹ㷽ʽ��
     * ͳһ�޸�Ϊ����ʲôurl��ֻҪ����fx_source����Ϊ�ƹ����ӣ��洢source
     * #1 url�����source������cookie��source��һ�������source
     * at 20190801 by menglj
     * �޸�#1����
     * #2 �޸�Ϊsource����Ч�ڼ��ڲ�һ��Ҳ�����£��Զ�30����ں��ٴ洢��
     * ������һ��IB���ƹ�Ч�棬����Ϊ30�죨�п����û�����һʱ��ע�ᣬ�ֵ�����һ���ƹ����ӵ��¹�������
     * ע��ɹ���Ҳ��ɾ�������Լ�������ע��ڶ����˺ţ���ӿ������
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
