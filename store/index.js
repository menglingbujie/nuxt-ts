
import { getCookie, setCookie} from "../utils/cookie"
import _ from "lodash";
function fetchReq(httpReq, url, data, opts) {
  return httpReq(url, data, opts).then((resp) => { return resp.data; })
}
export const state=()=>({
  isShowRisk:true,
  emhctcode:"us",
  emhlang:"en-us",
  em_actk:"",
  em_astk:"",
  listDownload:[], // 下载列表
})

export const mutations={
  UPDATE_COUNTRY_CODE(state, code) {
    state.emhctcode=code;
  },
  SAVE_TK(state,tk){
    state.em_actk = tk.actk;
    state.em_astk = tk.astk;
  },
  SET_LANG(state,lang){
    if (lang != state.emhlang){
      state.emhlang=lang;
    }
  },
  UPDATE_LIST_DOWNLOAD_URLS(state,list){
    // console.log("==list=state=",list);
    state.listDownload=list;
  }
}
export const getters = {
  listDownloads(state) {
    return state.listDownload||[];
  },
}
export const actions={
  async nuxtServerInit({commit,dispatch,state},{isHMR,route,req}){
    if(isHMR) return;
    const code = route.query.ct || getCookie("emhctcode",req)||"";
    if (code) {
      const _code = code.toLowerCase();
      commit("UPDATE_COUNTRY_CODE", _code);
    }
    try{
      // 下载列表不存在则请求下载列表
      const _localDlList = getCookie("em_dlurls", req)||[];
      const isInitDownload = !_.isEmpty(_localDlList)?true:false;
      // console.log(_localDlList,"==isInitDownload=",isInitDownload)
      let list = [];// 列表数组
      if ((!state.listDownload || state.listDownload.length <= 0) && !isInitDownload){
        const resp = await dispatch("fetchDownloadUrl");
        list=resp.data||[];
      }else{
        if(_.isString(_localDlList)){
          list = JSON.parse(_localDlList);
        }
      }
      // 列表有数据则存储更新
      if (list && list.length > 0) {
        commit("UPDATE_LIST_DOWNLOAD_URLS", list)
        setCookie("em_dlurls", JSON.stringify(list), { expires: 7 }, (req && req.ctx && req.ctx.cookies))
      }
    }catch(err){
      console.log("=nuxtServerInit=err=",err);
    }
  },
  updateCountryCode(context,code){
    context.commit("UPDATE_COUNTRY_CODE",code);
  },
  saveThirdToken(context,tk){
    context.commit("SAVE_TK",tk)
  },
  updateLang(context,lang){
    context.commit("SET_LANG", lang);
  },
  fetchDownloadUrl(context){
    return fetchReq(this.$axios.get, "/tools/download-list");
  }
}