let express = require('express')
let app = express();

// var fs = require('fs');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

let roomlist = ['room0', 'room1']; // intial a room for test
var socketRoom = [];
// list of pair of socket.id and the latest joined room

io.on('connection', (socket) => {
    let currentRoom = '';
    console.log('user connected');
    io.emit('roomlist', JSON.stringify(roomlist));
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('room', function(room) {
        // socket.join(room) is async

        socket.join(room, function() {
            currentRoom = room;
            var k = 1;
            for (let i = 0; i < socketRoom.length; i++) {
                if (socketRoom[i][0] == socket.id) {
                    socketRoom[i][1] = room;
                    k = 0;
                }
            }
            if (k == 1) {
                socketRoom.push([socket.id, room]);
            }

            let roomKeys = Object.keys(socket.rooms);
            console.log(roomKeys);
            if (roomlist.indexOf(room) == -1) {
                roomlist.push(room);
                io.emit('newRoom', room);
            }
            io.to(room).emit('init-message', socket.id + " has joined into " + room);
            // let all sockets in the room know someone joined
        });

    })

    // for pubic chatting in some room
    socket.on('new-room-message', (message) => {
        console.log('room message got by server:' + message);
        console.log(JSON.stringify(socket.rooms));
        io.to(currentRoom).emit('new-room-message',
            JSON.stringify([message, socket.id, currentRoom]));
    });
});

server.listen(port, () => {
    console.log('started on port:' + port);
});