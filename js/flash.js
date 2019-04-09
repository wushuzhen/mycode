// 关于提示用户安装flash的js代码
//目前感觉到的问题就是不能直接检测到你们是安装了flash，而要在你页面中运行过flash时才能检测到你是否安装了flash
function flashChecker() {
    var hasFlash = 0;         //是否安装了flash  
    var flashVersion = 0; //flash版本  
    var isIE = /*@cc_on!@*/0;      //是否IE浏览器  

    if (isIE) {
        var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        if (swf) {
            hasFlash = 1;
            VSwf = swf.GetVariable("$version");
            flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
        }
    } else {
        if (navigator.plugins && navigator.plugins.length > 0) {
            var swf = navigator.plugins["Shockwave Flash"];
            if (swf) {
                hasFlash = 1;
                var words = swf.description.split(" ");
                for (var i = 0; i < words.length; ++i) {
                    if (isNaN(parseInt(words[i]))) continue;
                    flashVersion = parseInt(words[i]);
                }
            }
        }
    }
    return { f: hasFlash, v: flashVersion };
}

var fls = flashChecker();
var s = "";
if (fls.f) document.write("您安装了flash,当前flash版本为: " + fls.v + ".x");
if (!fls.f) {
    if (confirm("您的浏览器未安装Flash插件，现在安装？")) {
        window.location.href = "https://www.flash.cn/";
        // console.log(1)
    }
}

