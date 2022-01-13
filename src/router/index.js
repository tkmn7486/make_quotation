import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sr',
    name: 'SR',
    component: () => import('../views/sr.vue')
  },
  {
    path: '/sp',
    name: 'SP',
    component: () => import('../views/sp.vue')
  },
  {
    path: '/price_cur',
    name: 'PC',
    component: () => import('../views/price_cur.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
