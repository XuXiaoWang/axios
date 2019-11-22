import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AxiosDome from '../views/axiosdome.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'AxiosDome',
    component: AxiosDome
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // 异步加载 访问该组件时才加载，推荐使用
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
   {
    path: '/requ',
    name: 'requ',
    // 异步加载 访问该组件时才加载，推荐使用
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/requests.vue')
  },
   {
    path: '/catlist',
    name: '联系人列表',
    // 异步加载 访问该组件时才加载，推荐使用
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ContactList.vue')
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
