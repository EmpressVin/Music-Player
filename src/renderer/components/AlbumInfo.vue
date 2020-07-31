<template>
  <div class="w-full flex flex-row">
    <img :src="album_cover_path" class="w-32" />
    <div class="ml-6 mt-3 flex flex-col font-medium">
      <span class="text-2xs tracking-widest">ALBUM</span>
      <span class="text-3xl font-bold">{{ album_name }}</span>
      <div class="mt-2 text-xs tracking-wide">
        <span class="text-low-emphasis tracking-widest">By</span>
        <span class="ml-1">{{ artist_name }}</span>
      </div>
      <span class="mt-1 text-sm text-low-emphasis">{{ album_year }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlbumInfo",
  props: {
    album_name: {
      type: String,
      require: true
    },
    album_cover_path: {
      type: String,
      require: true
    },
    artist_name: {
      type: String,
      require: true
    },
    album_year: {
      type: Number,
      require: true
    }
  },
  data() {
    return {
      albumInfo: {}
    };
  }
};
</script>

<style lang="scss" scoped></style>
