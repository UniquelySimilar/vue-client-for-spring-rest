<template>
  <div class="product-index">
    <div>
      <span class="component-heading">Product List</span>
    </div>
    <div class="product-type-filter-container">
      <!-- product-type-filter /-->
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
        <tr v-for="product in currentPageProducts" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.unitPrice }}</td>
          <td>{{ product.productType.name }}</td>
        </tr>
      </tbody>
    </table>

    <pagination-control
      @goToFirstPageEvt="goToFirstPage"
      @incrementPageEvt="incrementPage"
      @decrementPageEvt="decrementPage"
      @goToLastPageEvt="goToLastPage"
      />
  </div>
</template>

<script>
  import PaginationControl from '@/components/PaginationControl'
  //import ProductTypeFilter from '@/components/ProductTypeFilter'

  import { productRestUrl, axios, processAjaxAuthError } from '@/globalvars.js'
  export default {
    components: {
      PaginationControl
      //ProductTypeFilter
    },
    data() {
      return {
        products: [],
        //filteredProducts: [],
        pageSize: 10,
        currentPage: 1
      }
    },
    computed: {
      token() {
        return this.$store.state.token;
      },
      currentPageProducts() {
        let startIndex = (this.currentPage - 1) * this.pageSize;
        let endIndex = this.currentPage * this.pageSize;
        return this.filteredProducts.slice(startIndex, endIndex);
      },
      pageCount() {
        return Math.ceil(this.filteredProducts.length / this.pageSize);
      },
      // TEMPORARY: Until ProductTypeFilter added
      filteredProducts() {
        return this.products;
      }
    },
    methods: {
      // TODO: Create 'getProductTypes()'
      // See https://github.com/axios/axios - Performing multiple concurrent requests 
      getProducts() {
        axios.get(productRestUrl, {
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
        .then( response => this.products = response.data )
        .catch( error => processAjaxAuthError(error, this.$router) );
      },
      goToFirstPage() {
        this.currentPage = 1;
      },
      incrementPage() {
        if (this.currentPage < this.pageCount) {
          this.currentPage++;
        }
      },
      decrementPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      goToLastPage() {
        this.currentPage = this.pageCount;
      }
    },
    created() {
      this.getProducts();
    }
  }
</script>

<style scoped>
  .product-type-filter-container {
    float: right;
  }

</style>