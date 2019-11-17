import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isOnTest: false,
    cycle: 10,
    isSendding: true,
    equipments: [],
  },
  mutations: {
    startTest: (state) => state.isOnTest = true,
    stopTest: (state) => state.isOnTest = false,
    
  }
});

export default store;