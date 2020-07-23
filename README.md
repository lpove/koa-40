## 参考

-   https://shanyue.tech/node/koa.html#%E6%8A%9B%E5%BC%80%E6%A1%86%E6%9E%B6%EF%BC%8C%E6%9D%A5%E5%86%99%E4%B8%80%E4%B8%AA%E7%AE%80%E5%8D%95%E7%9A%84-server
-   https://github.com/shfshanyue/koa-mini

## 简单的了解 koa 源码和 40 行实现 koa

### 简单的要实现的 demo

```js
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
    console.log('Middleware 1 Start');
    await next();
    console.log('Middleware 1 End');
});

app.use(async (ctx, next) => {
    console.log('Middleware 2 Start');
    await next();
    console.log('Middleware 2 End');

    ctx.body = 'hello, world';
});

app.listen(3000);

// output
// Middleware 1 Start
// Middleware 2 Start
// Middleware 2 End
// Middleware 1 End
```

### 怎么实现上面这些东西

主要分三块实现

-   Application: 基本服务器框架
-   Context: 服务器框架基本数据结构的封装，用以 http 请求解析及响应
-   Middleware: 中间件，也是洋葱模型的核心机制

### 抛开框架，来写一个简单的 server

基于 node 的 `http API` 来启动一个 http 服务，并通过它来实现最简单的 `koa`

```js
const http = require('http');

const server = http.createServer((req, res) => {
    res.end('hello, world');
});

server.listen(3000);
```

### 构建 Application

-   目录

```bash
- app.js
- demo.js
- README.md
- .gitignore
```

首先完成 `Application` 的大体框架

-   `app.listen`: 处理请求以及响应，并且监听端口
-   `app.use`: 中间件函数，处理请求并完成响应

```js
// app.js
const http = require('http');

class Application {
    constructor() {
        this.middleware = null;
    }

    listen(...args) {
        const server = http.createServer(this.middleware);
        server.listen(...args);
    }

    // 这里依旧调用的是原生 http.createServer 的回调函数
    use(middleware) {
        this.middleware = middleware;
    }
}

module.exports = Application;
```

```js
// demo.js
const open = require('open');
const Application = require('./app');

const app = new Application();

app.use((req, res) => {
    res.end('hello world');
});

app.listen(3000, () => {
    open('http://localhost:3000/', 'chrome');

    console.log('listen 3000 port!');
});
```

### 完成第二步骤 构建 Context

在 koa 中，app.use 的回调参数为一个 ctx 对象，而非原生的 req/res。因此在这一步要构建一个 Context 对象，并使用 ctx.body 构建响应：

-   app.use(ctx => ctx.body = 'hello, world'): 通过在 http.createServer 回调函数中进一步封装 Context 实现
-   Context(req, res): 以 request/response 数据结构为主体构造 Context 对象

```js
// app.js
const http = require('http');

class Application {
    constructor() {
        this.middleware = null;
    }

    use(middleware) {
        this.middleware = middleware;
    }

    listen(...args) {
        const server = http.createServer((req, res) => {
            // 构造 Context 对象
            const ctx = new Context(req, res);

            // 此时处理为与 koa 兼容 Context 的 app.use 函数
            this.middleware(ctx);

            // ctx.body 为响应内容
            ctx.res.end(ctx.body);
        });
        server.listen(...args);
    }
}

// 构造一个 Context 的类
class Context {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
}
```

```js
// demo.js

const open = require('open');
const Application = require('./app');

const app = new Application();

app.use((ctx) => {
    ctx.body = 'hello, world';
});

app.listen(3000, () => {
    open('http://localhost:3000/', 'chrome');

    console.log('listen 3000 port!');
});
```
