const { query, router } = require('../connect')
const { resultE, resultS } = require('../public/msg');
const uSql = require('../db/uSQL')
const nodemailer = require('nodemailer'); //邮件发送
/**
 * 
 * @param {*} from 发件人邮箱
 * @param {*} aliasName 发件人
 * @param {*} tos 收件人邮箱
 * @param {*} subject 主题
 * @param {*} msg 正文
 */
// 参数：发件人，收件人，主题，正文（支持html格式）
function sendMail(from, aliasName, tos, subject, msg) {
    const smtpTransport = nodemailer.createTransport({
        host: 'smtp.qq.com',
        secureConnection: true, // 使用了 SSL
        secure: true,
        port: 465, //SMTP 端口
        auth: {
            user: from, //发送邮件的账号
            pass: 'eefsnbicbryhbjab', //smtp授权码
        }
    });
    smtpTransport.sendMail({
        from: aliasName + ' ' + '<' + from + '>',
        to: tos,
        subject: subject,
        html: msg
    }, function(err, res) {
        if (err) {
            console.log('error: ', err);
        }
    });
}


// -------------------------------------------------前端----------------------------------------
// 获取热门
router.get('/popular', function(req, res) {
        query(uSql.queryHot).then(r => {
            resultS(res, { list: r });
        }).catch(err => {
            resultE(res, { msg: '热门加载失败' });
        })
    })
    // 获取首页列表
router.get('/list', function(req, res) {
        var page = req.query.page;
        var pages = req.query.pages;
        if (!page) page = 0;
        if (!pages) pages = 10;
        page = parseInt(page);
        pages = parseInt(pages);
        // console.log(req.query)
        getUser((data) => {
            if (data) {
                query(uSql.queryList, [(page - 1) * pages, pages]).then(r => {
                    resultS(res, { list: r, total: data.wessaynum });
                }).catch(err => {
                    resultE(res, { msg: '列表加载失败' });
                })
            } else {
                resultE(res, { msg: '个人详情加载失败' });
            }
        })

    })
    // 获取个人详情
router.get('/mydetail', function(req, res) {
        getUser((data) => {
            if (data) {
                resultS(res, { blogger: data });
                // 查看+1
                query(uSql.updateShow);
            } else {
                resultE(res, { msg: '个人详情加载失败' });
            }
        })


    })
    // 获取分类
router.get('/cardType', function(req, res) {
        query(uSql.queryType).then(r => {
            resultS(res, { list: r });
        }).catch(er => {
            resultE(res, { msg: '分类加载失败' });
        })
    })
    // 查询友情链接
router.get('/links', function(req, res) {
        query(uSql.queryLinks).then(r => {
            resultS(res, { list: r });
        }).catch(er => {
            resultE(res, { msg: '友情链接加载失败' });
        })
    })
    // 获取记录列表
router.get('/recordList', function(req, res) {
    query(uSql.queryRecord).then(r => {
        resultS(res, { list: r });
    }).catch(er => {
        resultE(res, { msg: '记录列表加载失败' });
    })

})

// 递归查询子评论
var getzpl = (res, list, index = 0) => {
        query(uSql.queryCommontcz, [list[index].commontid]).then(r1 => {
            console.log(r1);
            list[index]['sub'] = r1;
            index++
            if (index < list.length) {
                getzpl(res, list, index);
            }
            if (index == list.length) {
                resultS(res, { list: list });
            }
        }).catch(er => {
            resultE(res, { msg: '评论加载失败' });
        })
    }
    // 查询评论
router.get('/commontlist', function(req, res) {
        var cardid = req.query.cardid;
        query(uSql.queryCommontc, [cardid]).then(r => {
            if (r.length > 1) {
                getzpl(res, r);
            } else {
                resultS(res, { list: [] });
            }

        }).catch(er => {
            resultE(res, { msg: '评论加载失败' });
        })

    })
    // 文章详情
router.get('/article/:id', function(req, res) {
        query(uSql.updateCard, [req.params.id]).then(r => {}).catch(er => {});
        query(uSql.queryArticle, [req.params.id]).then(r => {
            resultS(res, { content: r[0] });
        }).catch(er => {
            resultE(res, { msg: '详情加载失败' });
        });
    })
    // 发布评论
router.post('/addcommont', function(req, res) {
        var username = req.body.username;
        var cardcontent = req.body.cardcontent;
        var email = req.body.email;
        var url = req.body.url;
        var cardid = req.body.cardid;
        var ua = req.body.ua;
        var toid = req.body.toid ? req.body.toid : 0;
        // 邮件
        var toContent = req.body.toContent;
        var toEmail = req.body.toEmail ? req.body.toEmail : '843180352@qq.com';
        var toName = req.body.toName;
        var toUrl = req.body.toUrl;
        // cardid,commontc,username,useremail,userurl,commonttime,ua,userhead
        query(uSql.insertCommont, [cardid, cardcontent, username, email, url, new Date(), ua, '']).then(r => {
            resultS(res, { data: '', msg: '发布成功,通过审核将展示出来~' });
            if (!req.body.toEmail) {
                sendMail('153115598@qq.com', 'itliuyang', toEmail,
                    '您在【刘洋博客的评论有回复啦】',
                    `<div class="email-box" style="border: 1px dashed #9db0ef;border-radius: 5px;padding: 20px;    margin: 10px;">
                    <div class="content">
                        <p class="header">
                            您在
                            <a href="${toUrl}" target="_blank" rel="noopener">
                                刘洋博客
                            </a>
                            发表的评论有网友回复您啦！
                        </p>
                        <p class="no_indent">
                            您曾在刘洋博客，发表评论：
                        </p>
                        <p
                            style="color:#12286f;margin:3px 24px;padding:6px 12px;line-height:2;text-align:left;font-size:14px;background:#dbf3f7;border:1px dashed #ceb8a3;">
                            ${toContent}
                        </p>
                        <p class="no_indent">
                            网友给您的回复如下：
                        </p>
                        <p
                            style="color:#12286f;margin:3px 24px;padding:6px 12px;line-height:2;text-align:left;font-size:14px;background:#dbf3f7;border:1px dashed #ceb8a3;">
                            ${cardcontent}
                        </p>
                        <p class="no_indent">
                            欢迎您再次光临
                            <a href="https://www.itliuyang.com" target="_blank" rel="noopener">
                                刘洋博客
                            </a>
                            ！
                        </p>
                    </div>
                    <div class="footer">
                        <p style="color:#2a3e42; text-align: center;">
                            Copyright ©
                            <span style="border-bottom:1px dashed #ccc;z-index:1" t="7" onclick="return false;" data="2019-2020">
                                2012-2016
                            </span>
                            <a href="https://www.itliuyang.com" target="_blank" rel="noopener">
                                刘洋博客
                            </a>
                            - 本邮件由系统自动生成发送，请勿直接回复！
                        </p>
                    </div>
                </div>`);
            }


        }).catch(er => {
            resultE(res, { msg: '发布失败' });
        });
    })
    // // 查询个人信息
const getUser = (canback) => {
    query(uSql.queryMy).then(res => {
        canback(res[0])
    }).catch(err => {
        canback(null)
    })
}


module.exports = router;