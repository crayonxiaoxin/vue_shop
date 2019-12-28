module.exports = {
    chainWebpack: config => {
        config.when(process.env.NODE_ENV === 'production'){
            config.entry('app').clear().add('./src/main-prod.js')
        }
        config.when(process.env.NODE_ENV === 'development'){
            config.entry('app').clear().add('./src/main-dev.js')
        }
    }
}