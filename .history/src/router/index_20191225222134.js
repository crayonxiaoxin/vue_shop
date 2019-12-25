import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home },
  { path: '/welcome', component: Welcome }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const tokenstr = window.sessionStorage.getItem('token')
  if (to.path === '/login') {
    if (!tokenstr) return next()
    return next('/home')
  }
  if (!tokenstr) return next('/login')
  next()
})

export default router
