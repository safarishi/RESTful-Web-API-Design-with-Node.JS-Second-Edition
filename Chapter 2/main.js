const httpModule = require('./modules/http-module');

const http = require('http');
const PORT = 8080;

http.createServer(httpModule.handle_request).listen(PORT, '127.0.0.1');
