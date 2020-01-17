import { Middleware } from '@nuxt/types'
import CookieParser from "cookie";
import Cookie from "js-cookie"
const CountryRouterFilter = ()=>{

}
const myMiddleware: Middleware = ({app,req,route,redirect,store}:any) => {
  let tct:string="";
  // Use context
  if(process.server){
    const Cookies = CookieParser.parse(req.headers.cookie);
    tct = Cookies.tct||"";
  }else{
    tct=Cookie.get("tct")||"";
  }
  const DIYPageMap = store.state.DIYPage||{};
  const lang = app.i18n.locale;
  
  // console.log(tct,"--",route);
  const filterPath = route.path.replace(`/${lang}`,'');
  const pathMap = DIYPageMap[filterPath]||"";
  const newPath = pathMap && pathMap[tct]||"";
  newPath&&redirect(newPath)
}

export default myMiddleware;