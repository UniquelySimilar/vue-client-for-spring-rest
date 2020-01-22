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
                <div class="col-md-4">
                    <datepicker id="orderDate" :dateFormat="dateFormat" :dateType="1" :initialDate="order.orderDate"
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
                    <datepicker id="requiredDate" :dateFormat="dateFormat" :dateType="2" :initialDate="order.requiredDate"
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
                    <router-link class="btn btn-default" :to="{ name: 'customerDetailOrders', params: { id: customerId } }">Cancel</router-link>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import { orderRestUrl, axios } from '../../globalvars.js'
    import Datepicker from '../../components/Datepicker.vue'

    export default {
        name: "OrderCreateOrEdit",
        components: {
            'datepicker': Datepicker
        },
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
                    orderDate: new Date(),
                    requiredDate: null,
                    shippedDate: null
                },
                //orderStatus: '1',
                orderStatusList: [
                    { text: "Pending", value: "1" },
                    { text: "Processing", value: "2" },
                    { text: "Rejected", value: "3" },
                    { text: "Completed", value: "4" },
                ],
                validationErrors: [],
                dateFormat: "yy-mm-dd",
                // Hard code to noon Mountain Time for testing
                timeZoneSuffix: "T12:00:00-06:00"
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
                switch(payload.dtType) {
                    case 1:
                        this.order.orderDate = payload.dtValue + this.timeZoneSuffix;
                        //console.log("New orderDate: " + this.order.orderDate);
                        break;
                    case 2:
                        this.order.requiredDate = payload.dtValue + this.timeZoneSuffix;
                        //console.log("New requiredDate: " + this.order.requiredDate);
                        break;
                    case 3:
                        this.order.shippedDate = payload.dtValue + this.timeZoneSuffix;
                        //console.log("New shippedDate: " + this.order.shippedDate);
                        break;
                    default:
                        console.log("ERROR: Unrecognized date type: " + payload.dtType);
                }
            },
            submitForm() {
                axios({
                    method: this.orderId ? 'put' : 'post',
                    url: orderRestUrl,
                    data: JSON.stringify(this.order)
                })
                .then(() => {
                    // Redirect back to CustomerDetailOrders view
                    this.$router.push({ name: 'customerDetailOrders', params: { id: this.customerId} });
                })
                .catch(error => {
                    if (error.response) {
                        // The request was made and the server responded with a status code that falls out of the range of 2xx
                        if (error.response.status == 400) {
                            // Validation error
                            this.validationErrors = error.response.data;
                        }
                        else {
                            console.log(error.response.status);
                            //console.log(error.response);
                        }
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser
                        console.error(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.error('Error', error.message);
                    }
                });
            }
        },
        // Lifecycle hooks
        created() {
            if (this.orderId) {
                axios.get(orderRestUrl + this.orderId)
                .then( response => {
                    console.log("Default date: " + this.order.orderDate);
                    console.log(response.data);
                    this.order = response.data;
                    console.log("Retrieved order orderDate: " + new Date(this.order.orderDate));
                    this.order.orderDate = new Date(this.order.orderDate);
                    console.log("Retrieved order requiredDate: " + new Date(this.order.requiredDate));
                    this.order.requiredDate = new Date(this.order.requiredDate);
                })
                .catch( error => console.log(error));
            }
            //console.log(this.order);
        }
    }
</script>

<style scoped>
</style>
