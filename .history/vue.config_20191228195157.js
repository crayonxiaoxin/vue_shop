module.exports = {
    chainWebpack: config => {
        // 生产模式
        config.when(process.env.NODE_ENV === 'production', config => {
            config.entry('app').clear().add('./src/main-prod.js')

            config.set('externals', {
                'vue': 'Vue',
                'vue-router': 'VueRouter',
                'axios': 'axios',
                'lodash': '_',
                'echarts': 'echarts',
                'nprogress': 'NProgress',
                'vue-quill-editor': 'VueQuillEditor'
            })

            config.plugin('html')
        })

        // 开发模式
        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/main-dev.js')
        })
    }
}