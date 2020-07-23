## 参考

-   https://shanyue.tech/node/koa.html#%E6%8A%9B%E5%BC%80%E6%A1%86%E6%9E%B6%EF%BC%8C%E6%9D%A5%E5%86%99%E4%B8%80%E4%B8%AA%E7%AE%80%E5%8D%95%E7%9A%84-server
-   https://github.com/shfshanyue/koa-mini

## 学习路径

```js
// git checkout now-branch
- 0.master
- 1. 1-application
- 2. 2-context
- 3. 3-middlewares
- 4. 4-error
```

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
