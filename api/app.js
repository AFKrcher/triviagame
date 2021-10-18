const express = require('express');
const app = express();
const router = express.Router()
const path = require('path');
const getRouter = require('./routes/get.js')
const postRouter = require('./routes/post.js')
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development']);

const server = require('http').createServer(app);
const cors = require('cors')
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
const port = process.env.PORT || 8080;

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

app.use('/files', getRouter);
app.use('/newfile', postRouter);

app.get('/', (req, res) => {
  res.send('Hello World')
})

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

function setHost(room) {
  let findHost = users.filter(user => user.room === room)
  users.map(user => {
    if (findHost.length > 0) {
      if (findHost[0].id === user.id) {
        user.host = true
      }
    }
  })
}

// Variables
let deck = {}
let roomTimes = {}
let users = []

function userJoin(id, username, room) {
  users.push({ id, username, room, score: 0, host: false })
  setHost(room)
}

function usersInRoom(room) {
  return users.filter(user => user.room === room);
}


io.on('connection', (socket) => {
  socket.on('joinGame', ({ username, room }) => {
    userJoin(socket.id, username, room)
    socket.join(room);
    const roomUsers = usersInRoom(room)
    if (!deck[room]) deck[room] = [{ question: 'Loading', answers: ['Loading']}]
    if (!roomTimes[room]) roomTimes[room] = 10
    io.to(room).emit('roomUsers', roomUsers)
    io.to(room).emit('quiz start', deck[room])
    io.to(room).emit('timer set start', roomTimes[room])
  })

  socket.on('set timer', ({ timer, room}) =>{
    console.log(timer)
    roomTimes[room] = timer
    io.to(room).emit('timer set', timer)
  })

  socket.on('upload', ({ result, room }) => {
    deck[room] = result
    io.to(room).emit("quiz", result)
  })

  // added this is to send the quiz to everyone in the room
  socket.on('set quiz database', ({room, selectedQuiz}) => {
    knex.select('*')
    .from('files')
    .where('title', `${selectedQuiz}`)
    .then(data => {
      data = data.map(question =>{
        return {...question, answers: question.answers.split(',')}
      })
      deck[room] = data
      console.log(deck[room])
      io.to(room).emit("quiz", data)})
    .catch(err => console.log(err))
  }
  )

  socket.on('disconnecting', (reason) => {
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        users = users.filter(obj => obj.id !== socket.id)
        setHost(room)
        const roomUsers = usersInRoom(room)
        socket.broadcast.to(room).emit("roomUsers", roomUsers)
      }
    }
  })

  socket.on('StartGame', (room) => {
    io.to(room).emit('start the timer')
  })

  socket.on('reset game', (room) => {
    io.to(room).emit('end the timer');
  })

  socket.on('answer', ({ answer, room, index }) => {
    if (deck[room][index].answers[0] === answer) {
      socket.emit('correct answer', answer)
      let newPlayer = {}
      users.forEach((player) => {
        if (player.id === socket.id) {
          newPlayer = { ...player, score: player.score + 10 }
        }
      })
      users = users.filter(player => player.id !== socket.id)
      users.push(newPlayer)
      users.sort((a, b) => b.score - a.score);
      const roomUsers = usersInRoom(room)
      io.to(room).emit('current player', roomUsers)
    }
  })
});

module.exports = router;