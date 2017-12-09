class Utils {

  // Date.prototype.Format = function (fmt) {
  //     var o = {
  //         "M+": this.getMonth() + 1, //月份 
  //         "d+": this.getDate(), //日 
  //         "h+": this.getHours(), //小时 
  //         "m+": this.getMinutes(), //分 
  //         "s+": this.getSeconds(), //秒 
  //         "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
  //         "S": this.getMilliseconds() //毫秒 
  //     };
  //     if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  //     for (var k in o)
  //     if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  //     return fmt;
  // }

  static format(fmt, date) {
    let rd = date ? new Date(date) : new Date()
    var o = {
        "M+": rd.getMonth() + 1, //月份 
        "d+": rd.getDate(), //日 
        "h+": rd.getHours(), //小时 
        "m+": rd.getMinutes(), //分 
        "s+": rd.getSeconds(), //秒 
        "q+": Math.floor((rd.getMonth() + 3) / 3), //季度 
        "S": rd.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (rd.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }

  static getWeek(date) {
    let rd = date ? new Date(date) : new Date()
    let weekday= ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
    return weekday[rd.getDay()]
  }

  static getParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    
    if (r != null) {
      return unescape(r[2]);
    } else {
      return null;
    }
  }

  static getRequest() { 
    var url = location.search; //获取url中"?"符后的字串 
    var theRequest = new Object(); 
    if (url.indexOf("?") != -1) { 
      var str = url.substr(1); 
      var strs = str.split("&"); 
      for(var i = 0; i < strs.length; i ++) { 
        theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
      } 
    } 
    return theRequest; 
  } 
  
  static setCookie(name, value, expires, path, domain) {
    var Days = 10;
    var exp = new Date();
    var pa = path ? path : '/'
    if (expires) {
      exp.setTime(exp.getTime() + parseInt(expires));
    } else {
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    }
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=" + pa + (domain? `;domain=${domain}` : "");
  }

  static getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
  }

  static clearCookie () {
    var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (var i = keys.length; i--;) {
        if (keys[i].indexOf('_lastNotice') > -1) {
          // 不清除红点的标识
          continue
        }
        document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString()
        document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString() + ';path=/;domain=.maka.im'
        document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString() + ';path=/;domain=.' + location.host
      }
    }
  }

  static deleteCookie(name) {
    let self = this
    self.setCookie(name, "", -1);
  }

  static removeCookie(sKey, sPath, sDomain) {

    if(typeof(sKey) === "string") {
      document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
    } else if( typeof(sKey) === "object" ) {
      for (let i in sKey) {
        document.cookie = encodeURIComponent(sKey[i]) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
      }
    }
  }
}

export default Utils