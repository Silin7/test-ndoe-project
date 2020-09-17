import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
    { path: '/', name: 'Home', component: Home }, 
    { path: "/404", name: "404", component: () => import('../views/notFound/404.vue') },
    { path: '/home', name: 'home', component: () => import('../views/Home.vue') },
    { path: '/event-bus', name: 'event-bus', component: () => import('../views/event-bus/event-bus.vue') },

    { path: '/get_url', name: 'get_url', component: () => import('../views/loginMoudle/get_url.vue') },
    { path: '/post_url', name: 'post_url', component: () => import('../views/loginMoudle/post_url.vue') },
    // 重定向404，此处需特别注意置于最底部 
    { path: "*", redirect: "/404" }
  ]

const router = new VueRouter({
  routes
})

export default router
