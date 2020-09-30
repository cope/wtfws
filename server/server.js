const _ = require('lodash');
const moment = require('moment');

const time = () => moment(new Date()).format('[(]HH:mm:ss.ms[)]');

const fastify = require('fastify')({logger: false});
fastify.get('/', (request, reply) => reply.send({hello: 'world'}));
fastify.register(require('fastify-websocket'), {
	handle,
	options: {
		maxPayload: 1048576, // we set the maximum allowed messages size to 1 MiB (1024 bytes * 1024 bytes)
		path: '/ws', // we accept only connections matching this path e.g.: ws://localhost:3000/fastify
		verifyClient: function (info, next) {
			next(true) // the connection is allowed
		}
	}
});

let id = 0;
const bytes = {}

function handle(connection) {
	const mySocketID = ++id;
	bytes[mySocketID] = 0;
	console.log(time(), '[WS] Client connected', mySocketID);

	let heartbeat = setInterval(() => {
		const message = {type: 'heartbeat', payload: new Date().getTime()};
		console.log(time(), 'sending heartbeat', mySocketID, message.payload);
		socket.send(JSON.stringify(message));
	}, 1000);

	const {socket} = connection;
	socket.on('message', (message) => {
		const size = (new TextEncoder().encode(message)).length;
		bytes[mySocketID] += size;
		message = JSON.parse(message);
		if (_.get(message, 'i', 0) > 55) {
			console.log(time(), ' - message:', mySocketID, size, bytes[mySocketID], new Date().getTime(), _.omit(message, ['time']));
		}
	});

	socket.on('close', () => {
		console.log(time(), '[WS] Client disconnected', mySocketID);
		clearInterval(heartbeat);
		heartbeat = null;
	});

	socket.on('error', () => {
		console.log(time(), '[WS] Client errored.');
	});
}

fastify.listen(3000, (err, address) => {
	if (err) {
		fastify.log.error(err)
		process.exit(1)
	}
	fastify.log.info(`server listening on ${address}`)
});