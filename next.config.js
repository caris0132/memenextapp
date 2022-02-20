module.exports = {
    reactStrictMode: true,
    images: {
        domains: ['localhost', 'memevui.com'],
    },
    publicRuntimeConfig: {
        // Will be available on both server and client
        staticFolder: '/static',
    },
    serverRuntimeConfig: {
        // Will only be available on the server side
        public: '/public/',
        mySecret: 'secret',
        secondSecret: process.env.SECOND_SECRET, // Pass through env variables
    },
}