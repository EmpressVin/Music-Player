// Import mutation types
import * as mutation from "@/store/mutation-types";

// Import required services
import MusicPlayer from "@/services/MusicPlayer";

// State object
const state = {
  currentSong: null,
  playing: false,
  elapsedTime: 0,
  duration: 0,
  volumeLevel: 1
};

// Mutation functions
const mutations = {
  [mutation.SET_CURRENT_SONG](state, payload) {
    state.currentSong = payload;
  },
  [mutation.SET_PLAYING](state, playing) {
    state.playing = playing;
  },
  [mutation.SET_ELAPSED_TIME](state, elapsedTime) {
    state.elapsedTime = elapsedTime;
  },
  [mutation.SET_DURATION](state, duration) {
    state.duration = duration;
  },
  [mutation.SET_VOLUME_LEVEL](state, volumeLevel) {
    state.volumeLevel = volumeLevel;
  },
  [mutation.INCREMENT_ELAPSED_TIME](state, step) {
    state.elapsedTime += step;
  }
};

// Action functions
const actions = {
  async playSong({ commit }, payload) {
    MusicPlayer.play(
      payload.path,
      duration => {
        commit(mutation.SET_ELAPSED_TIME, 0);
        commit(mutation.SET_PLAYING, true);
        commit(mutation.SET_CURRENT_SONG, payload);
        commit(mutation.SET_DURATION, duration);
      },
      () => commit(mutation.INCREMENT_ELAPSED_TIME, 0.5),
      () => commit(mutation.SET_PLAYING, false)
    );
  },
  async pauseSong({ commit }) {
    MusicPlayer.pause(elapsedTime => {
      commit(mutation.SET_PLAYING, false);
      commit(mutation.SET_ELAPSED_TIME, elapsedTime);
    });
  },
  async resumeSong({ commit }) {
    MusicPlayer.resume(() => {
      commit(mutation.SET_PLAYING, true);
    });
  },
  async seekSong({ commit }, time) {
    MusicPlayer.seek(time, () => {
      commit(mutation.SET_ELAPSED_TIME, time);
    });
  },
  async changeVolumeLevel({ commit }, volumeLevel) {
    MusicPlayer.volume(volumeLevel);
    commit(mutation.SET_VOLUME_LEVEL, volumeLevel);
  }
};

// Getter functions
const getters = {
  getCurrentSong: state => state.currentSong,
  isPlaying: state => state.playing,
  getElapsedTime: state => state.elapsedTime,
  getDuration: state => state.duration,
  getVolumeLevel: state => state.volumeLevel
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
