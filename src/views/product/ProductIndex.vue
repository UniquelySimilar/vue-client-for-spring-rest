<template>
  <div class="product-index">
    <h3>Product Index Placeholder</h3>

    <table class="table">
      <thead>
        <tr>
          <td>NAME</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
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
      }
    },
    created() {
      this.getProducts();
    }
  }
</script>

<style scoped>

</style>