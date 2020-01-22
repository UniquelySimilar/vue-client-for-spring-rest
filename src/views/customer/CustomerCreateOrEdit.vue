<template>
    <div id="customer-create-edit">
        <div>
            <span class="component-heading">{{ pageHeading }}</span>
        </div>
        <hr>
        <form class="form-horizontal">
            <div class="form-group">
                <label for="firstName" class="col-md-offset-2 col-md-2">First Name</label>
                <div class="col-md-4">
                    <input type="input" class="form-control" id="firstName" v-model="customer.firstName">
                </div>
                <div class="col-md-4 error-msg">
                    <span>*&nbsp;</span>
                    <span>{{ getValidationError('firstName') }}</span>
                </div>
            </div>
            <div class="form-group">
                <label for="lastName" class="col-md-offset-2 col-md-2">Last Name</label>
                <div class="col-md-4">
                    <input type="input" class="form-control" id="lastName" v-model="customer.lastName">
                </div>
                <div class="col-md-4 error-msg">
                    <span>*&nbsp;</span>
                    <span>{{ getValidationError('lastName') }}</span>
                </div>
            </div>
            <div class="form-group">
                <label for="street" class="col-md-offset-2 col-md-2">Street</label>
                <div class="col-md-4">
                    <input type="input" class="form-control" id="street" v-model="customer.street">
                </div>
                <div class="col-md-4 error-msg">
                    <span>*&nbsp;</span>
                    <span>{{ getValidationError('street') }}</span>
                </div>
            </div>
            <div class="form-group">
                <label for="city" class="col-md-offset-2 col-md-2">City</label>
                <div class="col-md-4">
                    <input type="input" class="form-control" id="city" v-model="customer.city">
                </div>
                <div class="col-md-4 error-msg">
                    <span>*&nbsp;</span>
                    <span>{{ getValidationError('city') }}</span>
                </div>
            </div>
            <div class="form-group">
                <label for="state" class="col-md-offset-2 col-md-2">State</label>
                <div class="col-md-4">
                    <select class="form-control" v-model="customer.state">
                        <option v-for="state in stateList" v-bind:key="state">{{state}}</option>
                    </select>
                    <!--
                    <input type="input" class="form-control" id="state" v-model="customer.state">
                    -->
                </div>
                <div class="col-md-4 error-msg">
                    <span>*&nbsp;</span>
                    <span>{{ getValidationError('state') }}</span>
                </div>
            </div>
            <div class="form-group">
                <label for="zipcode" class="col-md-offset-2 col-md-2">Zipcode</label>
                <div class="col-md-4">
                    <input type="input" class="form-control" id="zipcode" v-model="customer.zipcode">
                </div>
                <div class="col-md-4 error-msg">
                    <span>*&nbsp;</span>
                    <span>{{ getValidationError('zipcode') }}</span>
                </div>
            </div>
            <div class="form-group">
                <label for="home-phone" class="col-md-offset-2 col-md-2">Home Phone</label>
                <div class="col-md-4">
                    <input type="input" class="form-control" id="home-phone" v-model="customer.homePhone">
                </div>
                <div class="col-md-4 error-msg">
                    <span>*&nbsp;</span>
                    <span>{{ getValidationError('homePhone') }}</span>
                </div>
            </div>
            <div class="form-group">
                <label for="work-phone" class="col-md-offset-2 col-md-2">Work Phone</label>
                <div class="col-md-4">
                    <input type="input" class="form-control" id="work-phone" v-model="customer.workPhone">
                </div>
            </div>
            <div class="form-group">
                <label for="email" class="col-md-offset-2 col-md-2">Email</label>
                <div class="col-md-4">
                    <input type="input" class="form-control" id="email" v-model="customer.email">
                </div>
                <div class="col-md-4 error-msg">
                    <span>*&nbsp;</span>
                    <span>{{ getValidationError('email') }}</span>
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
    import { customerRestUrl, axios } from '../../globalvars.js'

    export default {
        name: "CustomerCreateOrEdit",
        props: {
            customerId: {
                type: Number,
                required: false
            }
        },
        data() {
            return {
                customer: {
                    id: undefined,
                    firstName: '',
                    lastName: '',
                    street: '',
                    city: '',
                    state: 'Colorado',
                    zipcode: '',
                    homePhone: '',
                    workPhone: '',
                    email: ''
                },
                stateList: [
                    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
                    "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
                    "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
                    "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
                    "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
                ],
                validationErrors: []
            }
        },
        computed: {
            pageHeading() {
                let heading = "New Customer"
                if (this.customerId) {
                    heading = "Edit Customer"
                }
                return heading;
            },
            submitBtnLabel() {
                let btnLabel = "Save"
                if (this.customerId) {
                    btnLabel = "Update"
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
                axios({
                    method: this.customerId ? 'put' : 'post',
                    url: customerRestUrl,
                    data: JSON.stringify(this.customer)
                })
                    .then(() => {
                        // Redirect back to Index view
                        this.$router.push({ name: 'customerIndex' });
                    })
                    .catch(error => {
                        if (error.response) {
                            // The request was made and the server responded with a status code that falls out of the range of 2xx
                            if (error.response.status == 400) {
                                // Validation error
                                //console.log('validation error');
                                this.validationErrors = error.response.data;
                            }
                            else {
                                console.log(error.response.status);
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
            if (this.customerId) {
                axios.get(customerRestUrl + this.customerId)
                    .then(response => {
                        this.customer = response.data;
                        //console.log(JSON.stringify(this.customer));
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    }
</script>

<style scoped>
    label {
        text-align: right;
    }
</style>