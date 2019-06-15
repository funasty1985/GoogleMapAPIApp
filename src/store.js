import Vue from 'vue'
import Vuex, { mapState } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    resturantsList :[],
    location: {},
    map: {}
  },
  mutations: {
    setResturantsList(state,payload){
      state.resturantsList = payload.list;
      state.location = payload.location;
      state.map = payload.map
    },
    
  },
  actions: {

  }
})
