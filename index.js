const { app, pool, Result } =require('./connect')
const home = require('./router/home')

app.all('*', (req, res, next) => {
    //这里处理全局拦截，一定要写在最上面
    next()
})
app.all('/', (req, res) => {
    pool.getConnection((err, conn) => {
        // res.json({ type: 'test'})
        res.send("请求接口,看啥看")
        pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
    })
})
app.use('/home', home)
app.listen(8088, () => {
    console.log('服务启动:8088')
})