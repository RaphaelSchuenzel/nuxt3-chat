import { Server } from 'socket.io'
import Redis from 'ioredis'
import { DateTime } from 'luxon'

const SOCKET_PORT = 3001
const REDIS_ADDRESS = process.env.REDIS_ADDRESS || 'redis://127.0.0.1:6379'

const io = new Server().listen(SOCKET_PORT)

const pub = new Redis(REDIS_ADDRESS)
const sub = new Redis(REDIS_ADDRESS)

sub.subscribe('chat', (err, count) => {
    if (err) {
        // Just like other commands, subscribe() can fail for some reasons,
        // ex network issues.
        console.error("Failed to subscribe: %s", err.message)
    } else {
        // `count` represents the number of channels this client are currently subscribed to.
        console.log(`Subscribed successfully! This client is currently subscribed to ${count} channels.`)
    }
})

sub.on('message', (channel, message) => {
    console.log(`Received message in channel: ${channel}`)

    console.log(`Message: ${message}`)

    io.emit('message', JSON.parse(message))
})

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('message', (msg) => {
        console.log('received msg: ' + msg.content)

        const message = JSON.stringify({
            date: DateTime.now(),
            username: msg.username,
            content: msg.content
        })

        pub.publish('chat', message)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})
