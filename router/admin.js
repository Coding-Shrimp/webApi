const { query, router } = require('../connect')
const { resultE,resultS } = require('../public/msg');
const uSql = require('../db/uSQL')
const verify = require('../public/verify')
const setting = require('../public/setting')

// 登录
router.post('/login', function (req, res) {
    
    var name = req.body.username;
    var passwd = req.body.password;
    query(uSql.queryWUser, [name]).then(r => {
       
        if(r.length>0){
           
            if(r[0].userpwd == passwd){
                verify.setToken(name,passwd).then(token => {
                    resultS(res,{token:token,signTime: setting.token.signTime},'登录成功');
                })
            }else {
                resultE(res,{msg:'登录失败，密码错误'});
            }
        }else {
            resultE(res,{msg:'账号不存在'});
        }
    }).catch(err => {
        resultE(res,{msg:'账号密码错误'});
    })
})
// 获取首页列表
// router.get('/list', function (req, res) {
//     var page = req.query.page;
//     var pages = req.query.pages;
//     if (!page) page = 0;
//     if (!pages) pages = 10;
//     page = parseInt(page);

//     query(uSql.queryList, [page, pages]).then(r => {
//         resultS(res,{list: r});
      
//     }).catch(err => {
//         resultE(res,{msg:'列表加载失败'});
//     })
// })


// // 查询个人信息
const getUser = (canback) => {
    query(uSql.queryMy).then(res => {
        canback(res[0])
    }).catch(err => {
        canback(null)
    })
}


module.exports = router; 