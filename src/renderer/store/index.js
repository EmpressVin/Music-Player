import Vue from 'vue';
import Vuex from 'vuex';

// Import all the exported modules
import modules from './modules';

Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: {}
// });

export default new Vuex.Store({
  modules,
});
