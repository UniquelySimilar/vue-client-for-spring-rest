<template>
  <div id="customer-index">
    <div>
      <span class="component-heading">Customer List</span>
      <router-link class="btn btn-default" :to="{ name: 'customerCreate' }">Create Customer</router-link>
      <button type="button" class="btn btn-default btn-margin-left" v-on:click="getCustomers()">Refresh</button>
      <div style="float: right;">
        <filter-input
          :criteriaOptions="filterCriteriaOptions"
          :initialCriteria="filterCriteria"
          :filterTermFromParent="''"
          @update-criteria="updateCriteria"
          @update-filter-term="updateFilterTerm" />
      </div>
    </div>
    <span class="table-subtitle">Click a last name to manage Orders</span>
    <table id="customer-table" class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Last Name<span v-html="sortArrow" v-on:click="toggleSort()" style="float: right; cursor: pointer;"></span>
          </th>
          <th>First Name</th>
          <th>City</th>
          <th>State</th>
          <th>Zipcode</th>
          <th>Email</th>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in currentPageCustomers" v-bind:key="customer.id">
          <td>
            <router-link :to="{ name: 'customerDetailOrders', params: {customerId: customer.id} }">{{customer.lastName}}</router-link>
          </td>
          <td>{{customer.firstName}}</td>
          <td>{{customer.city}}</td>
          <td>{{customer.state}}</td>
          <td>{{customer.zipcode}}</td>
          <td>{{customer.email}}</td>
          <td>
            <router-link :to="{ name: 'customerEdit', params: {customerId: customer.id} }">Edit</router-link>
          </td>
          <td>
            <a href="#" v-on:click="displayDeleteModal(customer.id,
              'Delete customer ' + customer.firstName + ' ' + customer.lastName + '?')">Delete</a>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination-control
      v-on:goToFirstPageEvt="goToFirstPage"
      v-on:decrementPageEvt="decrementPage"
      v-on:incrementPageEvt="incrementPage"
      v-on:goToLastPageEvt="goToLastPage"
      />
    <page-select
      v-bind:page-list="pageList"
      v-bind:page-count="pageCount"
      v-bind:current-page="currentPage"
      v-on:pageSelectChangeEvt="pageSelectChange" />

    <delete-modal
      v-if="deleteModal"
      :confirmationMessage="confirmationMessage"
      @close-delete-modal-event="closeDeleteModal"
      @delete-record-event="deleteCustomer" />

  </div>
</template>

<script>
  import { customerRestUrl, axios } from '../../globalvars.js'
  import processRequestErrors from '@/mixins/process-request-errors.js'
  import FilterInput from '../../components/FilterInput.vue'
  import PaginationControl from '../../components/PaginationControl.vue'
  import PageSelect from '../../components/PageSelect.vue'
  import DeleteModal from '../../components/DeleteModal.vue'

  export default {
    name: 'CustomerIndex',
    data() {
      return {
        customers: [],
        unfilteredCustomers: [],
        currentPage: 1,
        pageSize: 10,
        ascSort: true,
        filterTerm: '',
        filterCriteria: 'last name',
        filterCriteriaOptions: ['last name', 'state'],
        deleteModal: false,
        deleteId: 0,
        confirmationMessage: ''
      }
    },
    components: {
      FilterInput,
      PaginationControl,
      PageSelect,
      DeleteModal
    },
    mixins: [processRequestErrors],
    computed: {
      token() {
        return this.$store.state.token;
      },
      pageCount() {
        return Math.ceil(this.customers.length / this.pageSize);
      },
      currentPageCustomers() {
        let startIndex = (this.currentPage - 1) * this.pageSize;
        let endIndex = this.currentPage * this.pageSize;
        return this.customers.slice(startIndex, endIndex);
      },
      pageList() {
        let tempAry = [];
        for (let i = 0; i < this.pageCount; i++) {
          tempAry.push(i + 1);
        }
        return tempAry;
      },
      sortArrow() {
        if (this.ascSort) {
          return "&#9652;"; // up arrow
        }
        else {
          return "&#9662;"; // down arrow
        }
      }
    },
    methods: {
      getCustomers() {
        this.filterTerm = '';
        axios.get(customerRestUrl, {
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
          .then(response => {
            this.customers = response.data;
            // Initialize sort to lastName ascending
            this.customers.sort(this.compareLastNamesAsc);
            this.unfilteredCustomers = this.customers.slice();
            this.currentPage = 1;
            this.ascSort = true;
          })
          .catch(error => {
            this.processAjaxAuthError(error, this.$router);
          })
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
      toggleSort() {
        this.ascSort = !this.ascSort;
        if (this.ascSort) {
          this.customers.sort(this.compareLastNamesAsc);
        }
        else {
          this.customers.sort(this.compareLastNamesDesc);
        }
      },
      compareLastNamesAsc(a, b) {
        if (a.lastName < b.lastName) {
          return -1;
        }
        if (a.lastName > b.lastName) {
          return 1;
        }
        return 0;
      },
      compareLastNamesDesc(a, b) {
        if (a.lastName > b.lastName) {
          return -1;
        }
        if (a.lastName < b.lastName) {
          return 1;
        }
        return 0;
      },
      filterCustomers() {
        if (this.filterTerm.length < 1) {
          // Reset in case hitting backspace
          this.customers = this.unfilteredCustomers.slice();
          this.currentPage = 1;
          return;
        }

        if (this.filterCriteria == 'state') {
          this.customers = this.filterCustomerArray('state');
        }
        else if (this.filterCriteria == 'last name') {
          this.customers = this.filterCustomerArray('lastName');
        }

        this.currentPage = 1;
      },
      filterCustomerArray(propName) {
        return this.unfilteredCustomers.filter(customer => {
          return customer[propName].toLowerCase().substring(0, this.filterTerm.length) === this.filterTerm.toLowerCase();
        });
      },
      updateCriteria(newCriteria) {
        this.filterCriteria = newCriteria;
      },
      updateFilterTerm(newFilterTerm) {
        this.filterTerm = newFilterTerm;
        this.filterCustomers();
      },
      displayDeleteModal(id, message) {
        this.deleteId = id;
        this.confirmationMessage = message;
        this.deleteModal = true;
      },
      closeDeleteModal() {
        this.deleteModal = false;
      },
      deleteCustomer() {
        this.closeDeleteModal();
        let id = this.deleteId;

        axios.delete(customerRestUrl + id, {
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
        .then( () => {
          // Remove the related customer object from the customers array
          this.customers = this.unfilteredCustomers.filter(customer => {
            return customer.id !== id;
          });

          // Update unfiltered customer array to reflect deletion
          this.unfilteredCustomers = this.customers.slice();
        })
        .catch(error => {
          this.processAjaxAuthError(error, this.$router);
        })
      },
      pageSelectChange(newPage) {
        this.currentPage = parseInt(newPage, 10);
      }
    },
    // Lifecycle hooks
    created() {
      this.getCustomers();
    }
  }
</script>

<style scoped>

</style>