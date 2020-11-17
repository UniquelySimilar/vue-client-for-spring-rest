<template>
    <div id="order-index">
        <div class="table-title">
            <span class="component-heading">Orders</span>
            <router-link class="btn btn-default" v-if="customerId" :to="{ name: 'orderCreate', params: { customerId: customerId } }">Create Order</router-link>
        </div>
        <!--
            TODO POSSIBILITY: Add filter by status
        <span class="table-subtitle">Click a status to manage Line Items</span>
        -->
        <div class="row" v-if="orders.length">
            <div class="col-md-8">
                <table id="order-table" class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Order Date</th>
                            <th>Required Date</th>
                            <th>Shipped Date</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="order in orders" v-bind:key="order.id">
                            <td>{{ getOrderStatusStr(order.orderStatus) }}</td>
                            <td>{{ order.orderDate }}</td>
                            <td>{{ order.requiredDate }}</td>
                            <td>{{ order.shippedDate }}</td>
                            <td><router-link :to="{ name: 'orderDetailLineItems', params: { orderId: order.id } }">Detail</router-link></td>
                            <td><router-link :to="{ name: 'orderEdit', params: { customerId: customerId, orderId: order.id } }">Edit</router-link></td>
                            <td><a href="#" v-on:click="deleteOrder(order.id)">Delete</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import { orderRestUrl, axios, processAjaxAuthError, getOrderStatusStr } from '../../globalvars.js'

    export default {
        name: 'OrderIndex',
        props: {
            customerId: {
                type: Number,
                required: true
            },
            initialOrders: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                orders: this.initialOrders
            }
        },
        computed: {
            token() {
                return this.$store.state.token;
            }
        },
        methods: {
            deleteOrder(id) {
                if (!confirm("Delete order")) {
                    return;
                }

                axios.delete(orderRestUrl + id, {
                    headers: {
                        'Authorization': 'Bearer ' + this.token
                    }
                })
                .then( () => {
                    // Remove order from orders array
                    this.orders = this.orders.filter( order => {
                        return order.id !== id;
                    });
                })
                .catch(error => {
                    processAjaxAuthError(error, this.$router);
                });
            },
            getOrderStatusStr
        }
    }

</script>

<style scoped>

</style>