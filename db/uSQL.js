const uSql = {

    //查询个人资料
    queryMy: 'SELECT * FROM my',
    //查询分类
    queryType: 'SELECT * FROM ctype',
    // 添加分类
    insertType: 'INSERT INTO ctype(typename) VALUES(?)',
    //  修改分类
    updateType: 'update ctype set typenum=?,typename=? where typeid=?',
    // 分类数量变更
    updateTypeNumer: 'update ctype set typenum=? where typeid=?',

    //查询友情链接
    queryLinks: 'SELECT * FROM links',


    // 文章
    //获取热门
    queryHot: 'SELECT cid,ctitle,cimg FROM card ORDER BY cshow DESC LIMIT 9',
    //查询首页列表
    queryList: 'SELECT c.cid,c.ctitle,c.ctype,c.ctime,c.cshow,c.cimg,cPreface,t.typename FROM ctype AS t RIGHT JOIN card as c on c.typeid = t.typeid ORDER BY ctime DESC limit ?,?',
    //查询记录列表
    queryRecordList: 'SELECT * FROM record ORDER BY rtime DESC limit ?,?',
    //文章详情
    queryArticle: 'SELECT c.cHtmlContent,c.cPreface,c.cimg,c.cshow,c.ctime,c.ctitle,t.typename FROM ctype AS t RIGHT JOIN card as c on c.typeid = t.typeid  WHERE cid = ?',
    // queryArticle: 'select cHtmlContent,cPreface,cimg,cshow,ctime,ctitle,ctype from card where cid = ?',
    // 文章数量+1
    updateCard: 'update card set cshow=cshow+1 where cid=?',


    // 发布文章
    insertArticle: 'INSERT INTO card(cid,ctitle,cHtmlContent,typeid,ctime,cshow,cimg,cPreface,cMdContent) VALUES(?,?,?,?,?,?,?,?,?)',
    //浏览量+1
    updateShow: 'update my set wtotals = wtotals + 1',
    // ---------记录
    // 获取记录列表
    queryRecord: 'SELECT * FROM record ORDER BY rtime DESC',

    // 评论
    //查询评论
    queryCommontc: 'SELECT commontid,commontc,username,useremail,userurl,commonttime FROM commont WHERE cardid=? and commontshow=1  ORDER BY commonttime DESC limit 0,10',
    queryCommont: 'SELECT cardcontent,ctime,id,url,toid,username,email,ua FROM commont WHERE cardid=? and toid=0 and showstate=1  ORDER BY ctime DESC limit 0,10 ',
    //查询子评论
    queryCommontcz: 'SELECT commontid,commontc,username,useremail,userurl,commonttime FROM commont_hf WHERE levid=? and commontshow=1  ORDER BY commonttime DESC limit 0,10 ',
    queryCommontZ: 'SELECT cardcontent,ctime,id,url,toid,username,email,ua FROM commont WHERE toid=?',
    //评论
    insertCommont: 'INSERT INTO commont(cardid,commontc,username,useremail,userurl,commonttime,ua,userhead) VALUES(?,?,?,?,?,?,?,?)',

    // admin
    // 登录
    queryWUser: 'select userpwd from userinfo where username=?',
    queryCommont: 'select * from commont limit ?,?',
    queryCommontToal: 'SELECT COUNT(*) as total FROM commont',
    // 发布文章
    insertCard: 'INSERT INTO card(cid,ctitle,cHtmlContent,ctype,ctime,cshow,cimg,cPreface,cMdContent) VALUES(?,?,?,?,?,?,?,?,?)',
    // 查询文章列表
    queryAdminList: 'select cid,ctitle,ctype,ctime,cshow,cimg,cPreface from card ORDER BY ctime DESC limit ?,?',
    // 文章详情
    queryAdminaDetail: 'select cMdContent,cPreface,cimg,cshow,ctime,ctitle,ctype from card where cid = ?',
    // 修改文章
    updateDetail: 'update card set ctitle=?,cHtmlContent=?,ctype=?,cimg=?,cPreface=?,cMdContent=? where cid=?',
}
module.exports = uSql;