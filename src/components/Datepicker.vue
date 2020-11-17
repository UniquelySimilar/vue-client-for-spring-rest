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
        name: "Datepicker",
        props: {
            dateFormat: {
                type: String,
                required: true
            },
            // dateType: 1 = orderDate, 2 = requiredDate, 3 = shippedDate
            dateType: {
                type: Number,
                required: true
            },
            initialDate: {
                type: String,
                //type: Date,
                required: false
            }
        },
        watch: {
            initialDate(newDate) {
                // NOTE: Need a watch on this prop to explicitly update the wrapped jQuery datepicker.
                // The parent data passed via this prop is initialized from an AJAX call AFTER this child component is rendered.
                // Could modify this component in parent with <datepicker v-if="dataLoaded" ... > but that would delay rendering whole
                // component, not just value in input.
                $(this.$el).datepicker("setDate", newDate);
            }
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
            //console.log("Datepicker initialDate: " + this.initialDate);
        },
        beforeDestroy: function() {
            $(this.$el).datepicker('hide').datepicker('destroy');
        }

    }
</script>

<style scoped>
</style>
