<template>
  <div class="product-index">
    <div>
      <span class="component-heading">Product List</span>
      <router-link class="btn btn-default" :to="{ name: 'productCreate' }">Create Product</router-link>
      <div class="pull-right">
        <filter-input
          :criteriaOptions="filterInputCriteriaOptions"
          :initialCriteria="filterInputCriteria"
          @update-criteria="updatefilterInputCriteria"
          @update-filter-term="updateFilterInputTerm" />
        <product-type-filter :productTypesFilter="productTypesFilter" @product-type-filter-change="filterProductsByType" />
      </div>
    </div>

    <span v-if="errorMessages.length > 0" class="error-msg">{{ getErrorMessage('warning', errorMessages) }}</span>
    <!-- Empty line when no error message. See CSS below. -->
    <span v-else class="error-msg"></span>

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
          <td>
            <router-link :to="{ name: 'productEdit', params: { productId: product.id } }">Edit</router-link>
          </td>
          <td>
            <a href="#" @click.prevent="showDeleteModal(product.id)">Delete</a>
          </td>
        </tr>
      </tbody>
    </table>

    <pagination-control
      @goToFirstPageEvt="goToFirstPage"
      @incrementPageEvt="incrementPage"
      @decrementPageEvt="decrementPage"
      @goToLastPageEvt="goToLastPage"
      />

    <delete-modal
      v-if="displayDeleteModal"
      confirmationMessage="Delete this product?"
      @close-delete-modal-event="hideDeleteModal"
      @delete-record-event="deleteProduct" />
  </div>
</template>

<script>
  import PaginationControl from '@/components/PaginationControl'
  import ProductTypeFilter from '@/components/ProductTypeFilter'
  import DeleteModal from '@/components/DeleteModal'
  import FilterInput from '@/components/FilterInput'

  import {
    productRestUrl,
    axios,
    processValidationErrors,
    getErrorMessage,
    processAjaxAuthError
  } from '@/globalvars.js'

  export default {
    components: {
      PaginationControl,
      ProductTypeFilter,
      DeleteModal,
      FilterInput
    },
    data() {
      return {
        products: [],
        productTypesFilter: [],
        filteredProducts: [],
        filterInputTerm: '',
        filterInputCriteria: 'name',
        filterInputCriteriaOptions: ['name', 'description'],
        pageSize: 10,
        currentPage: 1,
        deleteId: 0,
        displayDeleteModal: false,
        errorMessages: []
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
        axios.get(productRestUrl, {
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
        .then( response => {
          this.products = response.data;
          this.filteredProducts = this.products;
        })
        .catch( error => processAjaxAuthError(error, this.$router) );
      },
      getProductTypesFilterFromStore() {
        this.productTypesFilter = this.$store.state.productTypesFilter;
      },
      // TODO: Combine 'filterProductsByType' and 'filterProductsByInputTerm'
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
      filterProductsByInputTerm() {
        if (this.filterInputTerm.length < 1) {
          // Reset in case hitting backspace
          this.filteredProducts = [...this.products];
          this.currentPage = 1;
          return;
        }

        this.filteredProducts = this.filterProductArray();

        this.currentPage = 1;
      },
      filterProductArray() {
        let propertyName = this.filterInputCriteria;
        return this.products.filter( product => {
          return product[propertyName].toLowerCase().indexOf(this.filterInputTerm.toLowerCase()) !== -1;
        })
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
      },
      showDeleteModal(id) {
        this.deleteId = id;
        this.displayDeleteModal = true;
      },
      hideDeleteModal() {
        this.displayDeleteModal = false
      },
      deleteProduct() {
        this.hideDeleteModal();
        let id = this.deleteId;
        axios.delete(productRestUrl + id, {
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
        .then( () => {
          // Remove deleted product from array
          this.products = this.products.filter( product => {
            return product.id !== id;
          });
          // Remove deleted product from filtered products in case deletion done while products filtered
          this.filteredProducts = this.filteredProducts.filter( product => {
            return product.id !== id;
          });

          this.currentPage = 1;
          this.errorMessages = [];
        })
        .catch( error => {
          this.errorMessages = processValidationErrors(error);
          if (this.errorMessages.length == 0) {
            processAjaxAuthError(error, this.$router);
          }
        });
      },
      getErrorMessage,
      updatefilterInputCriteria(criteria) {
        this.filterInputCriteria = criteria;
      },
      updateFilterInputTerm(term) {
        this.filterInputTerm = term;
        this.filterProductsByInputTerm();
      }
    },
    created() {
      this.getProducts();
      this.getProductTypesFilterFromStore();
    }
  }
</script>

<style scoped>
  .product-type-filter-container {
    float: right;
  }

  span.error-msg {
    display: block;
  }

  span.error-msg:empty:before {
    content: "\200b"; /* unicode zero width space character */
  }

  .filter-input, .product-type-filter {
    display: inline-block;
  }

</style>