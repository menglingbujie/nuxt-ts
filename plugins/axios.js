import { getCookie } from "@/utils/cookie.ts";
import UADapter from "@/utils/ua.ts";
function formatLanguage(lang){
  if(!lang){return "en-US"}
  let spLang = lang.split("-");
  let _lang=spLang[1]||"";
  if(_lang){
    return `${spLang[0]}-${(_lang.toUpperCase())}`;
  }
  return lang;
}
function getClientPlatform(UA) {
  // 平台字段 目前：mobile-ios, mobile-android, app-ios, app-android, pc, weixin
  let platform;
  if (UA.Weixin) {
    platform = "weixin";
  }
  if (UA.App) {
    platform = "app";
    if (UA.Android) {
      platform += "-android";
    } else if (UA.iPhone || UA.iPad) {
      platform += "-ios";
    }
  } else if (UA.Mobile) {
    platform = "mobile";
    if (UA.Android) {
      platform += "-android";
    } else if (UA.iPhone || UA.iPad) {
      platform += "-ios";
    }
  } else {
    platform = "pc-em";
  }
  return platform;
}
const KEY_SOURCE = "fxsource";
function makeOnRequest(store, req, isAccount) {
  return (config) => {
    const UA = UADapter(req);

    const pt = getClientPlatform(UA);
    const source = getCookie(KEY_SOURCE, req) || ""; // 优先区cookie的source，其次去url的。主要是为了解决移动端的无痕模式

    // 通过locale获取当前的语言
    const lang = store.$i18n.locale || getCookie("emhlang", req);
    // console.log(store.state.emhlang, "==slang=", store.$i18n.locale, "====lang==", lang, "-cklang--", getCookie("emhlang", req),"====",langObj && langObj.ios);
    const ct = store.state.fxctcode || "us";
    config.headers['Client-Lang'] = formatLanguage(lang);// 处理zh-cn,en-us改为zh-CN,en-US
    config.headers["X-Client-Platform"] = pt;
    source&&(config.headers['Client-Source'] = source);
    // console.log(getCookie("fxctcode", req),"=ct==",store.state.fxctcode)
    config.headers['CLIENT-COUNTRY'] = ct;
  };
}
function sendIframeMessage(data) {
  if(process.server){ return;}
  const win = window;
  if (win.postMessage) {
    win.parent.postMessage(data, "*")
  } else {
    win.parent.name = JSON.stringify(data);
  }
}
function makeOnResponse(response){
  // console.log(response.status,"===resp==",response.data.eventCode)
  const code = response.data.eventCode;
  if(code===1001||code===401){
    // console.log("==reponse=",store.state.from)
    sendIframeMessage({type:1001,msg:"login"});
  }
  return response;
}
function makeOnError(redirect) {
  return (error) => {
    // console.log("==errr=",error)
    const code = parseInt(error.response&& error.response.status);
    if(code===404){
      redirect("/404");
    }
  }
}

export default function({store,$axios,redirect,req, app}, inject){

  // new in 5.9.0
  const account = $axios.create({
    headers: {
      common: {
      }
    }
  });
  account.onResponse(makeOnResponse);
  account.onRequest(makeOnRequest(store,req, true));
  account.setBaseURL(app.$env.NUXT_ENV_ACCOUNT_URL);
  account.onError(makeOnError(redirect));
  inject('accountApi', account);

  const trade = $axios.create({
    headers: {
      common: {
      }
    }
  });
  trade.onResponse(makeOnResponse);
  trade.onRequest(makeOnRequest(store,req, false));
  trade.setBaseURL(app.$env.NUXT_ENV_TRADE_SOCKET_URL);
  trade.onError(makeOnError(redirect));
  inject('tradeSocketApi', trade);

  $axios.onResponse(makeOnResponse);
  $axios.onRequest(makeOnRequest(store,req,false));
  $axios.setBaseURL(app.$env.NUXT_ENV_FOREX_URL);
  $axios.onError(makeOnError(redirect))
}
