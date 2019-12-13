import { Middleware } from "@nuxt/types";

const Auth:Middleware = (context)=>{
  console.log("==Auth==",context)
}
export default Auth;