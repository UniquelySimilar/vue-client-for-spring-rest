<template>
  <div class="lineitem-create-edit">
    <span class="component-heading">{{ pageHeading }}</span>
    <hr>
    <form class="form-horizontal">
      <div class="form-group">
        <label for="unitPrice" class="col-md-offset-2 col-md-2">Unit Price</label>
        <div class="col-md-2">
          <input type="text" class="form-control" id="unitPrice" v-model="lineItem.unitPrice" >
        </div>
        <div class="col-md-4 error-msg">
          <span>*&nbsp;</span>
          <span>{{ getValidationError('unitPrice') }}</span>
        </div>
      </div>

      <div class="form-group">
        <label for="quantity" class="col-md-offset-2 col-md-2">Quantity</label>
        <div class="col-md-2">
          <input type="text" class="form-control" id="quantity" v-model="lineItem.quantity" >
        </div>
        <div class="col-md-4 error-msg">
          <span>*&nbsp;</span>
          <span>{{ getValidationError('quantity') }}</span>
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
  import {
    lineItemRestUrl,
    axios,
    processAjaxAuthError,
    getValidationError
  } from '../../globalvars.js';

  export default {
    name: 'LineItemCreateOrEdit',
    data() {
      return {
        lineItem: {
          id: this.lineItemId,
          orderId: this.orderId,
          unitPrice: 0,
          quantity: 0
        },
        validationErrors: []
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
        axios({
          method: this.lineItemId ? 'put' : 'post',
          url: this.lineItemId ? lineItemRestUrl + this.lineItemId : lineItemRestUrl,
          data: JSON.stringify(this.lineItem),
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
        .then( () => {
          // Redirect back to order detail view
          this.$router.push({ name: 'orderDetailLineItems', params: { orderId: this.orderId } })
        })
        .catch(error => {
          // TODO: Move this to a function in 'globalvars'
          if (error.response) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            if (error.response.status == 400) {
              // Validation error
              //console.log('validation error');
              this.validationErrors = error.response.data;
            }
            else if (error.response.status == 401) {
              console.log("401 error so redirect to login");
              this.$router.push("/login");
            }
            else {
                console.error("Response contains error code " + error.response.status);
            }
          } else if (error.request) {
            console.error("No response received so logging request");
            console.error(error.request);
          } else {
            console.error("Problem with request");
            console.error(error.message);
          }
      });
      },
      getValidationError
    },
    created() {
      if (this.lineItemId) {
        this.getLineItem();
      }
    }
  }
</script>

<style scoped>
  label {
    text-align: right;
  }
</style>