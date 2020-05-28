
//消息体
class MSG {
    constructor({ code = 1, data = null, msg = null }) {
        this.c = code;
        this.d = data;
        this.m = msg ? msg : code == actionStatus.success ? '请求成功' : '请求失败';
    }
}
const resultE = (res, { code = 0, data = null, msg = '请求失败' }) => {
    console.error("请求失败"+res.url);
    res.json(
        new MSG({
            code: code,
            data: data,
            msg: msg
        })
    );
}
const resultS = (res, data = null, msg = "请求成功") => {
    res.json(
        new MSG({
            code: 1,
            data: data,
            msg: msg
        })
    );
}


function getDate(extra) {
    var dat = new Date;//生成日期
    var year = dat.getFullYear();//取得年
    var month = dat.getMonth() + 1;    //取得月,js从0开始取,所以+1
    var date1 = dat.getDate(); //取得天
    var hour = dat.getHours();//取得小时
    var minutes = dat.getMinutes();//取得分钟
    var second = dat.getSeconds();//取得秒
    var haomiao = dat.getMilliseconds();
    dat = undefined;
    return year + "-" + month + "-" + date1 + " " + hour + ":" + minutes + ":" + second +   "->>>" + extra;
}


module.exports = {
    resultE,
    resultS,
}