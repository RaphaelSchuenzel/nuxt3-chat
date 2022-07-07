import { Server } from 'socket.io'
import { DateTime } from 'luxon'

const SOCKET_PORT = 3001

const io = new Server({})

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('message', (msg) => {
        console.log('received msg: ' + msg)

        const date = DateTime.now()

        const message = {
            date,
            username: msg.username,
            message: msg.content
        }

        io.emit('message', message)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

io.listen(SOCKET_PORT)
