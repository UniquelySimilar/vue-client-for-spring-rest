<template>
    <div id="login">
        <div>
            <span class="component-heading">Login</span>
        </div>
        <hr>
        <form class="form-horizontal">
            <div class="form-group">
                <label for="username" class="col-md-offset-3 col-md-2 align-right">User Name</label>
                <div class="col-md-3">
                    <input type="input" class="form-control" id="username" v-model="username">
                </div>
                <!--
                <div class="col-md-4 error-msg">
                    <span>*&nbsp;</span>
                    <span>{{ getValidationError('firstName') }}</span>
                </div>
                -->
            </div>
            <div class="form-group">
                <label for="password" class="col-md-offset-3 col-md-2 align-right">Password</label>
                <div class="col-md-3">
                    <input type="password" class="form-control" id="password" v-model="password">
                </div>
                <!--
                <div class="col-md-4 error-msg">
                    <span>*&nbsp;</span>
                    <span>{{ getValidationError('lastName') }}</span>
                </div>
                -->
            </div>
            <div class="form-group">
                <div class="col-md-offset-5 col-md-2">
                    <button type="button" class="btn btn-default"
                        v-on:click="login">Login</button>
                </div>
            </div>
        </form>

    </div>

</template>

<script>
    import { loginUrl, axios } from '../globalvars.js'

    export default {
        name: 'Login',
        data() {
            return {
                username: '',
                password: '',
                token: ''
            }
        },
        methods: {
            login() {
                axios.post(loginUrl, {
                    username: this.username,
                    password: this.password
                })
                .then(response => {
                    // TODO: Pass token to parent
                    this.token = response.data;
                    console.log(this.token);
                    // TODO: Redirect to customer index view with access to token
                })
                .catch(error => {
                    if (error.response) {
                        console.error("Response error code");
                        console.error(error.response);
                    }
                    else if (error.request) {
                        console.error("No response received so logging request");
                        console.error(error.request);
                    }
                    else {
                        console.error("Problem with request");
                        console.error(error.message);
                    }

                })
            }
        }
    }

</script>

<style scoped>

</style>