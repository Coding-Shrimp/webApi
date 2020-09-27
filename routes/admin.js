const { query, router } = require('../connect')
const { resultE, resultS } = require('../public/msg');
const uSql = require('../db/uSQL')
const verify = require('../public/verify')
const setting = require('../public/setting')
var md5 = require("nodejs-md5"); //md5加密
var qiniu = require('qiniu'); //七牛云

// 登录
router.post('/admin/login', function(req, res) {
    var name = req.body.username;
    var passwd = req.body.password;
    query(uSql.queryWUser, [name]).then(r => {
        if (r.length > 0) {
            if (r[0].userpwd == passwd) {
                verify.setToken(name, passwd).then(token => {
                    resultS(res, { token: token, signTime: setting.token.signTime }, '登录成功');
                })
            } else {
                resultE(res, { msg: '登录失败，密码错误' });
            }
        } else {
            resultE(res, { msg: '账号不存在' });
        }
    }).catch(err => {
        resultE(res, { msg: '账号密码错误' });
    })
})

//评论列表
router.get('/admin/commontlist', function(req, res) {
    var page = req.query.page;
    var pages = req.query.pages;
    if (!page) page = 0;
    if (!pages) pages = 10;
    page = parseInt(page);
    pages = parseInt(pages);

    query(uSql.queryCommontToal).then(r => {
        query(uSql.queryCommont, [page, pages]).then(r1 => {
            resultS(res, { list: r1, total: r[0].total });
        }).catch(err => {
            resultE(res, { msg: '加载错误' });
        })

    }).catch(err => {
        resultE(res, { msg: '加载错误' });
    })


})

//  发布文章
router.post('/admin/add', function(req, res) {
        var ctitle = req.body.cTitle;
        var cHtmlContent = req.body.cHtmlContent;
        var typeid = req.body.typeid;
        var cimg = req.body.cImgUrl;
        var cPreface = req.body.cPreface;
        var cMdContent = req.body.cMdContent;

        md5.string.quiet(Date.now() + 'liuyang', function(err, md5) {
            var timestamp = (new Date()).getTime();
            if (err) {

            } else {
                timestamp = md5;
            }
            query(uSql.insertCard, [timestamp, ctitle, cHtmlContent, typeid, new Date(), 0, cimg, cPreface, cMdContent]).then(r => {
                resultS(res, { data: r, msg: "发布成功" });
                
            }).catch(err => {
                resultE(res, { msg: '加载错误' });
            })
        });

        // connection.end();
    })
    // 后台列表
router.get('/admin/list', function(req, res) {
    var page = parseInt(req.query.page);
    var pages = parseInt(req.query.pages);
    if (!page) page = 0;
    if (!pages) pages = 10;

    // console.log(page);
    var totalSql = `select COUNT(*) as total FROM card`;
    query(totalSql).then(r => {
        query(uSql.queryAdminList, [(page - 1) * pages, pages]).then(r1 => {
            resultS(res, { list: r1, total: r[0].total, msg: "加载成功" });
        }).catch(err => {
            console.log(err)
            resultE(res, { msg: '加载错误' });
        })
    }).catch(err => {
        resultE(res, { msg: '加载错误' });
    })
    return;

})

// //  后台文章详情
router.get('/admin/article/:id', function(req, res) {
    query(uSql.queryAdminaDetail, [req.params.id]).then(r => {
        resultS(res, { data: r[0], msg: "加载成功" });
    }).catch(err => {
        resultE(res, { msg: '加载错误' });
    })
})

// //  修改文章
router.post('/admin/edit', function(req, res) {
        var cid = req.body.cid;
        var ctitle = req.body.cTitle;
        var cHtmlContent = req.body.cHtmlContent;
        var ctype = req.body.cType;
        var cimg = req.body.cImgUrl;
        var cPreface = req.body.cPreface;
        var cMdContent = req.body.cMdContent;

        md5.string.quiet(Date.now() + 'liuyang', function(err, md5) {
            var timestamp = (new Date()).getTime();
            if (err) {

            } else {
                timestamp = md5;
            }
            query(uSql.updateDetail, [ctitle, cHtmlContent, ctype, cimg, cPreface, cMdContent, cid]).then(r => {
                if (r.changedRows > 0) {
                    resultS(res, { msg: "修改成功" });
                } else {
                    resultE(res, { msg: '修改失败，稍后再试' });
                }

            }).catch(err => {
                resultE(res, { msg: '加载错误' });
            })

            // var editSql = 'update card set ctitle=?,cHtmlContent=?,ctype=?,cimg=?,cPreface=?,cMdContent=? where cid=?';
            // var editSqlParams = [ctitle, cHtmlContent, ctype, cimg, cPreface, cMdContent, cid];
            // //增
            // connection.query(editSql, editSqlParams, function(err, result) {
            //     if (err) {
            //         res.json(dataE);
            //         return;
            //     }
            //     dataS.message = "更新成功";
            //     dataS.result = '更新成功';
            //     res.json(dataS);
            // });
        });
    })
    // 上传文件到七牛
router.get('/admin/getQiNiuToken', function(req, res) {
    try {
        var accessKey = 'XR714N7-gF03mCTw8GGdtBcJlo5mhgTlDCKSjo5d';
        var secretKey = 'BtX-wq_jQM2XGuo0w9vI3dM6lDpB53SVuRcTOCVL';
        var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        var options = {
            scope: 'itliuyang',
            expires: 7200,
        };
        var putPolicy = new qiniu.rs.PutPolicy(options);
        var uploadToken = putPolicy.uploadToken(mac);
        resultS(res, { data: uploadToken, msg: "上传成功" });
    } catch (error) {
        dataE.result = error
        resultE(res, { msg: '上传失败' });
    }

})

// // // 查询个人信息
// const getUser = (canback) => {
//     query(uSql.queryMy).then(res => {
//         canback(res[0])
//     }).catch(err => {
//         canback(null)
//     })
// }


module.exports = router;