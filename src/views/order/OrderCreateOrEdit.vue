<template>
    <div id="order-create-edit">
        <span class="component-heading">{{ pageHeading }}</span>
        <hr>
        <form class="form-horizontal">
            <div class="form-group">
                <label for="orderStatus" class="col-md-offset-2 col-md-2">Status</label>
                <div class="col-md-4">
                    <select id="orderStatus" v-model="order.orderStatus">
                        <option v-for="status in orderStatusList" v-bind:value="status.value" v-bind:key="status.value">{{status.text}}</option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label for="orderDate" class="col-md-offset-2 col-md-2">Order Date</label>
                <div class="col-md-2">
                    <datepicker id="orderDate" :dateFormat="dateFormat" :dateType="1" :initialDate="order.orderDate"
                     v-on:update-date="updateDate"></datepicker>
                </div>
                <div class="col-md-4 error-msg">
                    <span>*&nbsp;</span>
                    <span>{{ getValidationError('orderDate') }}</span>
                </div>
            </div>

            <div class="form-group">
                <label for="requiredDate" class="col-md-offset-2 col-md-2">Required Date</label>
                <div class="col-md-2">
                    <datepicker id="requiredDate" :dateFormat="dateFormat" :dateType="2" :initialDate="order.requiredDate"
                     v-on:update-date="updateDate"></datepicker>
                </div>
                <div class="col-md-4 error-msg">
                    <span>*&nbsp;</span>
                    <span>{{ getValidationError('requiredDate') }}</span>
                </div>
            </div>

            <!-- Only display Shipped Date on edit form-->
            <div class="form-group" v-if="orderId">
                <label for="shippedDate" class="col-md-offset-2 col-md-2">Shipped Date</label>
                <div class="col-md-3">
                    <datepicker id="shippedDate" :dateFormat="dateFormat" :dateType="3" :initialDate="order.shippedDate"
                     v-on:update-date="updateDate"></datepicker>
                     <button type="button" class="btn btn-default btn-xs btn-margin-left" @click="clearShippedDate">Clear</button>
                </div>
                <div class="col-md-4 error-msg">
                    <span>*&nbsp;</span>
                    <span>{{ getValidationError('shippedDate') }}</span>
                </div>
            </div>

            <div class="form-group">
                <div class="col-md-offset-4 col-md-2">
                    <button type="button" class="btn btn-default"
                        v-on:click="submitForm">{{ submitBtnLabel }}</button>
                    <router-link class="btn btn-default" :to="{ name: 'customerDetailOrders', params: { id: customerId } }">Cancel</router-link>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import {
        orderRestUrl,
        axios,
        processValidationErrors,
        getValidationError
    } from '../../globalvars.js';
    import processRequestErrors from '@/mixins/process-request-errors.js'

    import Datepicker from '../../components/Datepicker.vue';

    export default {
        name: "OrderCreateOrEdit",
        components: {
            'datepicker': Datepicker
        },
        mixins: [processRequestErrors],
        props: {
            orderId: {
                type: Number,
                required: false
            },
            customerId: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                order: {
                    id: this.orderId,
                    customerId: this.customerId,
                    orderStatus: 1,
                    orderDate: '',
                    requiredDate: '',
                    shippedDate: ''
                },
                orderStatusList: [
                    { text: "Pending", value: "1" },
                    { text: "Processing", value: "2" },
                    { text: "Rejected", value: "3" },
                    { text: "Completed", value: "4" },
                ],
                validationErrors: [],
                dateFormat: "yy-mm-dd",
                // Hard code to noon Mountain Time for testing
                timeZoneSuffix: "T12:00:00-06:00",
            }
        },
        computed: {
            token() {
                return this.$store.state.token;
            },
            pageHeading() {
                let heading = "New Order";
                if (this.orderId) {
                    heading = "Edit Order";
                }
                return heading;
            },
            submitBtnLabel() {
                let btnLabel = "Save";
                if (this.orderId) {
                    btnLabel = "Update";
                }
                return btnLabel;
            }
        },
        methods: {
            getValidationError,
            updateDate(payload) {
                //console.log("updateDate payload.dtValue: " + payload.dtValue);
                switch(payload.dtType) {
                    case 1:
                        this.order.orderDate = payload.dtValue;
                        //console.log("New orderDate: " + this.order.orderDate);
                        break;
                    case 2:
                        this.order.requiredDate = payload.dtValue;
                        //console.log("New requiredDate: " + this.order.requiredDate);
                        break;
                    case 3:
                        this.order.shippedDate = payload.dtValue;
                        //console.log("New shippedDate: " + this.order.shippedDate);
                        break;
                    default:
                        console.log("ERROR: Unrecognized date type: " + payload.dtType);
                }
            },
            clearShippedDate() {
                this.order.shippedDate = null;
            },
            submitForm() {
                axios({
                    method: this.orderId ? 'put' : 'post',
                    url: this.orderId ? orderRestUrl + this.orderId : orderRestUrl,
                    data: JSON.stringify(this.order),
                    headers: {
                        'Authorization': 'Bearer ' + this.token
                    }
                })
                .then(() => {
                    // Redirect back to CustomerDetailOrders view
                    this.$router.push({ name: 'customerDetailOrders', params: { id: this.customerId} });
                })
                .catch(error => {
                    this.validationErrors = processValidationErrors(error);
                    if (this.validationErrors.length === 0) {
                        this.processAjaxAuthError(error, this.$router);
                    }
                });
            },
        },
        // Lifecycle hooks
        created() {
            if (this.orderId) {
                axios.get(orderRestUrl + this.orderId, {
                    headers: {
                        'Authorization': 'Bearer ' + this.token
                    }
                })
                .then( response => {
                    this.order = response.data;
                })
                .catch( error => {
                    this.processAjaxAuthError(error, this.$router);
                });
            }
        }
    }
</script>

<style scoped>
</style>
