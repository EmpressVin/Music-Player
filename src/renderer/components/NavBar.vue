<template>
  <div class="w-56 h-full nav-bar">
    <button
      class="mt-4 ml-4 px-4 py-1 text-sm border-2 border-white rounded-lg focus:outline-none"
      @click="$router.go(-1)"
    >
      Back
    </button>
    <button
      class="mt-4 ml-4 px-4 py-1 text-sm border-2 border-white rounded-lg focus:outline-none"
      @click="addSongs"
    >
      Add Folder...
    </button>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron';

export default {
  name: 'NavBar',
  methods: {
    addSongs() {
      ipcRenderer.send('index-music-library');
    },
  },
};
</script>

<style lang="scss">
.nav-bar {
  background-color: #040404;
}
</style>
