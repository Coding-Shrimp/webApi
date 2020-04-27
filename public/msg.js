
//消息体
class MSG {
    constructor({code = 1, data = null, msg = null}) {
        this.c = code;
        this.d = data;
        this.m = msg ? msg : code == actionStatus.success ? '请求成功' : '请求失败';
    }
}
const resultE = (res,{code=0,data=null,msg='请求失败'})=>{
    res.json(
        new MSG({
            code:code,
            data: data,
            msg: msg
        })
    );
}
const resultS = (res,data=null,msg="请求成功")=>{
    res.json(
        new MSG({
            code:1,
            data: data,
            msg: msg
        })
    );
}

module.exports = {
    resultE,
    resultS,
}