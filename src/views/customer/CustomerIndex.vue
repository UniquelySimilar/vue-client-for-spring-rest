<template>
  <div id="customer-index">
    <div>
      <span class="component-heading">Customer List</span>
      <router-link class="btn btn-default" :to="{ name: 'customerCreate' }">Create Customer</router-link>
      <button type="button" class="btn btn-default btn-margin-left" v-on:click="getCustomers()">Refresh</button>
      <div style="float: right;">
        <span>Search by last name: </span><input type="text" v-model="searchTerm" v-on:keyup="searchLastName()">
        <button type="button" class="btn btn-default btn-sm" style="margin-left: 1em;" v-on:click="clearSearch()">Clear</button>
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
            <a href="#" v-on:click="deleteCustomer(customer.id, customer.firstName + ' ' + customer.lastName)">Delete</a>
          </td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li>
          <a href="#" v-on:click="goToFirstPage()">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li><a href="#" aria-label="Previous" v-on:click="decrementPage()">prev</a></li>
        <li><a href="#" aria-label="Next" v-on:click="incrementPage()">next</a></li>
        <li>
          <a href="#" v-on:click="goToLastPage()">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    <div id="current-page">
      <label style="margin: 0 0.4em; font-weight: normal;">Page</label>
      <select v-model="currentPage">
        <option v-for="page in pageList" v-bind:key="page">{{page}}</option>
      </select>
      <span> of {{pageCount}}</span>
    </div>
  </div>
</template>

<script>
  import baseUrl from '../../globalvars.js'

  export default {
    name: 'CustomerIndex',
    data() {
      return {
        customers: [],
        unfilteredCustomers: [],
        currentPage: 1,
        pageSize: 10,
        ascSort: true,
        searchTerm: ""
      }
    },
    computed: {
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
        this.searchTerm = '';
        window.axios.get(baseUrl)
          .then(response => {
            this.customers = response.data;
            // Initialize sort to lastName ascending
            this.customers.sort(this.compareLastNamesAsc);
            this.unfilteredCustomers = this.customers.slice();
            this.currentPage = 1;
            this.ascSort = true;
          })
          .catch(error => console.log(error))
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
      searchLastName() {
        if (this.searchTerm.length < 1) {
          // Reset in case hitting backspace
          this.customers = this.unfilteredCustomers.slice();
          this.currentPage = 1;
          return;
        }

        // Filter customers by last name
        this.customers = this.unfilteredCustomers.filter(customer => {
          return customer.lastName.toLowerCase().substring(0, this.searchTerm.length) === this.searchTerm.toLowerCase();
        });
        this.currentPage = 1;
      },
      clearSearch() {
        this.searchTerm = '';
        this.getCustomers();
      },
      deleteCustomer(id, customerName) {
        if (!confirm("Delete customer " + customerName + "?"))
          return;

        window.axios.delete(baseUrl + id)
        .then( () => {
          // Remove the related customer object from the customers array
          this.customers = this.unfilteredCustomers.filter(customer => {
            return customer.id !== id;
          });

          // Update unfiltered customer array to reflect deletion
          this.unfilteredCustomers = this.customers.slice();
        })
        .catch(error => console.log(error))
      }
    },
    // Lifecycle hooks
    created() {
      this.getCustomers();
    }
  }
</script>

<style scoped>
  nav {
    display: inline-block;
  }

  #current-page {
    display: inline-block;
    margin: 21px 0 19px 10px;
    vertical-align: top;
  }
</style>