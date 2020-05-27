const schedule = require('node-schedule');
const setting = require('../public/setting')
const { query, logger } = require('../connect');
var http = require('http');
const scheduleCronstyle = () => {
//*  *  *  *  *  *
// ┬ ┬ ┬ ┬ ┬ ┬
// │ │ │ │ │  |
// │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
// │ │ │ │ └───── month (1 - 12)
// │ │ │ └────────── day of month (1 - 31)
// │ │ └─────────────── hour (0 - 23)
// │ └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)
// 6个占位符从左到右分别代表：秒、分、时、日、月、周几
    //每分钟的第30秒定时执行一次:
    schedule.scheduleJob(setting.baidu.bdPostTime, () => {
        query('SELECT (cid) FROM card').then(r => {
            let urltext = '';
            r.forEach(element => {
                urltext = urltext + 'https://www.itliuyang.com/essay/' + element.cid + "\n ";
            });
            var req = http.request(setting.baidu.bdPost, function (res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    logger.log(new Date() + "--百度推送成功:" + chunk);
                });
            });
            req.on('error', function (e) {
                logger.log(new Date() + "--百度推送失败:" + e.message);
            });
            req.write(urltext);
            req.end();
        }).catch(er => {
            logger.log(new Date() + "--记录列表加载失败:" + er);
        })
    });
}
scheduleCronstyle();
