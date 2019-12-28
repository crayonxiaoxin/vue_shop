const productionPlugins = []
if(process.env.NOKE_ENV==='production'){
  productionPlugins.p
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
    'transform-remove-console'
  ]
}
