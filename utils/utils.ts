import _ from "lodash";
import moment from "moment";
import momentTZ from "moment-timezone"

export function listen(event:any, fn:any) {
  addEventListener(event, fn, false);
  return function () {
    removeEventListener(event, fn, false);
  }
}

export function formatPhone(phone:string|number) {
  if(!phone) {
    return ""
  };
  let _phone:string = phone.toString();
  let len:number = _phone.length;
  const cutPos = _.round(len / 2);
  return _phone.substring(0, cutPos) + "****" + _phone.substr(cutPos + 4);
}

export function formatBankNum(num:string){
  let bankNum = num;
  if (!bankNum) {
    return;
  }
  let len = bankNum.length;
  return `${bankNum.slice(0, 4)} **** **** ${bankNum.slice(len - 4)}`;
}

export function formatName(name:string,limit:number=4){
  let firstWord = name.slice(0, 1), len = name.length, lastWord = name.slice(-1);
  if(len<=0){
    return "";
  }else if(len==1){
    return name;
  }else if (len==2){
    return firstWord + _.repeat("*", len-1);
  }else{
    // 星数限制判断，不能超过最大限制
    let size=len-2;
    if (size > limit){
      size=limit;
    }
    return firstWord + _.repeat("*", size)+lastWord;
  }
}

export function formatEmail(email:string){
  const temail:string = email.replace(/\@.*/, "");
  let len:number = temail.length;
  const cutPos = _.round(len / 2);
  return email.substring(0, cutPos) + "****" + email.substr(cutPos + 4);
}

export function formatMoney(money:number|string) {
  if (!money) { return "$0.00"; }
  return Number(money).toFixed(2).toString().replace(/^(\-)*/, "$1$");
}
export function formatMoneyWithSymbol(money:number|string){
  if(money>0){
    return "+"+formatMoney(money);
  }
  return formatMoney(money);
}
export function formatDate(t:number){
  return moment.unix(t).format("YYYY-MM-DD HH:mm");
}

export function formatSize(a:any,b:any=Math,c:any=Math.log,d:number=1024,e:number=0) {
  return (b=Math,c=b.log,d=1024,e=c(a)/c(d)|0,a/b.pow(d,e)).toFixed(2)
    +' '+(e?'KMGTPEZY'[--e]+'B':'Bytes')
}

export function splitRightUpperCase(str:string,div:string){
  const splitStr:Array<string>|null = _.split(str, div);
  const _str: string = `${splitStr[0]}${div}${_.toUpper(splitStr[1])}`;
  return _str;
}
export function splitLeftUpperCase(str: string, div: string) {
  const splitStr: Array<string> | null = _.split(str, div);
  const _str: string = `${_.toUpper(splitStr[0])}${div}${splitStr[1]}`;
  return _str;
}

export function isFromThird(req:any){
  let host:string = "";
  if (process.server) {
    host = req.headers.host;
  } else {
    host = location.hostname;
  }
  // 第三方域名则隐藏头尾
  if (host ==='console.eaglesmarkets.com'){
    return true;
  }
  return false;
}

export function unixToForex(unixTimestamp: number) {
  const m: any = momentTZ.unix(unixTimestamp);
  if (m.tz('America/New_York').isDST()) {
    return unixTimestamp + 3 * 3600;
  } else {
    return unixTimestamp + 2 * 3600;
  }
}

export function forexToUnix(forexTimestamp: number) {
  const m: any = momentTZ.unix(forexTimestamp);
  if (m.tz('America/New_York').isDST()) {
    return forexTimestamp - 3 * 3600;
  } else {
    return forexTimestamp - 2 * 3600;
  }
}
export function reverse(arr:Array<any>) {
  let left = null, right = null, newarr = [...arr];
  const len = newarr.length
  for (left = 0; left < len / 2; left++) {
    right = len - 1 - left;
    let temp = newarr[left];
    newarr[left] = newarr[right];
    newarr[right] = temp;
  }
  return newarr;
}
export function getUrlParams(name: string) {
  return getParamsByUrl(location.search, name);
}
export function getParamsByUrl(url: string, name: string) {
  var reg: any = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r: any = url.substr(1).match(reg);
  if (r != null) return (r[2]); return null;
}
export function normalizePath(path: string,i18n:any) {
  const localeOrDefault: string = (i18n as any).localeOrDefault;
  if (localeOrDefault === 'default') {
    return path;
  }
  return `/${localeOrDefault}${path}`
}