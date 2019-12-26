import Vue from 'vue'
import VueRouter from 'vue-router'
import CustomerIndex from '../views/customer/CustomerIndex.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/customers',
    name: 'customerIndex',
    component: CustomerIndex
  },
  {
    path: '/customers/create',
    name: 'customerCreate',
    // route level code-splitting (see documentation)
    component: () => import('../views/customer/CustomerCreateOrEdit.vue')
  },
  {
    path: '/customers/:id/edit',
    name: 'customerEdit',
    // route level code-splitting (see documentation)
    component: () => import('../views/customer/CustomerCreateOrEdit.vue'),
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
