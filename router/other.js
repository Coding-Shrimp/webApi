



const { query, router,logger } = require('../connect');
const { resultE, resultS } = require('../public/msg');
var http = require('http');
router.get('/setmap', function (req1, res1) {
    query('SELECT (cid) FROM card').then(r => {
        let urltext = '';
        r.forEach(element => {
            urltext = urltext + 'https://www.itliuyang.com/essay/'+element.cid+"\n ";
        });
        var options = {
            hostname: 'data.zz.baidu.com',
            path: '/urls?site=www.itliuyang.com&token=L6HyRtdmQNtpR6wt',
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            }
        };
        var req = http.request(options, function (res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                logger.log("百度推送成功:"+chunk);
                res1.json(chunk);
            });
        });
        req.on('error', function (e) {
            logger.log("百度推送失败:"+e.message);
            // console.log('problem with request: ' + e.message);
        });
        req.write(urltext);
        req.end();
    }).catch(er => {
        resultE(res1, { msg: '记录列表加载失败' });
    })
 
})

module.exports = router;