const open = require('open');
const Application = require('./app');

const app = new Application();

app.use(async (ctx, next) => {
    ctx.body = 'hello, one'

    try {
        await next()
    } catch (error) {
        console.error(error)
    }
})

app.use(async (ctx, next) => {
    ctx.body = 'hello, two'

    try {
        await next()
    } catch (error) {
        console.error(error)
        // 1. 异常结构化
        // 2. 异常分类
        // 3. 异常级别
        // 4. 异常上报
    }
})

app.listen(3000, () => {
    open('http://localhost:3000/', 'chrome');

    console.log('listen 3000 port!');
});
