<template>
    <div id="customer-detail-orders">
        <div>
            <span class="component-heading">Customer Details</span>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-4">
                <div class="row">
                    <div class="col-md-4">
                        <label>First Name:</label>
                    </div>
                    <div class="col-md-8">{{customer.firstName}}</div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <label>Last Name:</label>
                    </div>
                    <div class="col-md-8">{{customer.lastName}}</div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <label>Street:</label>
                    </div>
                    <div class="col-md-8">{{customer.street}}</div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <label>City/State/Zip:</label>
                    </div>
                    <div class="col-md-8">{{getCityStateZip(customer)}}</div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="row">
                    <div class="col-md-4">
                        <label>Home Phone:</label>
                    </div>
                    <div class="col-md-8">{{customer.homePhone}}</div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <label>Work Phone:</label>
                    </div>
                    <div class="col-md-8">{{customer.workPhone}}</div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <label>Email:</label>
                    </div>
                    <div class="col-md-8">{{customer.email}}</div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <label>&nbsp;</label>
                    </div>
                    <div class="col-md-8">&nbsp;</div>
                </div>
            </div>
        </div>
        <hr>
        <div class="table-title">
            <span class="component-heading">Orders</span>
            <router-link class="btn btn-default" :to="{ name: 'orderCreate' }">Create Order</router-link>
        </div>
        <div class="row">
            <div class="col-md-8">
                <table id="order-table" class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Order Date</th>
                            <th>Required Date</th>
                            <th>Shipped Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="order in orders" v-bind:key="order.id">
                            <td>{{ getOrderStatusStr(order.orderStatus) }}</td>
                            <td>{{ formatDate(order.orderDate) }}</td>
                            <td>{{ formatDate(order.requiredDate) }}</td>
                            <td>{{ formatDate(order.shippedDate) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <hr>
        <router-link class="btn btn-default" :to="{ name: 'customerIndex' }">Cancel</router-link>
    </div>
</template>

<script>
    import baseUrl from '../../globalvars.js'

    export default {
        name: "CustomerDetailOrders",
        props: {
            id: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                customer: {},
                orders: []
            }
        },
        methods: {
            getCityStateZip(customer) {
                return customer.city + ", " + customer.state + " " + customer.zipcode;
            },
            formatDate(milliseconds) {
                if (!milliseconds)
                    return;

                let date = new Date(milliseconds);
                return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
            },
            getOrderStatusStr(status) {
                let statusStr = "Unknown";

                switch(status) {
                    case 1:
                        statusStr = "Pending";
                        break;
                    case 2:
                        statusStr = "Processing";
                        break;
                    case 3:
                        statusStr = "Rejected";
                        break;
                    case 4:
                        statusStr = "Completed";
                }

                return statusStr;
            }
        },
        // Lifecycle hooks
        created() {
            window.axios.get(baseUrl + this.id)
                .then(response => {
                    this.customer = response.data;
                    //console.log(this.customer);
                    this.orders = this.customer.orders;
                    this.orders.forEach(order => {
                        console.log(order);
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
</script>

<style scoped>
</style>
