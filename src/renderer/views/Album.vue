<template>
  <div
    class="w-full h-full px-8 pt-12 flex justify-center items-center main-view"
  >
    <div class="w-full h-full flex flex-col albums-view">
      <AlbumInfo
        :album_name="albumInfo.album_name"
        :album_cover_path="getAlbumCoverPath()"
        :album_year="albumInfo.album_year"
        :artist_name="albumInfo.artist_name"
      ></AlbumInfo>
      <div class="w-full mt-6 flex flex-col text-xs">
        <div
          class="w-full pb-1 flex flex-row items-center text-low-emphasis song-item"
        >
          <div class="w-8 flex justify-center">#</div>
          <div class="mr-3 w-10"></div>
          <div class="tracking-widest">TITLE</div>
        </div>
        <SongRow
          v-for="song in songs"
          :id="song.song_id"
          :title="song.song_title"
          :path="song.song_path"
          :key="song.song_id"
          :playSong="songId => playAlbum({ songs, startSongId: songId })"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer, webFrame } from "electron";
import { mapActions } from "vuex";

import { getAlbumCoverPath } from "../helpers/util";

import AlbumInfo from "../components/AlbumInfo";
import SongRow from "../components/SongRow";

export default {
  name: "Album",
  components: { AlbumInfo, SongRow },
  props: {
    id: {
      type: Number,
      require: true
    }
  },
  data() {
    return {
      albumInfo: {},
      songs: []
    };
  },
  created() {
    webFrame.clearCache();
    ipcRenderer.send("req-album-info", this.id);
    ipcRenderer.once("res-album-info", async (event, data) => { //eslint-disable-line
      this.albumInfo = data;

      ipcRenderer.send("req-all-album-songs", this.id);
      ipcRenderer.once("res-all-album-songs", async (event, data) => { //eslint-disable-line
        let songsObj = {};

        data.forEach(song => {
          if (song.song_id in songsObj) {
            songsObj[song.song_id].artists.push({
              id: song.artist_id,
              name: song.artist_name
            });
          } else {
            songsObj[song.song_id] = {
              song_id: song.song_id,
              song_title: song.song_title,
              song_path: song.song_path,
              artists: [
                {
                  id: song.artist_id,
                  name: song.artist_name
                }
              ]
            };
          }
        });

        this.songs = Object.values(songsObj);
      });
    });
  },
  methods: {
    ...mapActions({
      playAlbum: "Player/playAlbum"
    }),
    getAlbumCoverPath() {
      return getAlbumCoverPath(this.id);
    }
  }
};
</script>

<style lang="scss">
// .song-item {
//   padding: 0.625rem 0;
//   border-bottom: 1px solid #282828;
// }
</style>
