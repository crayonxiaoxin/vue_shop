import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式
import './assets/css/global.css'
// 导入iconfont
import './assets/fonts/iconfont.css'

import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 配置拦截器 挂载请求头token
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

Vue.prototype.$http = axios

Vue.filter('dateFormat',function(timestamps){
  const dt = new Date(timestamps)
  const y = dt.getFullYear()
  const m = ((dt.getMonth()+1)+'').padStart(2,'0')
  const d = (dt.getDate()+'').padStart(2,'0')
  const hh = ()
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
