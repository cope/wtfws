const http = require('http');
const WebSocket = require('ws');

const handleSocket = require('./handle.socket');

const server = http.createServer({});
const ws = new WebSocket.Server({server});

ws.on('connection', handleSocket);

server.listen(3001);