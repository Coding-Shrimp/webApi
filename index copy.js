const express = require('express')
const app = express()

const mysql = require('mysql')

const option = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'nodecms',
    connectTimeout: 5000, //连接超时
    multipleStatements: false //是否允许一个query中包含多条sql语句
}
// const conn = mysql.createConnection(option);
// let pool;
// repool()



// 解析参数
const bodyParser = require('body-parser')
// 跨域中间件cors
const cors = require('cors')
app.use(cors)// 解决跨域

let login = true;
// 浏览器拦截
app.all('*', (req, res, next) => {
    if(!login) return res.json('未登录')
    next()
});

// JSON请求
app.use(bodyParser.json())
// 表单请求
app.use(bodyParser.urlencoded({extended: false}))

app.listen(8088, () => {
    console.log('服务启动')
})



app.get('/', (req, res) => {
    let cs = new Result({ data: '1' });
    let cs1 = new Result({ data: '1' });
    res.send(cs == cs1);
    // res.json(cs == cs1)
})


// app.get('/login', (req, res) => {
//     pool.getConnection((err, conn) => {
//         conn.query("SELECT * FROM students", (e, r) => {
//             if(e) throw error
//             res.json(new Result({ data: r }))
//         })
//         pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
//     })
// })




// 断线重连机制
function repool() {
    // 创建连接池
    pool = mysql.createPool({
        ...option,
        waitForConnections: true, //当无连接池可用时，等待（true）还是抛错（false）
        connectionLimit: 100, //连接数限制
        queueLimit: 0 //最大连接等待数（0为不限制）
    })
    pool.on('error', err => {
        err.code === 'PROTOCOL_CONNECTION_LOST' && setTimeout(repool, 2000)
    })
    app.all('*', (_,__, next) => {
        pool.getConnection( err => {
            err && setTimeout(repool, 2000) || next()
        })
    })
}

function Result ({ code = 1, msg = '', data = {} }) {
    this.c = code;
    this.m = msg;
    this.d = data;
}