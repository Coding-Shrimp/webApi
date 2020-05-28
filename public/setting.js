module.exports = {
    token: {
        // token密钥
        signKey: 'euly_token_key',
        // 过期时间
        signTime: 3600 * 24 * 3,
        // 请求头参数
        header: 'authorization',
        // 不用校验的路由
        unRoute: [
            { url: '/api/admin/login', methods: ['POST'] },
            { url: '/api/list', methods: ['GET'] },
            { url: '/api/addcommont', methods: ['POST'] },
            { url: '/api/mydetail', methods: ['GET'] },
            { url: '/api/popular', methods: ['GET'] },
            { url: '/api/cardType', methods: ['GET'] },
            { url: '/api/recordList', methods: ['GET'] },
            { url: '/api/links', methods: ['GET'] },
            { url: '/api/commontlist', methods: ['GET'] },
            // { url: '/api/article/id', methods: ['GET'] },
            { url: /^\/api\/article\/.*/, methods: ['GET'] },
            // { url: '/other/setmap', methods: ['GET'] },
        ]
    },
    baidu: {
        //*  *  *  *  *  *  // 6个占位符从左到右分别代表：秒、分、时、日、月、周几
        // ┬ ┬ ┬ ┬ ┬ ┬
        // │ │ │ │ │ |
        // │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
        // │ │ │ │ └───── month (1 - 12)
        // │ │ │ └────────── day of month (1 - 31)
        // │ │ └─────────────── hour (0 - 23)
        // │ └──────────────────── minute (0 - 59)
        // └───────────────────────── second (0 - 59, OPTIONAL)
        //每分钟的第30秒定时执行一次:
        bdPostTime: '30 1 1 * * *', 
        bdPost: {
            hostname: 'data.zz.baidu.com',
            path: '/urls?site=www.itliuyang.com&token=L6HyRtdmQNtpR6wt',
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            }
        }
      
     },
    sql: {
        host: '129.28.194.16',
        user: 'qaq6',
        password: 'id6kNhXPacjS2tTz',
        port: '3306',
        database: 'qaq6',
        connectTimeout: 5000, //连接超时
        multipleStatements: false //是否允许一个query中包含多条sql语句
    },
    
}