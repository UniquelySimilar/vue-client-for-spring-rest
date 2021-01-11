<template>
  <div class="product-index">
    <div>
      <span class="component-heading">Product List</span>
    </div>
    <div class="product-type-filter-container">
      <product-type-filter :productTypes="productTypes" @product-type-filter-change="filterProductsByType" />
    </div>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>NAME</th>
          <th>DESCRIPTION</th>
          <th>UNIT PRICE</th>
          <th>TYPE</th>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in currentPageProducts" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.unitPrice }}</td>
          <td>{{ product.productType.name }}</td>
          <td>EDIT</td>
          <td>DELETE</td>
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
  import ProductTypeFilter from '@/components/ProductTypeFilter'

  import { productRestUrl, productTypeRestUrl, axios, processAjaxAuthError } from '@/globalvars.js'
  export default {
    components: {
      PaginationControl,
      ProductTypeFilter
    },
    data() {
      return {
        products: [],
        productTypes: [],
        filteredProducts: [],
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
    },
    methods: {
      getProducts() {
        return axios.get(productRestUrl, {
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        });
      },
      getProductTypes() {
        return axios.get(productTypeRestUrl, {
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        });
      },
      getData() {
        Promise.all([this.getProducts(), this.getProductTypes()])
        .then( results => {
          this.products = results[0].data;
          this.filteredProducts = this.products;

          this.productTypes = results[1].data;
          // Add product type representing 'all' for filtering purposes
          this.productTypes.unshift({id: 0, name: 'all'});
        })
        .catch( error => processAjaxAuthError(error, this.$router) );
      },
      filterProductsByType(filterValue) {
        if (filterValue === 0) {
          this.filteredProducts = this.products;
        }
        else {
          this.filteredProducts = this.products.filter( product => {
            return product.productType.id === filterValue;
          });
        }

        this.currentPage = 1;
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
      this.getData();
    }
  }
</script>

<style scoped>
  .product-type-filter-container {
    float: right;
  }

</style>