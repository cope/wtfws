## WTF WS

### Repro

Notice that both fastify.js and http.js use the same handleSocket function, from handle.socket.js, for handling the socket.

#### [Fastify](https://www.fastify.io) with [fastify-websocket](https://github.com/fastify/fastify-websocket)

    cd server
    node fastify.js

In client/index.html set the MODE value to 'fastify'
It should look like this:

    <script>
        window.MODE = 'fastify';
    </script>

Then just open client/index.html in the browser, open the console.

Once the server gets stuck on message 58, hit F5.

Once the server gets stuck on message 58 again, just close the browser tab.

Fastify/fastify-websocket Server Output:
![Fastify Client Output](https://raw.githubusercontent.com/cope/wtfws/master/output-fastify-server.png)

Fastify/fastify-websocket Client Output:
![Fastify Client Output](https://raw.githubusercontent.com/cope/wtfws/master/output-fastify-client.png)

#### Plain [http](https://github.com/nodejs/node/blob/v14.13.0/lib/http.js) with [ws](https://github.com/websockets/ws)

    cd server
    node http.js

In client/index.html set the MODE value to 'http'
It should look like this:

    <script>
        window.MODE = 'http';
    </script>

Then just open client/index.html in the browser, open the console.

There should be no problems with 100'000 messages... you can change the COUNT to something even higher, if you want to test it.

HTTP/WS Server Output:
![Fastify Client Output](https://raw.githubusercontent.com/cope/wtfws/master/output-http-server.png)

HTTP/WS Client Output:
![Fastify Client Output](https://raw.githubusercontent.com/cope/wtfws/master/output-http-client.png)
