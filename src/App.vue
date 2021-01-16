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
          <span class="brand">Order Manager</span>
        </div>
    
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li :class="{ active: activeLink === 'customer' }" v-if="!loginDisplayed">
              <a href="#" @click.prevent="setActiveLinkThenNavigate('customer')">Customers</a>
            </li>
            <li :class="{ active: activeLink === 'product' }" v-if="!loginDisplayed">
              <a href="#" @click.prevent="setActiveLinkThenNavigate('product')">Products</a>
            </li>
            <li>
              <!-- TODO: Open modal -->
              <a href="#" @click.prevent="showAboutModal">About</a>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li v-if="!loginDisplayed">
              <a href="#" @click.prevent="logout">Logout</a>
            </li>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>

    <div class="container-fluid">
      <router-view/>
    </div>

    <about-modal v-if="displayAboutModal" @close-about-modal-event="hideAboutModal" />
  </div>
</template>

<script>
  import { logoutUrl, axios } from '@/globalvars.js'
  import AboutModal from '@/components/AboutModal'

  export default {
    name: 'App',
    components: {
      AboutModal
    },
    data() {
      return {
        activeLink: 'customer',
        displayAboutModal: false
      }
    },
    computed: {
      token() {
        return this.$store.state.token;
      },
      loginDisplayed() {
        return this.$store.state.loginDisplayed;
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
      showAboutModal() {
        this.displayAboutModal = true;
      },
      hideAboutModal() {
        this.displayAboutModal = false;
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
          this.activeLink = 'customer';
          this.$store.commit('updateToken', { token: '' });
          this.$store.commit('setLoginDisplayed', true);
          this.$router.push("/login");
        }) 
      }
    }
  }
</script>

<style>
  .brand {
    float: left;
    height: 50px;
    padding: 15px 15px;
    font-size: 18px;
    line-height: 20px;
    color: #777;
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
