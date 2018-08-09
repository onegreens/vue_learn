// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'


//设置axios的默认路径
import axios from 'axios'
// axios.defaults.baseURL = "http://127.0.0.1:8080/ldmall"
// 因为我们调用的接口跨域,默认情况下接口给我们设置的cookie无效的,为了让他们有效,我们必须添加此配置
axios.defaults.withCredentials = true
//将axios放到vue原型中 方便调用
Vue.prototype.$axios = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
