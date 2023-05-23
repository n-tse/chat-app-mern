const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

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
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})