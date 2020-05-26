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

            { url: '/other/setmap', methods: ['GET'] },
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