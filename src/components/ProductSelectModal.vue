<template>
<div class="modal-dialog-container">
  <div class="modal-dialog-content">
    <div class="modal-dialog-header">
      <h4>Select Product</h4>
    </div>

    <div class="modal-dialog-body">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>NAME</th>
            <th>TYPE</th>
          </tr>
        </thead>
        <tbody>
          <tr :class="{ active: product.selected }"
            v-for="product in currentPageProducts" :key="product.id"
            @click="selectRow(product.id, $event)" >
            <td>{{  product.name }}</td>
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
        <span class="select-warning" v-if="selectWarning">Must select a product or cancel</span>
      </div>
    </div>
  </div>
</div>  
</template>

<script>
  import PaginationControl from '@/components/PaginationControl';

  export default {
    components: {
      PaginationControl
    },
    data() {
      return {
        selectedProduct: undefined,
        currentPage: 1,
        pageSize: 8,
        selectWarning: false
      }
    },
    props: {
      products: {
        type: Array,
        required: true
      }
    },
    computed: {
      currentPageProducts() {
        let startIndex = (this.currentPage - 1) * this.pageSize;
        let endIndex = this.currentPage * this.pageSize;
        return this.products.slice(startIndex, endIndex);
      },
      pageCount() {
        return Math.ceil(this.products.length / this.pageSize);
      }
    },
    methods: {
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
        this.selectWarning = false;
      },
      selectProduct() {
        if (!this.selectedProduct) {
          this.selectWarning = true;
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
      }
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

  .select-warning {
    color: red;
  }
</style>