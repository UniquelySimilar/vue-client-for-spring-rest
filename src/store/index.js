import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { productTypeRestUrl, axios } from '@/globalvars.js'

export default new Vuex.Store({
  state: {
    token: '',
    loginDisplayed: true,
    productTypes: [],
    productTypesFilter: []
  },
  mutations: {
    updateToken(state, payload) {
      state.token = payload.token;
    },
    setLoginDisplayed(state, login) {
      state.loginDisplayed = login;
    },
    setProductTypes(state, types) {
      state.productTypes = types;
    },
    setProductTypesFilter(state, types) {
      state.productTypesFilter = types;
    }
  },
  actions: {
    getProductTypes(context) {
      axios.get(productTypeRestUrl, {
        headers: {
          'Authorization': 'Bearer ' + context.state.token
        }
      })
      .then( response => {
        context.commit('setProductTypes', response.data);

        // Add product type representing 'all' for filtering purposes
        let typesFilter = [...response.data];
        typesFilter.unshift({id: 0, name: 'all'});
        context.commit('setProductTypesFilter', typesFilter);
      })
      .catch( error => console.log(error) );
    }
  }
});
