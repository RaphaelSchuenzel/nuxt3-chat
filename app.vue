<template lang="pug">
#chat
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
    data() {
        return {
            input: '',
            sendingMessage: false,
            messages: []
        }
    },
    mounted() {
        const self = this

        self.socket = this.$nuxtSocket({})

        self.socket.on('message', (msg) => {
            self.messages.push(msg)
        })
    },
    methods: {
        submitMessage() {
            if (!this.sendingMessage) {
                const self = this
                console.log("sending")

                self.sendingMessage = true

                self.socket.emit('message', this.input)

                self.sendingMessage = false
                return self.input = ''
            }
        }
    }
}
</script>
