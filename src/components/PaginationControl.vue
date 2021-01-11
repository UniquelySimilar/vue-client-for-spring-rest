<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li>
        <a href="#" v-on:click.prevent="goToFirstPage">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li><a href="#" aria-label="Previous" v-on:click.prevent="decrementPage">prev</a></li>
      <li><a href="#" aria-label="Next" v-on:click.prevent="incrementPage">next</a></li>
      <li>
        <a href="#" v-on:click.prevent="goToLastPage">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    methods: {
      goToFirstPage() {
        this.$emit('goToFirstPageEvt');
      },
      decrementPage() {
        this.$emit('decrementPageEvt');
      },
      incrementPage() {
        this.$emit('incrementPageEvt');
      },
      goToLastPage() {
        this.$emit('goToLastPageEvt');
      }
    }
  }
</script>

<style scoped>
  nav {
    display: inline-block;
  }
</style>