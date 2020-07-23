const http = require('http');

class Application {
    constructor () {
        this.middleware = null;
    }

    listen (...arg) {
        const server = http.createServer(this.middleware);
        server.listen(...arg);
    }

    use (middleware) {
        this.middleware = middleware;
    }
}

module.exports = Application;