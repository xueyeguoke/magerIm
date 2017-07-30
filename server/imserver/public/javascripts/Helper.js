/*  coockiedemo
new coockiehelper().setcookie("1","2")
*/
var coockiehelper = function () {
    this.setcookie = function (name, value, second) {
        //alert("name=" + name + "--value=" + value + "time=" + second);
        if (second == null) {
            second = Days * 24 * 60 * 60 * 1000;
        }
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + second);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    };
    this.getcookie = function (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    };
    this.delcookie = function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getcookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    };
    return this;
};

/*  轮询demo
var looper1 = new looper(altMsg, 3000);
looper1.start();

        function altMsg(msg) {
            alert("aaaaaaaaa"+i);
            i++;
            if (i>3) {
                looper1.syncstatu = 0;
                alert("停止轮询");
            }
        }
*/
var looper = function (func,timer) {
    var syncstatu = true;
    var promain = function () {
        if (syncstatu) {
            func();
            setTimeout(promain, timer);
        }
    };
    this.start = promain();
    return this;
};

/*  心跳demo
        function getAllMsg() {            
            var looper1 = new heartbit("https://www.baidu.com/", null, success, null, 3000);
            looper1.error=error;
            looper1.start();
        }
        function success(data) {
            alert("success:" + data);
            return true;
        }
        function error(data) {
            alert("error:" + data);
            return true;
        }
*/
var heartbit = function (url,data, success, finish, timer) {
    var syncstatu = true;
    //ajax参数
    var async = true;
    var data = data;
    var dataType = "JSON";
    this.error = function () {
        return false;
    };
    var type = "POST";

    var promain = function () {
        if (!syncstatu) {
            return;
        }

        $.ajax({
            url: url,
            type: type,
            data: data,
            dataType:dataType,
            context: document.body,
            success: function (datas) {
                success(datas);
                setTimeout(promain, timer);
            },
            finish: finish,
            error: function () {
                var v = error();
                if (error()) {
                    setTimeout(promain, timer);
                }
            }
        });
    };
    this.start = promain;
    return this;
}

/*通用数据类型处理包*/
var MAGER = (function () {

    //---------------------------------------------------  
    // 日期格式化  
    // 格式 YYYY/yyyy/YY/yy 表示年份  
    // MM/M 月份  
    // W/w 星期  
    // dd/DD/d/D 日期  
    // hh/HH/h/H 时间  
    // mm/m 分钟  
    // ss/SS/s/S 秒  
    //---------------------------------------------------  
    function FormatDate(str, formatStr) {
        var strRst = formatStr;
        str = str.replace("T", " ");
        var opeDate = new Date(str);
        var Week = ['日', '一', '二', '三', '四', '五', '六'];

        strRst = strRst.replace(/yyyy|YYYY/, opeDate.getFullYear());
        strRst = strRst.replace(/yy|YY/, (opeDate.getYear() % 100) > 9 ? (opeDate.getYear() % 100).toString() : '0' + (opeDate.getYear() % 100));

        strRst = strRst.replace(/MM/, (opeDate.getMonth() + 1) > 9 ? (opeDate.getMonth() + 1).toString() : '0' + (opeDate.getMonth() + 1));
        strRst = strRst.replace(/M/g, opeDate.getMonth() + 1);

        strRst = strRst.replace(/w|W/g, Week[opeDate.getDay()]);

        strRst = strRst.replace(/dd|DD/, opeDate.getDate() > 9 ? opeDate.getDate().toString() : '0' + opeDate.getDate());
        strRst = strRst.replace(/d|D/g, opeDate.getDate());

        strRst = strRst.replace(/hh|HH/, opeDate.getHours() > 9 ? opeDate.getHours().toString() : '0' + opeDate.getHours());
        strRst = strRst.replace(/h|H/g, opeDate.getHours());
        strRst = strRst.replace(/mm/, opeDate.getMinutes() > 9 ? opeDate.getMinutes().toString() : '0' + opeDate.getMinutes());
        strRst = strRst.replace(/m/g, opeDate.getMinutes());

        strRst = strRst.replace(/ss|SS/, opeDate.getSeconds() > 9 ? opeDate.getSeconds().toString() : '0' + opeDate.getSeconds());
        strRst = strRst.replace(/s|S/g, opeDate.getSeconds());

        return strRst;
    }

    //字符串转布尔，默认返回ture
    function FormatBool(bl) {
        if (bl.toUpperCase() == "TRUE") {
            return true;
        }
        if (bl.toUpperCase() == "FALSE") {
            return false;
        }
        return null;
    }

    //返回API
    return {
        FormatDate: FormatDate,
        FormatBool: FormatBool
    };

})();