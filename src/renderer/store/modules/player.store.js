// Import mutation types
import * as mutation from "@/store/mutation-types";

// State object
const state = {
  currentSong: null,
  isPlaying: null
};

// Mutation functions
const mutations = {
  [mutation.SET_CURRENT_SONG](state, payload) {
    state.currentSong = payload;
  },
  [mutation.SET_PLAYING](state, s) {
    state.isPlaying = s;
  }
};

// Getter functions
const getters = {
  getCurrentSong: state => state.currentSong,
  isPlaying: state => state.isPlaying
};

export default {
  namespaced: true,
  state,
  mutations,
  getters
};
