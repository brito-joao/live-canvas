const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");


const io = new Server(server,{
    cors: {
      origin: "http://192.168.1.115:3000",
      methods: ["GET", "POST"]
    }
});

//app variables 
let board_array = [Array.from({length:400},()=>{return"white"})];

io.on("connect",(socket)=>{
    console.log("a paintor entered!");
    socket.emit("get-array",board_array)
    socket.on("receive-array",(client_array)=>{
        board_array=client_array[0];
        
        socket.broadcast.emit("get-array",board_array);
    })
})
console.log(board_array);
app.use(express.static(__dirname + '/client/dist'));

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/client/dist/index.html');
});

server.listen(3000, () => {
    console.log('listening on *:3000');
    
});