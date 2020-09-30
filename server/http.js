const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');

const _ = require('lodash');
const moment = require('moment');

const handle = require('./handle');

const time = () => moment(new Date()).format('[(]HH:mm:ss.ms[)]');

const server = http.createServer({});
const ws = new WebSocket.Server({server});

ws.on('connection', function connection(socket) {
	const mySocketID = new Date().getTime();
	console.log(time(), '[WS] Client connected', mySocketID);

	let heartbeat = setInterval(() => {
		const message = {type: 'heartbeat', payload: new Date().getTime()};
		console.log(time(), 'sending', mySocketID, message.payload);
		socket.send(JSON.stringify(message));
	}, 5000);

	socket.on('message', function (message) {
		console.log(time(), '[WS] Client message:', _.omit(JSON.parse(message), ['time']));
	});

	socket.on('close', () => {
		console.log(time(), '[WS] Client disconnected', mySocketID);
		clearInterval(heartbeat);
		heartbeat = null;
	});
});

server.listen(3001);