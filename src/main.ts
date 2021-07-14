import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

import axios from 'axios'

axios.defaults.baseURL = 'https://cargo.aoo.cz/'
Vue.prototype.$axios = axios


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
