<template>
  <div
    class="w-full flex flex-row items-center text-low-emphasis song-item"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <div class="w-8 flex justify-center">
      <button v-if="hovered" class="focus:outline-none" @click="playSong">
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="play-btn"
        >
          <circle cx="13" cy="13" r="12" />
          <path d="M18.6 12.8L9 8V17.6L18.6 12.8Z" fill="white" />
        </svg>
      </button>
      <span v-else class="font-medium">5</span>
    </div>
    <div class="mr-3 w-10 flex justify-center">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 2.576L7.512 2.096C6.67994 1.30915 5.57388 0.877709 4.4288 0.893328C3.28371 0.908947 2.18983 1.3704 1.37954 2.17965C0.569245 2.9889 0.106388 4.08219 0.0892968 5.22725C0.0722051 6.37231 0.502225 7.47893 1.288 8.312L8 15.024L14.712 8.304C15.4978 7.47093 15.9278 6.36431 15.9107 5.21925C15.8936 4.07419 15.4308 2.9809 14.6205 2.17165C13.8102 1.3624 12.7163 0.900947 11.5712 0.885328C10.4261 0.869709 9.32007 1.30115 8.488 2.088L8 2.576V2.576Z"
          fill="rgba(255,255,255,0.6)"
          stroke-width="4%"
        />
      </svg>
    </div>
    <div class="tracking-widest text-white font-medium ps">
      {{ title }}
    </div>
  </div>
</template>

<script>
// import { Howl } from "howler";

export default {
  name: "SongItem",
  props: {
    title: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      hovered: false
    };
  },
  methods: {
    playSong() {
      window.Event.$emit("play-song", this.path);
    }
  }
};
</script>

<style lang="scss" scoped>
.ps {
  padding: 0.625rem 0;
}

.play-btn {
  stroke: rgba(255, 255, 255, 0.6);

  &:hover {
    stroke: white;
    stroke-width: 1.25;
  }
}

.song-item {
  border-bottom: 1px solid #282828;

  &:hover {
    background-color: #282828;
  }
}
</style>
