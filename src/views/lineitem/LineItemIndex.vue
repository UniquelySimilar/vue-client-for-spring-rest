<template>
  <div class="lineitem-index">
    <div class="table-title">
      <span class="component-heading">Line Items</span>
      <router-link class="btn btn-default" v-if="orderId" :to="{ name: 'lineItemCreate', params: { orderId: orderId } }">Create Line Item</router-link>
    </div>

    <div class="row" v-if="lineItems.length">
      <div class="col-md-8">
        <table id="line-item-table" class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Unit Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="lineItem in lineItems" v-bind:key="lineItem.id">
              <td>PLACEHOLDER</td>
              <td>{{ lineItem.unitPrice }}</td>
              <td>{{ lineItem.quantity }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LineItemIndex',
    data() {
      return {
        lineItems: this.initialLineItems
      }
    },
    props: {
      orderId: {
        type: Number,
        required: true
      },
      initialLineItems: {
        type: Array,
        required: true
      }
    },
    computed: {
      token() {
        return this.$store.state.token;
      }
    },
    methods: {

    }

  }
</script>

<style scoped>

</style>