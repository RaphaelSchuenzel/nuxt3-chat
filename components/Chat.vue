<template lang="pug">
#chat
    p Welcome, {{ username }}

    #messages
        p(
            v-for="message in messages"
        ) {{ message }}

    div
        input(
            v-model="input"
            placeholder="Chat message"
        )

        button(
            @click="submitMessage"
        )
            span(
                v-if="sendingMessage"
            ) Loading...

            span(
                v-else
            ) Send
</template>

<script>
export default {
    props: {
        username: String,
    },
    data() {
        return {
            input: '',
            sendingMessage: false,
            messages: []
        }
    },
    mounted() {
        this.socket = this.$nuxtSocket({})

        this.socket.on('message', (msg) => {
            this.messages.push(msg)
        })
    },
    methods: {
        submitMessage() {
            if (!this.sendingMessage) {
                console.log("sending")

                this.sendingMessage = true

                this.socket.emit('message', {
                    username: this.username,
                    content: this.input
                })

                this.sendingMessage = false
                return this.input = ''
            }
        }
    }
}
</script>