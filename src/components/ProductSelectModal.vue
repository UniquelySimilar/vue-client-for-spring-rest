<template>
<div class="modal-dialog-container">
  <div class="modal-dialog-content">
    <div class="modal-dialog-header">
      <div>
        <span class="modal-title">Select Product</span>
      </div>
      <div class="type-select-container">
        <product-type-filter :productTypes="productTypes" @product-type-filter-change="filterProductsByType" />
      </div>
    </div>

    <div class="modal-dialog-body">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>NAME</th>
            <th>UNIT PRICE</th>
            <th>TYPE</th>
          </tr>
        </thead>
        <tbody>
          <tr :class="{ active: product.selected }"
            v-for="product in currentPageProducts" :key="product.id"
            @click="selectRow(product.id, $event)" >
            <td>{{ product.name }}</td>
            <td>{{ product.unitPrice }}</td>
            <td>{{ product.productType.name }}</td>
          </tr>
        </tbody>
      </table>

      <pagination-control
      v-on:goToFirstPageEvt="goToFirstPage"
      v-on:decrementPageEvt="decrementPage"
      v-on:incrementPageEvt="incrementPage"
      v-on:goToLastPageEvt="goToLastPage"
      />
    </div>

    <div class="modal-dialog-footer">
      <div class="btn-wrapper">
        <button type="button" class="btn btn-primary btn-sm" @click="selectProduct">OK</button>
        <button type="button" class="btn btn-secondary btn-sm" @click="closeModal">Cancel</button>
        <span class="warning-message" v-if="warningMessage">{{ warningMessage }}</span>
      </div>
    </div>
  </div>
</div>  
</template>

<script>
  import PaginationControl from '@/components/PaginationControl';
  import ProductTypeFilter from '@/components/ProductTypeFilter';

  export default {
    components: {
      PaginationControl,
      ProductTypeFilter
    },
    data() {
      return {
        filteredProducts: this.products,
        productTypes: [],
        selectedProduct: undefined,
        currentPage: 1,
        pageSize: 8,
        warningMessage: null
      }
    },
    props: {
      products: {
        type: Array,
        required: true
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
      }
    },
    methods: {
      // Using a method instead of a computed property so I can update currentPage
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
      closeModal() {
        this.$emit('close-product-modal-event');
      },
      selectRow(id)  {
        this.products.forEach( product => {
          if (product.id === id) {
            product.selected = true;
            this.selectedProduct = product;
          }
          else {
            product.selected = false;
          }
        });
        this.warningMessage = null;
      },
      selectProduct() {
        if (!this.selectedProduct) {
          this.warningMessage = 'Must select a product or cancel';
        }
        else {
          this.$emit('select-product-event', this.selectedProduct);
        }
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
      goToFirstPage() {
        this.currentPage = 1;
      },
      goToLastPage() {
        this.currentPage = this.pageCount;
      },
      getProductTypesFromStore() {
        this.productTypes = this.$store.state.productTypes;
      }
    },
    created() {
      this.getProductTypesFromStore();
    }
  }
</script>

<style scoped>
  .modal-dialog-container {
    /* display: none; Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }

  .modal-dialog-header {
    margin: 10px 0;
  }

  .modal-title {
    font-size: 1.4em;
  }

  .modal-dialog-header div {
    display: inline;
  }

  .type-select-container {
    float: right;
  }

  .modal-dialog-content {
    background-color: #fefefe;
    margin: 5% auto;
    padding: 20px;
    border: 1px solid #888;
    border-radius: 0.3rem;
    width: 30%;
  }

  .btn {
    margin-right: 1em;
  }

  .warning-message {
    color: red;
  }
</style>