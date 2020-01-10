<template>
    <div id="order-create-edit">
        <span class="component-heading">{{ pageHeading }}</span>
        <hr>
        <form class="form-horizontal">
            <div class="form-group">
                <label for="orderStatus" class="col-md-offset-2 col-md-2">Status</label>
                <div class="col-md-4">
                    <select id="orderStatus" v-model="orderStatus">
                        <option v-for="status in orderStatusList" v-bind:value="status.value" v-bind:key="status.value">{{status.text}}</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="orderDate" class="col-md-offset-2 col-md-2">Order Date</label>
                <div class="col-md-4">
                    <!--
                    <input type="input" class="form-control" id="orderDate" v-model="order.orderDate">
                    -->
                    <datepicker></datepicker>
                </div>
                <div class="col-md-4 error-msg">
                    <span>*&nbsp;</span>
                    <span>{{ getValidationError('orderDate') }}</span>
                </div>
            </div>
            <div class="form-group">
                <label for="requiredDate" class="col-md-offset-2 col-md-2">Required Date</label>
                <div class="col-md-4">
                    <input type="input" class="form-control" id="requiredDate" v-model="order.requiredDate">
                </div>
                <div class="col-md-4 error-msg">
                    <span>*&nbsp;</span>
                    <span>{{ getValidationError('requiredDate') }}</span>
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-offset-4 col-md-2">
                    <button type="button" class="btn btn-default"
                        v-on:click="submitForm">{{ submitBtnLabel }}</button>
                    <router-link class="btn btn-default" :to="{ name: 'customerIndex' }">Cancel</router-link>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import Datepicker from '../../components/Datepicker.vue'

    export default {
        components: {
            'datepicker': Datepicker
        },
        props: {
            id: {
                type: Number,
                required: false
            }
        },
        data() {
            return {
                order: {
                    id: undefined,
                    orderStatus: 1,
                    orderDate: '',
                    requiredDate: '',
                    shippedDate: ''
                },
                orderStatus: '1',
                orderStatusList: [
                    { text: "Pending", value: "1" },
                    { text: "Processing", value: "2" },
                    { text: "Rejected", value: "3" },
                    { text: "Completed", value: "4" },
                ],
                validationErrors: []
            }
        },
        computed: {
            pageHeading() {
                let heading = "New Order";
                if (this.id) {
                    heading = "Edit Order";
                }
                return heading;
            },
            submitBtnLabel() {
                let btnLabel = "Save";
                if (this.id) {
                    btnLabel = "Update";
                }
                return btnLabel;
            },
        },
        methods: {
            getValidationError(fieldName) {
                var returnValue;

                var foundElement = this.validationErrors.find(function (element) {
                    return element.field === fieldName;
                });

                if (foundElement !== undefined) {
                    returnValue = foundElement.message;
                }

                return returnValue;
            },
            submitForm() {
                alert("Form submit placeholder");
            }
        }
    }
</script>

<style scoped>
</style>
