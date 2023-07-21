const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const moment = require('moment')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = 3000 || process.env.PORT;
const chatBot = "Chat Bot"
// set path for public folder to server static files

app.use(express.static(path.join(__dirname,'public')))


io.on('connection', socket => {
    socket.emit('message', formatMessage(chatBot,'Welcome to WebChat'))

    socket.broadcast.emit('message', formatMessage(chatBot,'User has joined the chat'))

    socket.on('disconnect', () => {
        io.emit('message', formatMessage(chatBot,'A user has left the chat'))
    })

    socket.on('chatMessage', (msg) => {
        io.emit('message', formatMessage('user',msg))
    })
})


server.listen(PORT,() => console.log(`Running on port ${PORT}`))

function formatMessage(username, text){
    return {
        username,
        text,
        time: moment().format('h:mm a')
    }
}