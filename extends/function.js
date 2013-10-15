/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-11
 * Time: 下午3:23
 * To change this template use File | Settings | File Templates.
 */

Date.prototype.formatTime = function(fmt){
    if(!fmt){
        fmt = 'yyyy-MM-dd HH:mm:ss';
    }
    var o = {
        "y+": this.getFullYear(),
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds()
    }
    console.log(o);
    var reg;
    for(var i in o){
        reg = new RegExp('('+i+')');
        console.log(RegExp.$2)
        if(reg.test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == (''+o[i]).length)? o[i] : (("00" + o[i]).substr(("" + o[i]).length)));
        }
    }
    return fmt;
}

