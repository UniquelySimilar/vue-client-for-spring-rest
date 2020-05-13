import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  // Login
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  // Customers
  {
    path: '/customers',
    name: 'customerIndex',
    component: () => import('../views/customer/CustomerIndex.vue'),
  },
  {
    path: '/customers/:customerId',
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
    path: '/customers/:customerId/edit',
    name: 'customerEdit',
    component: () => import('../views/customer/CustomerCreateOrEdit.vue'),
    props: true
  },
  // Orders
  {
    path: '/customers/:customerId/orders/create',
    name: 'orderCreate',
    component: () => import('../views/order/OrderCreateOrEdit.vue'),
    props: true
  },
  {
    path: '/customers/:customerId/orders/:orderId/edit',
    name: 'orderEdit',
    component: () => import('../views/order/OrderCreateOrEdit.vue'),
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
