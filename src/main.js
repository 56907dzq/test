import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './utils/http.js'
import utils from './utils/utils.js'

Vue.config.productionTip = false
Vue.use(ElementUI)
// 绑定到vue原型链上去
Vue.prototype.$axios = axios
Vue.prototype.$utils = utils

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
