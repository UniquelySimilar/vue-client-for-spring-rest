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
        props: ['dateFormat', 'initialDate'],
        mounted: function() {
            var self = this;
            $(this.$el).datepicker({
                dateFormat: this.dateFormat,
                onSelect: function(dateText) {
                    self.$emit('update-date', { dateValue: dateText, dateType: "1" });
                }
            })
            .datepicker("setDate", this.initialDate);
        },
        beforeDestroy: function() {
            $(this.$el).datepicker('hide').datepicker('destroy');
        }

    }
</script>

<style scoped>
</style>
