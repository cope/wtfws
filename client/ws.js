console.log('WTF WS', window.MODE);
window.document.title = MODE.toUpperCase() + ' WTF WS';

const useFastify = MODE === 'fastify';
const WS_URL = useFastify ? 'ws://localhost:3000/ws' : 'ws://localhost:3001'

const socket = new WebSocket(WS_URL);
const COUNT = useFastify ? 6000 : 100000;

const time = () => moment(new Date()).format('[(]HH:mm:ss.ms[)]');

socket.onopen = function (event) {
	console.log(time(), '[WS] Connection open.');
	for (let i = 1; i <= COUNT; i++) {
		let message = {i, time: arrOfTimes()};
		console.log(time(), ' - sending', message);
		setTimeout(() => socket.send(JSON.stringify(message)), i * 10);
	}
};

socket.onmessage = function (event) {
	let message = JSON.parse(event.data);
	console.log(time(), '[WS] Server message:', message);
}

function arrOfTimes() {
	let arr = [];
	for (let i = 0; i < 10; i++) arr.push(new Date());
	return arr;
}
