// Import mutation types
import * as mutation from "@/store/mutation-types";

// Import required services
import MusicPlayer from "@/services/MusicPlayer";
import SongQueue from "@/services/SongQueue";

// State object
const state = {
  currentSong: null,
  playing: false,
  elapsedTime: 0,
  duration: 0,
  volumeLevel: 1,
  queue: new SongQueue()
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
  async addSongListToQueue({ state }, payload) {
    // Add songs from the payload into a song queue
    state.queue.addSongs(payload);
  },
  async playAlbum({ state, commit, dispatch }, payload) {
    // Clear current song queue
    state.queue.clear();

    // Get rid of all the junk data from payload
    const sanatizedSongs = payload.songs.map(song => {
      return { id: song.song_id, path: song.song_path };
    });

    dispatch("addSongListToQueue", sanatizedSongs);

    // Set the current song in the song queue and vuex store to the one chosen by the user
    state.queue.setCurrentById(payload.startSongId);
    commit(mutation.SET_CURRENT_SONG, state.queue.current());

    // Start playing the album
    dispatch("playSong");
  },
  async playSong({ state, commit, dispatch }) {
    if (state.currentSong !== null) {
      commit(mutation.SET_ELAPSED_TIME, 0);

      MusicPlayer.play({
        path: state.currentSong.path,
        onSuccess: duration => {
          commit(mutation.SET_PLAYING, true);
          commit(mutation.SET_DURATION, duration);
        },
        onTick: () => commit(mutation.INCREMENT_ELAPSED_TIME, 0.5),
        onEnd: () => dispatch("nextSong")
      });
    } else {
      commit(mutation.SET_PLAYING, false);
    }
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
  async nextSong({ state, commit, dispatch }) {
    // Change the song to the next song
    const newSong = state.queue.next();

    if (newSong !== null) {
      commit(mutation.SET_CURRENT_SONG, newSong);
      dispatch("playSong");
    } else {
      commit(mutation.SET_PLAYING, false);
    }
  },
  async prevSong({ state, commit, dispatch }) {
    // Change the song to the previous song
    const newSong = state.queue.prev();

    if (newSong !== null) {
      commit(mutation.SET_CURRENT_SONG, newSong);
      dispatch("playSong");
    } else {
      commit(mutation.SET_PLAYING, false);
    }
  },
  async changeVolumeLevel({ commit }, volumeLevel) {
    MusicPlayer.volume(volumeLevel);
    commit(mutation.SET_VOLUME_LEVEL, volumeLevel);
  }
};

// Getter functions
const getters = {
  getCurrentSong: state => state.currentSong,
  getCurrentSongId: state => {
    if (state.currentSong === null) return null;
    else return state.currentSong.id;
  },
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
