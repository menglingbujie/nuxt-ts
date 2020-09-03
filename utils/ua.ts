/* by menglj at 20170321 */
export default function (req: any = null) {
  let ua: any, _urlPath: string;
  if (req) {
    ua = req.headers['user-agent'];
    _urlPath = req.url.replace(/\/$/, "");
  } else {
    ua = navigator.userAgent;
    _urlPath = location.pathname.replace(/\/$/, "");
  }
  let _$adapter: any = {
    Mobile: false,
    iPhone: false,
    iPad: false,
    PC: false,
    Android: false,
    Other: false,
    isMobile: false,
    isWeixin: false,
    isInApp: false,
    userAgent: ua,
  };
  // 检测是否在app内部打开
  _$adapter.isInApp = /ubfx/g.test(ua) ? true : false;

  if (/MicroMessenger/ig.test(ua)) {
    _$adapter.isWeixin = true;
  }
  if (/mobile/ig.test(ua)) {
    _$adapter.Mobile = true;
  }
  if (/iPhone/ig.test(ua)) {
    _$adapter.iPhone = true;
  } else if (/iPad/ig.test(ua)) {
    _$adapter.iPad = true;
  } else if (/Android/ig.test(ua)) {
    _$adapter.Android = true;
  } else {
    _$adapter.PC = true;
  }
  _$adapter.isMobile = _$adapter.PC ? false : true;

  if (_urlPath.match(/^\/(api|i18n|socket.io\/*)$/)) {
    return _$adapter;
  }
  return _$adapter;
};
