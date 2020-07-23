const open = require('open');
const Application = require('./app');

const app = new Application();

app.use(async (ctx, next) => {
    ctx.body = 'hello, one'
    await next()
})

app.use(async (ctx, next) => {
    ctx.body = 'hello, two'
    await next()
})

app.listen(3000, () => {
    open('http://localhost:3000/', 'chrome');

    console.log('listen 3000 port!');
});
