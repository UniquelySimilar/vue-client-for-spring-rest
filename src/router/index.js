import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  // Root
  {
    path: '/',
    redirect: '/login'
  },
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
    path: '/orders/:orderId',
    name: 'orderDetailLineItems',
    component: () => import('../views/order/OrderDetailLineItems.vue'),
    props: true
  },
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
  },
  // Line Items
  {
    path: '/orders/:orderId/lineitems/create',
    name: 'lineItemCreate',
    component: () => import('../views/lineitem/LineItemCreateOrEdit.vue'),
    props: true
  },
  {
    path: '/lineitems/:lineItemId/edit',
    name: 'lineItemEdit',
    component: () => import('../views/lineitem/LineItemCreateOrEdit.vue'),
    props: true
  }
]

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
