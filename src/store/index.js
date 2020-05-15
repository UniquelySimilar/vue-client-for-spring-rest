import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: "empty-token"
    },
    mutations: {
        updateToken(state, payload) {
            state.token = payload.token;
        }
    }
});

export default store