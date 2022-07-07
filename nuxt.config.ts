import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: ['nuxt-socket-io'],
    io: {
        sockets: [{
            url: 'http://localhost:4000'
        }]
    }
})