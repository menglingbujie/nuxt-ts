import { Middleware } from '@nuxt/types'
import CookieParser from "cookie";
import Cookie from "js-cookie"
import _ from "lodash";

function isInDIYPath(pathMap:any,path:string):boolean{
  if (!path){return false;}
  if (_.isEmpty(pathMap)){return false;}
  // console.log(pathMap,"====",path)
  // 判断地址是否在自定义列表里面
  return pathMap[path] || "";
}
const myMiddleware: Middleware = ({app,req,route,redirect,store}:any) => {
  let ctcode:string="";
  // 获取当前国家
  if(process.server){
    const Cookies = CookieParser.parse(req.headers.cookie);
    ctcode = Cookies.ctcode||app.i18n.defaultCountry||"us";
  }else{
    ctcode = Cookie.get("ctcode") || app.i18n.defaultCountry || "us";
  }
  const DIYPageMap = store.state.DIYPage||{}; // 自定义页面路由映射表
  const supportCountry = store.state.supportCountry;
  // 处理当前路由
  const pathSplice:Array<string> = _.words(route.path, /[^\/]+/g);
  // 判断是否是在自定义国家列表里，首先判断首页
  let pathMap = DIYPageMap[route.path] || "";
  // console.log(route.path+"===",pathMap,"-==00===", pathSplice)
  // 首页的情况，直接重定向到相关页面
  if (_.isEmpty(pathSplice)){
    const newPath = pathMap && pathMap[ctcode] || "";
    // console.log("==home===",newPath);
    return newPath && redirect(newPath);
  }
  
  const countryCode = _.nth(pathSplice, 1);
  // 当前国家与路由中的国家一样时不做处理
  if (!_.isEqual(countryCode, ctcode)) {
    let newPath:string='';
    // 判断是否有国家代码，如果没有则继续判断链接是否在自定义国家内，否则前面加上当前的国家代码重组链接
    if (_.isEmpty(countryCode)){
      newPath = "/" + _.join(pathSplice, "/");
      // 不在DIY国家内则不处理链接
      if (!isInDIYPath(DIYPageMap, (newPath||""))) { return; }
      // 如果链接在DIY内则前面加上国家代码
      pathSplice.unshift(ctcode);
      newPath = "/" + _.join(pathSplice, "/");
    }else{
      const path=_.nth(pathSplice, 2)||"";
      const fullPath =  path? ("/" +path):"/";
      if (!isInDIYPath(DIYPageMap, fullPath)){return;}
      // 如果是/en/us这类的路由，认为是国家定制的路由则需进一步处理
      if (_.indexOf(supportCountry, countryCode) != -1) {
        pathSplice[1] = ctcode; // 路由中的国家替换成当前设置的国家
        newPath = "/" + _.join(pathSplice, "/")
      }
    }
    // return console.log("===new path==="+newPath);
    return newPath&&redirect(newPath);
  }
  // console.log("==same country=")
}

export default myMiddleware;