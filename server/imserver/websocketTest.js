var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    users = [],
    userGroups = [];

function start() {
    server.listen(process.env.PORT || 9301);//publish to heroku
    io.sockets.on('connection', function (socket) {
        console.log(">>>>>socket建立连接--当前时间：" + new Date() + "<<<<<<");
        //new user login
        socket.on('login', function (nickname) {
            if (users.indexOf(nickname) > -1) {
                socket.emit('nickExisted');
            } else {
                //socket.userIndex = users.length;
                socket.nickname = nickname;
                users.push(nickname);
                socket.emit('loginSuccess');
                io.sockets.emit('system', nickname, users.length, 'login');
            }
        });
        //user leaves
        socket.on('disconnect', function () {
            if (socket.nickname != null) {
                //users.splice(socket.userIndex, 1);
                users.splice(users.indexOf(socket.nickname), 1);
                socket.broadcast.emit('system', socket.nickname, users.length, 'logout');
            }
        });
        socket.on('sendMsg', function (userNick,msg, color) {
            if (users.indexOf(userNick) == -1) {
                socket.emit('用户已下线');
            }
            for(i=0;i<io.sockets.sockets.count();i++) {
                if (io.sockets.sockets[i].nickname==userNick){
                    io.sockets.sockets[i].emit(msg,color);
                }
            }
        });

        //new message get
        socket.on('postMsg', function (msg, color) {
            socket.broadcast.emit('newMsg', socket.nickname, msg, color);
        });
        //new image get
        socket.on('img', function (imgData, color) {
            socket.broadcast.emit('newImg', socket.nickname, imgData, color);
        });
    });

}
exports.start = start;