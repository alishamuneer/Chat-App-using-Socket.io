const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const mongoose = require('mongoose');
const { Server } = require("socket.io");
const chatDetails = require('./routes/chatDetails')

app.use(cors());
app.use(express.json());
app.use('/api',chatDetails)

const server = http.createServer(app);

mongoose.connect('mongodb://localhost/chatapp')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'))

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3002',
        methods: ['GET', 'POST']
    }
})

// const roomIdNum = (room) => {

//     switch (room) {
//         case 'Friends':
//             return 101;
//         case 'Family':
//             return 102;
//         case 'Colleagues':
//             return 103;
//         case 'Cousins':
//             return 104;
//     }
// }

io.on('connection', (socket) => {
    console.log('user connected', socket.id)

    socket.on('join_room', (room) => {
        // const roomId = roomIdNum(room)
        console.log(room)
        socket.join(room)
        console.log(`User has joind room with room id ${room}`)
    })

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message', data)

    })

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
})

server.listen(3001, () => {
    console.log("SERVER RUNNING");
});