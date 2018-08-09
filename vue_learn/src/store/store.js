import Vue from "vue"
import Vuex from "vuex"

import user from './model/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user
  }
})

export default store
