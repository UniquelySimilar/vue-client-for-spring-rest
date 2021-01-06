import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '',
        loginDisplayed: true
    },
    mutations: {
        updateToken(state, payload) {
            state.token = payload.token;
        },
        setLoginDisplayed(state, login) {
            state.loginDisplayed = login;
        }
    }
});
