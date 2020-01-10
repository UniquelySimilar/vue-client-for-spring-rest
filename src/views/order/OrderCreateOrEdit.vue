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
                    <datepicker id="orderDate" dateFormat="m/d/yy" :dateType="1" :initialDate="order.orderDate"
                     v-on:update-date="updateDate" v-once></datepicker>
                </div>
                <div class="col-md-4 error-msg">
                    <span>*&nbsp;</span>
                    <span>{{ getValidationError('orderDate') }}</span>
                </div>
            </div>
            <div class="form-group">
                <label for="requiredDate" class="col-md-offset-2 col-md-2">Required Date</label>
                <div class="col-md-4">
                    <datepicker id="requiredDate" dateFormat="m/d/yy" :dateType="2" :initialDate="order.requiredDate"
                     v-on:update-date="updateDate" v-once></datepicker>
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
                    orderDate: new Date(),
                    requiredDate: null,
                    shippedDate: null
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
            updateDate(payload) {
                console.log("Called updateDate");
                // TODO: Formatting?
                // TODO: Process dateType form payload
                console.log("Update date type: " + payload.dtType);
                console.log("Update date value: " + payload.dtValue);
                //this.order.orderDate = payload.dtValue;
                //console.log("New customer orderDate: " + this.order.orderDate);
            },
            submitForm() {
                alert("Form submit placeholder");
            }
        }
    }
</script>

<style scoped>
</style>
