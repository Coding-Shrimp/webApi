const express = require('express')
const app = express()

var initRT = function ({ code = 1, msg = '', data = {} }) {
    this.c = code;
    this.m = msg;
    this.d = data;
};

var Result = (function () {
    var ins;
    return function ({ code, msg, data }) {
        if (!ins) {
            ins = new initRT({ code, msg, data });
        }
        return ins;
    }
})();


// 浏览器拦截
app.all('*', (req, res, next) => {
    next()
});


app.listen(8088, () => {
    console.log('服务启动')
})



app.get('/', (req, res) => {
    let cs = new Result({ data: { d: '22222' } });
    let cs1 = new Result({ data: { d: '22222' } });
    res.send(cs);
})

