import Vue from 'vue'
import Router from 'vue-router'
import Konten from '@/components/Konten'
import Historytransaksi from '@/components/Historytransaksi'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Konten',
      component: Konten
    },
    {
      path: '/Historytransaksi',
      name: 'Historytransaksi',
      component: Historytransaksi
    }
  ]
})
