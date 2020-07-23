const http = require('http');

class Application {
    constructor() {
        this.middleware = null;
    }

    use(middleware) {
        this.middleware = middleware;
    }

    listen(...arg) {
        const server = http.createServer((req, res) => {
            // 构造 Context 对象
            const ctx = new Context(req, res);

            // 此时处理为与 koa 兼容 Context 的 app.use 函数
            this.middleware(ctx);

            // ctx.body 为响应内容
            ctx.res.end(ctx.body);
        });
        server.listen(...arg);
    }
}

// 构造 Context 类
class Context {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
}

module.exports = Application;
