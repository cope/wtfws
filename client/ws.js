const socket = new WebSocket('ws://localhost:3000/ws');

const time = () => moment(new Date()).format('[(]HH:mm:ss.ms[)]');

function arrOfTimes() {
	let arr = [];
	for (let i = 0; i < 10; i++) arr.push(new Date());
	return arr;
}

socket.onopen = function (event) {
	console.log(time(), '[WS] Connection open.');
	for (let i = 1; i <= 60; i++) {
		let message = {i, time: arrOfTimes()};
		console.log(time(), ' - sending', message);
		setTimeout(() => socket.send(JSON.stringify(message)), i * 10);
	}
};

socket.onmessage = function (event) {
	let message = JSON.parse(event.data);
	console.log(time(), '[WS] Server message:', message);
}