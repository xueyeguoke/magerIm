var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ port: 9301 });
var socketPool = [];

wss.on('connection', function (ws) {
    console.log('client connected');
    ws.on('message', function (message) {
        console.log(message);
        console.log( JSON.stringify(message));
        ws.send(message);
    });
    var socketModel={

    };
    socketPool.push(this);
});