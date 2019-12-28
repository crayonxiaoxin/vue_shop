import Vue from 'vue'
import VueRouter from 'vue-router'

// import Login from '../components/Login.vue'
// import Home from '../components/Home.vue'
// import Welcome from '../components/Welcome.vue'
const Login = () => import(/* webpackChunkName: "login_home_welcome" */'../components/Login.vue')
const Home = () => import(/* webpackChunkName: "login_home_welcome" */'../components/Home.vue')
const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */'../components/Welcome.vue')

import Users from '../components/user/Users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
const Users = () => import(/* webpackChunkName: "users_rights_roles" */'../components/user/Users.vue')
const Rights = () => import(/* webpackChunkName: "users_rights_roles" */'../components/power/Rights.vue')
const Roles = () => import(/* webpackChunkName: "users_rights_roles" */'../components/power/Roles.vue')

import Cate from '../components/goods/Cate.vue'
import Params from '../components/goods/Params.vue'
import Goods from '../components/goods/Goods.vue'
import GoodsAdd from '../components/goods/Add.vue'
const Cate = () => import(/* webpackChunkName: "cate_params_goods_add" */'../components/goods/Cate.vue')
const Params = () => import(/* webpackChunkName: "cate_params_goods_add" */'../components/goods/Params.vue')
const Goods = () => import(/* webpackChunkName: "cate_params_goods_add" */'../components/goods/Goods.vue')
const GoodsAdd = () => import(/* webpackChunkName: "cate_params_goods_add" */'../components/goods/Add.vue')

import Order from '../components/order/Order.vue'
import Report from '../components/report/Report.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    redirect: '/welcome',
    component: Home,
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles },
      { path: '/categories', component: Cate },
      { path: '/params', component: Params },
      { path: '/goods', component: Goods },
      { path: '/goods/add', component: GoodsAdd },
      { path: '/orders', component: Order },
      { path: '/reports', component: Report }
    ]
  }
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
