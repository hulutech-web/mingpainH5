import Vue from 'vue'
import App from './App.vue'
import router from './router'
import weui from 'weui.js'
import 'weui'
import vcolorpicker from 'vcolorpicker'
import './assets/css/weui.css'
import axios from '@/plugins/request'
import http from '@/plugins/upload'
Vue.use(vcolorpicker)
Vue.config.productionTip = false
Vue.prototype.$weui = weui
Vue.prototype.$axios = axios
Vue.prototype.$http = http
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
