/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverActions: {
            allowedOrigins: ['inkformedtattoos.com','localhost:8080']
        }
    },
    typescript :{
        ignoreBuildErrors: true,
    },
}

module.exports = nextConfig
