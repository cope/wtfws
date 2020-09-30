const _ = require('lodash');
const moment = require('moment');

const handleSocket = require('./handle.socket');

function handleConnection(connection) {
	const {socket} = connection;
	handleSocket(socket);
}

const fastify = require('fastify')({logger: false});
fastify.get('/', (request, reply) => reply.send({hello: 'world'}));
fastify.register(require('fastify-websocket'), {
	handle: handleConnection,
	options: {
		maxPayload: 1048576, // we set the maximum allowed messages size to 1 MiB (1024 bytes * 1024 bytes)
		path: '/ws', // we accept only connections matching this path e.g.: ws://localhost:3000/fastify
		verifyClient: function (info, next) {
			next(true) // the connection is allowed
		}
	}
});

fastify.listen(3000, (err, address) => {
	if (err) {
		fastify.log.error(err)
		process.exit(1)
	}
	fastify.log.info(`server listening on ${address}`)
});