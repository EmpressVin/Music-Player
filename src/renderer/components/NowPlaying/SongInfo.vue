<template>
  <div class="now-playing-bar__song-info">
    <img :src="coverPath" class="song-info__album-cover" v-show="id !== null" />
    <div class="song-info__details-container">
      <span class="song-info__song-title">{{ songInfo.title }}</span>
      <div class="song-info__song-artists">
        <span v-for="(artist, index) in songInfo.artists" :key="index">{{
          `${index !== 0 ? ", " : ""}${artist}`
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
// Import Vuex store related items
import { mapGetters } from "vuex";

// Import electron related items
import { ipcRenderer } from "electron";

import { getAlbumCoverPath } from "../../helpers/util";

export default {
  name: "SongInfo",
  data() {
    return {
      songInfo: {},
      coverPath: ""
    };
  },
  computed: {
    ...mapGetters({
      id: "Player/getCurrentSongId"
    })
  },
  watch: {
    id: function() {
      if (this.id !== null) {
        ipcRenderer.send("req-song-by-id", this.id);
        ipcRenderer.once("res-song-by-id", async (event, data) => { //eslint-disable-line
          let obj = {
            title: data[0].song_title,
            albumId: data[0].album_id,
            artists: []
          };

          data.forEach(song => {
            obj.artists.push(song.artist_name);
          });

          this.songInfo = obj;
          this.coverPath = getAlbumCoverPath(obj.albumId);
        });
      }
    }
  }
};
</script>

<style lang="scss">
.now-playing-bar__song-info {
  width: 18rem;
  min-width: 18rem;
  margin: 1rem 0.75rem 1rem 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.song-info__album-cover {
  width: 3.5rem;
  height: 3.5rem;
}

.song-info__details-container {
  width: 100%;
  margin-left: 0.75rem;
  display: flex;
  flex-direction: column;
}

.song-info__song-title {
  font-weight: 500;
  font-size: 0.85rem;
}

.song-info__song-artists {
  margin-top: 0.25rem;
  font-weight: 500;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
}
</style>
