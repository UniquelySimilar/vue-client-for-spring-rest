<template>
    <input type="text">
</template>

<script>
    import $ from 'jquery'
    require('jquery-ui/ui/widgets/datepicker.js');
    require('jquery-ui/themes/base/core.css');
    require('jquery-ui/themes/base/datepicker.css');
    require('jquery-ui/themes/base/theme.css');

    export default {
        mounted: function() {
            $(this.$el).datepicker();
        }

    }
</script>

<style scoped>
</style>
