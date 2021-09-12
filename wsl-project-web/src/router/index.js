import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/rollcall/index.vue'

Vue.use(VueRouter)

  const routes = [
  { path: '/', component: index },
  { path: '/index', name: 'index', component: () => import('../views/rollcall/index.vue') },
  { path: '/index2', name: 'index2', component: () => import('../views/rollcall/index2.vue') },
  { path: '/home', name: 'home', component: () => import('../views/system/index.vue') },
  { path: '/newpassword', name: 'newpassword', component: () => import('../views/system/newpassword.vue') },
  { path: '/mainPage', name: 'mainPage', component: () => import('../views/system/mainPage.vue') },
  { path: '/addpage', name: 'addpage', component: () => import('../views/system/addpage.vue') }
]

const router = new VueRouter({
  routes
})

export default router
