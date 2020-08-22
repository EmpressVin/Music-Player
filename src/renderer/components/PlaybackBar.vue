<template>
  <div class="player-control__playback-bar">
    <span>{{ convertTime(localElapsedTime) }}</span>
    <div
      class="playback-bar__slider"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <input
        type="range"
        min="0"
        :max="duration"
        step="0.1"
        ref="slider"
        v-model.number="localElapsedTime"
        @mouseup="handleMouseUp"
        @mousedown="handleMouseDown"
        @input="handleInput"
      />
    </div>
    <span>{{ convertTime(duration) }}</span>
  </div>
</template>

<script>
// Import Vuex store related items
import { mapGetters, mapActions } from 'vuex';

let isHover = false;
let isInput = false;

export default {
  name: 'PlaybackBar',
  data: function() {
    return {
      localElapsedTime: 0,
    };
  },
  computed: {
    ...mapGetters({
      elapsedTime: 'Player/getElapsedTime',
      duration: 'Player/getDuration',
    }),
  },
  watch: {
    elapsedTime(newTime) {
      if (!isInput) this.localElapsedTime = newTime;
      this.updateBarProgress();
    },
  },
  methods: {
    ...mapActions({
      seekSong: 'Player/seekSong',
    }),
    updateBarProgress() {
      const color = isHover === false ? '#b3b3b3' : '#1db954';
      const percent = (this.localElapsedTime / this.duration) * 100;

      const gradient = `linear-gradient(90deg, ${color} ${percent}%, #404040 ${percent}%)`;
      this.$refs.slider.style.background = gradient;
    },
    handleMouseEnter() {
      isHover = true;
      this.updateBarProgress();
    },
    handleMouseLeave() {
      isHover = false;
      this.updateBarProgress();
    },
    handleMouseUp() {
      this.seekSong(this.localElapsedTime);
      isInput = false;
    },
    handleMouseDown() {
      isInput = true;
    },
    handleInput() {
      isHover = true;
      this.updateBarProgress();
    },
    convertTime(time) {
      const min = Math.floor(time / 60);
      const sec = Math.floor(time % 60);
      const secString = sec < 10 ? `0${sec}` : `${sec}`;

      return `${min}:${secString}`;
    },
  },
};
</script>

<style lang="scss">
.player-control__playback-bar {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;

  span {
    width: 2rem;
    margin: auto;
    display: flex;
    justify-content: center;
    font-size: 0.7rem;
  }
}

.playback-bar__slider {
  width: 100%;
  height: 1rem;
  margin: 0 0.75rem;
  display: flex;
  align-items: center;

  &:hover input[type='range']::-webkit-slider-thumb {
    width: 0.75rem;
    height: 0.75rem;
    margin-top: -0.25rem;
    border-radius: 50%;
    background: #ffffff;
    cursor: pointer;
  }

  input {
    width: 100%;
  }
}
</style>
