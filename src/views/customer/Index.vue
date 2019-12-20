<template>
    <div id="customer-index">
        <div>
          <span class="component-heading">Customer List</span>
          <!--
          <router-link class="btn btn-default" :to="{ name: 'customerCreate' }">Create Customer</router-link>                
          -->
        </div>
        <table id="customer-table" class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Name<span v-html="sortArrow" v-on:click="toggleSort()" style="float: right; cursor: pointer;"></span></th>
              <th>City</th>
              <th>State</th>
              <th>Zipcode</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in currentPageCustomers" v-bind:key="customer.id">
              <td>{{customer.name}}</td>
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
            <!--
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
            -->
            <li>
              <a href="#" v-on:click="lastPage()">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
</template>

<script>
import baseUrl from '../../globalvars.js'

export default {
  name: 'index',
  data() {
    return {
      customers: [],
      currentPage: 1,
      pageSize: 10,
      ascSort: true,
      sortArrow: "&#9652;" // up arrow - ascending sort
    }
  },
  computed: {
    pageCount: function() {
      return Math.ceil(this.customers.length / this.pageSize);
    },
    currentPageCustomers: function() {
      let startIndex = (this.currentPage - 1) * this.pageSize;
      let endIndex = this.currentPage * this.pageSize;
      return this.customers.slice(startIndex, endIndex);
    }
  },
  methods: {
    incrementPage: function() {
      if (this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },
    decrementPage: function() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    firstPage: function() {
      this.currentPage = 1;
    },
    lastPage: function() {
      this.currentPage = this.pageCount;
    },
    toggleSort: function() {
      this.ascSort = !this.ascSort;
      if (this.ascSort) {
        this.sortArrow = "&#9652;"; // up arrow
        this.customers.sort(this.compareCustomerNamesAsc);
      }
      else {
        this.sortArrow = "&#9662;"; // down arrow
        this.customers.sort(this.compareCustomerNamesDesc);
      }
    },
    compareCustomerNamesAsc: function(a, b) {
      if ( a.name < b.name ){
        return -1;
      }
      if ( a.name > b.name ){
        return 1;
      }
      return 0;
    },
    compareCustomerNamesDesc: function(a, b) {
      if ( a.name > b.name ){
        return -1;
      }
      if ( a.name < b.name ){
        return 1;
      }
      return 0;
    }
  },
  created() {
    // Fetch the data
    window.axios.get(baseUrl)
    .then(response => this.customers = response.data)
    //.then(response => {this.customers = response.data; console.log(this.customers)})
    .catch(error => console.log(error))
  }
}
</script>
