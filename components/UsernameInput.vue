<template lang="pug">
#username-input
    input(
        name="username"
        placeholder="Your Username"
        v-model="input"
    )

    button(
        @click="setUsername"
    ) Set Username
</template>

<script>
export default {
    data() {
        return {
            input: ''
        }
    },
    methods: {
        setUsername() {
            localStorage.setItem('username', this.input)
        }
    }
}
</script>