<template>
  <div class="lineitem-index">
    <div class="table-title">
      <span class="component-heading">Line Items</span>
      <router-link class="btn btn-default" v-if="orderId" :to="{ name: 'lineItemCreate', params: { orderId: orderId } }">Create Line Item</router-link>
    </div>

    <div class="row" v-if="lineItems.length">
      <div class="col-md-8">
        <table id="line-item-table" class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Product</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="lineItem in lineItems" v-bind:key="lineItem.id">
              <td>{{ lineItem.product.name }}</td>
              <td>{{ lineItem.unitPrice }}</td>
              <td>{{ lineItem.quantity }}</td>
              <td>
                <router-link :to="{ name: 'lineItemEdit', params: { orderId: lineItem.orderId, lineItemId: lineItem.id } }">Edit</router-link>
              </td>
              <td>
                <a href="" v-on:click.prevent="displayDeleteModal(lineItem.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <delete-modal
      v-if="deleteModal"
      confirmationMessage="Delete line item?"
      @close-delete-modal-event="closeDeleteModal"
      @delete-record-event="deleteLineItem"
      />
  </div>
</template>

<script>
  import { lineItemRestUrl, axios, processAjaxAuthError } from '../../globalvars.js'
  import DeleteModal from '../../components/DeleteModal.vue';

  export default {
    name: 'LineItemIndex',
    components: {
      DeleteModal
    },
    data() {
      return {
        lineItems: this.initialLineItems,
        deleteId: 0,
        deleteModal: false
      }
    },
    props: {
      orderId: {
        type: Number,
        required: true
      },
      initialLineItems: {
        type: Array,
        required: true
      }
    },
    computed: {
      token() {
        return this.$store.state.token;
      }
    },
    methods: {
      displayDeleteModal(id) {
        this.deleteId = id;
        this.deleteModal = true;
      },
      closeDeleteModal() {
        this.deleteModal = false;
      },
      deleteLineItem() {
        this.closeDeleteModal();
        let id = this.deleteId;
        axios.delete(lineItemRestUrl + id, {
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
        .then( () => {
          // Remove deleted lineItem from array
          this.lineItems = this.lineItems.filter( lineItem => {
            return lineItem.id !== id;
          })
        })
        .catch( error => {
          processAjaxAuthError(error, this.$router);
        })
      }
    }
  }
</script>

<style scoped>

</style>