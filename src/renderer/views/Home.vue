<template>
  <div class="home flex flex-row">
    <!-- <div v-if="currentlyPlayingName" class="mb-4 font-semibold text-lg">
      {{ currentlyPlayingName }}
    </div>
    <div class="flex flex-row justify-between items-center">
      <button class="focus:outline-none" @click="playSong">
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 12L48 30L12 48V12Z" fill="white" />
        </svg>
      </button>
      <button class="ml-12 focus:outline-none" @click="pauseSong">
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 12H24V48H15V12ZM36 12H45V48H36V12Z" fill="white" />
        </svg>
      </button>
    </div>
    <button
      class="mt-4 px-6 py-1 border-2 border-white rounded-lg font-semibold focus:outline-none"
      @click="selectSong"
    >
      Select
    </button> -->
    <NavBar></NavBar>
    <AlbumList></AlbumList>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron';

import NavBar from '../components/NavBar';
import AlbumList from '../components/AlbumList';

// Used to play songs
// import { Howl } from "howler";

export default {
  name: 'Home',
  components: { NavBar, AlbumList },
  data() {
    return {
      currentlyPlayingName: null,
      currentlyPlaying: null,
    };
  },
  methods: {
    playSong() {
      if (this.currentlyPlaying !== null && this.currentlyPlaying.playing() === false) {
        this.currentlyPlaying.play();
      }
    },
    pauseSong() {
      if (this.currentlyPlaying !== null && this.currentlyPlaying.playing() === true) {
        this.currentlyPlaying.pause();
      }
    },
    selectSong() {
      ipcRenderer.send('index-music-library');
      // const songPath = electron.remote.dialog.showOpenDialogSync({
      //   title: "Select a song...",
      //   properties: ["openFile"]
      // });
      // if (songPath !== undefined) {
      //   this.currentlyPlayingName = path.parse(path.basename(songPath[0])).name;
      //   const song = new Howl({
      //     src: [`music://${songPath[0]}`]
      //   });
      //   this.currentlyPlaying = song;
      //   song.play();
      // }
    },
  },
};
</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  color: white;
}
</style>
