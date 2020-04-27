const { query, router } = require('../connect')
const { resultE,resultS } = require('../public/msg');
const uSql = require('../db/uSQL')



// 获取热门
router.get('/popular', function (req, res) {
    query(uSql.queryHot).then(r => {
        resultS(res,{list: r});
    }).catch(err => {
        resultE(res,{msg:'热门加载失败'});
    })
})
// 获取首页列表
router.get('/list', function (req, res) {
    var page = req.query.page;
    var pages = req.query.pages;
    if (!page) page = 0;
    if (!pages) pages = 10;
    page = parseInt(page);

    query(uSql.queryList, [page, pages]).then(r => {
        resultS(res,{list: r});
      
    }).catch(err => {
        resultE(res,{msg:'列表加载失败'});
    })
})
// 获取个人详情
router.get('/mydetail', function (req, res) {
    getUser((data) => {
        if (data) {
            resultS(res,{blogger: data});
              // 查看+1
            query(uSql.updateShow);
        }else {
            resultE(res,{msg:'个人详情加载失败'});
        }
    })


})
// 获取分类
router.get('/cardType', function (req, res) {
    query(uSql.queryType).then(r=>{
        resultS(res,{list:r});
    }).catch(er=>{
        resultE(res,{msg:'分类加载失败'});
    })
})
// 查询友情链接
router.get('/links', function (req, res) {
    query(uSql.queryLinks).then(r=>{
        resultS(res,{list:r});
    }).catch(er=>{
        resultE(res,{msg:'友情链接加载失败'});
    })
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