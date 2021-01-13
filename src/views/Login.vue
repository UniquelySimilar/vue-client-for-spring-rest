<template>
    <div id="login">
        <form class="form-horizontal">
            <div class="form-group">
                <label for="username" class="col-md-offset-3 col-md-2 align-right">User Name</label>
                <div class="col-md-3">
                    <input type="input" class="form-control" id="username" v-model="username">
                </div>
            </div>
            <div class="form-group">
                <label for="password" class="col-md-offset-3 col-md-2 align-right">Password</label>
                <div class="col-md-3">
                    <input type="password" class="form-control" id="password" v-model="password" v-on:keyup.enter="login">
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-offset-5 col-md-4">
                    <button type="button" class="btn btn-default"
                        v-on:click="login">Login</button>
                    <span class="error-msg" v-if="errorMsg">{{ errorMsg }}</span>
                </div>
            </div>
        </form>

    </div>

</template>

<script>
    import { loginUrl, axios, processAjaxLoginError } from '../globalvars.js'

    export default {
        name: 'Login',
        data() {
            return {
                username: '',
                password: '',
                errorMsg: ''
            }
        },
        methods: {
            login() {
                axios.post(loginUrl, {
                    username: this.username,
                    password: this.password
                })
                .then(response => {
                    // Commit the token to the store
                    this.$store.commit('updateToken', { token: response.data.message });
                    this.$store.commit('setLoginDisplayed', false);

                    // Clear error message
                    this.errorMsg = '';

                    // Initialize Vuex store product types
                    this.$store.dispatch('getProductTypes');
                    
                    // Redirect to customer index view
                    this.$router.push("/customers")
                })
                .catch(error => {
                    this.errorMsg = processAjaxLoginError(error);
                })
            }
        },
        computed: {
            token() {
                return this.$store.state.token;
            }
        }
    }

</script>

<style scoped>
    .error-msg {
        margin-left: 2em;
        color: red;
        font-weight: bold
    }

</style>