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
                    <digits-input component-class="form-control" component-id="home-phone"
                      :num-digits="10" :initial-value="customer.homePhone" v-on:updatePhone="updateHomePhone"/>
                </div>
                <div class="col-md-4 error-msg">
                    <span>*&nbsp;</span>
                    <span>{{ getValidationError('homePhone') }}</span>
                </div>
            </div>
            <div class="form-group">
                <label for="work-phone" class="col-md-offset-2 col-md-2">Work Phone</label>
                <div class="col-md-4">
                    <digits-input component-class="form-control" component-id="work-phone"
                      :num-digits="10" :initial-value="customer.workPhone" v-on:updatePhone="updateWorkPhone"/>
                </div>
                <div class="col-md-4 error-msg">
                    <span>*&nbsp;</span>
                    <span>{{ getValidationError('workPhone') }}</span>
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
    import {
        customerRestUrl,
        axios,
        processAjaxAuthError,
        getValidationError,
        stateList
    } from '../../globalvars.js';

    import DigitsInput from '../../components/DigitsInput.vue';

    export default {
        name: "CustomerCreateOrEdit",
        components: {
            DigitsInput
        },
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
                validationErrors: [],
                stateList: stateList
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
            token() {
                return this.$store.state.token;
            }
        },
        methods: {
            getValidationError,
            submitForm() {
                axios({
                    method: this.customerId ? 'put' : 'post',
                    url: this.customerId ? customerRestUrl + this.customerId : customerRestUrl,
                    data: JSON.stringify(this.customer),
                    headers: {
                        'Authorization': 'Bearer ' + this.token
                    }
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
                        else if (error.response.status == 401) {
                            console.log("401 error so redirect to login");
                            this.$router.push("/login");
                        }
                        else {
                            console.error("Response contains error code " + error.response.status);
                        }
                    } else if (error.request) {
                        console.error("No response received so logging request");
                        console.error(error.request);
                    } else {
                        console.error("Problem with request");
                        console.error(error.message);
                    }
                });
            },
            updateHomePhone(newValue) {
                this.customer.homePhone = newValue;
            },
            updateWorkPhone(newValue) {
                this.customer.workPhone = newValue;
            }
        },
        // Lifecycle hooks
        created() {
            if (this.customerId) {
                axios.get(customerRestUrl + this.customerId, {
                    headers: {
                        'Authorization': 'Bearer ' + this.token
                    }
                })
                .then(response => {
                    this.customer = response.data;
                    //console.log(JSON.stringify(this.customer));
                })
                .catch(error => {
                    processAjaxAuthError(error, this.$router);
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