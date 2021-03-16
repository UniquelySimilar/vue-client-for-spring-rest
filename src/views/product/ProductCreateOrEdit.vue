<template>
  <div class="product-create-edit">
    <span class="component-heading">{{ pageHeading }}</span>
    <hr>
    <form class="form-horizontal">
      <div class="form-group">
        <label for="name" class="col-md-offset-2 col-md-2">Name</label>
        <div class="col-md-4">
          <input type="text" class="form-control" id="name" v-model="product.name" >
        </div>
        <div class="col-md-4 error-msg">
          <span>*&nbsp;</span>
          <span>{{ getValidationError('name') }}</span>
        </div>
      </div>

      <div class="form-group">
        <label for="description" class="col-md-offset-2 col-md-2">Description</label>
        <div class="col-md-4">
          <input type="text" class="form-control" id="description" v-model="product.description" >
        </div>
        <div class="col-md-4 error-msg">
          <span>*&nbsp;</span>
          <span>{{ getValidationError('description') }}</span>
        </div>
      </div>

      <div class="form-group">
        <label for="unitPrice" class="col-md-offset-2 col-md-2">Unit Price</label>
        <div class="col-md-2">
          <input type="text" class="form-control" id="unitPrice" v-model="product.unitPrice" >
        </div>
        <div class="col-md-4 error-msg">
          <span>*&nbsp;</span>
          <span>{{ getValidationError('unitPrice') }}</span>
        </div>
      </div>

      <div class="form-group">
        <label for="productType" class="col-md-offset-2 col-md-2">Product Type</label>
        <div class="col-md-2">
          <select v-model="product.productType.id">
            <option v-for="type in productTypes" :key="type.id" :value="type.id">{{ type.name }}</option>
          </select>
        </div>
        <div class="col-md-4 error-msg">
          <span>*&nbsp;</span>
          <span>{{ getValidationError('productType') }}</span>
        </div>
      </div>

      <div class="form-group">
        <div class="form-group">
          <div class="col-md-offset-4 col-md-2">
            <button type="button" class="btn btn-default" @click="saveOrUpdate">{{ submitBtnLabel }}</button>
            <router-link class="btn btn-default" :to="{ name: 'productIndex' }">Cancel</router-link>
          </div>
        </div>  
      </div>

    </form>
  </div>
</template>

<script>
  import {
    productRestUrl,
    axios,
    processValidationErrors,
    getValidationError
  } from '@/globalvars.js'
  import processRequestErrors from '@/mixins/process-request-errors.js'

  export default {
    props: {
      productId: {
        type: Number,
        required: false
      }
    },
    mixins: [processRequestErrors],
    data() {
      return {
        product: {
          name: '',
          description: '',
          unitPrice: 0,
          productType: {
            id: 0
          }
        },
        validationErrors: []
      }
    },
    computed: {
      token() {
        return this.$store.state.token;
      },
      productTypes() {
        let types = this.$store.state.productTypes;

        return types;
      },
      pageHeading() {
        let heading = "New Product";
        if (this.productId) {
          heading = "Edit Product";
        }
        return heading;
      },
      submitBtnLabel() {
        let label = 'Save';
        if (this.productId) {
          label = 'Update';
        }

        return label;
      }
    },
    methods: {
      getProduct() {
        axios.get(productRestUrl + this.productId, {
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
        .then( response => this.product = response.data )
        .catch( error => this.processAjaxAuthError(error, this.$router) );
      },
      saveOrUpdate() {
        axios({
          method: this.productId ? 'put' : 'post',
          url: productRestUrl,
          data: JSON.stringify(this.product),
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
        .then(() => {
          // Redirect back to product list
          this.$router.push({ name: 'productIndex' });
        })
        .catch( error => {
          this.validationErrors = processValidationErrors(error);
          if (this.validationErrors.length === 0) {
            this.processAjaxAuthError(error, this.$router);
          }
        });
      },
      getValidationError
    },
    created() {
      if (this.productId) {
        this.getProduct();
      }
    }
  }
</script>

<style scoped>
  label {
    text-align: right;
  }
</style>