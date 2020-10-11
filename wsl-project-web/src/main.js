import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./stylesheets/rem.js"
import "./stylesheets/main.scss"
import "./stylesheets/animate/animate.min.css"
import "./stylesheets/home.scss"
import "./stylesheets/newpassword.scss"
import "./stylesheets/system/mainPage.scss"
import "./stylesheets/games/game2048.css"
import axios from 'axios'

Vue.prototype.$http = axios

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
