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
            { url: '/admin/login', methods: ['POST']},
            { url: '/home/popular', methods: ['GET']},
            { url: '/home/mydetail', methods: ['GET']},
            { url: '/home/cardType', methods: ['GET']},
            { url: '/home/links', methods: ['GET']},

        ]
    },
    sql: {
        host: '129.28.194.16',
        user: 'qaq6',
        password: 'id6kNhXPacjS2tTz',
        port: '3306',
        database: 'qaq6',
        connectTimeout: 5000, //连接超时
        multipleStatements: false //是否允许一个query中包含多条sql语句
    }
}