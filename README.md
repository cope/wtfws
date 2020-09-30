## WTF WS

### Repro

Notice that both fastify.js and http.js use the same handle.js function for handling the socket.

#### [Fastify](https://www.fastify.io) with [fastify-websocket](https://github.com/fastify/fastify-websocket)

    cd server
    node fastify.js

In client/ws.js uncomment the fastify section on top and comment out the http section.
It should look like this:

    // Fastify with fastify-websocket
    const socket = new WebSocket('ws://localhost:3000/ws');
    const COUNT = 60;
    
    // Plain http with ws
    // const socket = new WebSocket('ws://localhost:3001');
    // const COUNT = 10000;

Then just open client/index.html in the browser, open the console.

Once the server gets stuck on message 58, hit F5.

Once the server gets stuck on message 58 again, just close the browser tab.

#### Plain [http](https://github.com/nodejs/node/blob/v14.13.0/lib/http.js) with [ws](https://github.com/websockets/ws)

    cd server
    node http.js

In client/ws.js uncomment the http section on top and comment out the fastify section.
It should look like this:

    // Fastify with fastify-websocket
    // const socket = new WebSocket('ws://localhost:3000/ws');
    // const COUNT = 60;
    
    // Plain http with ws
    const socket = new WebSocket('ws://localhost:3001');
    const COUNT = 10000;

Then just open client/index.html in the browser, open the console.

There should be no problems with 100'000 messages... you can change the COUNT to something even higher, if you want to test it.
