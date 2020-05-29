const mysql = require('mysql')
const express = require('express')
const app = express()
const router = express.Router();
// 解析参数
const bodyParser = require('body-parser')

// 配置文件
const setting = require('./public/setting')
const expressJwt = require('express-jwt')
// 导入token校验文件
const verify = require('./public/verify')

// 文件操作 文件日志
// let fs = require('fs');
// let stderr = fs.createWriteStream('./logs/log.log', {
//     flags: 'w'//文件的打开模式
//     , mode: 0o666//文件的权限设置
//     , encoding: 'utf8'//写入文件的字符的编码
//     , highWaterMark: 3//最高水位线
//     , start: 0 //写入文件的起始索引位置        
//     , autoClose: true//是否自动关闭文档
// })
// let stdok = fs.createWriteStream('./logs/loger.log', {
//     flags: 'w'//文件的打开模式
//     , mode: 0o666//文件的权限设置
//     , encoding: 'utf8'//写入文件的字符的编码
//     , highWaterMark: 3//最高水位线
//     , start: 0 //写入文件的起始索引位置        
//     , autoClose: true//是否自动关闭文档
// })
// let logger = new console.Console(stdok, stderr);


// json请求
app.use(bodyParser.json())
// 表单请求
app.use(bodyParser.urlencoded({ extended: false }))

// 解析token获取用户信息
app.use((req, res, next) => {

    // 获取请求头中的参数
    let token = req.headers[setting.token.header]

    if (token === undefined) {
        return next()
    } else {
        // token校验并将校验结果保存至请求头中
        verify.getToken(token).then(data => {
            req.data = data
            return next()
        }).catch(_ => {
            return next()
        })
    }
})


//验证token是否过期并规定哪些路由不用验证
app.use(expressJwt({
    secret: setting.token.signKey,
}).unless({
    //除了这个地址，其他的URL都需要验证
    path: setting.token.unRoute
}))
//当token失效返回提示信息
app.use((err, req, res, next) => {
    if (err.status === 401) {
        return res.status(err.status).json({
            status: err.status,
            msg: '登录失效',
            error: '登录失效'
        })
    }
})

let pool;
repool()

// 断线重连机制
function repool() {
    // 创建连接池
    pool = mysql.createPool({
        ...setting.sql,
        waitForConnections: true, //当无连接池可用时，等待（true）还是抛错（false）
        connectionLimit: 100, //连接数限制
        queueLimit: 0 //最大连接等待数（0为不限制）
    })
    pool.on('error', err => {
        err.code === 'PROTOCOL_CONNECTION_LOST' && setTimeout(repool, 2000)
    })
    app.all('*', (_, __, next) => {
        pool.getConnection(err => {
            err && setTimeout(repool, 2000) || next()
        })
    })
}

var query = function (sql, options) {
    var promise = new Promise(function (resolve, reject) {
        pool.getConnection(function (err, conn) {
            if (err) {
                console.error("连接失败");
            } else {
                conn.query(sql, options, function (err, re) {
                    if (err) {
                        console.error("--请求失败: " + err);
                        return reject(err);
                    }
                    //释放连接      
                    conn.release();
                    return resolve(re);
                });
            }
        });
    })
    return promise;
};

module.exports = { app, query, router }