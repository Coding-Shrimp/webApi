const uSql = {

    //查询个人资料
    queryMy: 'SELECT * FROM my', 
    //查询分类
    queryType: 'SELECT * FROM ctype', 
    //查询友情链接
    queryLinks: 'SELECT * FROM links',


    // 文章
     //获取热门
    queryHot: 'SELECT cid,ctitle,cimg FROM card ORDER BY cshow DESC LIMIT 9',
     //查询首页列表
    queryList: 'select cid,ctitle,ctype,ctime,cshow,cimg,cPreface from card ORDER BY ctime DESC limit ?,?',
    //查询记录列表
    queryRecordList: 'SELECT * FROM record ORDER BY rtime DESC limit ?,?', 
    //文章详情
    queryArticle: 'update card set cshow=cshow+1 where cid=?',
    // 发布文章
    insertArticle: 'INSERT INTO card(cid,ctitle,cHtmlContent,ctype,ctime,cshow,cimg,cPreface,cMdContent) VALUES(?,?,?,?,?,?,?,?,?)',
    //浏览量+1
    updateShow: 'update my set wtotals = wtotals + 1', 



    // 评论
    //查询评论
    queryCommont: 'SELECT cardcontent,ctime,id,url,toid,username,email,ua FROM commont WHERE cardid=? and toid=0 ORDER BY ctime DESC limit 0,10 ',
    //查询子评论
    queryCommontZ: 'SELECT cardcontent,ctime,id,url,toid,username,email,ua FROM commont WHERE toid=?',
    //评论
    insertCommont: 'INSERT INTO commont(userid,cardid,cardcontent,username,email,url,ctime,ua,toid) VALUES(?,?,?,?,?,?,?,?,?)',

    // admin
    // 查询用户是否存在
    queryWUser: 'select userpwd from userinfo where username=?',

}
module.exports = uSql; 