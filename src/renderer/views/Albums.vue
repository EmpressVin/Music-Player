<template>
  <div
    class="w-full h-full px-8 pt-20 flex justify-center items-center main-view"
  >
    <div class="w-full h-full flex flex-col albums-view">
      <div class="w-full flex flex-col">
        <span class="mb-4 text-5xl font-bold">Albums</span>
        <hr />
      </div>
      <div class="mt-4 album-layout">
        <AlbumThumbnail
          v-for="(album, i) in albums"
          :key="album.album_id"
          :album-id="album.album_id"
          :album-image="getAlbumCoverPath(i)"
          :album-name="album.album_name"
          :artist-name="album.artist_name"
        >
        </AlbumThumbnail>
      </div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
import { getAlbumCoverPath } from "../helpers/util";

import AlbumThumbnail from "../components/AlbumThumbnail";

// ipcRenderer.send("index-music-library");

export default {
  name: "Albums",
  components: { AlbumThumbnail },
  data() {
    return {
      albums: []
    };
  },
  async created() {
    ipcRenderer.send("req-all-albums");
    ipcRenderer.once("res-all-albums", async (event, data) => { //eslint-disable-line
      this.albums = data;
    });
  },
  methods: {
    getAlbumCoverPath(i) {
      return getAlbumCoverPath(this.albums[i].album_id);
    }
  }
};
</script>

<style lang="scss">
.albums-view {
  max-width: 78rem;
}

.album-layout {
  width: calc(100% + 1rem);
  margin-left: -1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
}

hr {
  border-color: #282828;
}
</style>
