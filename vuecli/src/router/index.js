import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/pages/index'
import login from '@/components/pages/login'
import addItem from '@/components/pages/addItem'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/addItem',
      name: 'addItem',
      component: addItem
    }
  ]
})
