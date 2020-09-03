/**
 * em iframe sdk
 * by menglj at 20200402
 * 此sdk只对外提供load api加载页面用
 * 会监听iframe发来的消息动态更新iframe高度
 * 初始化时指定id
 */
(function (para) {
  var v=para.version,n = para.name, w = window, d = document;
  if (typeof (w['emsdkv'+v]) !== 'undefined') {
    return false;
  }

  function renderIfrHeight(h){
    var m = d.getElementById(para.id);
    m.setAttribute("height",h)
  }

  // iframe创建
  w['emsdkv'+v] = n;

  // 提供api
  function b(l){
    var m = d.getElementById(para.id)
    // console.log(m,"=load page==",l);
    m.setAttribute("src",l);
  }

  function init(){
    var eaglesmarket = d.getElementById("eaglesmarket")
    // console.log(eaglesmarket,"==dd=",a)
    if(!eaglesmarket){
      console.log("===err=页面必须给定eaglemarket为id的标签=")
      return;
    }
    var a = d.createElement("iframe");
    a.setAttribute("id",para.id)
    a.setAttribute("name",para.id)
    a.setAttribute("allowTransparency", "true")
    a.setAttribute("frameBorder", "0")
    a.setAttribute("scrolling", "no")
    a.setAttribute("width", "100%")
    a.setAttribute("src",para.url_default)
    a.onload=function(){
    }
    eaglesmarket.insertBefore(a,null);
    // 监听postMessage消息
    if(w.postMessage){
      if(w.addEventListener){
        w.addEventListener("message",function(e){
          // console.log("===get msg===",e.data)
          renderIfrHeight.call(w,e.data);
        },false)
      }else if(w.attachEvent){
        w.attachEvent("onmessage",function(e){
          renderIfrHeight.call(w, e.data);
        },false)
      }
    }else{
      setInterval(function(){
        var hash='';
        if(w.name!=hash){
          hash=w.name;
          renderIfrHeight.call(w, hash);
        }
      },200);
    }

    if(!w[n]) w[n]={}
    w[n].load = b;
  }
  window.addEventListener("DOMContentLoaded",init);
  
})({
  id: "ifr_eaglesmarket",
  name: 'eaglesmarket',
  version:"1.0.0",
  url_default:"http://localhost:3000",
});