const io = require('socket.io')(3000) // create server

const users = {}

console.log("Server has started!")

io.on('connection', socket => {

  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })

  //socket.emit('chat-message', 'hello world')
  socket.on('send-chat', (data, acknowledgment) => {

    socket.broadcast.emit('message-received', {data: data, user: users[socket.id]})
    acknowledgment();
  })

  socket.on('disconnect', ()=> {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})
