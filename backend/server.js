const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const User = require('./models/User');

const rooms = ['general', 'work', 'fun/games', 'random'];
const cors = require('cors');

app.use(express.urlencoded({extended: true})); // 'extended: true' for receiving data from frontend
app.use(express.json());
app.use(cors()); // allows front and back end to communicate

app.use('/users', userRoutes)
require('./db');

const server = require('http').createServer(app); // 'http' comes with node environment by default
const PORT = 5001;
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
})

app.get('/rooms', (req, res) => {
  res.json(rooms);
})

const getLastMessagesFromRoom = async(room) => {
  let roomMessages = await Message.aggregate([{$match: {to: room}}, {$group: {_id: '$date', messagesByDate: {$push: '$$ROOT'}}}])
  return roomMessages;
}

const sortRoomMessagesByDate = (messages) => {
  return messages.sort((a, b) => {
    let date1 = a._id.split('/');
    let date2 = b._id.split('/');

    // rearrange date to format that's more easily sortable
    date1 = date1[2] + date1[0] + date1[1];
    date2 = date2[2] + date2[0] + date2[1];

    // sort by newest to oldest
    return date1 < date2 ? -1 : 1;
  })
}


// establishing socket connection and actions based on events emitted from frontend
io.on('connection', (socket) => {

  socket.on('new-user', async() => {
    const members = await User.find();
    io.emit('new-user', members);
  })

  socket.on('join-room', async(room) => {
    socket.join(room);
    let roomMessages = await getLastMessagesFromRoom(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    // send back to client by emitting an event, since sockets listen for events
    socket.emit('room-messages', roomMessages)
  })
})

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})