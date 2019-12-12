export default function({$axios,redirect}){
  $axios.onRequest(config=>{
    config.headers['Client-Lang']="zh-CN";
    config.headers["X-Client-Platform"]="pc";
    // console.log("Making request to ",config)
    return config;
  })
  $axios.onError(error=>{
    const code = parseInt(error.response&& error.response.status);
    if(code===404){
      redirect("/400");
    }
  })
}