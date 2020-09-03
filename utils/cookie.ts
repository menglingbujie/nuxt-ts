
import Cookie from 'js-cookie';
import cookieParser from "cookie";
import _ from "lodash";

export function setCookie(key: string, value: string, options: any = {}, cookies: any = null) {
  let opts: any = _.assign({}, options, { httpOnly: false, path: "/" });
  if (process.server) {
    if (!value) {
      _.assign(opts, { maxAge: 0 })
    }
    const day: number = options.expires || 1;
    const ct = new Date(Date.now() + 1000 * 60 * 24 * day);
    cookies && cookies.set(key, value, _.assign({}, opts, { expires: ct }))
  } else {
    Cookie.set(key, value, opts);
  }
}
export function getCookie(key: string, req: any = null): string | undefined {
  if (process.server) {
    const cookies = cookieParser.parse(req.headers.cookie || '');
    return cookies[key];
  }
  return Cookie.get(key);
}
export function removeCookie(key: string, cookies: any = null) {
  if (process.server) {
    cookies && cookies.set(key, '', { maxAge: 0, httpOnly: false, path: "/" })
  } else {
    Cookie.remove(key)
  }
}