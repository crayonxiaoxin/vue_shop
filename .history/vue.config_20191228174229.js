module.exports = {
    chainWebpack: config => {
        config.when(process.env.NODE_ENV==='production'){
            config.entry('app').clear().add('./')
        }
    }
}