import Vue from 'vue'
import VueRouter from 'vue-router'
import CustomerIndex from '../views/customer/CustomerIndex.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'customerIndex',
    component: CustomerIndex
  },
  {
    path: '/create',
    name: 'customerCreate',
    // route level code-splitting (see documentation)
    component: () => import('../views/customer/CustomerCreateOrEdit.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
