export default function({$axios,redirect}){
  $axios.onRequest(config=>{
    console.log("Making request to ",config)
    // config.headers['Client-Lang']="zh-CNN";
    return config;
  })
  $axios.onError(error=>{
    const code = parseInt(error.response&& error.response.status);
    if(code===404){
      redirect("/400");
    }
  })
}