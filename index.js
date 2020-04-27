const { app} =require('./connect')
const home = require('./router/home')
const admin = require('./router/admin')

app.all('*', (req, res, next) => {
    //这里处理全局拦截，一定要写在最上面
    next()
})
app.all('/', (req, res) => {
    res.send("请求接口,看啥看")
})
app.use('/home', home)
app.use('/admin', admin)
app.listen(8088, () => {
    console.log('服务启动:8088')
})