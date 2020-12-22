import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "mainlayout" */ '@/views/member/login')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "mainlayout" */ '@/views/member/signup')
  },
  {
    path: '/create',
    name: 'create',
    component: () => import(/* webpackChunkName: "mainlayout" */ '@/views/post/write')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
