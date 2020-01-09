import Vue from 'vue'
import VueRouter from 'vue-router'
import CustomerIndex from '../views/customer/CustomerIndex.vue'

Vue.use(VueRouter)

const routes = [
  // Customers
  {
    path: '/customers',
    name: 'customerIndex',
    component: CustomerIndex
  },
  {
    path: '/customers/:id',
    name: 'customerDetailOrders',
    // route level code-splitting (see documentation)
    component: () => import('../views/customer/CustomerDetailOrders.vue'),
    props: true
  },
  {
    path: '/customers/create',
    name: 'customerCreate',
    component: () => import('../views/customer/CustomerCreateOrEdit.vue')
  },
  {
    path: '/customers/:id/edit',
    name: 'customerEdit',
    component: () => import('../views/customer/CustomerCreateOrEdit.vue'),
    props: true
  },
  // Orders
  {
    path: '/orders/create',
    name: 'orderCreate',
    component: () => import('../views/order/OrderCreateOrEdit.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
