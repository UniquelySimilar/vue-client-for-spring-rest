<template>
  <div id="customer-index">
    <div id="table-title">
      <span class="component-heading">Customer List</span>
      <router-link class="btn btn-default" :to="{ name: 'customerCreate' }">Create Customer</router-link>
      <button type="button" class="btn btn-default" style="margin-left: 1em;" v-on:click="fetchData()">Refresh List</button>
      <div style="float: right;">
        <span>Search by last name: </span><input type="text" v-model="searchTerm" v-on:keyup="searchLastName()">
        <button type="button" class="btn btn-default btn-sm" style="margin-left: 1em;" v-on:click="clearSearch()">Clear</button>
      </div>
    </div>
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
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in currentPageCustomers" v-bind:key="customer.id">
          <td>{{customer.lastName}}</td>
          <td>{{customer.firstName}}</td>
          <td>{{customer.city}}</td>
          <td>{{customer.state}}</td>
          <td>{{customer.zipcode}}</td>
          <td>{{customer.email}}</td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li>
          <a href="#" v-on:click="firstPage()">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li><a href="#" aria-label="Previous" v-on:click="decrementPage()">prev</a></li>
        <li><a href="#" aria-label="Next" v-on:click="incrementPage()">next</a></li>
        <li>
          <a href="#" v-on:click="lastPage()">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    <div id="current-page">
      <label>Current page:</label>
      <select v-model="currentPage">
        <option v-for="page in pageList" v-bind:key="page">{{page}}</option>
      </select>
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
        // up arrow - ascending sort
        sortArrow: "&#9652;",
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
    },
    methods: {
      fetchData() {
        window.axios.get(baseUrl)
          .then(response => {
            this.customers = response.data;
            // Initialize sort to lastName ascending
            this.sortArrow = "&#9652;"; // up arrow
            this.customers.sort(this.compareLastNamesAsc);
            this.unfilteredCustomers = this.customers.slice();
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
      firstPage() {
        this.currentPage = 1;
      },
      lastPage() {
        this.currentPage = this.pageCount;
      },
      toggleSort() {
        this.ascSort = !this.ascSort;
        if (this.ascSort) {
          this.sortArrow = "&#9652;"; // up arrow
          this.customers.sort(this.compareLastNamesAsc);
          this.unfilteredCustomers = this.customers.slice();
        }
        else {
          this.sortArrow = "&#9662;"; // down arrow
          this.customers.sort(this.compareLastNamesDesc);
          this.unfilteredCustomers = this.customers.slice();
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
          return;
        }

        // Filter customers by last name
        this.customers = this.unfilteredCustomers.filter(customer => {
          return customer.lastName.toLowerCase().substring(0, this.searchTerm.length) === this.searchTerm.toLowerCase();
        });
        // this.customers = this.customers.filter(customer => {
        //   return customer.lastName.toLowerCase().substring(0, this.searchTerm.length) === this.searchTerm.toLowerCase();
        // });
      },
      clearSearch() {
        this.searchTerm = '';
        this.fetchData();
      }
    },
    created() {
      this.fetchData();
    }
  }
</script>

<style scoped>
  nav {
    display: inline-block;
  }

  #table-title {
    margin-bottom: 1em;
  }

  #current-page {
    display: inline-block;
    margin: 21px 0 19px 10px;
    vertical-align: top;
  }
</style>