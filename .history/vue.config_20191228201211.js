module.exports = {
    chainWebpack: config => {
        // 生产模式
        config.when(process.env.NODE_ENV === 'production', config => {
            // 生产环境 入口文件
            config.entry('app').clear().add('./src/main-prod.js')

            // import的依赖包会合并到vendor，externals排除某些包被打包
            config.set('externals', {
                'vue': 'Vue',
                'vue-router': 'VueRouter',
                'axios': 'axios',
                'lodash': '_',
                'echarts': 'echarts',
                'nprogress': 'NProgress',
                'vue-quill-editor': 'VueQuillEditor'
            })

            // 通过html插件修改
            config.plugin('html').tap(args => {
                args[0].isProd = true
                return args
            })
        })

        // 开发模式
        config.when(process.env.NODE_ENV === 'development', config => {
            // 开发环境 入口文件
            config.entry('app').clear().add('./src/main-dev.js')

            config.plugin('html').tap(args => {
                args[0].isProd = false
                return args
            })
        })
    }
}