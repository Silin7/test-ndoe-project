import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/home', name: 'home', component: () => import('../views/Home.vue') },
  { path: '/newpassword', name: 'newpassword', component: () => import('../views/newpassword.vue') },
  { path: '/registerPage', name: 'registerPage', component: () => import('../views/registerPage.vue') },
  { path: '/navigation', name: 'navigation', component: () => import('../views/system/navigation.vue') },
  { path: '/mainPage', name: 'mainPage', component: () => import('../views/system/mainPage.vue') },
  { path: '/game2048', name: 'game2048', component: () => import('../views/games/game2048.vue') }
]

const router = new VueRouter({
  routes
})

export default router
