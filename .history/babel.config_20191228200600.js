// 项目发布阶段需要用到的babel插件
const productionPlugins = []
if (process.env.NOKE_ENV === 'production') {
  // 生产
  productionPlugins.push('transform-remove-console')
}

module.exports = {
  'presets': [
    '@vue/cli-plugin-babel/preset'
  ],
  'plugins': [
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk'
      }
    ],
    // 展开产品阶段需要用到的插件数组
    ...productionPlugins,
    // 路由懒加载
    '@babel/plugin-syntax-dynamic-import'
  ]
}
