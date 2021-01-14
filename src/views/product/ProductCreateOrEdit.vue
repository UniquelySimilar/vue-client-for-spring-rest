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
      </div>

      <div class="form-group">
        <label for="description" class="col-md-offset-2 col-md-2">Description</label>
        <div class="col-md-4">
          <input type="text" class="form-control" id="description" v-model="product.description" >
        </div>
      </div>

      <div class="form-group">
        <label for="unitPrice" class="col-md-offset-2 col-md-2">Unit Price</label>
        <div class="col-md-2">
          <input type="text" class="form-control" id="unitPrice" v-model="product.unitPrice" >
        </div>
      </div>

      <div class="form-group">
        <label for="productType" class="col-md-offset-2 col-md-2">Product Type</label>
        <div class="col-md-2">
          <select v-model="product.productType.id" @change="logProductTypeId">
            <option v-for="type in productTypes" :key="type.id" :value="type.id">{{ type.name }}</option>
          </select>
        </div>
      </div>

    </form>
  </div>
</template>

<script>
  export default {
    props: {
      productId: {
        type: Number,
        required: false
      }
    },
    data() {
      return {
        product: {
          name: '',
          description: '',
          unitPrice: 0,
          productType: {
            id: 0
          }
        }
      }
    },
    computed: {
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
      }
    },
    methods: {
      logProductTypeId() {
        console.log('logProductTypeId: ' + this.product.productType.id)
      }
    }
    
  }
</script>

<style scoped>
  label {
    text-align: right;
  }
</style>