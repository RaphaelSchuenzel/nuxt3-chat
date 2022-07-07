<template lang="pug">
main
    Chat(
        :username="username"
        v-if="username"
    )

    UsernameInput(
        v-else
    )
</template>

<script>
export default {
    data() {
        return {
            username: process.server ? '' : localStorage.getItem('username')
        }
    },
}
</script>
