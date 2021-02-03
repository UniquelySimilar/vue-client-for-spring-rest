<template>
  <div id="app">
    <app-navbar @show-about-modal="showAboutModal" />

    <div class="container-fluid">
      <router-view/>
    </div>

    <about-modal v-if="displayAboutModal" @close-about-modal-event="hideAboutModal" />
  </div>
</template>

<script>
  import AboutModal from '@/components/AboutModal'
  import AppNavbar from '@/views/AppNavbar'

  export default {
    name: 'App',
    components: {
      AboutModal,
      AppNavbar
    },
    data() {
      return {
        displayAboutModal: false
      }
    },
    methods: {
      showAboutModal() {
        this.displayAboutModal = true;
      },
      hideAboutModal() {
        this.displayAboutModal = false;
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
