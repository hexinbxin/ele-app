import Vue from 'vue'
import Vuex from 'vuex'
import map from './store/map'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    map,
  }
})
