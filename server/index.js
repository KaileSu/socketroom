let express = require('express')
let app = express();

// var fs = require('fs');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

let roomlist = ['room0',]; // intial a room for test
var roomKeys = []; // just for testing socket.rooms
var currentRoom = ''; // current room for a socket
var socketRoom = []; // list of socket.id and joined room

io.on('connection', (socket) => {
    
    console.log('user connected'); 
    socket.on('test', (message) => { console.log(message);}); // for testing
    // for user to choice an existing room from roomlist to join
    socket.on('roomlist', (m) => {
        console.log(m);
        io.emit('roomlist', JSON.stringify(roomlist));
        });

    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('room', function(room) {
        // socket.join(room) is async
        socket.join(room, function() {
            var k = 1;
            for (i=0; i<socketRoom.length;i++){
                if (socketRoom[i][0] == socket.id){
                    socketRoom[i][1] = room;
                    k = 0;
                }
            }
            if (k == 1)
            {socketRoom.push([socket.id,room]); }
           
            roomKeys = Object.keys(socket.rooms); 
            if (roomlist.indexOf(room) == -1){roomlist.push(room);}
            io.to(room).emit(room + 'init-message', socket.id + " has joined into " + room);
            // let all sockets in the room know someone joined
            
            
            
        });
        
    })
    
   
    // for pubic chatting in some room
    socket.on('new-room-message', (message) => {
        console.log('room message got by server:' + message);
        console.log(JSON.stringify(socket.rooms));
        for (i=0; i<socketRoom.length;i++){
            if (socketRoom[i][0] == socket.id ){
                currentRoom = socketRoom[i][1]
                io.to(currentRoom).emit('new-room-message', message);
            }
        }       
    });
});

server.listen(port, () => {
    console.log('started on port:' +port);
});

