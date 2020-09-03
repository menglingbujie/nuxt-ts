import _ from "lodash";
import moment from "moment";
export function getPrecision(f:string) {
  const strs = f.toString().split(".")[1];
  if (!strs) {
    return 0;
  }
  return strs.length;
}

export function formatDateToCalendar(t:number){
  return moment.unix(t).calendar();
}
export function formatDateToHour(t:number){
  return moment.unix(t).format("HH:mm");
}
// export function tradeTimeRange(time:Array<any>) {
//   let rang:Array<any> = [], num = 0;
//   _.forEach(time, (t) => {
//     if (!t.open_hour && !t.open_min && !t.close_hour && !t.close_min) {
//       return true;
//     }
//     rang.push(t);
//   });

//   if (rang.length == 0) {
//     return "--:-- - --:--";
//   }

//   let str = "";
//   _.forEach(rang, (t) => {
//     let oh = formatTime(t.open_hour);
//     let om = formatTime(t.open_min);
//     let ch = formatTime(t.close_hour);
//     let cm = formatTime(t.close_min);
//     str += `${oh}:${om}-${ch}:${cm}<br/>`;
//   })
//   return str;
// }
// export function formatTime(t:string) {
//   return parseInt(t) < 10 ? `0${t}` : t;
// }

export function validateId(cardString:string) {

  function GetVCode(CardNo17:any) {
    var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
    var Ai = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    var cardNoSum = 0;
    for (var i = 0; i < CardNo17.length; i++)
      cardNoSum += CardNo17.charAt(i) * Wi[i];
    var seq = cardNoSum % 11;
    return Ai[seq];
  }

  function IsDate(strDate:string) {
    var r:any = strDate.match(/^(\d{1,4})(\d{1,2})(\d{1,2})$/);
    if (r == null) return false;
    var d:any = new Date(r[1], r[2] - 1, r[3]);
    return d.getFullYear() === r[1] / 1 && d.getMonth() + 1 === r[2] / 1 && d.getDate() === r[3] / 1;
  }

  cardString = cardString.replace(' ', '');

  var strCardNo;
  if (cardString.length === 18) {
    var pattern = /^\d{17}(\d|x|X)$/;
    if (pattern.exec(cardString) == null)
      return false;
    strCardNo = cardString.toUpperCase();
  } else {
    if (/^\d{15}$/.exec(cardString) == null)
      return false
    strCardNo = cardString.substr(0, 6) + '19' + cardString.substr(6, 9);
    strCardNo += GetVCode(strCardNo);
  }

  if (strCardNo.length != 18)
    return false;

  if (GetVCode(strCardNo.substr(0, 17)) != strCardNo.charAt(17)) {
    return false;
  }

  if (!IsDate(strCardNo.substr(6, 8))) {
    return false;
  }

  var prov = parseInt(strCardNo.substr(0, 2));
  const available =
  {
    11: 1,
    12: 1,
    13: 1,
    14: 1,
    15: 1,
    21: 1,
    22: 1,
    23: 1,
    31: 1,
    32: 1,
    33: 1,
    34: 1,
    35: 1,
    36: 1,
    37: 1,
    41: 1,
    42: 1,
    43: 1,
    44: 1,
    45: 1,
    46: 1,
    50: 1,
    51: 1,
    52: 1,
    53: 1,
    54: 1,
    61: 1,
    62: 1,
    63: 1,
    64: 1,
    65: 1,
    71: 1,
    81: 1,
    82: 1,
    91: 1
  };
  if (!available.hasOwnProperty(prov)) {
    return false;
  }
  return true;
}


export function displayTitle(title:string) {
  title = title.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, "-");
  return encodeURIComponent(title);
}