
function makeOnRequest(store:any, req:any, isAccount:boolean) {
  return (config:any) => {

    config.headers['Client-Lang'] = store.$i18n.locale;
    config.headers["X-Client-Platform"] = "pc";

    // config.headers['Authorization'] = getFullToken(req, isAccount);
  };
}

function makeOnError(redirect:any) {
  return (error:any) => {
    const code = parseInt(error.response && error.response.status);
    if (code === 404) {
      redirect("/400");
    }
  }
}
const Axios = ({ store, $axios, redirect, req, app }:any, inject:any)=>{
  const trade = $axios.create({
    headers: {
      common: {
      }
    }
  });

  trade.onRequest(makeOnRequest(store, req, false));
  trade.setBaseURL(app.$env.NUXT_ENV_API_URL2);
  trade.onError(makeOnError(redirect));
  inject('tradeSocketApi', trade);

  $axios.onRequest(makeOnRequest(store, req, false));
  $axios.setBaseURL(app.$env.NUXT_ENV_API_URL);
  $axios.onError(makeOnError(redirect))
}
export default Axios;