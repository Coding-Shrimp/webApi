const { app } = require('./connect')
const home = require('./routes/api')
const admin = require('./routes/admin')
const other = require('./routes/other')
// 百度定时推送
const schedule = require('./routes/schedule')

// app.all('*', (req, res, next) => {
//     //这里处理全局拦截，一定要写在最上面
//     // res.header("Access-Control-Allow-Credentials", true);
//     // res.header("Access-Control-Allow-Origin", "*");
//     // res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     // res.header("Content-Type", "application/json;charset=utf-8");
//     next()
// }) 
   
app.all('/', (req, res) => {
    res.send("请求接口,看啥看")
})
app.use('/api', home)
app.use('/admin', admin)
app.use('/other', other)


app.listen(3007, () => {
    console.log('服务启动:3007')
})