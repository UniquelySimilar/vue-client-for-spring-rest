<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <header>
        <span>Customer Manager Client Application for Spring REST Service</span>
        <button class="btn btn-default pull-right btn-sm" v-on:click="logout()">Log Out</button>
      </header>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    methods: {
      logout() {
        this.$store.commit('updateToken', { token: '' });
        this.$router.push("/login");
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  header {
    background-color: lightgrey;
    font-size: 1.5em;
    font-weight: bold;
    padding-left: 15px;
    margin-bottom: 15px;
  }

  .component-heading {
    font-size: 1.3em;
    font-weight: bold;
    vertical-align: middle;
    margin-right: 2em;
  }

  .table-title {
    margin-bottom: 1em;
  }

  .table-subtitle {
    font-size: 0.75em;
    font-weight: bold;
    margin-top: 0.5em;
  }

  .btn-margin-left {
    margin-left: 1em;
  }

  .error-msg {
    color: red;
  }

  .align-right {
    text-align: right;
  }

</style>
