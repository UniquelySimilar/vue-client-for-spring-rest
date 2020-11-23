<template>
  <div class="order-detail-lineitems">
    <div>
      <span class="component-heading">Order Details</span>
    </div>
    <hr>
    <div class="row">
      <div class="col-md-4">
        <div class="row">
          <div class="col-md-4">
            <label>Status:</label>
          </div>
          <div class="col-md-8">{{ getOrderStatusStr(order.orderStatus) }}</div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <label>Order Date:</label>
          </div>
          <div class="col-md-8">{{ order.orderDate }}</div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <label>Required Date:</label>
          </div>
          <div class="col-md-8">{{ order.requiredDate }}</div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <label>Shipped Date:</label>
          </div>
          <div class="col-md-8">{{ order.shippedDate }}</div>
        </div>
      </div>
    </div>
    <hr>
    <line-item-index v-if="order.id" v-bind:orderId="order.id" v-bind:initialLineItems="order.lineItems" />
    <hr>
    <router-link class="btn btn-default" :to="{ name: 'customerDetailOrders', params: { customerId: order.customerId } }">Back</router-link>
  </div>
</template>

<script>
  import { orderRestUrl, axios, processAjaxAuthError, getOrderStatusStr } from '../../globalvars.js'
  import LineItemIndex from '../lineitem/LineItemIndex.vue'

  export default {
    components: {
      LineItemIndex
    },
    data() {
      return {
        order: {
          id: 0,
          customerId: 0,
          lineItems: []
        }
      }
    },
    props: {
      orderId: {
        type: Number,
        required: true
      }
    },
    computed: {
      token() {
        return this.$store.state.token;
      }
    },
    methods: {
      getOrder() {
        axios.get(orderRestUrl + this.orderId + '/lineitems', {
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
        .then( response => {
          this.order = response.data;
          this.order.id = parseInt(this.order.id);
          this.order.lineItems.forEach( lineItem => {
            lineItem.id = parseInt(lineItem.id);
            lineItem.unitPrice = parseFloat(lineItem.unitPrice).toFixed(2);
           });
        })
        .catch( error => processAjaxAuthError(error, this.$router) )
      },
      getOrderStatusStr
    },
    created() {
      this.getOrder();
    }
  }
</script>

<style scoped>

</style>