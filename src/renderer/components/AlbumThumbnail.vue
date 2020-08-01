<template>
  <div class="ml-4 mb-6 flex flex-col justify-center a">
    <button
      class="w-full thumbnail"
      @click="$router.push({ name: 'Album', params: { id: albumId } })"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
    >
      <img :src="albumImage" class="w-full" />
      <div
        v-if="hover"
        class="w-full h-full flex flex-row justify-center items-center absolute top-0 left-0 z-10"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.99999 3.22L9.38999 2.61999C8.34991 1.63643 6.96734 1.09713 5.53598 1.11665C4.10462 1.13618 2.73727 1.71299 1.72441 2.72455C0.711541 3.73612 0.13297 5.10272 0.111606 6.53405C0.0902412 7.96539 0.627766 9.34865 1.60999 10.39L9.99999 18.78L18.39 10.38C19.3722 9.33865 19.9097 7.95539 19.8884 6.52406C19.867 5.09272 19.2884 3.72612 18.2756 2.71455C17.2627 1.70299 15.8954 1.12618 14.464 1.10665C13.0326 1.08713 11.6501 1.62643 10.61 2.61L9.99999 3.22V3.22Z"
            fill="white"
          />
        </svg>
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="mx-4"
        >
          <g class="play-btn">
            <circle cx="25" cy="25" r="24" stroke="white" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17 15V35L34.5 25L17 15Z"
              fill="white"
            />
          </g>
        </svg>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 12C3.46957 12 2.96086 11.7893 2.58579 11.4142C2.21071 11.0391 2 10.5304 2 10C2 9.46957 2.21071 8.96086 2.58579 8.58579C2.96086 8.21071 3.46957 8 4 8C4.53043 8 5.03914 8.21071 5.41421 8.58579C5.78929 8.96086 6 9.46957 6 10C6 10.5304 5.78929 11.0391 5.41421 11.4142C5.03914 11.7893 4.53043 12 4 12ZM10 12C9.46957 12 8.96086 11.7893 8.58579 11.4142C8.21071 11.0391 8 10.5304 8 10C8 9.46957 8.21071 8.96086 8.58579 8.58579C8.96086 8.21071 9.46957 8 10 8C10.5304 8 11.0391 8.21071 11.4142 8.58579C11.7893 8.96086 12 9.46957 12 10C12 10.5304 11.7893 11.0391 11.4142 11.4142C11.0391 11.7893 10.5304 12 10 12ZM16 12C15.4696 12 14.9609 11.7893 14.5858 11.4142C14.2107 11.0391 14 10.5304 14 10C14 9.46957 14.2107 8.96086 14.5858 8.58579C14.9609 8.21071 15.4696 8 16 8C16.5304 8 17.0391 8.21071 17.4142 8.58579C17.7893 8.96086 18 9.46957 18 10C18 10.5304 17.7893 11.0391 17.4142 11.4142C17.0391 11.7893 16.5304 12 16 12V12Z"
            fill="white"
          />
        </svg>
      </div>
    </button>
    <span class="w-full mt-2 text-xs font-semibold truncate-text">{{
      albumName
    }}</span>
    <span class="w-full text-xs text-medium-emphasis truncate-text">{{
      artistName
    }}</span>
  </div>
</template>

<script>
export default {
  name: "AlbumThumbnail",
  data() {
    return {
      hover: false
    };
  },
  props: {
    albumId: {
      type: Number,
      required: true,
      default: null
    },
    albumImage: String,
    albumName: String,
    artistName: String
  }
};
</script>

<style lang="scss" scoped>
.thumbnail {
  position: relative;

  &::after {
    content: "\A";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    -webkit-transition: all 0.25s;
  }

  &:hover::after {
    opacity: 1;
  }

  &:focus {
    outline: none;
  }
}

.play-btn {
  fill: rgba(0, 0, 0, 0.5);

  &:hover {
    fill: black;
  }
}

.truncate-text {
  width: calc(100% * 1px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
