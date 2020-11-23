<template>
  <div class="lineitem-create-edit">
    <span class="component-heading">{{ pageHeading }}</span>
    <hr>
    <form class="form-horizontal">
      <div class="form-group">
        <label for="unitPrice" class="col-md-offset-2 col-md-2">Unit Price</label>
        <div class="col-md-4">
          <input type="text" id="unitPrice" v-model="lineItem.unitPrice" >
        </div>
      </div>

      <div class="form-group">
        <label for="quantity" class="col-md-offset-2 col-md-2">Quantity</label>
        <div class="col-md-4">
          <input type="text" id="quantity" v-model="lineItem.quantity" >
        </div>
      </div>

      <div class="form-group">
        <div class="col-md-offset-4 col-md-2">
          <button type="button" class="btn btn-default" v-on:click="submitForm">{{ submitBtnLabel }}</button>
          <router-link class="btn btn-default" :to="{ name: 'orderDetailLineItems', params: { orderId: orderId } }">Cancel</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import { lineItemRestUrl, axios, processAjaxAuthError } from '../../globalvars.js'

  export default {
    name: 'LineItemCreateOrEdit',
    data() {
      return {
        lineItem: {
          id: this.lineItemId,
          orderId: this.orderId,
          unitPrice: 0,
          quantity: 0
        }
      }
    },
    props: {
      orderId: {
        type: Number,
        required: true
      },
      lineItemId: {
        type: Number,
        required: false
      }
    },
    computed: {
      token() {
        return this.$store.state.token;
      },
      pageHeading() {
        let heading = "New Line Item";
        if (this.lineItemId) {
          heading = "Edit Line Item";
         }
        return heading;
      },
      submitBtnLabel() {
        let btnLabel = "Save";
        if (this.lineItemId) {
          btnLabel = "Update";
        }
        return btnLabel;
      }
    },
    methods: {
      getLineItem() {
        axios.get(lineItemRestUrl + this.lineItemId, {
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
        .then( response => {
          this.lineItem = response.data;
          this.lineItem.unitPrice = parseFloat(this.lineItem.unitPrice).toFixed(2);
        })
        .catch( error => {
          processAjaxAuthError(error, this.$router);
        });
      },
      submitForm() {
        console.log('submitForm to be implemented');
      }
    },
    created() {
      if (this.lineItemId) {
        this.getLineItem();
      }
    }
  }
</script>

<style scoped>
  
</style>