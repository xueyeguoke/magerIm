/**
 * Created by Administrator on 2017-07-09.
 */
/*websocket缓存池*/


//需要ws模块
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 8080});
wss.on('connection', function(ws){
    ws.on('message', function(message){
        var obj = JSON.parse(message);
        console.log('received: %s', obj.time);
    });
    ws.send('hello world');
});
console.log('running!!');



module.exports=query;