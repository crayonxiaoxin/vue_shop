import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
// 导入全局样式
import '../assets/css/global.css'
// 导入iconfont
import '../assets/fonts/iconfont.css'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login }
]

const router = new VueRouter({
  routes
})

export default router
