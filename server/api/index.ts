import { Server } from 'socket.io'

const io = new Server({})

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('message', (msg) => {
        console.log('received msg: ' + msg)

        io.emit('message', msg)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

io.listen(4000)
