// import { setLang } from "@/utils/lang";
const types={
  SET_LANG:"SET_LANG",
}
export const state=()=>({
  locales:['en','zh-CN'],
  locale:"zh-CN"
})

export const mutations={
  [types.SET_LANG](state,locale){
    state.locale=locale;
    // setLang(locale);
  }
}