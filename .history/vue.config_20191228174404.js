module.exports = {
    chainWebpack: config => {
        config.when(process.env.NODE_ENV === 'production',config=>)
        config.when(process.env.NODE_ENV === 'development'){
            config.entry('app').clear().add('./src/main-dev.js')
        }
    }
}