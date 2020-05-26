


const { query, router } = require('../connect');
var http = require('http');
router.get('/setmap', function (req1, res1) {
    let content = `
        https://www.itliuyang.com/essay/e2d050d89665cca22ddd7eef0bf01bce
        https://www.itliuyang.com/essay/b09147aa2393e2366c8d64eda747a292
    `;
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
            res1.json(chunk);
            // console.log('BODY: ' + chunk);
            //JSON.parse(chunk)
        });
    });

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

    // write data to request body  
    req.write(content);

    req.end();

    //     res.json({
    //         code: '1'
    //     })
})

module.exports = router;