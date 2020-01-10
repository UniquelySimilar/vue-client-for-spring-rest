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
        props: {
            dateFormat: String,
            // dateType: 1 = orderDate, 2 = requiredDate, 3 = shippedDate
            dateType: Number,
            initialDate: Date
        },
        mounted: function() {
            var self = this;
            $(this.$el).datepicker({
                dateFormat: this.dateFormat,
                onSelect: function(dateText) {
                    var type = self.dateType;
                    self.$emit('update-date', { dtValue: dateText, dtType: type });
                }
            })
            .datepicker("setDate", this.initialDate);
            $(this.$el).attr('readonly', true);
        },
        beforeDestroy: function() {
            $(this.$el).datepicker('hide').datepicker('destroy');
        }

    }
</script>

<style scoped>
</style>
