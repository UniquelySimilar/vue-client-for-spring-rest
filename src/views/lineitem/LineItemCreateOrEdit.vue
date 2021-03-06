<template>
  <div class="lineitem-create-edit">
    <span class="component-heading">{{ pageHeading }}</span>
    <hr>
    <form class="form-horizontal">
      <div class="form-group">
        <label for="product" class="col-md-offset-2 col-md-2">Product</label>
        <div class="col-md-2">
          <input type="text" class="form-control" id="product" v-model="lineItem.product.name" disabled >
        </div>
        <div class="col-md-1">
          <button type="button" class="btn btn-default" @click="showProductModal">Select</button>
        </div>
        <div class="col-md-4 error-msg">
          <span>*&nbsp;</span>
          <span>{{ getValidationError('product.name') }}</span>
        </div>
      </div>

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

    <product-select-modal v-if="productModal"
      :products="products"
      @select-product-event="selectProduct"
      @close-product-modal-event="productModal = false" />
  </div>
</template>

<script>
  import {
    lineItemRestUrl,
    productRestUrl,
    axios,
    processValidationErrors,
    getValidationError
  } from '@/globalvars.js';
  import processRequestErrors from '@/mixins/process-request-errors.js'

  import ProductSelectModal from '@/components/ProductSelectModal.vue'

  export default {
    name: 'LineItemCreateOrEdit',
    components: {
      ProductSelectModal
    },
    mixins: [processRequestErrors],
    data() {
      return {
        lineItem: {
          id: this.lineItemId,
          orderId: this.orderId,
          unitPrice: 0,
          quantity: 0,
          product: {
            id: 0,
            name: '',
            description: '',
            unitPrice: 0.0
          }
        },
        productModal: false,
        products: [],
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
          this.processAjaxAuthError(error, this.$router);
        });
      },
      submitForm() {
        axios({
          method: this.lineItemId ? 'put' : 'post',
          url: lineItemRestUrl,
          //url: this.lineItemId ? lineItemRestUrl + this.lineItemId : lineItemRestUrl,
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
          this.validationErrors = processValidationErrors(error);
          if (this.validationErrors.length === 0) {
            this.processAjaxAuthError(error, this.$router);
          }
        });
      },
      showProductModal() {
        axios.get(productRestUrl, {
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
        .then( response => {
          let productsTemp = response.data;
          // Add 'selected' property here so it will be reactive in modal
          productsTemp.forEach( product => {
            product.selected = false;
          });

          this.products = productsTemp;
          this.productModal = true;
        })
        .catch( error => {
          this.processAjaxAuthError(error, this.$router);
        })
      },
      selectProduct(selectedProduct) {
        this.lineItem.product = selectedProduct;
        this.lineItem.unitPrice = this.lineItem.product.unitPrice;
        this.productModal = false;
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