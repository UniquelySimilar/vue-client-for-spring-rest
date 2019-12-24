<template>
    <div id="customer-index">
        <div>
          <span class="component-heading">Customer List</span>
          <router-link class="btn btn-default" :to="{ name: 'customerCreate' }">Create Customer</router-link>                
        </div>
        <table id="customer-table" class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Last Name<span v-html="sortArrow" v-on:click="toggleSort()" style="float: right; cursor: pointer;"></span></th>
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
      currentPage: 1,
      pageSize: 10,
      pageList: [],
      ascSort: true,
      sortArrow: "&#9652;" // up arrow - ascending sort
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
    }
  },
  methods: {
    fetchData() {
      window.axios.get(baseUrl)
      .then(response => {
        this.customers = response.data;
        // Initialize sort to lastName ascending
        this.sortArrow = "&#9652;"; // up arrow
        this.customers.sort(this.compareLastNamesAsc);
        this.initPageList();
      })
      //.then(response => {this.customers = response.data; console.log(this.customers)})
      .catch(error => console.log(error))
    },
    initPageList() {
      for(let i = 0; i < this.pageCount; i++) {
        this.pageList.push(i + 1);
      }
      //console.log(this.pageList);
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
      }
      else {
        this.sortArrow = "&#9662;"; // down arrow
        this.customers.sort(this.compareLastNamesDesc);
      }
    },
    compareLastNamesAsc(a, b) {
      if ( a.lastName < b.lastName ){
        return -1;
      }
      if ( a.lastName > b.lastName ){
        return 1;
      }
      return 0;
    },
    compareLastNamesDesc(a, b) {
      if ( a.lastName > b.lastName ){
        return -1;
      }
      if ( a.lastName < b.lastName ){
        return 1;
      }
      return 0;
    }
  },
  created() {
    this.fetchData();
  }
}
</script>

<style scoped>
  nav {
    display:inline-block;
  }

  #current-page {
    display: inline-block;
    margin: 21px 0 19px 10px;
    vertical-align: top;
  }
</style>