import Cookies from 'js-cookie'
const LangKey = 'lang';

export function getLang(){
  return Cookies.get(LangKey) || "";
}

export function setLang(lang) {
  Cookies.set(LangKey, lang, { path: '/', expires: 7 });
}

export function removeLang() {
  Cookies.remove(LangKey, { path: '/' });
}
