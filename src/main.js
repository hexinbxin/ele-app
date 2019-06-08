import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import "normalize.css"
import 'font-awesome/css/font-awesome.css'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(MintUI)

import { Indicator } from 'mint-ui';

// 请求拦截
axios.interceptors.request.use(config => {
  Indicator.open('数据加载中');
  return config;
}, error => {
  return Promise.reject(error)
});

axios.interceptors.response.use(response => {
  Indicator.close();
  return response;
}, error => {
  Indicator.close();
  return Promise.reject(error)
});



let vm  = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
export {vm}
