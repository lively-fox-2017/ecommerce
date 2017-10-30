import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Admin from '@/components/Admin'
import DaftarAdmin from '@/components/DaftarAdmin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/admin',
      component: Admin
    },
    {
      path: '/daftar-admin',
      component: DaftarAdmin
    }
  ]
})
