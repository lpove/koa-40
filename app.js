const http = require('http');

function compose(middlewares = []) {
    return ctx => {
        const dispatch = (i) => {
            const middleware = middlewares[i]
            if (i === middlewares.length) {
                return
            }
            return middleware(ctx, () => dispatch(i + 1))
        }
        return dispatch(0)
    }
}

class Application {
    constructor() {
        this.middleware = [];
    }

    use(middleware) {
        this.middleware.push(middleware);
    }

    listen(...arg) {
        const server = http.createServer(async (req, res) => {
            // 构造 Context 对象
            const ctx = new Context(req, res);

            // 对中间件回调函数串联，形成洋葱模型
            const fn = compose(this.middleware);
            await fn(ctx);

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
