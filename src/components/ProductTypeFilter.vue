<template>
  <div class="product-type-filter">
    <label>Type:</label>
    <select v-model="filterValue" v-on:change="filterValueChanged">
      <option v-for="productType in productTypesFilter" :key="productType.id" :value="productType.id">{{ productType.name }}
      </option>
    </select>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        filterValue: 0
      }
    },
    props: {
      productTypesFilter: {
        type: Array,
        required: true
      }
    },
    methods: {
      filterValueChanged() {
        this.$emit('product-type-filter-change', this.filterValue);
      }
    }
  }
</script>

<style scoped>
  .product-type-filter label {
    margin-left: 0.5em;
    margin-right: 0.5em;
  }
</style>