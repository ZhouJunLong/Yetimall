import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions/index'
import state from './state/index'
import mutations from './mutatuions/index'
Vue.use(Vuex)
export default new Vuex.Store({state,mutations,actions})
    