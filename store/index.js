import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions/index'
import state from './state/index'
import mutations from './mutatuions/index'
import getters from './getters/index'

Vue.use(Vuex)
export default new Vuex.Store({state,getters,mutations,actions})
    