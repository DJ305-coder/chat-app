const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

app.use(express.static('public'));

http.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


// socket 

const io = require('socket.io')(http)

io.on('connection', (socket) =>{
    socket.on('message', (msg)=>{
        socket.broadcast.emit('message', msg)
    })

    socket.on('typing', (data)=>{
        socket.broadcast.emit('typing', data)
    })
});

