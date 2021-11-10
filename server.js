const http = require('http');
const routes = require('./routes');
const server = http.createServer(routes.handleRequest);

server.listen(5000);