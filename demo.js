const open = require('open');
const Application = require('./app');

const app = new Application();

app.use(ctx => {
    console.log('ctx:', ctx);
    ctx.body = 'hello, world'
});

app.listen(3000, () => {
    open('http://localhost:3000/', 'chrome');

    console.log('listen 3000 port!');
});
