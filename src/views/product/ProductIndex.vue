<template>
  <div class="product-index">
    <div>
      <span class="component-heading">Product List</span>
    </div>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>NAME</th>
          <th>DESCRIPTION</th>
          <th>UNIT PRICE</th>
          <th>TYPE</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.unitPrice }}</td>
          <td>{{ product.productType.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { productRestUrl, axios, processAjaxAuthError } from '@/globalvars.js'
  export default {
    data() {
      return {
        products: []
      }
    },
    computed: {
      token() {
        return this.$store.state.token;
      }
    },
    methods: {
      getProducts() {
        axios.get(productRestUrl, {
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
        .then( response => this.products = response.data )
        .catch( error => processAjaxAuthError(error, this.$router) );

        console.log(this.products);
      }
    },
    created() {
      this.getProducts();
    }
  }
</script>

<style scoped>

</style>