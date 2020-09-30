const _ = require('lodash');
const moment = require('moment');

const time = () => moment(new Date()).format('[(]HH:mm:ss.ms[)]');

let id = 0;
const bytes = {}

function handleSocket(socket) {
	console.log('handle');
	const mySocketID = ++id;
	bytes[mySocketID] = 0;
	console.log(time(), '[WS] Client connected', mySocketID);

	let heartbeat = setInterval(() => {
		const message = {type: 'heartbeat', payload: new Date().getTime()};
		console.log(time(), 'sending heartbeat', mySocketID, message.payload);
		socket.send(JSON.stringify(message));
	}, 1000);

	socket.on('message', (message) => {
		const size = (new TextEncoder().encode(message)).length;
		bytes[mySocketID] += size;
		message = JSON.parse(message);
		if (_.get(message, 'i', 0) < 55) return;
		console.log(time(), ' - message:', mySocketID, size, bytes[mySocketID], new Date().getTime(), _.omit(message, ['time']));
	});

	socket.on('close', () => {
		console.log(time(), '[WS] Client disconnected', mySocketID);
		clearInterval(heartbeat);
		heartbeat = null;
	});

	socket.on('error', () => console.log(time(), '[WS] Client errored.'));
}

module.exports = handleSocket;