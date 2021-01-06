<template>
  <div id="app">

    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">&nbsp;</a>
        </div>
    
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li :class="{ active: activeLink === 'customer' }">
              <a href="#" @click.prevent="setActiveLinkThenNavigate('customer')">Customers</a>
            </li>
            <li :class="{ active: activeLink === 'product' }">
              <a href="#" @click.prevent="setActiveLinkThenNavigate('product')">Products</a>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#" @click.prevent="logout">Logout</a></li>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>

    <div class="container-fluid">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import { logoutUrl, axios } from './globalvars.js'

  export default {
    name: 'App',
    data() {
      return {
        activeLink: 'customer'
      }
    },
    computed: {
      token() {
        return this.$store.state.token;
      }
    },
    methods: {
      setActiveLinkThenNavigate(link) {
        // Avoid redundant navigation
        if (this.activeLink === link) {
          return;
        }
        
        this.activeLink = link;
        // Set customer as default since only two link options
        let routePushArg = { name: 'customerIndex' };
        if (link === 'product') {
          routePushArg.name = 'productIndex';
        }
        this.$router.push(routePushArg);
      },
      logout() {
        axios.put(logoutUrl, {}, {
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
        .then()
        .catch( error => console.error(error))
        .finally( () => {
          this.$store.commit('updateToken', { token: '' });
          this.$router.push("/login");
        }) 
      }
    }
  }
</script>

<style>
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
