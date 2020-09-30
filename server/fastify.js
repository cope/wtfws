const handle = require('./handle');

const fastify = require('fastify')({logger: false});
fastify.get('/', (request, reply) => reply.send({hello: 'world'}));

function handleConnection(connection) {
	const {socket} = connection;
	handle(socket);
}

fastify.register(require('fastify-websocket'), {
		handleConnection,
		options: {maxPayload: 1048576, path: '/ws'}
	}
);

fastify.listen(3000, (err, address) => {
	if (err) {
		fastify.log.error(err)
		process.exit(1)
	}
	fastify.log.info(`server listening on ${address}`)
});