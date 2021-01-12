<template>
  <div class="modal-dialog-container">
    <div class="modal-dialog-content">
      <div class="modal-dialog-header">
        <div>
          <span class="modal-title">Vue.js Client Application to my REST Web Service project 
            <a href="https://github.com/UniquelySimilar/springrestservice" target="_blank">springrestservice</a>
          </span>
        </div>
      </div>

      <div class="modal-dialog-body">
        <ul class="list-group">
          <li class="list-group-item">Created with Vue CLI v4</li>
          <li class="list-group-item">Single file components</li>
          <li class="list-group-item">Vue Router</li>
          <li class="list-group-item">API token (Bearer) authentication</li>
          <li class="list-group-item">Vuex store for API token retrieved from REST API Login</li>
          <li class="list-group-item">Full CRUD functionality for related Customer, Order, LineItem, and Product models</li>
          <li class="list-group-item">My implementation for sorting and searching data in an html table</li>
          <li class="list-group-item">My implementation of a custom Datepicker component wrapping a jQuery UI Datepicker widget</li>
          <li class="list-group-item">Bootstrap 3</li>
        </ul>
      </div>

      <div class="modal-dialog-footer">
        <div class="btn-wrapper">
          <button type="button" class="btn btn-secondary btn-sm" @click="hideModal">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
      hideModal() {
        this.$emit('close-about-modal-event');
      }
    }
  }
</script>

<style scoped>
  .modal-dialog-container {
    position: fixed;
    /* Stay in place */
    z-index: 1;
    /* Sit on top */
    left: 0;
    top: 0;
    width: 100%;
    /* Full width */
    height: 100%;
    /* Full height */
    overflow: auto;
    /* Enable scroll if needed */
    background-color: rgb(0, 0, 0);
    /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4);
    /* Black w/ opacity */
  }

  .modal-dialog-header {
    margin: 10px 0;
  }

  .modal-title {
    font-size: 1.2em;
    font-weight: bold;
  }

  .modal-dialog-header div {
    display: inline;
  }

  .modal-dialog-content {
    background-color: #fefefe;
    margin: 5% auto;
    padding: 20px;
    border: 1px solid #888;
    border-radius: 0.3rem;
    width: 56%;
  }
</style>