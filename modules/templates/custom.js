/**
 * Created by Xuzhe on 2020/7/29.
 */
import { getLocaleCookie, setLocaleCookie } from './utils-common';


function getQueryLang(req) {
  if (req) {
    return (req.ctx.request.query.lang || '').toLowerCase()
  }

  const query = window.location.search.substring(1);
  const matched = query.split('&').find(item => item.startsWith('lang='));
  if (!matched) {
    return '';
  }
  return decodeURIComponent(matched.slice(5)).toLowerCase()
}

export function onDefaultDetectLanguage({app,req,route,redirect,store}) {

  const queryLang = getQueryLang(req);
  if (queryLang && app.i18n.localeCodes.includes(queryLang)) {
    console.log(`[GetLocaleFromQuerySuccess] ${queryLang}`);
    return queryLang;
  }

  const locale = getLocaleCookie(req, {
    useCookie: true,
    cookieKey: 'emhlang',
    localeCodes: app.i18n.localeCodes
  });

  if (locale) {
    console.log(`[GetLocaleFromCookieSuccess] ${locale}`)
    return locale;
  }

  if (process.server) {

    console.log(`[CallInServerForGeoLang] ${route.path} ${req.ctx.geoLang}`);
    return req.ctx.geoLang || '';
  } else {
    // client，没有cookie, 返回默认
    console.log(`[CallInClient] ${route.path}`)
    return '';
  }
}

export function onDefaultSetLanguage({ app, res, req, env }, locale) {
  if (process.server) {
    const isHttps = env.NUXT_ENV_PROTOCOL === "https" ? true : false;
    const opts = {
      useCookie: true,
      cookieKey: 'emhlang',
    };
    const cookieLocale = getLocaleCookie(req, Object.assign({}, opts, { localeCodes: app.i18n.localeCodes }));
    if (cookieLocale !== locale) {
      if (isHttps) {
        Object.assign(opts, { sameSite: "none", secure: true })
      }
      setLocaleCookie(locale, res, opts)
    }
  }
}
