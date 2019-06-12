// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import lrz from 'lrz'
import echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://localhost:3000"
Vue.prototype.$axios = axios //把axios放入原型链
Vue.prototype.$echarts = echarts //把echarts放入原型链
Vue.use(ElementUI);
// Vue.use(lrz);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
