const schedule = require('node-schedule');
const setting = require('../public/setting')
const { query } = require('../connect');

var http = require('http');
const scheduleCronstyle = () => {

    schedule.scheduleJob(setting.baidu.bdPostTime, () => {
        query('SELECT (cid) FROM card').then(r => {
            let urltext = '';
            r.forEach(element => {
                urltext = urltext + 'https://www.itliuyang.com/essay/' + element.cid + "\n ";
            });
            var req = http.request(setting.baidu.bdPost, function (res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    console.log("--百度推送成功:" + chunk);
                });
            });
            req.on('error', function (e) {
                console.error("--百度推送失败:" + e.message);
            });
            req.write(urltext);
            req.end();
        }).catch(er => {
            console.error("--记录列表加载失败:" + er);
        })
    });
}
scheduleCronstyle();
